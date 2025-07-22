import { Home, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-saffron to-trust-orange rounded-lg flex items-center justify-center">
                <Home className="text-white text-xl" size={24} />
              </div>
              <span className="text-2xl font-bold">RealSpace</span>
            </div>
            <p className="text-gray-400 mb-6">Your trusted partner in finding the perfect home across India's major cities.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-saffron transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-saffron transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-saffron transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-saffron transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('home')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('properties')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Properties
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Buy Property</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sell Property</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Rent Property</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Property Valuation</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <ul className="space-y-3">
              <li className="text-gray-400 flex items-center">
                <span className="mr-3">📞</span>
                +91 98765 43210
              </li>
              <li className="text-gray-400 flex items-center">
                <span className="mr-3">✉️</span>
                info@realspace.in
              </li>
              <li className="text-gray-400 flex items-start">
                <span className="mr-3 mt-1">📍</span>
                Bandra West, Mumbai, Maharashtra
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">&copy; 2024 RealSpace. All rights reserved. | RERA Registration: A52100000272</p>
        </div>
      </div>
    </footer>
  );
}
