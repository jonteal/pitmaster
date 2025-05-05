import { Navbar } from "../Navbar";
import { Toaster } from "../ui/sonner";

export const AppLayout = ({ children }: any) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="p-28" style={{ flex: 1 }}>
      {children}
    </main>
    <Toaster />
  </div>
);
