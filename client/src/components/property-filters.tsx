import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface PropertyFiltersProps {
  onFiltersChange?: (filters: {
    minPrice?: number;
    maxPrice?: number;
    city?: string;
    propertyType?: string;
    bhkConfig?: string;
  }) => void;
}

export default function PropertyFilters({ onFiltersChange }: PropertyFiltersProps) {
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    city: "",
    propertyType: "",
    bhkConfig: ""
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Convert to the format expected by the API
    const apiFilters = {
      minPrice: newFilters.minPrice && newFilters.minPrice !== "any" ? parseFloat(newFilters.minPrice) : undefined,
      maxPrice: newFilters.maxPrice && newFilters.maxPrice !== "any" ? parseFloat(newFilters.maxPrice) : undefined,
      city: newFilters.city && newFilters.city !== "all" ? newFilters.city : undefined,
      propertyType: newFilters.propertyType && newFilters.propertyType !== "all" ? newFilters.propertyType : undefined,
      bhkConfig: newFilters.bhkConfig && newFilters.bhkConfig !== "any" ? newFilters.bhkConfig : undefined,
    };
    
    if (onFiltersChange) {
      onFiltersChange(apiFilters);
    }
  };

  const handleSearch = () => {
    // Trigger the same filter change to ensure search is executed
    const apiFilters = {
      minPrice: filters.minPrice && filters.minPrice !== "any" ? parseFloat(filters.minPrice) : undefined,
      maxPrice: filters.maxPrice && filters.maxPrice !== "any" ? parseFloat(filters.maxPrice) : undefined,
      city: filters.city && filters.city !== "all" ? filters.city : undefined,
      propertyType: filters.propertyType && filters.propertyType !== "all" ? filters.propertyType : undefined,
      bhkConfig: filters.bhkConfig && filters.bhkConfig !== "any" ? filters.bhkConfig : undefined,
    };
    
    if (onFiltersChange) {
      onFiltersChange(apiFilters);
    }
  };

  return (
    <section className="bg-white shadow-lg sticky top-20 z-40 py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Min Price (₹)</label>
            <Select onValueChange={(value) => handleFilterChange('minPrice', value)}>
              <SelectTrigger className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="5000000">₹50 Lakh</SelectItem>
                <SelectItem value="10000000">₹1 Crore</SelectItem>
                <SelectItem value="20000000">₹2 Crore</SelectItem>
                <SelectItem value="50000000">₹5 Crore</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Max Price (₹)</label>
            <Select onValueChange={(value) => handleFilterChange('maxPrice', value)}>
              <SelectTrigger className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="10000000">₹1 Crore</SelectItem>
                <SelectItem value="20000000">₹2 Crore</SelectItem>
                <SelectItem value="50000000">₹5 Crore</SelectItem>
                <SelectItem value="100000000">₹10 Crore+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">City</label>
            <Select onValueChange={(value) => handleFilterChange('city', value)}>
              <SelectTrigger className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent">
                <SelectValue placeholder="All Cities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                <SelectItem value="Mumbai">Mumbai</SelectItem>
                <SelectItem value="Delhi">Delhi</SelectItem>
                <SelectItem value="Bangalore">Bangalore</SelectItem>
                <SelectItem value="Pune">Pune</SelectItem>
                <SelectItem value="Chennai">Chennai</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Property Type</label>
            <Select onValueChange={(value) => handleFilterChange('propertyType', value)}>
              <SelectTrigger className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Apartment">Apartment</SelectItem>
                <SelectItem value="Villa">Villa</SelectItem>
                <SelectItem value="Plot">Plot</SelectItem>
                <SelectItem value="Commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">BHK</label>
            <Select onValueChange={(value) => handleFilterChange('bhkConfig', value)}>
              <SelectTrigger className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent">
                <SelectValue placeholder="Any BHK" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any BHK</SelectItem>
                <SelectItem value="1BHK">1 BHK</SelectItem>
                <SelectItem value="2BHK">2 BHK</SelectItem>
                <SelectItem value="3BHK">3 BHK</SelectItem>
                <SelectItem value="4BHK">4+ BHK</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="mt-4 flex justify-center">
          <Button 
            onClick={handleSearch}
            className="bg-deep-blue text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Search className="mr-2" size={20} />
            Search Properties
          </Button>
        </div>
      </div>
    </section>
  );
}
