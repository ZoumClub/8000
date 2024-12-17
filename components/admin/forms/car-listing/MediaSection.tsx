```typescript
"use client";

import { ImageUpload } from "@/components/forms/media/ImageUpload";
import { VideoUpload } from "@/components/forms/media/VideoUpload";
import { UseFormReturn } from "react-hook-form";
import type { DealerCarFormData } from "@/lib/validations/dealerCar";

interface MediaSectionProps {
  form: UseFormReturn<DealerCarFormData>;
}

export function MediaSection({ form }: MediaSectionProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Media</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Upload images and video of the car. Images should be clear and show the car from different angles.
      </p>

      <ImageUpload
        form={form}
        name="images"
        maxFiles={3}
        maxSizeInMB={5}
        accept="image/jpeg,image/jpg,image/png,image/webp"
      />

      <VideoUpload
        form={form}
        name="video"
        maxSizeInMB={100}
        accept="video/mp4,video/webm,video/quicktime"
      />
    </div>
  );
}
```