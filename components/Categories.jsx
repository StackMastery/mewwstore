import React from "react";
import { ShoppingBag, Film, Wrench, Pencil, Accessibility } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function Categories() {
  const categoriesTools = [
    {
      name: "Shopping",
      icon: ShoppingBag,
      link: "/",
    },
    {
      name: "Entertainment",
      icon: Film,
      link: "/",
    },
    {
      name: "Tools",
      icon: Wrench,
      link: "/",
    },
    {
      name: "Art & Design",
      icon: Pencil,
      link: "/",
    },
    {
      name: "Accessibility",
      icon: Accessibility,
      link: "/",
    },
  ];

  return (
    <section className="w-full flex justify-center p-5">
      <div className="w-full max-w-[1440px]">
        <div>
          <h2 className="text-3xl font-bold mb-6 ">
            <span className="font-semibold text-sky-500">Top </span>
            Categories
          </h2>
        </div>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 mask-fade-x">
          {categoriesTools.map((cat, index) => (
            <CategoryCard key={index} {...cat} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;

function CategoryCard({ name, icon: Icon, bg, iconBg, link }) {
  return (
    <Link
      href={link || "#"}
      className={`
        flex items-center justify-between
        rounded-2xl 

        /* spacing */
        px-4 py-3 sm:px-5 sm:py-3 md:px-6 md:py-4

        /* width */
        min-w-[180px] sm:min-w-[200px] md:min-w-[230px]

        border  
        /* text */
        text-black
      `}
    >
      <span
        className="
          font-semibold
          text-sm sm:text-base md:text-lg
          truncate
        "
      >
        {name}
      </span>

      <div
        className={`
          rounded-full 
          p-2 sm:p-2.5 md:p-3
          shrink-0
          bg-black/5
        `}
      >
        <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-black" />
      </div>
    </Link>
  );
}
