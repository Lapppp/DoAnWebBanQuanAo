<?php

namespace App\Http\Controllers;


use App\Models\User;
use Illuminate\Support\Facades\Validator;

use Illuminate\Http\Request;



class ApiUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $lst_user = User::where('status',1)->get();
        return response()->json($lst_user);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $lst = Validator::make($request->all(), [

            'email' => 'required|max:255',
            'name' => 'required',
            'fullname' => 'required',
            'address' => 'required',
            'phone' => 'required',


            'password' => 'required'
        ]);
        $existingUser = User::where('email', $request->email)->first();

        if ($existingUser) {
            return response()->json(['error' => 'Email đã tồn tại'], 400);
        }
        if ($lst->fails()) {
            return response()->json(['errors' => $lst->errors()], 400);
        }

        User::create(
            [
                'email' => $request->email,
                'name' =>  $request->name,
                'password' => bcrypt($request->password),
                'fullname' => $request->fullname,
                'address' => $request->address,
                'phone' => $request->phone,
                'status'=>$request->status

            ]


        );
        return response()->json(['message' => 'thành công']);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

        //tim sản phẩm không có thì sẽ hiện  lỗi 404
        $lst_user = User::find($id);
        return response()->json($lst_user);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        
        //tìm người dùng cần cập nhật   
        $lst = User::find($id);


        //kiểm tra người dùng có tồn tại không 
        if (!$lst) {
            return response()->json(['error' => 'Không tìm thấy người dùng'], 404);
        }

        $validator = Validator::make($request->all(), [

            'email' => 'required|max:255',
            'name' => 'required',
            'fullname' => 'required',
            'address' => 'required',
            'phone' => 'required',
            // admin không có quyền sửa mk 
            // 'password' => 'required',
            'status' => 'required',
        ]);
        if (  $validator ->fails()) {
            return response()->json(['errors' =>  $validator ->errors("hihi")], 400);
        }

        $lst->fill([
            'name' => $request->name,
            'fullname' => $request->fullname,
           

            'address' => $request->address,
            'phone' => $request->phone,
            'email' => $request->email,
            'status' => $request->status,

        ]);




        $lst->save();
       
        return response()->json( ['password' => $lst->password]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        
        $user = User::find($id);
        if ($user) {
            $user->delete();
            return response()->json(['message ' => 'xóa thành công'], 200);
        }
        return response()->json(['message ' => 'sản phẩm không tồn tại ']);
    }



    // cập nhật trạng tháy 
    public function updateStatus(string $id)
    {
        $user=User::find($id);
        if ($user) {
            $user->status='0';
            $user->save();
            return response()->json(['message ' => 'chặn thành công'], 200);
        }
        return response()->json(['message ' => 'tài khoảng không tồn tại ']);
        
        
    }

    public function userUnBlock(string $id)
    {
        $user=User::find($id);
        if ($user) {
            $user->status='1';
            $user->save();
            return response()->json(['message ' => 'mở chặn  thành công'], 200);
        }
        return response()->json(['message ' => 'tài khoảng không tồn tại ']);
        
        
    }

    // hiển thị danh sách các tài khoản bị chặn 
    public function showClockUser()
    {
        $lst_user = User::where('status',0)->get();
        return response()->json($lst_user);
        
    }
    

     
}