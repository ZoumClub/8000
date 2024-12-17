"use client";

import { Controller, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ImagePlus, X } from "lucide-react";
import { useMediaUpload } from "@/lib/modules/media/hooks";
import type { DealerCarFormData } from "@/lib/validations/dealerCar";
import { MAX_IMAGE_SIZE, ACCEPTED_IMAGE_TYPES } from "@/lib/types/forms";

interface ImageUploadProps {
  form: UseFormReturn<DealerCarFormData>;
  maxFiles?: number;
}

export default function ImageUpload({ form, maxFiles = 3 }: ImageUploadProps) {
  const { files, handleUpload, removeFile, isMaxFilesReached } = useMediaUpload(
    form,
    "images",
    {
      maxFiles,
      maxSizeInMB: MAX_IMAGE_SIZE / (1024 * 1024),
      acceptedTypes: ACCEPTED_IMAGE_TYPES,
    }
  );

  return (
    <Controller
      name="images"
      control={form.control}
      render={({ field }) => (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {files.map((file, index) => (
              <div key={index} className="relative aspect-video bg-gray-50">
                <img
                  src={file.preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    removeFile(index);
                    const updatedFiles = files.filter((_, i) => i !== index);
                    field.onChange(updatedFiles.map((f) => f.file)); // Update form state
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}

            {!isMaxFilesReached && (
              <label className="aspect-video h-full border-2 border-dashed rounded-lg p-4 hover:bg-gray-50 cursor-pointer flex flex-col items-center justify-center">
                <ImagePlus className="h-8 w-8 mb-2" />
                <span className="text-sm">Add Image</span>
                <input
                  type="file"
                  accept={ACCEPTED_IMAGE_TYPES.join(",")}
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    handleUpload(e);
                    const newFiles = Array.from(e.target.files || []);
                    field.onChange([...files.map((f) => f.file), ...newFiles]); // Update form state
                  }}
                />
              </label>
            )}
          </div>
        </div>
      )}
    />
  );
}