import { AuditForm } from "@/components/audit-form/AuditForm";
import { Timeline } from "@/components/Timeline";
import { cn } from "@/lib/utils";

export default function Tool() {
  return (
    <div className="w-screen min-h-screen grid place-items-center mt-20">
      <AuditForm className="mt-[10%]" />
      <Timeline />
    </div>
  );
}
