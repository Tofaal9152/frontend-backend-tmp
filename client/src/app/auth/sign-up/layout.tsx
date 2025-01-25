import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup",
  description: "Signup",
};

export default function SignUpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
