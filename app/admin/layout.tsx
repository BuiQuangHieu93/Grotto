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

      <div className="flex-center flex-col w-full h-full">
        <div className="p-4">
          <div className="relative h-12 w-48">
            <Image
              src="/image/logo.png"
              layout="fill"
              style={{ objectFit: "cover" }}
              alt="logo"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto w-full pt-5">{children}</div>
      </div>
    </main>
  );
}
