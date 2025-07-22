import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Award } from "lucide-react";
import { openWhatsApp } from "@/lib/utils";

export default function RealtorBio() {
  const handleWhatsAppClick = () => {
    openWhatsApp("I would like to know more about your services", window.location.origin);
  };

  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Your Expert</h2>
            <p className="text-xl text-gray-600">Your trusted partner in real estate journey</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">Rajesh Kumar</h3>
                  <p className="text-xl text-saffron font-medium mb-4">Certified Real Estate Consultant</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge className="bg-deep-blue text-white px-3 py-1 rounded-full text-sm">RERA Certified</Badge>
                    <Badge className="bg-forest-green text-white px-3 py-1 rounded-full text-sm">15+ Years Experience</Badge>
                    <Badge className="bg-trust-orange text-white px-3 py-1 rounded-full text-sm">500+ Happy Clients</Badge>
                  </div>
                </div>
                
                <p className="text-gray-600 leading-relaxed">
                  With over 15 years of experience in the Indian real estate market, I specialize in luxury properties across Mumbai, Delhi, and Bangalore. My commitment to transparency, expert market knowledge, and personalized service has helped hundreds of families find their dream homes.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="text-saffron" size={20} />
                    <span className="text-gray-900 font-medium">+91 98765 43210</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="text-saffron" size={20} />
                    <span className="text-gray-900 font-medium">rajesh@realspace.in</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <MapPin className="text-saffron" size={20} />
                    <span className="text-gray-900 font-medium">Bandra West, Mumbai, Maharashtra</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Award className="text-saffron" size={20} />
                    <span className="text-gray-900 font-medium">RERA Registration: A52100000272</span>
                  </div>
                </div>
                
                <div className="flex space-x-4 pt-4">
                  <Button 
                    onClick={handleWhatsAppClick}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    <span className="mr-2">📱</span>WhatsApp Me
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-2 border-deep-blue text-deep-blue hover:bg-deep-blue hover:text-white px-6 py-3 rounded-lg font-medium transition-all"
                  >
                    Schedule Call
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000" 
                alt="Professional Indian real estate agent in business attire" 
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
