<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
 {

public function redirectToProvider()
{
    return Socialite::driver('google')->redirect();
}

public function handleGoogleCallback()
{
    try {
        $googleUser = Socialite::driver('google')->user();

        // Kiểm tra xem người dùng có tồn tại trong cơ sở dữ liệu không
        $user = User::where('email', $googleUser->getEmail())->first();

        if (!$user) {
            // Nếu không tồn tại, tạo mới người dùng
            $user = User::create([
                'name' => $googleUser->getName(),
                'email' => $googleUser->getEmail(),
                // Thêm các thông tin khác nếu cần
            ]);
        }

        // Đăng nhập người dùng
        Auth::login($user);

        // Tạo hoặc lấy token và trả về cho ứng dụng ReactJS
        $token = $user->createToken('token-name')->accessToken;

        return response()->json(['user'=> $user,'token' => $token, 'message' => 'Login successful']);
    } catch (\Exception $e) {
        // Xử lý lỗi nếu có
        return response()->json(['error' => $e->getMessage()], 500);
    }
}

}


