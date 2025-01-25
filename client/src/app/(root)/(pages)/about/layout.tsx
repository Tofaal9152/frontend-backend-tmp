import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Page",
  description: "About Page",
};

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
