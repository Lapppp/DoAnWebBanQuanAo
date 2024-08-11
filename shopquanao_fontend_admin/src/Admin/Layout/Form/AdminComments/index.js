import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Modal, Table } from "react-bootstrap";

const AdminComment = () => {
  const [comments, setComments] = useState([]);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState({
    product_id: "",
    content: "",
    status: 1,
  });

  useEffect(() => {
    // Gọi API để lấy danh sách comments khi component được mount
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/comments");
      setComments(response.data.comments);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddComment = () => {
    setShowCommentModal(true);
    setSelectedComment({
      product_id: "",
      content: "",
      status: 1,
    });
  };

  const handleEditComment = (comment) => {
    setShowCommentModal(true);
    setSelectedComment(comment);
  };
  


  const handleSaveComment = async () => {
    try {
      const isEditing = selectedComment.id !== undefined;

      if (isEditing) {
        await axios.put(
          `http://localhost:8000/api/comments/${selectedComment.id}`,
          selectedComment
        );
      } else {
        await axios.post("http://localhost:8000/api/comments", selectedComment);
      }

      // Refetch comments after save
      await fetchData();

      setSelectedComment({
        product_id: "",
        content: "",
        status: 1,
      });

      setShowCommentModal(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
     
      await axios.patch(`http://localhost:8000/api/comments/${id}/toggle-status`);
  
      
      fetchData();
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };




  return (
    <div className="mt-5">
      <Button variant="primary" onClick={handleAddComment}>
        Thêm Comment
      </Button>



      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product ID</th>
            <th>Content</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment.id}>
              <td>{comment.id}</td>
              <td>{comment.product_id}</td>
              <td>{comment.content}</td>
              <td>

              
           

              <Form.Check
                type="switch"
                id={`custom-switch-${comment.id}`}
                label={comment.status === 1 ? "On" : "Off"}
                checked={comment.status === 1}
                onChange={() =>handleToggleStatus(comment.id)}
              />

            </td>



              <td>
                <Button variant="info" onClick={() => handleEditComment(comment)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showCommentModal} onHide={() => setShowCommentModal(false)}>
        {/* Modal content */}
        <Modal.Header closeButton>
          <Modal.Title>{selectedComment.id ? "Edit" : "Add"} Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="product_id">
              <Form.Label>Product ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product ID"
                value={selectedComment.product_id}
                onChange={(e) =>
                  setSelectedComment((prev) => ({
                    ...prev,
                    product_id: e.target.value,
                  }))
                }
              />
            </Form.Group>



            
            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter comment content"
                value={selectedComment.content}
                onChange={(e) =>
                  setSelectedComment((prev) => ({
                    ...prev,
                    content: e.target.value,
                  }))
                }
              />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCommentModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveComment}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminComment;
