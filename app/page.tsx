import { Feature } from "@/components/Feature";
import { Hero } from "@/components/hero";

export default function Main() {
  return (
    <div className="w-screen min-h-screen grid place-items-center">
      <Hero />
      <Feature />
    </div>
  );
}
