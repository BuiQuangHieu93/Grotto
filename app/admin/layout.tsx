import Sidebar from "@/components/dashboard/Sidebar";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar />

      <div className="flex flex-col w-full h-full">
        <div className="flex-none">
          <Image src="/image/logo.png" width={30} height={30} alt="logo" />
        </div>
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </main>
  );
}
