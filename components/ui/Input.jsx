"use client";

import clsx from "clsx";
import { Check, Info, TriangleAlert } from "lucide-react";
import React, { useState, forwardRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Input = forwardRef(function Input(
  { type = "text", required, placeholder, inputId, className, alert, ...props },
  ref
) {
  const inputIdP = inputId 
  const [input, setInput] = useState("");

  return (
    <div className="flex flex-col gap-3">
      <label
        htmlFor={inputIdP}
        className={`group border border-black relative pl-3 h-14 w-full rounded-sm 
        focus-within:ring-1 ring-offset-1 focus-within:ring-black/50 justify-center flex flex-col`}
      >
        <div
          className={`w-full text-black/50 flex gap-1 transition-all absolute text-lg ${
            input?.length > 0
              ? "top-1 text-sm"
              : "group-focus-within:top-1 group-focus-within:text-sm"
          }`}
        >
          {placeholder}
          {required && <span className="text-orange-600">*</span>}
        </div>

        <input
          id={inputIdP}
          ref={ref}
          onChange={(e) => setInput(e.target.value)}
          className={clsx(
            className,
            "w-full outline-none",
            input?.length > 0 ? "pt-5" : "focus:pt-5"
          )}
          type={type}
          {...props}
        />
      </label>

      <AnimatePresence>
        {alert && (
          <motion.span
            initial={{ height: 0, opacity: 0 }}
            exit={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className={`text-md flex overflow-hidden items-center gap-2 ${
              alert?.type === "succes"
                ? "text-green-500"
                : alert?.type === "error"
                ? "text-red-500"
                : "text-yellow-400"
            }`}
          >
            {alert?.type === "succes" ? (
              <Check size={20} />
            ) : alert?.type === "error" ? (
              <Info strokeWidth={1.5} size={20} />
            ) : (
              <TriangleAlert size={20} />
            )}
            {alert?.text}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
});

export default Input;
