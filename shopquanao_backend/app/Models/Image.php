<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Color;
class Image extends Model
{
    use HasFactory;
    protected $fillable=['path','color_id'];
    public function color()
    {
        return $this->belongsTo(Color::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
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