import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";

const listPropertySchema = z.object({
  ownerName: z.string().min(2, "Owner name is required"),
  ownerEmail: z.string().email("Please enter a valid email"),
  ownerPhone: z.string().regex(/^[6-9][0-9]{9}$/, "Please enter a valid Indian phone number"),
  propertyTitle: z.string().min(5, "Property title is required"),
  propertyDescription: z.string().min(20, "Please provide a detailed description"),
  location: z.string().min(5, "Location is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  price: z.string().min(1, "Price is required"),
  propertyType: z.string().min(1, "Property type is required"),
  bhkConfig: z.string().min(1, "BHK configuration is required"),
  carpetArea: z.string().min(1, "Carpet area is required"),
  builtUpArea: z.string().min(1, "Built-up area is required"),
  additionalFeatures: z.string().optional(),
});

type ListPropertyFormData = z.infer<typeof listPropertySchema>;

interface ListPropertyFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ListPropertyForm({ isOpen, onClose }: ListPropertyFormProps) {
  const { toast } = useToast();
  
  const form = useForm<ListPropertyFormData>({
    resolver: zodResolver(listPropertySchema),
    defaultValues: {
      ownerName: "",
      ownerEmail: "",
      ownerPhone: "",
      propertyTitle: "",
      propertyDescription: "",
      location: "",
      city: "",
      state: "",
      price: "",
      propertyType: "",
      bhkConfig: "",
      carpetArea: "",
      builtUpArea: "",
      additionalFeatures: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: ListPropertyFormData) => {
      // In a real app, this would send to a property listing endpoint
      return new Promise((resolve) => {
        setTimeout(() => resolve(data), 1000);
      });
    },
    onSuccess: () => {
      toast({
        title: "Property Listed Successfully!",
        description: "We will review your property and contact you within 24 hours.",
      });
      form.reset();
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit property listing. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ListPropertyFormData) => {
    submitMutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-2xl font-bold text-gray-900">List Your Property</DialogTitle>
          <Button variant="ghost" onClick={onClose} className="p-2">
            <X size={20} />
          </Button>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Owner Information */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Owner Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="ownerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ownerEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ownerPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="9876543210" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h3>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="propertyTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Luxury 3BHK Apartment in Bandra" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="propertyDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={4}
                          placeholder="Describe your property in detail..." 
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location/Area</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Bandra West" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Mumbai" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Maharashtra" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (₹)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 32000000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="propertyType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="villa">Villa</SelectItem>
                            <SelectItem value="plot">Plot</SelectItem>
                            <SelectItem value="commercial">Commercial</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="bhkConfig"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>BHK Configuration</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select BHK" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1BHK">1 BHK</SelectItem>
                            <SelectItem value="2BHK">2 BHK</SelectItem>
                            <SelectItem value="3BHK">3 BHK</SelectItem>
                            <SelectItem value="4BHK">4+ BHK</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="carpetArea"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Carpet Area (sq ft)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 1200" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="builtUpArea"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Built-up Area (sq ft)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 1450" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="additionalFeatures"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Features (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={3}
                          placeholder="e.g., Swimming pool, Gym, Parking, Garden, etc." 
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              disabled={submitMutation.isPending}
              className="w-full bg-saffron text-white py-4 rounded-lg hover:bg-saffron-dark transition-colors font-medium text-lg"
            >
              {submitMutation.isPending ? "Submitting..." : "Submit Property for Review"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}