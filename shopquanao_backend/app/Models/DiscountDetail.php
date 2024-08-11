<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Discount;
use App\Models\ProductDetail;
class DiscountDetail extends Model
{
    use HasFactory;
    
    public function discount()
    {
        return $this->belongsTo(Discount::class);
    }
    protected $dates = ['created_at', 'updated_at'];
    public function productDetail()
    {
        return $this->belongsTo(ProductDetail::class);
    }
    protected $hidden = [
        'updated_at',
        'created_at',
        'deleted_at'
    ];
}