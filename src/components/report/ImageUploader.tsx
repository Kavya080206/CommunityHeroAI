import { useRef } from "react";

type ImageUploaderProps = {
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
};

export default function ImageUploader({
  image,
  setImage,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-4">

      <div
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-blue-500 rounded-2xl p-10 bg-slate-800 hover:bg-slate-700 cursor-pointer transition text-center"
      >

        <div className="text-5xl mb-4">
          📷
        </div>

        <h3 className="text-white text-xl font-semibold">
          Click to Upload Image
        </h3>

        <p className="text-gray-400 mt-2">
          JPG • PNG • JPEG
        </p>

        <input
          ref={inputRef}
          hidden
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImage(e.target.files?.[0] ?? null)
          }
        />

      </div>

      {image && (
        <div className="space-y-4">

          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="rounded-xl w-full max-h-96 object-cover"
          />

          <button
            type="button"
            onClick={() => setImage(null)}
            className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl"
          >
            Remove Image
          </button>

        </div>
      )}

    </div>
  );
}