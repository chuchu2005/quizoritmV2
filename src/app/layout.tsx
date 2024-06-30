import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Laoding from "@/components/ui/laoding";
import { Providers } from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import GoogleAnalytics from '@/components/GoogleAnalytics';
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className={`${inter.className} bg-gray-50 text-gray-950 relative mt-5 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}>
          <div className="bg-[#fbe2e3] absolute -z-10 top-[-6rem] right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263]"></div>
          <div className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]"></div>
            <GoogleAnalytics />
          <Providers>
              <ClerkLoading>
                <Navbar />
                <Laoding />
              </ClerkLoading>
              <ClerkLoaded>
                <Navbar />
                {children}
              </ClerkLoaded>
            </Providers>
            <Toaster />
        </body>
      </html>
  );
}
