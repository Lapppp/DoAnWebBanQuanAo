<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    use HasFactory;

    protected $fillable = [
        'start_date',
        'end_date',
        'percentagediscount',
        'discountamount',
        'product_id',
        'status',
    ];

    protected $dates = ['start_date', 'end_date', 'created_at', 'updated_at'];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
    protected $hidden = [
        'updated_at',
        'created_at',
        'deleted_at'
    ];

    public function scopeActive($query)
    {
        return $query->where('status', 1);
    }
}
