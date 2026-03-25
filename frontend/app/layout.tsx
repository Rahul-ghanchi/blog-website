import "./globals.css";
import Navbar from "./components/Navbar";

export default function RootLayout({ children }: any) {
  return (
    <html>
      <body>
        <Navbar />
        <div style={{ padding: "20px" }}>
          {children}
        </div>
      </body>
    </html>
  );
}