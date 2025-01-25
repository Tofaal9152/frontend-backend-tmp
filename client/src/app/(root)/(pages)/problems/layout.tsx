import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Problems Page",
  description: "Problems Page",
};

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
