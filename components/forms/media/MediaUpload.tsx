"use client";

import { ImageUpload } from "./ImageUpload";
import { VideoUpload } from "./VideoUpload";
import { UseFormReturn } from "react-hook-form";
import type { DealerCarFormData } from "@/lib/validations/dealerCar";

interface MediaUploadProps {
  form: UseFormReturn<DealerCarFormData>;
}

export function MediaUpload({ form }: MediaUploadProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Upload Media</h2>
      <ImageUpload form={form} maxFiles={3} />
      <VideoUpload form={form} />
    </div>
  );
}