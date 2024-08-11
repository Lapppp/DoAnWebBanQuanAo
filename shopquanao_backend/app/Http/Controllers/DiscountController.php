<?php

namespace App\Http\Controllers;

use App\Models\Discount;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;
class DiscountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        // Lấy danh sách tất cả các discounts
        $discounts = Discount::all();
    
        // Trả về JSON response chứa danh sách discounts
        return response()->json(['discounts' => $discounts]);
    }

    public function show($id)
    {
        // Lấy Discount theo ID
        $discount = Discount::find($id);

        if ($discount) {
            return response()->json($discount);
        }

        return response()->json(['message' => 'Discount not found.'], 404);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('discount.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */







   

     public function store(Request $request)
     {
         $data = $request->validate([
             'start_date' => 'required|date',
             'end_date' => 'required|date|after:start_date',
             'percentagediscount' => 'required|numeric|min:0|max:100',
             'discountamount' => 'required|numeric|min:0',
             'product_id' => 'required|exists:products,id',
         ]);
     
         $discount = Discount::create([
             'start_date' => $data['start_date'],
             'end_date' => $data['end_date'],
             'percentagediscount' => $data['percentagediscount'],
             'discountamount' => $data['discountamount'],
             'product_id' => $data['product_id'],
         ]);
         return response()->json(['message' => 'discounts created successfully', 'discounts' => $discount]);
         //return redirect('/discounts')->with('success', 'Discount created successfully!');
     }
     

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $discount = Discount::find($id);
        return view('discount.edit', compact('discount'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // Validate the request data here
    
        $discount = Discount::find($id);
    
        $discount->update([
            'start_date' => $request->input('start_date'),
            'end_date' => $request->input('end_date'),
            'percentagediscount' => $request->input('percentagediscount'),
            'discountamount' => $request->input('discountamount'),
            'product_id' => $request->input('product_id'),
            
        ]);
    
       
        return response()->json(['message' => 'discounts created successfully', 'discounts' => $discount]);
    }
    

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    

    public function destroy($id)
    {
        // Soft delete Discount
        $discount = Discount::find($id);

        if ($discount) {
            $discount->update(['status' => 0]);
            return response()->json(['message' => 'Discount has been soft deleted.']);
        }

        return response()->json(['message' => 'discounts created successfully', 'discounts' => $discount]);
    }
    public function toggleStatus($id)
    {
        $discount = Discount::find($id);
    
        if (!$discount) {
            return response()->json(['message' => 'Discount not found'], 404);
        }
    
        $discount->status = !$discount->status;
        $discount->save();
    
        return response()->json(['message' => 'Status toggled successfully', 'discounts' => $discount, 'status' => $discount->status ? 1 : 0]);
    }
    

}
