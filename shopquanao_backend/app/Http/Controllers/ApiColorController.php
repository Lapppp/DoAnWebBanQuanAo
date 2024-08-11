<?php

namespace App\Http\Controllers;

use App\Models\Color;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class ApiColorController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function uploadfile()
    {
       
    }

    public function postuploadfile()
    {
       
    }
    public function index()
    {

        $color=Color::where('status',true)->get();
        //return response()->json(['colors'=>$color]);
        return response()->json(['colors'=>$color]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Xác thực người dùng nếu cần
            // $this->authorize('create', Color::class);
    
            $validator = Validator::make($request->all(), [
                'name' => 'required',  
            ]);
            
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
    
            $color = new Color;
            $color->name = $request->name;
            
            $color->save();
    
            return response()->json(['message' => 'Thành công', 'color ' => $color]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
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
    { try {
        $color=Color::Find($id);
        if($color)
        {
            
        $validate=$request->validate([

            'name'=>'required',
            'status'=>'nullable'
        ]);

        $color->fill($validate);
        $color->save();
        return response()->json(['message'=>'Update thành công','color'=>$color],200);
    }
        return response()->json(['message'=>'Id Không tồn tại']);
    } catch (\Throwable $th) {
        //throw $th;
        return response()->json(['erros',$th->getMessage()],500);
    }
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
     $color=Color::Find($id);
     if(!$color)
     {
        return response()->json(['message'=>'Id không tồn tại ']);
        
     }
     
     $color->status=false;
     $color->save();
     return response()->json(['message'=>'Xóa thành công']);
     
     
    }
}