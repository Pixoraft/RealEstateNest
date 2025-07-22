import { useEffect, useState } from "react";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import PropertyFilters from "@/components/property-filters";
import PropertyListings from "@/components/property-listings";
import EMICalculator from "@/components/emi-calculator";
import RealtorBio from "@/components/realtor-bio";
import Testimonials from "@/components/testimonials";
import GoogleMap from "@/components/google-map";
import ContactForm from "@/components/contact-form";
import Footer from "@/components/footer";
import WhatsAppFloat from "@/components/whatsapp-float";

export default function Home() {
  const [searchFilters, setSearchFilters] = useState<{
    minPrice?: number;
    maxPrice?: number;
    city?: string;
    propertyType?: string;
    bhkConfig?: string;
  }>({});

  useEffect(() => {
    // Set page title and meta description for SEO
    document.title = "RealSpace - Find Your Dream Home in India | Premium Real Estate";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'RealSpace - Find Your Dream Home in India. Premium real estate properties in Mumbai, Delhi, Bangalore with verified listings and expert guidance.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'RealSpace - Find Your Dream Home in India. Premium real estate properties in Mumbai, Delhi, Bangalore with verified listings and expert guidance.';
      document.head.appendChild(meta);
    }

    // Add Open Graph tags
    const ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.content = 'RealSpace - Find Your Dream Home in India';
    document.head.appendChild(ogTitle);

    const ogDescription = document.createElement('meta');
    ogDescription.setAttribute('property', 'og:description');
    ogDescription.content = 'Premium real estate properties with verified listings and expert guidance';
    document.head.appendChild(ogDescription);

    const ogType = document.createElement('meta');
    ogType.setAttribute('property', 'og:type');
    ogType.content = 'website';
    document.head.appendChild(ogType);
  }, []);

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <PropertyFilters onFiltersChange={setSearchFilters} />
        <PropertyListings searchFilters={searchFilters} />
        <EMICalculator />
        <RealtorBio />
        <Testimonials />
        <GoogleMap />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
