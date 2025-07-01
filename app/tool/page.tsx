import { AuditForm } from "@/components/audit-form/AuditForm";
import { Timeline } from "@/components/Timeline";
import { AuditTitle } from "@/components/audit-form/AuditTitle";

export default function Tool() {
  return (
    <div className="w-screen min-h-screen grid place-items-center mt-20">
      <div className="flex flex-col items-center">
        <AuditTitle />
        <AuditForm />
      </div>
      <Timeline />
    </div>
  );
}
