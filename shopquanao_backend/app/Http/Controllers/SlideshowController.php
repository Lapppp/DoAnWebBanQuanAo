<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Slideshow;

class SlideshowController extends Controller
{
    public function index()
    {
        // Lấy danh sách tất cả các slideshows
        $slideshows = SlideShow::all();
    
        // Trả về JSON response chứa danh sách slideshows
        return response()->json(['slideshows' => $slideshows]);
    }
    

    public function show($id)
    {
        // Lấy Slideshow theo ID
        $slideshow = Slideshow::find($id);

        if ($slideshow) {
            return response()->json($slideshow);
        }

        return response()->json(['message' => 'Slide not found.'], 404);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'path' => 'required|string',
            'link' => 'required|string',
            'title' => 'required|string',
        ]);
    
        // Xử lý upload hình ảnh và lưu đường dẫn vào database
        if ($request->hasFile('image_url')) {
            $imagePath = $request->file('image_url')->store('images/slideshows', 'public');
            $data['path'] = $imagePath; // Đặt đường dẫn vào cột 'path'
        }
    
        // Không cần phải truyền status vào data, vì mặc định nó sẽ là 1 (đang hoạt động)
        $slideshow = Slideshow::create($data);
    
        return response()->json(['message' => 'Slide has been created.', 'data' => $slideshow]);
    }

    public function destroy($id)
    {
        // Soft delete slide
        $slideshow = Slideshow::find($id);

        if ($slideshow) {
            $slideshow->update(['status' => 0]);
            return response()->json(['message' => 'Slide has been soft deleted.']);
        }

        return response()->json(['message' => 'Slide not found.'], 404);
    }

    public function update(Request $request, $id)
    {
        try {
            // Validate data
            $data = $request->validate([
                'title' => 'required|string',
                'image_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'link' => 'nullable|string',  // Thêm điều kiện cho link nếu cần
                // ... thêm điều kiện cho các trường khác nếu có
            ]);

            // Lấy Slideshow dựa trên ID
            $slideshow = Slideshow::findOrFail($id);

            // Kiểm tra và xử lý nếu có hình ảnh mới
            if ($request->hasFile('image_url')) {
                // Xử lý lưu hình ảnh và cập nhật đường dẫn mới
                $imageName = time().'.'.$request->file('image_url')->getClientOriginalExtension();  
                $request->file('image_url')->move(public_path('images'), $imageName);

                if ($slideshow->image_url) {
                    unlink(public_path($slideshow->image_url));
                }

                $data['image_url'] = 'images/' . $imageName;
            }

            // Cập nhật thông tin Slideshow
            $slideshow->update($data);

            // Trả về phản hồi thành công
            return response()->json(['message' => 'Cập nhật slide thành công.', 'data' => $slideshow]);
        } catch (\Exception $e) {
            // Xử lý lỗi và trả về phản hồi
            return response()->json(['message' => 'Lỗi khi cập nhật slide.', 'error' => $e->getMessage()], 422);
        }
    }
    public function toggleStatus($id)
    {
        $slideshow = Slideshow::find($id);
    
        if (!$slideshow) {
            return response()->json(['message' => 'Discount not found'], 404);
        }
    
        $slideshow->status = !$slideshow->status;
        $slideshow->save();
    
        return response()->json(['message' => 'Status toggled successfully', 'discounts' => $slideshow, 'status' => $slideshow->status ? 1 : 0]);
    }
}
