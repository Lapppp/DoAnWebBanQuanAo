<?php

namespace App\Http\Controllers;

use App\Models\Color;
use App\Models\Invoice;
use App\Models\InvoiceDetail;
use App\Models\Product;
use App\Models\ProductDetail;
use App\Models\Size;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ApiInvoiceDetialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $invoicedetail = InvoiceDetail::with(['productdetail', 'invoice'])->get();
        return response()->json($invoicedetail);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validator  = Validator::make($request->all(), [
            'invoice_id' => 'required',
            'product_detail_id' => 'required',
            'quantity' => 'required|numeric|min:1',
            'price' => 'required',




        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $invoicedetail = InvoiceDetail::create([
            'invoice_id' => $request->invoice_id,
            'product_detail_id' => $request->product_detail_id,
            'quantity' => $request->quantity,
            'price' => $request->price
        ]);


        return response()->json(['thống báo ' => 'thêm thành cồng'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //$invoice = Invoice::with(['invoicedetails','user'])->find($id);
        $invoicedetail = InvoiceDetail::with(['invoice', 'productdetail'])->find($id);
        if ($invoicedetail) return response()->json($invoicedetail);
        return response()->json(['thông báo' => 'sản phẩm không tồn tại ']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // sửa 
        $invoicedetail = InvoiceDetail::find($id);

        if (!$invoicedetail) {
            return response()->json(["error" => "không tìm thấy chi tiết của đơn hàng này "], 400);
        }
        $validator = Validator::make($request->all(), [
            'invoice_id' => 'required',
            'product_detail_id' => 'required',
            'quantity' => 'required|numeric|min:1',
            'price' => 'required',




        ]);
        if ($validator->fails()) {
            return response()->json(['errors' =>  $validator->errors()], 400);
        }

        $invoicedetail->fill([
            'invoice_id' => $request->invoice_id,
            'product_detail_id' => $request->product_detail_id,
            'quantity' => $request->quantity,
            'price' => $request->price
        ]);

        $invoicedetail->save();
        return response()->json(['thông báo' => 'cập nhật thành công ']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $invoicedetail = InvoiceDetail::find($id);
        if ($invoicedetail) return response()->json(['thông báo' => 'xóa thành công']);
        response()->json(['thông báo' => 'không tồn tại ']);
    }


    public function Productdetail_id(Request $request)
    {


        // Lấy thông tin từ query parameters
        $productname = $request->input('productName');
        $size = $request->input('size');
        $color = $request->input('color');


        // kiểm tra  màu để lấy id
        $color_id = Color::where('name', $color)->first()->id;
        $size_id = Size::where('name', $size)->first()->id;
        $product_id = Product::where('name', $productname)->first()->id;


        if ($color_id == null || $size_id == null || $product_id == null) {
            return response()->json(['message' => 'Không tìm thấy chi tiết sản phẩm'], 404);
        }





        // Thực hiện truy vấn để lấy ID của chi tiết sản phẩm từ cơ sở dữ liệu
        $productDetail = ProductDetail::where('product_id', $product_id)
            ->where('size_id', $size_id)
            ->where('color_id', $color_id)
            ->get();

        // Kiểm tra nếu tìm thấy chi tiết sản phẩm
        if ($productDetail->isNotEmpty()) {
            // Trả về ID của chi tiết sản phẩm
            return response()->json(['id' => $productDetail->first()->id]);
        } else {
            // Trả về thông báo lỗi nếu không tìm thấy
            return response()->json(['message' => 'Không tìm thấy chi tiết sản phẩm'], 404);
        }
    }

    public function productName(string $invoiceID)
    {
      // câu join để hết bảng từ bảng invoice_details với bảng prodcut_details

      $productname=Invoice::where('invoices.id',$invoiceID)
      ->join('invoice_details','invoices.id','=','invoice_details.invoice_id')
      ->join('product_details', 'invoice_details.product_detail_id', '=', 'product_details.id')
      ->join('products','product_details.product_id','=','products.id')
      ->join('colors','product_details.color_id','=','colors.id')
      ->join('sizes','product_details.size_id','=','sizes.id')
      ->select('products.name  as productname','colors.name as colorname','sizes.name as sizename','invoice_details.id as invoicedetail_id')->get();
                    

       

         return response()->json( $productname);
         //return  response()->json(['message' => 'thành công']);
    }
    

    // lấy tên sp them id ct hóa đơn 
    public function productName_invoicedetail(string $invoicedetailID)
    {
      // câu join để hết bảng từ bảng invoice_details với bảng prodcut_details

      $productname=InvoiceDetail::where('invoice_details.id',$invoicedetailID)
      ->join('invoices' ,'invoice_details.invoice_id','=','invoices.id')
      ->join('product_details', 'invoice_details.product_detail_id', '=', 'product_details.id')
      ->join('products','product_details.product_id','=','products.id')
      ->join('colors','product_details.color_id','=','colors.id')
      ->join('sizes','product_details.size_id','=','sizes.id')
      ->select('invoices.id as invoice_id','invoice_details.price as invoicedetailprice','product_details.id as productdetail_id','invoice_details.quantity as invoicedetailquantity','products.name  as productname','colors.name as colorname','sizes.name as sizename','invoice_details.id as invoicedetail_id')->first();
                    

       

         return response()->json( $productname);
         //return  response()->json(['message' => 'thành công']);
    }


    //lấy id productdetail dựa vào tên sp , 
    


   
    
}