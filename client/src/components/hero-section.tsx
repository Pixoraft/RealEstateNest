import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToProperties = () => {
    const element = document.getElementById('properties');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToEMI = () => {
    const element = document.getElementById('emi-calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
          alt="Mumbai skyline with modern buildings" 
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Find Your <span className="text-saffron">Dream Home</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Discover premium properties across India with verified listings and expert guidance
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={scrollToProperties}
            className="bg-saffron hover:bg-saffron-dark text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors transform hover:scale-105"
          >
            Explore Properties
          </Button>
          <Button 
            onClick={scrollToEMI}
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105"
          >
            Calculate EMI
          </Button>
        </div>
      </div>
    </section>
  );
}
