import Construction from "@/components/Construction";

export default function Main() {
  return (
    <div className="dark w-screen min-h-screen bg-background text-primary ">
      <div className="w-screen h-screen flex">
        <div className="h-screen w-full flex flex-col items-center justify-center">
          <Construction />
        </div>
      </div>
    </div>
  );
}
