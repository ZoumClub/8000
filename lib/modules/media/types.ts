export interface MediaFile {
  file: File;
  preview: string;
}

export interface MediaUploadConfig {
  maxFiles?: number;
  maxSizeInMB?: number;
  acceptedTypes?: string[];
}

export interface MediaValidationResult {
  isValid: boolean;
  error?: string;
}