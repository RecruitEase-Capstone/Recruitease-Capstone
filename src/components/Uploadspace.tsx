import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Toast } from "primereact/toast";
import {
  FileUpload,
  FileUploadHeaderTemplateOptions,
  FileUploadSelectEvent,
  FileUploadUploadEvent,
} from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { Tag } from "primereact/tag";
import { API_BASE_URL } from "./Api";
import { useNavigate } from "react-router-dom";
import { useResume } from "../context/ResumeContext";
import { ProgressSpinner } from "primereact/progressspinner";

const UploadSpace = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const { setResumeData } = useResume();

  const toast = useRef<Toast>(null);
  const fileUploadRef = useRef<any>(null);
  const [totalSize, setTotalSize] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [processingStatus, setProcessingStatus] = useState<string>("");

  // Sesuaikan dengan server limit (10 MB)
  const MAX_FILE_SIZE = 10000000; // 10 MB in bytes
  const MAX_TOTAL_SIZE = 10000000; // 10 MB total

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(2) + " " + sizes[i];
  };

  const validateFiles = (files: File[]): { valid: boolean; message?: string } => {
    if (files.length === 0) {
      return { valid: false, message: "Tidak ada file yang dipilih" };
    }

    let totalUploadSize = 0;
    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        return {
          valid: false,
          message: `${file.name} melebihi limit 10 MB. Ukuran: ${formatBytes(file.size)}`
        };
      }
      totalUploadSize += file.size;
    }

    if (totalUploadSize > MAX_TOTAL_SIZE) {
      return {
        valid: false,
        message: `Total ukuran file ${formatBytes(totalUploadSize)} melebihi limit 10 MB.`
      };
    }

    return { valid: true };
  };

  const onTemplateSelect = (e: FileUploadSelectEvent) => {
    const validation = validateFiles(e.files);
    if (!validation.valid) {
      toast.current?.show({
        severity: "error",
        summary: "Validasi Gagal",
        detail: validation.message,
        life: 5000,
      });
      setTimeout(() => {
        fileUploadRef.current?.clear();
        setTotalSize(0);
      }, 100);
      return;
    }

    const newTotalSize = e.files.reduce((sum, file) => sum + file.size, 0);
    setTotalSize(newTotalSize);
  };

  const onTemplateUpload = (e: FileUploadUploadEvent) => {
    // Tidak digunakan karena kita pakai custom upload
    console.log("Template upload called");
  };

  const onTemplateRemove = (file: File, callback: () => void) => {
    setTotalSize((prev) => prev - (file.size || 0));
    callback();
  };

  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
    const { className, chooseButton } = options;
    const value = (totalSize / MAX_TOTAL_SIZE) * 100;
    const formattedValue = formatBytes(totalSize);

    return (
      <div
        className={className}
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
        }}
      >
        {chooseButton}
        <div className="flex align-items-center gap-3 ml-auto">
          <span>{formattedValue} / 10 MB</span>
          <ProgressBar
            value={value}
            showValue={false}
            style={{ width: "10rem", height: "12px" }}
          />
        </div>
      </div>
    );
  };

  const itemTemplate = (file: any, props: any) => {
    // Determine icon based on file type
    let iconSrc = "";
    if (file.type === "application/zip" || file.name?.toLowerCase().endsWith(".zip")) {
      iconSrc = "https://cdn.jsdelivr.net/gh/primer/octicons/icons/file-zip-24.svg";
    } else if (file.type.startsWith("image/")) {
      iconSrc = file.objectURL;
    } else {
      iconSrc = "https://cdn.jsdelivr.net/gh/primer/octicons/icons/file-24.svg";
    }

    return (
      <div className="flex align-items-center flex-wrap">
        <div className="flex align-items-center" style={{ width: "40%" }}>
          {file.type.startsWith("image/") ? (
            <img
              alt={file.name}
              role="presentation"
              src={iconSrc}
              width={100}
              style={{ objectFit: "cover", borderRadius: 8 }}
            />
          ) : (
            <img
              alt={file.name}
              role="presentation"
              src={iconSrc}
              width={60}
              style={{ background: "#f5f5f5", borderRadius: 8, padding: 8 }}
            />
          )}
          <span className="flex flex-column text-left ml-3">
            {file.name}
            <small>
              {formatBytes(file.size)} - {new Date().toLocaleDateString()}
            </small>
          </span>
        </div>
        <Tag
          value={formatBytes(file.size)}
          severity="warning"
          className="px-3 py-2"
        />
        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-outlined p-button-rounded p-button-danger ml-auto"
          onClick={() => onTemplateRemove(file, props.onRemove)}
        />
      </div>
    );
  };

  const emptyTemplate = () => (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100%", textAlign: "center" }}
    >
      <i
        className="pi pi-image mt-3 p-5"
        style={{
          fontSize: "5em",
          borderRadius: "50%",
          backgroundColor: "var(--surface-b)",
          color: "var(--surface-d)",
        }}
      />
      <span
        style={{ fontSize: "1.2em", color: "var(--text-color-secondary)" }}
        className="my-5"
      >
        Drag and Drop Image Here (Max 10 MB)
      </span>
    </div>
  );

  const chooseOptions = {
    icon: "pi pi-fw pi-images",
    iconOnly: true,
    className: "custom-choose-btn p-button-rounded p-button-outlined",
  };
  const uploadOptions = {
    icon: "pi pi-fw pi-cloud-upload",
    iconOnly: true,
    className:
      "custom-upload-btn p-button-success p-button-rounded p-button-outlined",
  };
  const cancelOptions = {
    icon: "pi pi-fw pi-times",
    iconOnly: true,
    className:
      "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
  };

  const uploadHandler = async ({ files }: { files: File[] }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.current?.show({
        severity: "error",
        summary: "Token Tidak Ditemukan",
        detail: "Silakan login terlebih dahulu.",
      });
      return;
    }

    const validation = validateFiles(files);
    if (!validation.valid) {
      toast.current?.show({
        severity: "error",
        summary: "Validasi Gagal",
        detail: validation.message,
      });
      return;
    }

    setIsUploading(true);
    setProcessingStatus("Mengupload file...");

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("zipFile", file);
      });

      const url = `/api/cv/summarize`;
      const headers = { Authorization: `Bearer ${token}` };

      // Upload file
      const uploadResponse = await fetch(url, {
        method: "POST",
        headers,
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        let errorDetail = `HTTP ${uploadResponse.status}`;
        try {
          const errorData = JSON.parse(errorText);
          errorDetail = errorData.message || errorData.error || errorText;
        } catch {
          errorDetail = errorText;
        }
        throw new Error(errorDetail);
      }

      setProcessingStatus("Memproses file dengan AI...");

      // Process the response
      const responseData = await uploadResponse.json();
      
      if (Array.isArray(responseData.obj)) {
        setResumeData(
          responseData.obj.map((item: any) => ({
            name: Array.isArray(item.name) ? item.name.join(" ") : item.name || "",
            college_name: Array.isArray(item.college_name)
              ? item.college_name.join(" ")
              : item.college_name || "",
            degree: Array.isArray(item.degree) ? item.degree.join(" ") : item.degree || "",
            graduation_year: item.graduation_year || 0,
            years_of_experience: item.years_of_experience || 0,
            companies_worked_at: Array.isArray(item.companies_worked_at)
              ? item.companies_worked_at.join(" ")
              : item.companies_worked_at || "",
            designation: Array.isArray(item.designation)
              ? item.designation.join(" ")
              : item.designation || "",
            skills: Array.isArray(item.skills) ? item.skills.join(" ") : item.skills || "",
            location: Array.isArray(item.location)
              ? item.location.join(" ")
              : item.location || "",
            email_address: item.email_address || "",
          }))
        );
      }

      toast.current?.show({
        severity: "success",
        summary: "Upload Berhasil",
        detail: "File berhasil diupload dan diproses",
      });

      onTemplateClear();
      fileUploadRef.current?.clear();
      navigate("/resume");
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.current?.show({
        severity: "error",
        summary: "Upload Gagal",
        detail: error.message || "Terjadi kesalahan saat mengupload file",
        life: 10000,
      });
    } finally {
      setIsUploading(false);
      setProcessingStatus("");
    }
  };

  useImperativeHandle(ref, () => ({
    startUpload: () => {
      if (totalSize === 0) {
        toast.current?.show({
          severity: "warn",
          summary: "Tidak ada file",
          detail: "Silakan pilih file terlebih dahulu",
          life: 3000,
        });
        return;
      }
      fileUploadRef.current?.upload();
    },
  }));

  return (
    <div>
      <Toast ref={toast} />

      {isUploading && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-content-center align-items-center z-5 bg-black-alpha-40">
          <div className="bg-white p-5 border-round shadow-2 flex flex-column align-items-center">
            <ProgressSpinner 
              style={{ width: '50px', height: '50px' }} 
              strokeWidth="8" 
              animationDuration=".5s" 
            />
            <p className="mt-3">{processingStatus || "Memproses..."}</p>
          </div>
        </div>
      )}

      <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
      <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
      <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

      <FileUpload
        ref={fileUploadRef}
        name="demo[]"
        customUpload
        uploadHandler={uploadHandler}
        multiple
        accept="image/*,.zip"
        maxFileSize={MAX_FILE_SIZE}
        onSelect={onTemplateSelect}
        onError={onTemplateClear}
        onClear={onTemplateClear}
        headerTemplate={headerTemplate}
        itemTemplate={itemTemplate}
        emptyTemplate={emptyTemplate}
        chooseOptions={chooseOptions}
        uploadOptions={uploadOptions}
        cancelOptions={cancelOptions}
        disabled={isUploading}
      />
    </div>
  );
});

export default UploadSpace;