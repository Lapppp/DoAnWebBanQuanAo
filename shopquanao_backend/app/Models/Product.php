<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use App\Models\ProductDetail;
use App\Models\Comment;
use App\Models\ProductFavorite;
class Product extends Model
{
    use HasFactory;
    protected  $fillable=['name','description','slug', 'category_id','averagestar'];
    protected $table = 'products';

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function productDetails()
    {
        return $this->hasMany(ProductDetail::class ,'product_id');
    }
    public function image()
    {
        return $this->hasOne(Image::class);
    }

    public function productfavorites()
    {
        return $this->hasOne(ProductFavorite::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    // đánh giá
    protected $hidden = [
        'updated_at',
        'created_at',
        'deleted_at'
    ];
   
    




  
}