<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ProductDetail;
class Size extends Model
{
    use HasFactory;

    protected $fillable=['name','weight' ,'height'];

    public function productDetails()
    {
        return $this->hasMany(ProductDetail::class, 'size_id');
    }
    protected $hidden = [
        'updated_at',
        'created_at',
        'deleted_at'
    ];
}