"use client";

import ToastProvider from "./ToastProvider";

function ProvidersWrapper({ children }) {
  return <ToastProvider>{children}</ToastProvider>;
}

export default ProvidersWrapper;
