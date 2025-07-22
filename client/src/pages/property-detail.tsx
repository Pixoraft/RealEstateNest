import { useEffect } from "react";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Bed, Bath, Square, Home, ArrowLeft, Phone, Mail, Award } from "lucide-react";
import { type Property } from "@shared/schema";
import { formatIndianPrice, openWhatsApp, calculateEMI } from "@/lib/utils";
import { Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsAppFloat from "@/components/whatsapp-float";

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  
  const { data: property, isLoading, error } = useQuery<Property>({
    queryKey: ['/api/properties', id],
    queryFn: () => fetch(`/api/properties/${id}`).then(res => res.json()),
  });

  useEffect(() => {
    if (property) {
      document.title = `${property.title} - RealSpace`;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', `${property.title} in ${property.location}. ${property.description.substring(0, 150)}...`);
      }
    }
  }, [property]);

  const handleWhatsAppClick = () => {
    if (property) {
      openWhatsApp(property.title, window.location.href);
    }
  };

  const getBadgeInfo = (property: Property) => {
    if (property.vastuCompliant) return { label: "Vastu Compliant", className: "bg-forest-green text-white" };
    if (property.readyToMove) return { label: "Ready to Move", className: "bg-trust-orange text-white" };
    if (property.furnished) return { label: "Furnished", className: "bg-trust-orange text-white" };
    if (property.premium) return { label: "Premium", className: "bg-forest-green text-white" };
    if (property.newLaunch) return { label: "New Launch", className: "bg-forest-green text-white" };
    if (property.luxury) return { label: "Luxury", className: "bg-trust-orange text-white" };
    return null;
  };

  const getEMIEstimate = (price: string) => {
    const loanAmount = parseFloat(price) * 0.8; // 80% loan
    const interestRate = 8.5; // 8.5% typical rate
    const tenure = 20; // 20 years
    return calculateEMI(loanAmount, interestRate, tenure);
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-20 bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse">
              <div className="h-96 bg-gray-300 rounded-xl mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="h-8 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                </div>
                <div className="h-64 bg-gray-300 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !property) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-20 bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
              <p className="text-gray-600 mb-8">The property you're looking for doesn't exist or has been removed.</p>
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

  const badgeInfo = getBadgeInfo(property);
  const emiEstimate = getEMIEstimate(property.price);

  return (
    <>
      <Header />
      <div className="min-h-screen pt-20 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Link href="/">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="mr-2" size={20} />
              Back to Properties
            </Button>
          </Link>

          {/* Hero Image */}
          <div className="relative mb-8">
            <img 
              src={property.imageUrl} 
              alt={property.title} 
              className="w-full h-96 object-cover rounded-xl shadow-lg"
            />
            {badgeInfo && (
              <Badge className={`absolute top-4 right-4 ${badgeInfo.className} px-3 py-2 text-sm font-medium`}>
                {badgeInfo.label}
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">{property.title}</h1>
                  <p className="text-lg text-gray-600 flex items-center mb-4">
                    <MapPin className="text-saffron mr-2" size={20} />
                    {property.location}, {property.city}, {property.state}
                  </p>
                  <div className="text-4xl font-bold text-deep-blue mb-6">
                    {formatIndianPrice(property.price)}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-8 p-6 bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <Bed className="text-saffron mb-2 mx-auto" size={24} />
                    <div className="font-semibold text-gray-900">{property.bhkConfig}</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="text-center">
                    <Bath className="text-saffron mb-2 mx-auto" size={24} />
                    <div className="font-semibold text-gray-900">{property.bathrooms}</div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                  <div className="text-center">
                    <Square className="text-saffron mb-2 mx-auto" size={24} />
                    <div className="font-semibold text-gray-900">{property.builtUpArea.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">sq ft</div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Description</h2>
                  <p className="text-gray-600 leading-relaxed">{property.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Property Details</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Property Type:</span>
                        <span className="font-medium capitalize">{property.propertyType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Carpet Area:</span>
                        <span className="font-medium">{property.carpetArea.toLocaleString()} sq ft</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Built-up Area:</span>
                        <span className="font-medium">{property.builtUpArea.toLocaleString()} sq ft</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ready to Move:</span>
                        <span className="font-medium">{property.readyToMove ? "Yes" : "No"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Furnished:</span>
                        <span className="font-medium">{property.furnished ? "Yes" : "No"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Vastu Compliant:</span>
                        <span className="font-medium">{property.vastuCompliant ? "Yes" : "No"}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">EMI Calculator</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-2">Estimated EMI (80% loan, 8.5% rate, 20 years)</div>
                      <div className="text-2xl font-bold text-deep-blue mb-2">
                        ₹{emiEstimate.monthlyEMI.toLocaleString('en-IN')}/month
                      </div>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Loan Amount:</span>
                          <span>{formatIndianPrice(parseFloat(property.price) * 0.8)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Interest:</span>
                          <span>{formatIndianPrice(emiEstimate.totalInterest)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <Card className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Property Expert</h3>
                
                <div className="flex items-center space-x-4 mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" 
                    alt="Rajesh Kumar" 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">Rajesh Kumar</div>
                    <div className="text-sm text-gray-600">Property Consultant</div>
                    <div className="flex items-center text-xs text-saffron">
                      <Award className="mr-1" size={12} />
                      RERA Certified
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <Phone className="text-saffron" size={16} />
                    <span className="text-sm text-gray-700">{property.contactNumber}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="text-saffron" size={16} />
                    <span className="text-sm text-gray-700">rajesh@realspace.in</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    onClick={handleWhatsAppClick}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    <span className="mr-2">📱</span>WhatsApp Now
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full border-2 border-saffron text-saffron hover:bg-saffron hover:text-white py-3 rounded-lg font-medium transition-all"
                  >
                    <Phone className="mr-2" size={16} />
                    Call Now
                  </Button>
                </div>
              </Card>

              {/* Similar Properties */}
              <Card className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Similar Properties</h3>
                <div className="text-center text-gray-600">
                  <Home className="mx-auto mb-2 text-gray-400" size={32} />
                  <p>More properties in {property.city} coming soon!</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}