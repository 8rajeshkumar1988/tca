import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


export const metadata = {
  title: "The Conviviality Awards 3rd Edition 2025 by Pernod Ricard",
  description: "Join us at The Conviviality Awards 3rd Edition 2025 by Pernod Ricard for an evening of prestigious awards, celebrating top talent and achievements in the industry.",
  openGraph: {
    title: "The Conviviality Awards 3rd Edition 2025 by Pernod Ricard",
    description: "Join us at The Conviviality Awards 3rd Edition 2025 by Pernod Ricard for an evening of prestigious awards, celebrating top talent and achievements in the industry.",
    images: [
      {
        url: 'https://tca3rdedition.com/meta-img.png', 
        width: 1200,
        height: 630,
        alt: 'The Conviviality Awards 3rd Edition 2025'
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "The Conviviality Awards 3rd Edition 2025 by Pernod Ricard",
    description: "Join us at The Conviviality Awards 3rd Edition 2025 by Pernod Ricard for an evening of prestigious awards, celebrating top talent and achievements in the industry.",
    image: 'https://tca3rdedition.com/meta-img.png' 
  }
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>        
        {children}
      </body>
    </html>
  );
}
