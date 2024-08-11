<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ProductDetail;
use App\Models\User;
class Cart extends Model
{


    public  function productDetail()

    {
        return $this->belongto(ProductDetail::class);
    }
    public   function user()
    {
        return $this->belongsTo(User::class);
    }
    protected $hidden = [
        'updated_at',
        'created_at',
        'deleted_at'
    ];
    protected $fillable = [
        'product_detail_id', // Thêm trường này vào fillable
        'user_id',
        'quantity',
        // ... các trường khác
    ];




    use HasFactory;

}