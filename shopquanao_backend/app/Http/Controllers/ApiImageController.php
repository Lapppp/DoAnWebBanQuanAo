<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ApiImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {   

         $images=Image::all();
        return response()->json(['images'=>$images]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator=Validator::make($request->all(),[


            'path'=>'required',
            'color_id'=>'required',
            
        ]);
        if($validator->fails())
        {
            return response()->json(['validator_erro'=>$validator->errors()],422);
        }

        // $image=$request->file('path');
        // if($request->hasFile('path'))
        // {
        //     $fileName = rand().'.'.$image->getClientOriginalExtension();
        //     $image->move(public_path('/upload/images'),$fileName);
        //     return response()->json($fileName);

        // }

        $images=$request->file('path');
        $imageName=[];
            foreach($images as $image)
            {
                $fileName = rand().'anh'.'.'.$image->getClientOriginalExtension();
                $image->move(public_path('/upload/images'),$fileName);
                $imageName=$fileName;
                $imageDB[]=$imageName;
                //lưu ảnh
                $iamgesave= new Image;
                $iamgesave->path=$imageName;
                $iamgesave->color_id=$request->color_id;
                $iamgesave->save();
            }
           

        return response()->json($imageDB);
 

        // $images= new Image;
        // $images->path= $request->path;
        // $images->color_id=$request->color_id;
        // $images->save();


        // return response()->json(['message'=>'thành công','Image'=>$images]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
