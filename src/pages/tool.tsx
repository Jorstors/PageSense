import { AuditForm } from "@/components/audit-form/AuditForm";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";

export default function Tool() {
  return <div className="w-screen min-h-screen grid place-items-center">
    <AnimatedGridPattern maxOpacity={0.3} className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "md:[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
          "lg:[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
          "opacity-25"
        )}/>
    <AuditForm /></div>
}
