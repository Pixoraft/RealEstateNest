import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Filter, ArrowLeft } from "lucide-react";
import PropertyCard from "@/components/property-card";
import { type Property } from "@shared/schema";
import { Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsAppFloat from "@/components/whatsapp-float";

export default function AllProperties() {
  const [searchFilters, setSearchFilters] = useState({
    minPrice: "",
    maxPrice: "",
    city: "",
    propertyType: "",
    bhkConfig: "",
    searchTerm: ""
  });

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    document.title = "All Properties - RealSpace | Premium Real Estate in India";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Browse all premium real estate properties in India. Find apartments, villas, and commercial spaces in Mumbai, Delhi, Bangalore with verified listings.');
    }
  }, []);

  // Build query params from search filters
  const queryParams = new URLSearchParams();
  if (searchFilters.minPrice && searchFilters.minPrice !== "any") queryParams.append('minPrice', searchFilters.minPrice);
  if (searchFilters.maxPrice && searchFilters.maxPrice !== "any") queryParams.append('maxPrice', searchFilters.maxPrice);
  if (searchFilters.city && searchFilters.city !== "all") queryParams.append('city', searchFilters.city);
  if (searchFilters.propertyType && searchFilters.propertyType !== "all") queryParams.append('propertyType', searchFilters.propertyType);
  if (searchFilters.bhkConfig && searchFilters.bhkConfig !== "any") queryParams.append('bhkConfig', searchFilters.bhkConfig);
  
  const hasFilters = Object.values(searchFilters).some(value => value && value !== "any" && value !== "all");
  
  const { data: properties, isLoading, error } = useQuery<Property[]>({
    queryKey: hasFilters ? ['/api/properties/search', queryParams.toString()] : ['/api/properties'],
    queryFn: () => {
      const url = hasFilters ? `/api/properties/search?${queryParams.toString()}` : '/api/properties';
      return fetch(url).then(res => res.json());
    }
  });

  const handleFilterChange = (key: string, value: string) => {
    setSearchFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    // Trigger re-fetch by updating the filters
    setSearchFilters(prev => ({ ...prev }));
  };

  const clearFilters = () => {
    setSearchFilters({
      minPrice: "",
      maxPrice: "",
      city: "",
      propertyType: "",
      bhkConfig: "",
      searchTerm: ""
    });
  };

  // Filter properties by search term on the frontend
  const filteredProperties = properties?.filter(property => {
    if (!searchFilters.searchTerm) return true;
    const searchLower = searchFilters.searchTerm.toLowerCase();
    return (
      property.title.toLowerCase().includes(searchLower) ||
      property.location.toLowerCase().includes(searchLower) ||
      property.city.toLowerCase().includes(searchLower) ||
      property.description.toLowerCase().includes(searchLower)
    );
  }) || [];

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-20 bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="w-full h-64 bg-gray-300"></div>
                    <div className="p-6">
                      <div className="h-6 bg-gray-300 rounded mb-3"></div>
                      <div className="h-4 bg-gray-300 rounded mb-3"></div>
                      <div className="h-8 bg-gray-300 rounded mb-4"></div>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="h-12 bg-gray-300 rounded"></div>
                        <div className="h-12 bg-gray-300 rounded"></div>
                        <div className="h-12 bg-gray-300 rounded"></div>
                      </div>
                      <div className="h-12 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-20 bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Unable to Load Properties</h1>
              <p className="text-red-600 mb-8">Failed to load properties. Please try again later.</p>
              <Link href="/">
                <Button className="bg-saffron text-white px-6 py-3 rounded-lg hover:bg-saffron-dark transition-colors">
                  <ArrowLeft className="mr-2" size={20} />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen pt-20 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <Link href="/">
                <Button variant="outline" className="mb-4">
                  <ArrowLeft className="mr-2" size={20} />
                  Back to Home
                </Button>
              </Link>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">All Properties</h1>
              <p className="text-xl text-gray-600">
                {filteredProperties.length} properties found
                {hasFilters && " with current filters"}
              </p>
            </div>
            
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Filter size={20} />
              <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Search by property name, location, or city..."
                  value={searchFilters.searchTerm}
                  onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent"
                />
              </div>
              <Button 
                onClick={handleSearch}
                className="bg-deep-blue text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Search className="mr-2" size={20} />
                Search
              </Button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="border-t border-gray-200 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Min Price (₹)</label>
                    <Select onValueChange={(value) => handleFilterChange('minPrice', value)} value={searchFilters.minPrice}>
                      <SelectTrigger className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any</SelectItem>
                        <SelectItem value="5000000">₹50 Lakh</SelectItem>
                        <SelectItem value="10000000">₹1 Crore</SelectItem>
                        <SelectItem value="20000000">₹2 Crore</SelectItem>
                        <SelectItem value="50000000">₹5 Crore</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Max Price (₹)</label>
                    <Select onValueChange={(value) => handleFilterChange('maxPrice', value)} value={searchFilters.maxPrice}>
                      <SelectTrigger className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any</SelectItem>
                        <SelectItem value="10000000">₹1 Crore</SelectItem>
                        <SelectItem value="20000000">₹2 Crore</SelectItem>
                        <SelectItem value="50000000">₹5 Crore</SelectItem>
                        <SelectItem value="100000000">₹10 Crore+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">City</label>
                    <Select onValueChange={(value) => handleFilterChange('city', value)} value={searchFilters.city}>
                      <SelectTrigger className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent">
                        <SelectValue placeholder="All Cities" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Cities</SelectItem>
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
                    <Select onValueChange={(value) => handleFilterChange('propertyType', value)} value={searchFilters.propertyType}>
                      <SelectTrigger className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent">
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Types</SelectItem>
                        <SelectItem value="Apartment">Apartment</SelectItem>
                        <SelectItem value="Villa">Villa</SelectItem>
                        <SelectItem value="Plot">Plot</SelectItem>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">BHK</label>
                    <Select onValueChange={(value) => handleFilterChange('bhkConfig', value)} value={searchFilters.bhkConfig}>
                      <SelectTrigger className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent">
                        <SelectValue placeholder="Any BHK" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any BHK</SelectItem>
                        <SelectItem value="1BHK">1 BHK</SelectItem>
                        <SelectItem value="2BHK">2 BHK</SelectItem>
                        <SelectItem value="3BHK">3 BHK</SelectItem>
                        <SelectItem value="4BHK">4+ BHK</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={handleSearch}
                    className="bg-saffron text-white px-6 py-3 rounded-lg hover:bg-saffron-dark transition-colors"
                  >
                    Apply Filters
                  </Button>
                  <Button 
                    onClick={clearFilters}
                    variant="outline"
                    className="px-6 py-3 rounded-lg"
                  >
                    Clear All Filters
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Properties Grid */}
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search size={64} className="mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Properties Found</h3>
              <p className="text-gray-600 mb-6">
                {hasFilters 
                  ? "No properties match your current search criteria. Try adjusting your filters." 
                  : "No properties are currently available."
                }
              </p>
              {hasFilters && (
                <Button 
                  onClick={clearFilters}
                  className="bg-saffron text-white px-6 py-3 rounded-lg hover:bg-saffron-dark transition-colors"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}