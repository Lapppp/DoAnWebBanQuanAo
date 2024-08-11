<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;
use App\Models\Cart;
use App\Models\Review;
use App\Models\Comment;
use App\Models\Invoice;
use App\Models\ProductFavorite;
use Laravel\Cashier\Billable;


class User extends  Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $fillable = [
        'name',
        'email',
        'password',
        'fullname',


        'address',
        'phone',


    ];

    protected $hidden = [
      
        'remember_token', 
            'updated_at',
            'created_at',
            'deleted_at'
        
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function Cart()
    {
        return $this->hasOne(Cart::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }

    public function favorites()
    {
        return $this->hasMany(ProductFavorite::class);
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
   




}