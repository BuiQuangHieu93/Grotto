import Sidebar from "@/components/dashboard/Sidebar";
import Image from "next/legacy/image";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen w-full font-inter">
      {/* <Sidebar user={loggedIn} /> */}
      <Sidebar />

      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="/image/logo.png" width={30} height={30} alt="logo" />
          {/* <div>
            <MobileNav user={loggedIn} />
          </div> */}
        </div>
        {children}
      </div>
    </main>
  );
}
