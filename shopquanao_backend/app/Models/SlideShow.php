<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SlideShow extends Model
{
    use HasFactory;

    protected $fillable = [
        'path',
        'link',
        'status',
        'title',
    ];
    protected $dates = ['created_at', 'updated_at'];
    public function scopeActive($query)
    {
        return $query->where('status', 1);
    }
}
