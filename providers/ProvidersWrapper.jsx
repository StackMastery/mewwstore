"use client";

import Preloader from "@/components/Preloader";
import ToastProvider from "./ToastProvider";

function ProvidersWrapper({ children }) {
  return (
    <ToastProvider>
      <Preloader>{children}</Preloader>
    </ToastProvider>
  );
}

export default ProvidersWrapper;
