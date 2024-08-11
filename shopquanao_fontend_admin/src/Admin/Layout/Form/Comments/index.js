import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminComments = () => {
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentContent, setEditedCommentContent] = useState('');

  useEffect(() => {
    // Gọi API để lấy danh sách bình luận từ server
    axios.get("http://localhost:8000/api/comments/2")  
      .then(response => {
        console.log("Response data:", response.data);

        // Kiểm tra xem dữ liệu có phải là mảng hay không
        const commentsArray = Array.isArray(response.data) ? response.data : [];
        
        // Cập nhật state với dữ liệu đã kiểm tra
        setComments(commentsArray);
      })
      .catch(error => {
        console.error('Error message:', error.message);
      });
  }, []);

  const handleEdit = (commentId) => {
    const commentToEdit = comments.find(comment => comment.id === commentId);
    setEditingCommentId(commentId);
    setEditedCommentContent(commentToEdit.content);
  };

  const handleSaveEdit = (commentId) => {
    // Gọi API để lưu bình luận đã chỉnh sửa lên server
    axios.put(`http://localhost:8000/api/comments/${commentId}`, { content: editedCommentContent })
      .then(response => {
        // Cập nhật danh sách bình luận sau khi chỉnh sửa thành công
        const updatedComments = comments.map(comment => (
          comment.id === commentId ? { ...comment, content: editedCommentContent } : comment
        ));
        setComments(updatedComments);
        // Đặt lại trạng thái chỉnh sửa
        setEditingCommentId(null);
        setEditedCommentContent('');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDelete = (commentId) => {
    // Gọi API để xoá bình luận từ server
    axios.delete(`http://localhost:8000/api/comments/${commentId}`)
      .then(response => {
        // Cập nhật danh sách bình luận sau khi xoá thành công
        const updatedComments = comments.filter(comment => comment.id !== commentId);
        setComments(updatedComments);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
       
      <h2>Quản Lý Bình Luận (Admin)</h2>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            {comment.id === editingCommentId ? (
              <>
                <input
                  type="text"
                  value={editedCommentContent}
                  onChange={(e) => setEditedCommentContent(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(comment.id)}>
                  Lưu
                </button>
              </>
            ) : (
              <>
                {comment.content}
                <button onClick={() => handleEdit(comment.id)}>
                  Chỉnh sửa
                </button>
                <button onClick={() => handleDelete(comment.id)}>
                  Xoá
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminComments;
