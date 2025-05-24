import React, { useRef } from "react";
import { Container, Button } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import UploadSpace from "../components/Uploadspace";

const Upload: React.FC = () => {
  const uploadSpaceRef = useRef<any>(null);

  // Buat fungsi upload yang memanggil method di UploadSpace via ref
  const handleUploadClick = () => {
    if (uploadSpaceRef.current) {
      uploadSpaceRef.current.startUpload();
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />
        <Container className="py-4">
          <h4 className="mb-4 fw-bold">Upload Resume</h4>
          <p>Unggah resume Anda untuk mendapatkan ringkasan berbasis AI</p>

          {/* Pass ref ke UploadSpace */}
          <UploadSpace ref={uploadSpaceRef} />

          <div className="text-center mt-3">
            <Button variant="primary" onClick={handleUploadClick}>
              Upload
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Upload;
