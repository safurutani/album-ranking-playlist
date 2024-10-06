import localFont from "next/font/local";
import "./globals.css";

export const metadata = {
  title: "Ranked Album Playlist",
  description: "Create an album ranking and turn it into a playlist on Spotify",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/*<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" crossorigin="anonymous"></link>*/}
      </head>
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
