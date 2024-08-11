<?php
    
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductDetail extends Model
{
    use HasFactory;

    protected $fillable=['quantity','price','color_id','size_id','product_id'];
    
 /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    

    public function color()
    {
        return $this->belongsto(Color::class,'color_id');
    }
    public function size()
    {
        return $this->belongsto(Size::class,'size_id');
    }
    public function product()
    {
        return $this->belongsto(Product::class,'product_id');
    }
    public function discountDetails()
    {
        return $this->hasMany(DiscountDetail::class);
    }
    public function invoiceDetails()
    {
        return $this->hasMany(InvoiceDetail::class);
    }

    public function carts()
    {
        return $this->hasMany(Cart::class);
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    protected $hidden = [
        'updated_at',
        'created_at',
        'deleted_at'
    ];
}