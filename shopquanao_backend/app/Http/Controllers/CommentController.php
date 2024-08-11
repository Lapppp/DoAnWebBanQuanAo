<?php



namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
   // Lấy tất cả Comment của một sản phẩm
   public function index()
   {
       // Lấy danh sách tất cả các comment
       $comments = Comment::all();

       // Trả về JSON response chứa danh sách comment
       return response()->json(['comments' => $comments]);
   }

   public function show($id)
   {
       // Lấy thông tin của comment có id cụ thể
       $comment = Comment::find($id);

       // Kiểm tra xem comment có tồn tại không
       if (!$comment) {
           return response()->json(['message' => 'Comment not found'], 404);
       }

       // Trả về JSON response chứa thông tin của comment
       return response()->json(['comment' => $comment]);
   }

   // Lưu một Comment mới
   public function store(Request $request)
   {
       // Validate data
       $data = $request->validate([
           'product_id' => 'required|exists:products,id',
           'content' => 'required|string',
       ]);

       // Tạo mới comment với id tự động được sinh ra
       $comment = Comment::create([
           'product_id' => $data['product_id'],
           'content' => $data['content'],
       ]);

       // Trả về JSON response chứa thông tin của comment sau khi tạo mới
       return response()->json(['message' => 'Comment created successfully', 'comment' => $comment]);
   }


 

   // Cập nhật thông tin Comment
  
   public function update(Request $request, $id)
   {
       // Validate data
       $data = $request->validate([
           'product_id' => 'required|exists:products,id',
           'content' => 'required|string',
       ]);

       // Lấy comment cần cập nhật
       $comment = Comment::find($id);

       // Kiểm tra xem comment có tồn tại không
       if (!$comment) {
           return response()->json(['message' => 'Comment not found'], 404);
       }

       // Cập nhật thông tin comment
       $comment->product_id = $data['product_id'];
       $comment->content = $data['content'];
       $comment->save();

       // Trả về JSON response chứa thông tin của comment sau khi cập nhật
       return response()->json(['message' => 'Comment updated successfully', 'comment' => $comment]);
   }

   // Xoá một Comment
   public function destroy($id)
   {
       try {
           // Tìm comment theo ID
           $comment = Comment::findOrFail($id);

           // Chuyển trạng thái status thành 0 (xoá)
           $comment->status = 0;

           // Lưu thay đổi
           $comment->save();

           return response()->json(['message' => 'Xoá comment thành công'], 200);
       } catch (\Exception $e) {
           // Xử lý lỗi nếu có
           return response()->json(['message' => 'Xoá comment thất bại', 'error' => $e->getMessage()], 500);
       }
   }
   // còn muốn xoá trên csdl thì xài cái này 
   //$comment->delete();



   

    public function toggleStatus($id)
    {
        $comment = Comment::find($id);
    
        if (!$comment) {
            return response()->json(['message' => 'Comment not found'], 404);
        }
    
        $comment->status = !$comment->status;
        $comment->save();
    
        return response()->json(['message' => 'Status toggled successfully', 'Comment' => $comment, 'status' => $comment->status ? 1 : 0]);
    }
    
    
}
