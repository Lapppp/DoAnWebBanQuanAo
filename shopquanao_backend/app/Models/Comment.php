<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
use App\Models\User;
class Comment extends Model
{
    use HasFactory;

    public  function comment()
    {
        return $this->belongsTo(Comment::class);
    }
    use HasFactory;

    protected $fillable = [
        'product_id',
        'content',
        'status'
    ];
    protected $dates = ['created_at', 'updated_at'];
    public function childComments()
    {
        return $this->hasMany(Comment::class, 'comment_id');
    }
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

    public function parentComment()
    {
        return $this->belongsTo(Comment::class, 'parent_comment_id');
    }

    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_comment_id');
    }
    public function scopeActive($query)
    {
        return $query->where('status', 1);
    }

}