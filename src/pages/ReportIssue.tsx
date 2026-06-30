import { useState } from "react";
import ImageUploader from "../components/report/ImageUploader";
import VideoUploader from "../components/report/VideoUploader";
import { analyzeIssue } from "../services/gemini";
import { saveReport } from "../services/firestore";
import { analyzeImage } from "../services/geminiVision";
import GoogleMapPicker from "../components/report/GoogleMapPicker";
import { getReports } from "../services/getReports";
import { checkAIDuplicate } from "../services/aiDuplicateCheck";
console.log("Maps Key:", import.meta.env.VITE_GOOGLE_MAPS_API_KEY);
export default function ReportIssue() {
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [aiResponse, setAiResponse] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageAIResponse, setImageAIResponse] = useState("");
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [LocationError, setLocationError] = useState<string>("");

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setLocationError("");
      },
      () => {
        setLocationError("Location permission denied.");
      }
    );
  };

  const handleAI = async () => {
  if (!title.trim() || !description.trim()) {
    alert("Please enter both Issue Title and Description.");
    return;
  }

  let prompt = `
You are an AI Civic Assistant.

Analyze this citizen complaint.

Issue Title:
${title}

Issue Description:
${description}
`;

  if (location) {
    prompt += `
Location:
Latitude: ${location.latitude}
Longitude: ${location.longitude}
`;
  }

  prompt += `

Return the response in exactly this format:

🚨 Issue Category:
...

🔴 Severity:
...

🏢 Responsible Department:
...

⚡ Priority:
...

⏱ Estimated Resolution Time:
...

📝 Summary:
...

🛡 Safety Advice:
...
`;

  const result = await analyzeIssue(prompt);

  setAiResponse(result || "No response");
};
const handleImageAI = async () => {
  if (!image) {
    alert("Please upload an image first.");
    return;
  }

  const result = await analyzeImage(image);

  setImageAIResponse(result || "No response.");
};
const handleSubmit = async () => {
  if (!title.trim() || !description.trim()) {
    alert("Please enter Title and Description.");
    return;
  }
  try {
    // 🔍 AI Duplicate Detection
const existingReports = await getReports();

const duplicateResult = await checkAIDuplicate(
  title,
  description,
  existingReports
);

console.log("Duplicate Check:", duplicateResult);

let isDuplicate = false;

if (typeof duplicateResult === "string") {
  isDuplicate = duplicateResult.toLowerCase().includes('"duplicate": true');
} else if (
  duplicateResult &&
  typeof duplicateResult === "object" &&
  "duplicate" in duplicateResult
) {
  isDuplicate = Boolean((duplicateResult as any).duplicate);
}

if (isDuplicate) {
  const proceed = window.confirm(
    "⚠️ AI detected a similar report already exists.\n\nDo you still want to submit?"
  );

  if (!proceed) {
    return;
  }
}
    const report = {
      title,
      description,
      aiAnalysis: aiResponse,
      latitude: location?.latitude || null,
      longitude: location?.longitude || null,
      image: image?.name || "",
      video: video?.name || "",
      status: "Pending",
      votes: 0,
    };

    const id = await saveReport(report);

    alert(`✅ Report submitted successfully!\nReport ID: ${id}`);

    // Reset form
    setTitle("");
    setDescription("");
    setImage(null);
    setVideo(null);
    setAiResponse("");
    setLocation(null);
    setImageAIResponse("");
  } catch (error) {
    console.error(error);
    alert("❌ Failed to submit report.");
  }
};
  return (
    <div className="min-h-screen bg-slate-950 text-white py-10">
      <div className="max-w-3xl mx-auto bg-slate-900 rounded-2xl p-8">

        <h1 className="text-4xl font-bold mb-8">
          🚨 Report Community Issue
        </h1>

        <div className="space-y-6">

          {/* Issue Title */}
          <div>
            <label className="block mb-2">Issue Title</label>

            <input
              type="text"
              placeholder="Broken Road"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded bg-slate-800"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2">Description</label>

            <textarea
              rows={5}
               value={description}
               onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue..."
              className="w-full p-3 rounded bg-slate-800"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block mb-2">
              Upload Image
            </label>

            <ImageUploader
              image={image}
              setImage={setImage}
            />
          </div>
          <button
  onClick={handleImageAI}
  className="mt-4 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl"
>
  🖼 Analyze Uploaded Image
</button>
          {/* Video */}
          <div>
            <label className="block mb-2">
              Upload Video (Optional)
            </label>

            <VideoUploader
              video={video}
              setVideo={setVideo}
            />
          </div>

          {/* Location */}
          <button
            onClick={detectLocation}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl"
          >
            📍 Use My Current Location
          </button>

          {location && (
  <>
    <div className="bg-slate-800 rounded-lg p-4">
      <p>📍 Latitude: {location.latitude.toFixed(6)}</p>
      <p>📍 Longitude: {location.longitude.toFixed(6)}</p>
    </div>

    <GoogleMapPicker
      location={location}
      setLocation={setLocation}
    />
  </>
)}
{LocationError && (
  <p className="text-red-400 mt-2">
    {LocationError}
  </p>
)}
          {/* AI Button */}
          <button
            onClick={handleAI}
            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl"
          >
            🤖 Analyze with AI
          </button>

          {/* AI Response */}
         {imageAIResponse && (
  <div className="bg-slate-800 rounded-xl p-5 mt-5 border border-purple-500">
    <h2 className="text-xl font-bold mb-3 text-purple-300">
      🖼 AI Vision Analysis
    </h2>

    <p className="whitespace-pre-wrap">
      {imageAIResponse}
    </p>
  </div>
)}
{aiResponse && (
  <div className="bg-slate-800 rounded-xl p-5 mt-5 border border-green-500">
    <h2 className="text-xl font-bold mb-3 text-green-300">
      🤖 AI Issue Analysis
    </h2>

    <p className="whitespace-pre-wrap">
      {aiResponse}
    </p>
  </div>
)}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl"
>
            🚀 Submit Report
          </button>

        </div>
      </div>
    </div>
  );
}