import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentComponent = ({ productId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Gọi API để lấy danh sách bình luận khi component được render
    axios.get(`http://localhost:8000/api/products/${productId}/comments`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [productId]);

  const handleAddComment = () => {
    // Gọi API để thêm bình luận mới
    axios.post(`http://localhost:8000/api/comments`, {
      product_id: productId,
      content: newComment,
    })
      .then(response => {
        // Cập nhật danh sách bình luận sau khi thêm mới
        setComments([...comments, response.data]);
        
        setNewComment('');
      })
      .catch(error => {
        console.error(error);
      });
  };
  console.log(productId)
  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={handleAddComment}>Add Comment</button>
    </div>
  );
};

export default CommentComponent;
