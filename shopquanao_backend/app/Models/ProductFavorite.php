<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductFavorite extends Model
{
    use HasFactory;
    public function product()
    {
        return $this->belongto(Product::class);
    }
    protected $hidden = [
        'updated_at',
        'created_at',
        'deleted_at'
    ];

}