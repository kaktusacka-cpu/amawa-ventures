"use client";

import { useState } from "react";

type MeaningItem = {
  title: string;
  description: string;
};

type MeaningTabsProps = {
  items: MeaningItem[];
};

export function MeaningTabs({ items }: MeaningTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex];

  if (!activeItem) return null;

  return (
    <div className="rounded-xl border border-[#d8d8ea] bg-[#FAF8F5] p-5">
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={item.title}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                isActive
                  ? "border-[#c9d7ea] bg-[#F3F1ED] text-slate-900"
                  : "border-[#d8d8ea] bg-[#FAF8F5] text-slate-700 hover:bg-[#F3F1ED]"
              }`}
            >
              {item.title}
            </button>
          );
        })}
      </div>

      <div className="mt-4 rounded-lg border border-[#d8d8ea] bg-[#F3F1ED] p-4">
        <h3 className="font-display text-2xl text-slate-900">{activeItem.title}</h3>
        <p className="mt-2 text-base leading-7 text-slate-700">{activeItem.description}</p>
      </div>
    </div>
  );
}
