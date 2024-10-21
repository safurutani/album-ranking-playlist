import localFont from "next/font/local";
import "./globals.css";

export const metadata = {
  title: "Album Ranking Playlist Generator",
  description: "Create an album ranking and turn it into a playlist on Spotify",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
