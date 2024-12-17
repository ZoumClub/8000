"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import type { Brand } from "@/types/brand";
import { getBrandsList } from "@/lib/api/brands";

export function useBrands() {
  const [data, setData] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchBrands() {
      try {
        setIsLoading(true);
        setError(null);
        
        const { data: brands, error } = await supabase
          .from("brands")
          .select("*")
          .order("order_index");

        if (error) throw error;
        
        setData(brands || []);
      } catch (err) {
        console.error("Error fetching brands:", err);
        setError(err instanceof Error ? err : new Error("Failed to fetch brands"));
      } finally {
        setIsLoading(false);
      }
    }

    fetchBrands();
  }, []);

  return { data, isLoading, error };
}