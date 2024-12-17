"use client";

import { BrandLogo } from "@/components/brands/BrandLogo";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";
import { useBrands } from "@/lib/hooks/useBrands";

interface BrandsSectionProps {
  selectedBrand: string | null;
  onBrandSelect: (brandName: string | null) => void;
}

export function BrandsSection({ selectedBrand, onBrandSelect }: BrandsSectionProps) {
  const { data: brands, isLoading, error } = useBrands();

  if (error) {
    return <ErrorMessage message="Failed to load brands" />;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-24">
        <LoadingSpinner />
      </div>
    );
  }

  // Filter only active brands
  const activeBrands = brands?.filter(brand => brand.is_active) || [];

  return (
    <div className="mb-12">
      <div className="flex flex-wrap justify-center gap-12 px-4">
        {activeBrands.map((brand) => (
          <BrandLogo
            key={brand.id}
            brand={brand}
            isSelected={brand.name === selectedBrand}
            onClick={() => {
              if (brand.name === selectedBrand) {
                onBrandSelect(null);
              } else {
                onBrandSelect(brand.name);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}