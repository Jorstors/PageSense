import { Navbar } from "@/components/Navbar";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
  <div className="dark w-full min-h-screen bg-background text-primary">
    <div className="fixed z-10 top-0 w-full h-fit">
      <Navbar />
    </div>
    <Outlet />
  </div>
  )
}
