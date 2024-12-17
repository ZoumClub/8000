import type { MediaValidationResult } from "./types";

export function validateMediaFile(
  file: File,
  maxSizeInMB: number,
  acceptedTypes: string[]
): MediaValidationResult {
  // Check file size
  const maxSize = maxSizeInMB * 1024 * 1024;
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: `File must be less than ${maxSizeInMB}MB`
    };
  }

  // Check file type
  if (!acceptedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `Only ${acceptedTypes.join(", ")} formats are supported`
    };
  }

  return { isValid: true };
}