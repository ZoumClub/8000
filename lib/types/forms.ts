import { z } from "zod";

// Media validation constants
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
export const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];

// Base media schema that can be reused
export const mediaSchema = {
  images: z.array(z.instanceof(File))
    .min(1, "At least one image is required")
    .max(3, "Maximum 3 images allowed")
    .refine(
      (files) => files.every((file) => file.size <= MAX_IMAGE_SIZE),
      "Each image must be less than 5MB"
    )
    .refine(
      (files) => files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "Only .jpg, .jpeg, .png and .webp formats are supported for images"
    ),
  video: z.instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= MAX_VIDEO_SIZE,
      "Video must be less than 100MB"
    )
    .refine(
      (file) => !file || ACCEPTED_VIDEO_TYPES.includes(file.type),
      "Only .mp4, .webm and .mov formats are supported for video"
    ),
};