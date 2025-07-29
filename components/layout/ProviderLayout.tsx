import React from "react";
import { HeaderWithMegaMenu } from "../HeaderWithMegaMenu";
import { FooterSection } from "../FooterSection";

interface ProviderLayoutProps {
  children: React.ReactNode;
}

const ProviderLayout: React.FC<ProviderLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Main header */}
      <div className="fixed top-0 left-0 right-0 z-50 w-full shadow-sm">
        <HeaderWithMegaMenu logoImageOnly compact />
      </div>
      
      {/* Content area */}
      <main className="flex-grow w-full relative pt-[38px]">{children}</main>
      
      <FooterSection />
    </div>
  );
};

export default ProviderLayout;
