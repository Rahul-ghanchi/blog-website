import "./globals.css";
import Navbar from "./components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-black via-[#020617] to-[#0f172a] text-white">
        
        {/* ✅ Correct Navbar */}
        <Navbar />

        {/* ✅ Center Content */}
        <main className="min-h-[calc(100vh-70px)] flex items-center justify-center">
          {children}
        </main>

      </body>
    </html>
  );
}