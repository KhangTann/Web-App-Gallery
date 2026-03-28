import { useEffect, useState } from "react";
import axios from "../api/axios";
import UploadForm from "../components/UploadForm";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "" });

  const navigate = useNavigate();

  const fetchPhotos = async () => {
    const res = await axios.get("/photos");
    setPhotos(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/photos/${id}`);
    fetchPhotos();
  };

  const handleSearch = async () => {
    const res = await axios.get(`/photos/search/?title=${search}`);
    setPhotos(res.data);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleEdit = async () => {
  try {
    await axios.put(`/photos/${selectedPhoto.id}`, {
      title: editData.title ? editData.title : "",
      description: editData.description ? editData.description : "",
    });

    setSelectedPhoto(null);
    fetchPhotos();
  } catch (err) {
    console.log("Lỗi update:", err.response?.data);
    alert("Cập nhật thất bại!");
  }
};

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <h2>Thư viện ảnh</h2>
        <button onClick={handleLogout}>Đăng xuất</button>
      </div>

      <UploadForm refresh={fetchPhotos} />

      <div className="search-bar">
        <input
          placeholder="Tìm ảnh..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="gallery-grid">
        {photos.map((p) => (
          <div key={p.id} className="photo-card">
        <img
          src={`http://127.0.0.1:8000/${p.image_url}`}
          onClick={() => {
            setSelectedPhoto(p); // 🔥 THIẾU DÒNG NÀY
            setEditData({
              title: p.title || "",
              description: p.description || "",
              });
            }}
          />
            <h4>{p.title}</h4>
            <p>{p.description}</p>
            <button onClick={() => handleDelete(p.id)}>Xóa</button>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedPhoto && (
        <div className="modal">
          <div className="modal-content">
            <img src={`http://127.0.0.1:8000/${selectedPhoto.image_url}`} />

            <input
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
            />

            <textarea
              value={editData.description}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
            />

            <button onClick={handleEdit}>Lưu</button>
            <button onClick={() => setSelectedPhoto(null)}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;