"use client";

import { Controller, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { VideoPlus, X } from "lucide-react";
import { useMediaUpload } from "@/lib/modules/media/hooks";
import type { DealerCarFormData } from "@/lib/validations/dealerCar";
import { MAX_VIDEO_SIZE, ACCEPTED_VIDEO_TYPES } from "@/lib/types/forms";

interface VideoUploadProps {
  form: UseFormReturn<DealerCarFormData>;
}

export default function VideoUpload({ form }: VideoUploadProps) {
  const { files, handleUpload, removeFile } = useMediaUpload(form, "video", {
    maxFiles: 1,
    maxSizeInMB: MAX_VIDEO_SIZE / (1024 * 1024),
    acceptedTypes: ACCEPTED_VIDEO_TYPES,
  });

  const videoFile = files[0];

  return (
    <Controller
      name="video"
      control={form.control}
      render={({ field }) => (
        <div>
          {videoFile ? (
            <div className="relative aspect-video bg-gray-50">
              <video
                src={videoFile.preview}
                controls
                className="w-full h-full rounded-lg"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => {
                  removeFile(0);
                  field.onChange(undefined); // Clear video from form state
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <label className="aspect-video h-full border-2 border-dashed rounded-lg p-4 hover:bg-gray-50 cursor-pointer flex flex-col items-center justify-center">
              <VideoPlus className="h-8 w-8 mb-2" />
              <span className="text-sm">Add Video</span>
              <input
                type="file"
                accept={ACCEPTED_VIDEO_TYPES.join(",")}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleUpload(e);
                    field.onChange(file); // Update form state
                  }
                }}
              />
            </label>
          )}
        </div>
      )}
    />
  );
}