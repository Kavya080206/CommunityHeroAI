import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-red-600 text-white">
      <Navbar />

      <div className="flex flex-col items-center justify-center py-32">
        <h1 className="text-7xl font-bold">
          THIS IS THE NEW LANDING PAGE 🚀
        </h1>

        <p className="mt-6 text-2xl">
          If you can see this, React is loading the latest code.
        </p>
      </div>

      <Footer />
    </div>
  );
}