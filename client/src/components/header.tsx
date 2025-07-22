import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Menu, X } from "lucide-react";
import { Link } from "wouter";
import ListPropertyForm from "./list-property-form";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isListPropertyOpen, setIsListPropertyOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`bg-white shadow-lg fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-xl' : ''}`}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-saffron to-trust-orange rounded-lg flex items-center justify-center">
              <Home className="text-white text-xl" size={24} />
            </div>
            <span className="text-2xl font-bold text-deep-blue">RealSpace</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-gray-700 hover:text-saffron transition-colors font-medium"
            >
              Home
            </button>
            <Link href="/properties">
              <button className="text-gray-700 hover:text-saffron transition-colors font-medium">
                Properties
              </button>
            </Link>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-saffron transition-colors font-medium"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-saffron transition-colors font-medium"
            >
              Contact
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              onClick={() => setIsListPropertyOpen(true)}
              className="bg-saffron text-white px-6 py-2 rounded-lg hover:bg-saffron-dark transition-colors font-medium"
            >
              List Property
            </Button>
            <button 
              className="md:hidden text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 pt-4">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-gray-700 hover:text-saffron transition-colors font-medium text-left"
              >
                Home
              </button>
              <Link href="/properties">
                <button className="text-gray-700 hover:text-saffron transition-colors font-medium text-left">
                  Properties
                </button>
              </Link>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-saffron transition-colors font-medium text-left"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-saffron transition-colors font-medium text-left"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>
      
      <ListPropertyForm 
        isOpen={isListPropertyOpen} 
        onClose={() => setIsListPropertyOpen(false)} 
      />
    </header>
  );
}
