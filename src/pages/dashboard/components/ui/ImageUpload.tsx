import { useState } from "react";

interface ImageUploadProps {
  label: string;
  onChange: (files: File[]) => void;
}

export const ImageUpload = ({ label, onChange }: ImageUploadProps) => {
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    onChange(files);

    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-6 transition-colors hover:border-blue-400 hover:bg-blue-50">
        <span className="text-2xl">📁</span>
        <span className="mt-2 text-sm text-gray-500">Click để chọn ảnh</span>
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {previews.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-2">
          {previews.map((url, index) => (
            <img
              key={index}
              src={url}
              className="h-24 w-full rounded-xl object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
};
