import { SessionProvider } from "next-auth/react";
import { Menubar } from "../ui/menu";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <SessionProvider>
        <Menubar/>
        <main className="flex-grow p-4">
            {children}
        </main>
        </SessionProvider>
    </div>
  );
}