<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\InvoiceDetail;
class Invoice extends Model
{
    use HasFactory;
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function invoiceDetails()
    {
        return $this->hasMany(InvoiceDetail::class);
    }

    protected $fillable = [
       'invoicedate',
       
       'shippingaddress',
       'shippingphone',
       'user_id',
       'code',
       'status',
    ];
    protected $hidden = [
        'updated_at',
        'created_at',
        'deleted_at'
    ];

}