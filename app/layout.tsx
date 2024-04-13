import type { Metadata } from "next";
import './globals.css'

export const metadata: Metadata = {
  title: "滑呗导出GPX数据",
  description: "滑呗数据导出 gpx strava slopes 滑雪数据导出",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
