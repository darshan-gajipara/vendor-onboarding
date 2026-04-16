import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { buildFileKey, fileToPreviewUrl, getFile, saveFile } from "@/lib/db";
import { formatFileSize, isImageFile, cn } from "@/lib/utils";
import type { FileMetadata } from "@/features/vendor/vendorSlice";

interface FormFileUploadProps {
  name: string;
  label: string;
  accept?: string;
  required?: boolean;
  hint?: string;
  onFileSaved: (metadata: FileMetadata | null) => void;
  existingMeta?: FileMetadata | null;
}

const FormFileUpload: React.FC<FormFileUploadProps> = ({
  name,
  label,
  accept,
  required,
  hint,
  onFileSaved,
  existingMeta,
}) => {
  const {
    formState: { errors },
  } = useFormContext();

  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [currentMeta, setCurrentMeta] = useState<FileMetadata | null>(
    existingMeta ?? null
  );
  const [uploading, setUploading] = useState(false);
  const error = errors[name]?.message as string | undefined;

  useEffect(() => {
    if (!existingMeta) return;
    setCurrentMeta(existingMeta);

    (async () => {
      const file = await getFile(existingMeta.dbKey);
      if (file && isImageFile(file.type)) {
        setPreviewUrl(fileToPreviewUrl(file));
      }
    })();

    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      if (previewUrl) URL.revokeObjectURL(previewUrl);

      const key = buildFileKey(name, file);
      await saveFile(key, file);

      const meta: FileMetadata = {
        name: file.name,
        size: file.size,
        type: file.type,
        dbKey: key,
      };

      setCurrentMeta(meta);
      onFileSaved(meta);

      if (isImageFile(file.type)) {
        setPreviewUrl(fileToPreviewUrl(file));
      } else {
        setPreviewUrl(null);
      }
    } catch (err) {
      console.error("File upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setCurrentMeta(null);
    onFileSaved(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {!currentMeta ? (
        <div
          onClick={() => inputRef.current?.click()}
          className={cn(
            "flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed",
            "border-gray-300 bg-gray-50 p-6 cursor-pointer",
            "hover:border-indigo-400 hover:bg-indigo-50 transition-colors duration-150",
            error && "border-red-400 bg-red-50"
          )}
        >
          <svg
            className="h-8 w-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          <p className="text-sm text-gray-500">
            {uploading ? "Uploading…" : "Click to upload or drag and drop"}
          </p>
          {hint && <p className="text-xs text-gray-400">{hint}</p>}
        </div>
      ) : (
        <div className="flex items-start gap-3 rounded-md border border-gray-200 bg-white p-3">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="preview"
              className="h-14 w-14 rounded object-cover shrink-0"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded bg-gray-100 shrink-0">
              <svg
                className="h-6 w-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          )}

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">
              {currentMeta.name}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {formatFileSize(currentMeta.size)}
            </p>
            <p className="text-xs text-green-600 mt-0.5">✓ Saved to IndexedDB</p>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            className="text-gray-400 hover:text-red-500 transition-colors"
            title="Remove file"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />

      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
};

export default FormFileUpload;