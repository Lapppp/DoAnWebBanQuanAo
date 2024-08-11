<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\InvoiceDetail;
use App\Models\Product;
use App\Models\ProductDetail;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ApiInvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $invoice_lst = Invoice::with('user')->get();
        
        return response()->json($invoice_lst);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $re)
    {
        

        $validator  = Validator::make($re->all(), [
            'invoicedate' => 'required',
            
            'user_id' => 'required',
            'shippingaddress' => 'required',
            'shippingphone' => 'required|regex:/^[0-9]{10}$/',
            'code' => 'required',



        ]);
        if ($validator ->fails()) {
            return response()->json(['errors' =>$validator ->errors()], 400);
        }
        $invoice = Invoice::create([
            'invoicedate' => $re->invoicedate,
            
            'user_id' => $re->user_id,
            'shippingaddress' => $re->shippingaddress,
            'shippingphone' => $re->shippingphone,
            'code' => $re->code,
            'status' => $re->status




        ]);
      
        return response()->json(['message ' => 'thành công']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $invoice = Invoice::with(['invoicedetails','user'])->find($id);
        
        if ($invoice) {
            return response()->json($invoice, 200);
        } else {
            return response()->json(['message ' => 'không tồn tại sản phẩm này']);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $req, string $id)
    {
        $invoice = Invoice::find($id);
        
        //kiểm tra có hóa đơn này không 
        if(!$invoice)
        {
            return response()->json(["error"=>"không tìm thấy đơn hàng này "],400);
        }

        
        $validator  = Validator::make($req->all(), [
            'invoicedate' => 'required',
           
            'user_id' => 'required',
            'shippingaddress' => 'required',
            'shippingphone' => 'required|regex:/^[0-9]{10}$/',
            'code' => 'required',



        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator ->errors()], 400);
        }
        $invoice->fill([
            'invoicedate' => $req->invoicedate,
            
            'user_id' => $req->user_id,
            'shippingaddress' => $req->shippingaddress,
            'shippingphone' => $req->shippingphone,
            'code' => $req->code,
            'status' => $req->status




        ]);
        $invoice->save();
        return response()->json(['message ' => 'cập nhật thành công'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {

        //kiểm tra có id ko 
        $invoice = Invoice::find($id);

        // có id thì xóa 
        if ($invoice) {
            $invoice->delete();
            return response()->json(['message ' => 'xóa thành công'], 200);
        } else {
            return response()->json(['message ' => 'không tồn tại sản phẩm này']);
        }
    }
// số 1 -> chờ duyệt 
//2-> đã duyệt 
    public function updateStatus(string $id)
    {
        $update=Invoice::find($id);
        
        if(!$update)
        {
            return response()->json(['message ' => ' không tìm thấy'],404);
            
        }
    
            if($update->status===1)
            {
                $update->status='2';
                
            }elseif($update->status===2)
            {
                $update->status='3';
            }elseif($update->status===3)
            {
                $update->status='4';
            }elseif($update->status===5)
            {
                $update->status='5';
            }
        
        
        $update->save();
        
        

        
        return response()->json(['message' => '  cập nhật thành công']);
    } 
    

    // tông tiền của hóa đơn 
    public function tongTienHD()
    {
        // Lấy danh sách các hóa đơn
        $invoices = Invoice::all();

        // Mảng tổng tiền theo id hóa đơn
        $result = [];

        foreach ($invoices as $invoice) {
            $tong = InvoiceDetail::where('invoice_id', $invoice->id)
                ->sum(DB::raw('price * quantity'));

            // Thêm thông tin vào mảng 
            $result[] = [
                'id' => $invoice->id,
                'total' => $tong,
            ];
        }

    return response()->json( $result);
    }


    // tìm kiếm hóa đơn theo  khoảng ngày 
    public function invoiceDate(Request $request)  {
        $startdate=$request->input('startdate');
        $enddate=$request->input('enddate');
        $invoice = Invoice::whereBetween('invoicedate', [$startdate, $enddate])->get();


        if($invoice)
        {
            return response()->json($invoice);
        }
        return response()->json(['message'=>'không có hóa đơn '],404);
        
        
    }

    public function totalQuarter() {
        $total=Invoice::join('invoice_details','invoices.id','=','invoice_details.invoice_id')
        ->selectRaw('QUARTER(invoices.invoicedate) as quarter, SUM(invoice_details.price * invoice_details.quantity) as total')
        ->groupByRaw('QUARTER(invoices.invoicedate)')
        ->get();


        if($total)
        {
            return response()->json($total);
        }
        return response()->json(['message'=>'không có dữ liệu  '],404);
    }

    // số lượng tồn kho 
    public function quantityProduct() {
        $stock=ProductDetail::selectRaw('SUM(product_details.quantity )as stock')->first();
        if($stock)
        {
            return response()->json($stock);
        }
        return response()->json(['message'=>'không có số lượng tồn   '],404);
        
    }
   // hóa đơn theo id của user 
   public function invoiceUser(string $user_id)
   {
     $invoice=Invoice::where('user_id',$user_id)->get();
     if(!$invoice)
     {
        return response()->json(['message'=>'không có hóa đơn  '],404);
     }

     return response()->json($invoice);
   }
   // hủy đơn của client 
   public function  updateStatusClient(string $id)  
   {
       $invoice=Invoice::find($id);
       $invoice->status=0;
       $invoice->save();
       //cập nhật số lượng khi hủy 
       $invoicedetail=InvoiceDetail::where('invoice_id',$id)->get();
       
       foreach ($invoicedetail as $item)
       {
          $productdetail=ProductDetail::where('id',$item->product_detail_id)->first();
          if($productdetail->id==$item->product_detail_id)
          {
            $productdetail->quantity+=$item->quantity;
            $productdetail->save();
            
          }
          
        
       }
       
       return response()->json(['massege'=>'update thành công']);
    
    
   }
    
}