import React from "react";

interface FooterProps {
  copyright?: string;
}

const Footer = ({
  copyright = `© ${new Date().getFullYear()} Pagesense. All rights reserved.`,
}: FooterProps) => {
  return (
    <section className="container grid place-items-center mx-auto">
      <div className="container grid place-items-center">
        <div className="text-muted-foreground  flex flex-col justify-center items-center  gap-4 border-t py-8 text-xs font-medium md:flex-row md:items-center md:text-left w-full">
          <p>{copyright}</p>
        </div>
      </div>
    </section>
  );
};

export { Footer };
