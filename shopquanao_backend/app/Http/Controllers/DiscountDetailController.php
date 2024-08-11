<?php

namespace App\Http\Controllers;

use App\Models\DiscountDetail;
use Illuminate\Http\Request;

class DiscountDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $discountDetails = DiscountDetail::all();
        return view('discountdetail.index', compact('discountDetails'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('discountdetail.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validate the request data here

        $discountDetail = new DiscountDetail([
            'discount_id' => $request->input('discount_id'),
            'discount_type' => $request->input('discount_type'),
            'product_id' => $request->input('product_id'),
        ]);

        $discountDetail->save();

        return redirect('/discountdetails')->with('success', 'Discount Detail created successfully!');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $discountDetail = DiscountDetail::find($id);
        return view('discountdetail.show', compact('discountDetail'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $discountDetail = DiscountDetail::find($id);
        return view('discountdetail.edit', compact('discountDetail'));
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

        $discountDetail = DiscountDetail::find($id);
        $discountDetail->update([
            'discount_id' => $request->input('discount_id'),
            'discount_type' => $request->input('discount_type'),
            'product_id' => $request->input('product_id'),
        ]);

        return redirect('/discountdetails')->with('success', 'Discount Detail updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $discountDetail = DiscountDetail::find($id);
        $discountDetail->delete();

        return redirect('/discountdetails')->with('success', 'Discount Detail deleted successfully!');
    }
}
