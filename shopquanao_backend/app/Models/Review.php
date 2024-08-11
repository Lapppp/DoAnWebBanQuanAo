<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Product;
class Review extends Model
{
    use HasFactory;
    public function product()
    {
        return $this->belongto(Product::class);
    }
    public function user()
    {
        return $this->belongto(User::class);
    }
    protected $hidden = [
        'updated_at',
        'created_at',
        'deleted_at'
    ];
}