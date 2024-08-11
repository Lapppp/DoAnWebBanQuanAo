import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Modal, Table } from "react-bootstrap";

const SlideshowService = () => {
  const [slideshows, setSlideshows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState({
    title: "",
    image_url: "",
    link: "",
    status: 1,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/slideshows");
      console.log("API Response:", response.data); // Thêm dòng này
  
      // Kiểm tra giá trị trạng thái của slides
      const fetchedSlides = response.data.slideshows;
      console.log("Fetched Slides:", fetchedSlides);
  
      setSlideshows(fetchedSlides);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  const handleAddSlide = () => {
    setShowModal(true);
    setSelectedSlide({
      title: "",
      image_url: "",
      link: "",
      status: 1,
    });
  };
  const handleEditSlide = (slide) => {
    setShowModal(true);
    setSelectedSlide(slide);
  };

  const handleSaveSlide = async () => {
    try {
      const requestData = {
        title: selectedSlide.title,
        link: selectedSlide.link,
        path: selectedSlide.file,
        status: selectedSlide.status ? 1 : 0,
        // ... other fields
      };
  
      if (selectedSlide.id) {
        await axios.put(
          `http://localhost:8000/api/slideshows/${selectedSlide.id}`,
          requestData,
          { headers: { "Content-Type": "application/json" } }
        );
      } else {
        await axios.post(
          "http://localhost:8000/api/slideshows",
          requestData,
          { headers: { "Content-Type": "application/json" } }
        );
      }
  
      await fetchData();
  
      setSelectedSlide({
        title: "",
        image_url: "",
        link: "",
        status: 1,
      });
  
      setShowModal(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };


 
  

  
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setSelectedSlide((prev) => ({
          ...prev,
          image_url: imageUrl,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
 

  const handleToggleStatus = async (id) => {
    try {
      // Gửi PATCH request để toggle status

      await axios.patch(`http://localhost:8000/api/slideshows/${id}/toggle-status`);
  
      fetchData();
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };
  
  return (
    <div className="mt-5">
      <Button variant="primary" onClick={handleAddSlide}>
        Thêm Slide
      </Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Image</th>
            <th>Link</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {slideshows.map((slide) => (
            <tr key={slide.id}>
              <td>{slide.id}</td>
              <td>{slide.title}</td>
              <td>
                <img
                  src={slide.image_url}
                  alt={slide.title}
                  width="100"
                  height="100"
                  className="img-fluid"
                />
              </td>
              <td>{slide.link}</td>
              <td>
              <Form.Check
                type="switch"
                id={`custom-switch-${slide.id}`}
                label={slide.status === 1 ? "On" : "Off"}
                checked={slide.status === 1}
                onChange={() =>handleToggleStatus(slide.id)}
              />
              </td>
              <td>
                <Button variant="info" onClick={() => handleEditSlide(slide)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedSlide.id ? "Edit" : "Add"} Slide</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={selectedSlide.title}
                onChange={(e) =>
                  setSelectedSlide((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group controlId="image_url">
              <Form.Label>Choose Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e)}
              />
              {selectedSlide.image_url && (
                <img
                  src={selectedSlide.image_url}
                  alt={selectedSlide.title}
                  width="100"
                  height="100"
                  className="img-fluid mt-2"
                />
              )}
            </Form.Group>
            <Form.Group controlId="link">
              <Form.Label>Link</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter link"
                value={selectedSlide.link}
                onChange={(e) =>
                  setSelectedSlide((prev) => ({
                    ...prev,
                    link: e.target.value,
                  }))
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveSlide}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SlideshowService;














