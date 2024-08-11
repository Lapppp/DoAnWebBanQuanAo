<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
class Category extends Model
{
    use HasFactory;

    protected $fillable=['name', 'category_id','cate'];

    function products()
    {
        return $this->hasMany(Product::class);
    }   
    function parent()
    {
        $this->belongsTo(Category::class);

    } 
    function childrens()
    {
        $this->hasMany(Category::class);
        
    } 
    protected $hidden = [
        'updated_at',
        'created_at',
        'deleted_at'
    ];


   

}

