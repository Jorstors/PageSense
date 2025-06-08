import { ScrollArea } from "@/components/ui/scroll-area";
import { AuditForm } from "@/components/audit-form/AuditForm";

export default function Main() {
  return (
    <div className="dark w-screen min-h-screen bg-background text-primary ">
      <div className="w-screen h-screen flex">
        <ScrollArea type="always" className="w-full h-full">
          <div className="h-screen w-full flex flex-col items-center justify-center">
            <AuditForm />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
