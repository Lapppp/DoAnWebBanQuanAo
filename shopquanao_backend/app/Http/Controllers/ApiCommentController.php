<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ApiCommentController extends Controller
{
    public function index($productId)
    {
        $comments = Comment::with('replies')->where('product_id', $productId)->orderBy('created_at', 'desc')->get();

        return response()->json($comments);
    }

    public function store(Request $request, $productId)
    {
        $validator = Validator::make($request->all(), [
            'content' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 422);
        }

        $comment = new Comment([
            'product_id' => $productId,
            'content' => $request->input('content'),
        ]);

        $comment->save();

        return response()->json(['message' => 'Comment created successfully', 'comment' => $comment], 201);
    }
    public function show($id)
{
    // Lấy thông tin chi tiết của comment có id là $id
    $comment = Comment::find($id);

    // Kiểm tra xem comment có tồn tại không
    if (!$comment) {
        return response()->json(['error' => 'Comment not found'], 404);
    }

    // Trả về thông tin của comment
    return response()->json($comment);
}

}
