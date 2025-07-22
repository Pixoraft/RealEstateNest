import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya & Amit Sharma",
    location: "Mumbai",
    rating: 5,
    text: "Rajesh helped us find our dream home in Mumbai. His expertise and transparency made the entire process smooth. Highly recommended!"
  },
  {
    name: "Suresh Patel", 
    location: "Delhi",
    rating: 5,
    text: "Professional service and great market knowledge. Found the perfect property in our budget within 2 weeks!"
  },
  {
    name: "Meera Reddy",
    location: "Bangalore", 
    rating: 5,
    text: "Excellent guidance throughout the home buying process. Rajesh's team made everything hassle-free."
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Client Testimonials</h2>
          <p className="text-xl text-gray-600">What our happy clients say about us</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gray-50 p-6 rounded-xl">
              <CardContent className="p-0">
                <div className="flex text-saffron mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <div className="font-semibold text-gray-900">- {testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.location}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
