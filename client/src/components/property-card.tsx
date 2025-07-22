import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Bed, Bath, Square } from "lucide-react";
import { type Property } from "@shared/schema";
import { formatIndianPrice, openWhatsApp } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const handleWhatsAppClick = () => {
    openWhatsApp(property.title, `${window.location.origin}/property/${property.id}`);
  };

  const getBadgeInfo = () => {
    if (property.vastuCompliant) return { label: "Vastu Compliant", className: "bg-forest-green text-white" };
    if (property.readyToMove) return { label: "Ready to Move", className: "bg-trust-orange text-white" };
    if (property.furnished) return { label: "Furnished", className: "bg-trust-orange text-white" };
    if (property.premium) return { label: "Premium", className: "bg-forest-green text-white" };
    if (property.newLaunch) return { label: "New Launch", className: "bg-forest-green text-white" };
    if (property.luxury) return { label: "Luxury", className: "bg-trust-orange text-white" };
    return null;
  };

  const badgeInfo = getBadgeInfo();

  return (
    <Card className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
      <img 
        src={property.imageUrl} 
        alt={property.title} 
        className="w-full h-64 object-cover"
        loading="lazy"
      />
      
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-900">{property.title}</h3>
          {badgeInfo && (
            <Badge className={`${badgeInfo.className} px-2 py-1 rounded-full text-xs font-medium`}>
              {badgeInfo.label}
            </Badge>
          )}
        </div>
        
        <p className="text-gray-600 mb-3 flex items-center">
          <MapPin className="text-saffron mr-2" size={16} />
          {property.location}
        </p>
        
        <div className="text-2xl font-bold text-deep-blue mb-4">
          {formatIndianPrice(property.price)}
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
          <div className="text-center">
            <Bed className="text-saffron mb-1 mx-auto" size={16} />
            <div className="font-medium">{property.bhkConfig}</div>
          </div>
          <div className="text-center">
            <Bath className="text-saffron mb-1 mx-auto" size={16} />
            <div className="font-medium">{property.bathrooms} Bath</div>
          </div>
          <div className="text-center">
            <Square className="text-saffron mb-1 mx-auto" size={16} />
            <div className="font-medium">{property.builtUpArea.toLocaleString()} sq ft</div>
          </div>
        </div>
        
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Carpet Area:</span>
            <span className="font-medium">{property.carpetArea.toLocaleString()} sq ft</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Built-up Area:</span>
            <span className="font-medium">{property.builtUpArea.toLocaleString()} sq ft</span>
          </div>
        </div>
        
        <Button 
          onClick={handleWhatsAppClick}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors"
        >
          <span className="mr-2">📱</span>Contact via WhatsApp
        </Button>
      </CardContent>
    </Card>
  );
}
