"use client";

import { cn } from "@/lib/utils";
import type { Brand } from "@/types/brand";

interface BrandLogoProps {
  brand: Brand;
  isSelected: boolean;
  onClick: () => void;
}

export function BrandLogo({ brand, isSelected, onClick }: BrandLogoProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative w-24 h-24 p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-all",
        "flex items-center justify-center",
        "border-2",
        isSelected ? "border-primary shadow-md" : "border-transparent"
      )}
      title={brand.name}
    >
      <img
        src={brand.logo_url}
        alt={brand.name}
        className="w-full h-full object-contain"
        loading="lazy"
      />
      <span className="absolute -bottom-6 text-sm font-medium text-muted-foreground">
        {brand.name}
      </span>
    </button>
  );
}