<?php

namespace App\Http\Controllers;

use App\Models\Size;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use PhpParser\Node\Stmt\TryCatch;

class ApiSizeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $size=Size::all();
        //return response()->json(['sizes'=>$size]);
        return response()->json(['sizes'=>$size]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Xác thực người dùng nếu cần
            // $this->authorize('create', Product::class);
    
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                
            ]);
    
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
    
            $size = new Size;
            $size->name = $request->name;
            $size->weight = $request->weight;
            $size->height = $request->height;
            $size->save();
    
            return response()->json(['message' => 'Thành công', 'sizes' => $size]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json(['message' => 'Thành công']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $size = Size::find($id);
    
            if ($size) {
                // Kiểm tra dữ liệu truyền vào
                $validatedData = $request->validate([
                    'name' => 'required',
                    'height' => 'required',
                    'weight' => 'required',
                ],[

                    'name.required'=>'yêu cầu nhập tên  không bỏ trống ',
                    'height.required'=>'yêu cầu nhập tên  không bỏ trống ',
                    'weight.required'=>'yêu cầu nhập tên  không bỏ trống ',
                ]);
                
                // Sử dụng phương thức fill để cập nhật dữ liệu
                $size->fill($validatedData);
                $size->save();
    
                // Nếu bạn muốn trả về một phản hồi sau khi cập nhật thành công, bạn có thể làm điều này ở đây
                return response()->json(['message' => 'Cập nhật thành công', 'size' => $size]);
            } else {
                // Nếu không tìm thấy kích thước, bạn có thể xử lý nó tại đây
                return response()->json(['message' => 'Không tìm thấy kích thước'], 404);
            }
        } catch (\Throwable $th) {
            // Xử lý ngoại lệ ở đây nếu cần
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }
    



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {

            $size =Size::findOrFail($id);
            if(!$size)
            {
                 return response()->json(['erros'=>'id không tồn tại']);
            }
            $size->delete();
            return response()->json(['message'=>' xóa thành công']);
        } catch (\Throwable $th) {
            response()->json(['erros'=>$th->getMessage(),500]);
        }
    }
}