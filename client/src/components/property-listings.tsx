import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import PropertyCard from "./property-card";
import { type Property } from "@shared/schema";

export default function PropertyListings() {
  const { data: properties, isLoading, error } = useQuery<Property[]>({
    queryKey: ['/api/properties/featured'],
  });

  if (isLoading) {
    return (
      <section id="properties" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Properties</h2>
            <p className="text-xl text-gray-600">Handpicked premium properties from verified sellers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
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
      </section>
    );
  }

  if (error) {
    return (
      <section id="properties" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Properties</h2>
            <p className="text-red-600">Failed to load properties. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="properties" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Properties</h2>
          <p className="text-xl text-gray-600">Handpicked premium properties from verified sellers</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties?.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-deep-blue text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            View All Properties
          </Button>
        </div>
      </div>
    </section>
  );
}
