import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Phone } from "lucide-react";

export default function GoogleMap() {
  const openDirections = () => {
    window.open("https://maps.google.com/?q=Bandra+Kurla+Complex,+Bandra+East,+Mumbai", "_blank");
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Visit Our Office</h2>
          <p className="text-xl text-gray-600">Located in the heart of Mumbai's business district</p>
        </div>
        
        <Card className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <CardContent className="p-8 lg:p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">RealSpace Headquarters</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <MapPin className="text-saffron mt-1" size={20} />
                  <div>
                    <div className="font-medium text-gray-900">Address</div>
                    <div className="text-gray-600">Tower A, Bandra Kurla Complex<br />Bandra East, Mumbai 400051</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="text-saffron mt-1" size={20} />
                  <div>
                    <div className="font-medium text-gray-900">Office Hours</div>
                    <div className="text-gray-600">Mon-Sat: 9:00 AM - 7:00 PM<br />Sunday: 10:00 AM - 5:00 PM</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Phone className="text-saffron mt-1" size={20} />
                  <div>
                    <div className="font-medium text-gray-900">Phone</div>
                    <div className="text-gray-600">+91 98765 43210</div>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={openDirections}
                className="bg-saffron text-white px-6 py-3 rounded-lg hover:bg-saffron-dark transition-colors font-medium"
              >
                Get Directions
              </Button>
            </CardContent>
            
            <div className="h-96 lg:h-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.258025624998!2d72.86544831490115!3d19.063309787091893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8a8b3a3b9f7%3A0x4b9b9c4c4c4c4c4c!2sBandra%20Kurla%20Complex%2C%20Bandra%20East%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1635789123456!5m2!1sen!2sin"
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title="RealSpace Office Location"
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
