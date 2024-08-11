<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Image;
use App\Models\ProductDetail;


class Color extends Model
{
    use HasFactory;

    protected  $fillable=['name','status'];
 

    public  function images()
    {
        return $this->hasMany(Image::class);
    }

    public function productDetails()


    {
        return $this->hasMany(ProductDetail::class,'color_id');
    }
    protected $hidden = [
        'updated_at',
        'created_at',
        'deleted_at'
    ];
}