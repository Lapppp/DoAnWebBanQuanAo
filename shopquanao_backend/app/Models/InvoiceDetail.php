<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Invoice;
use App\Models\ProductDetail;
class InvoiceDetail extends Model
{
    use HasFactory;
    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
    public function productDetail()
    {
        return $this->belongsTo(ProductDetail::class);
    }

    protected $fillable = [
        'invoice_id',
        'product_detail_id',
        'quantity',
        'price',
     ];
     protected $hidden = [
        'updated_at',
        'created_at',
        'deleted_at'
    ];

}