import { useRef } from "react";

type Props = {
  video: File | null;
  setVideo: (file: File | null) => void;
};

export default function VideoUploader({
  video,
  setVideo,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-4">

      <div
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-slate-600 rounded-2xl p-10 cursor-pointer hover:border-green-500 transition text-center bg-slate-800"
      >
        <div className="text-5xl mb-3">🎥</div>

        <p className="text-white font-semibold">
          Click to upload a video
        </p>

        <p className="text-gray-400 mt-2 text-sm">
          MP4 • MOV • AVI
        </p>

        <input
          ref={inputRef}
          hidden
          type="file"
          accept="video/*"
          onChange={(e) =>
            setVideo(e.target.files?.[0] || null)
          }
        />
      </div>

      {video && (
        <div className="bg-slate-800 rounded-xl p-4">

          <video
            controls
            className="rounded-xl w-full"
            src={URL.createObjectURL(video)}
          />

          <button
            onClick={() => setVideo(null)}
            className="mt-4 w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl"
          >
            Remove Video
          </button>

        </div>
      )}

    </div>
  );
}