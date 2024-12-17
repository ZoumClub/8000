"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FormTabs } from "./form/FormTabs";
import { FormNavigation } from "./form/FormNavigation";
import { DEFAULT_FORM_VALUES } from "./form/constants";
import { useFormNavigation } from "./form/useFormNavigation";
import { sellCarSchema, type SellCarFormData } from "@/lib/validations/sellCar";
import { submitCarListing } from "@/lib/supabase/cars";
import { toast } from "sonner";

interface SellCarFormProps {
  open: boolean;
  onClose: () => void;
}

export function SellCarForm({ open, onClose }: SellCarFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<SellCarFormData>({
    resolver: zodResolver(sellCarSchema),
    defaultValues: DEFAULT_FORM_VALUES,
    mode: "onChange",
  });

  const {
    currentTab,
    isLastTab,
    isFirstTab,
    handleNext,
    handlePrevious,
    handleTabChange,
  } = useFormNavigation(form);

  const onSubmit = async (data: SellCarFormData) => {
    try {
      setIsSubmitting(true);
      const result = await submitCarListing(data);
      
      if (result.success) {
        toast.success("Your car listing has been submitted successfully!");
        onClose();
        form.reset(DEFAULT_FORM_VALUES);
      } else {
        throw new Error(result.error?.message || "Failed to submit car listing");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit car listing. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Sell Your Car</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormTabs
              currentTab={currentTab}
              form={form}
              onTabChange={handleTabChange}
            />

            <FormNavigation
              isFirstTab={isFirstTab}
              isLastTab={isLastTab}
              isSubmitting={isSubmitting}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}