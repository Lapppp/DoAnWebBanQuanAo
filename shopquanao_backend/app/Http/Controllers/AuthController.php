<?php

namespace App\Http\Controllers;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Database\Eloquent\Factory;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register','logout']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    


     public function resetPassword(Request $request)
     {
         $request->validate([
             'currentPassword' => 'required',
             'newPassword' => 'required|min:6',
             'confirmPassword' => 'required|same:newPassword',
         ]);
     
         $user = auth()->user();
     
         if (!Hash::check($request->currentPassword, $user->password)) {
             return response()->json(['error' => 'Mật khẩu hiện tại không chính xác'], 401);
         }
     
         // Lấy id của người dùng
         $userId = $user->id;
     
         // Tải lại người dùng từ cơ sở dữ liệu bằng id
         $userToUpdate = User::find($userId);
     
         // Cập nhật mật khẩu mới
         $userToUpdate->password = Hash::make($request->newPassword);
         $userToUpdate->save();
     
         return response()->json(['message' => 'Đổi mật khẩu thành công']);
     }
     




    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }
    public function register(Request $request)
    {
        $request->validate([
            
            'fullname'=>'required',
            'email' => 'required',
            'password' => 'required',
            'phone' => 'required',
        ]);

        $user = User::create([
            'fullname' => $request->input('fullname'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'phone' => $request->input('phone'),
            // Add other user attributes as needed
        ]);

        $token = auth()->login($user);

        return $this->respondWithToken($token);
    }
    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(JWTAuth::refresh(JWTAuth::getToken()));
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => 3600,

        ]);
    }
}