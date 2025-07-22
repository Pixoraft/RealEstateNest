import { properties, contactInquiries, type Property, type InsertProperty, type ContactInquiry, type InsertContactInquiry } from "@shared/schema";

export interface IStorage {
  // Property methods
  getProperties(): Promise<Property[]>;
  getFeaturedProperties(): Promise<Property[]>;
  getProperty(id: number): Promise<Property | undefined>;
  getPropertiesByFilters(filters: {
    minPrice?: number;
    maxPrice?: number;
    city?: string;
    propertyType?: string;
    bhkConfig?: string;
  }): Promise<Property[]>;
  createProperty(property: InsertProperty): Promise<Property>;
  
  // Contact inquiry methods
  createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry>;
  getContactInquiries(): Promise<ContactInquiry[]>;
}

export class MemStorage implements IStorage {
  private properties: Map<number, Property>;
  private contactInquiries: Map<number, ContactInquiry>;
  private currentPropertyId: number;
  private currentInquiryId: number;

  constructor() {
    this.properties = new Map();
    this.contactInquiries = new Map();
    this.currentPropertyId = 1;
    this.currentInquiryId = 1;
    
    // Initialize with sample properties
    this.initializeSampleData();
  }

  private async initializeSampleData() {
    const sampleProperties: InsertProperty[] = [
      {
        title: "Luxury Sea View Apartment",
        description: "Premium 3BHK apartment with stunning sea views in Bandra West. Features modern amenities, spacious balconies, and world-class facilities.",
        location: "Bandra West, Mumbai",
        city: "Mumbai",
        state: "Maharashtra",
        price: "32000000",
        propertyType: "apartment",
        bhkConfig: "3BHK",
        bedrooms: 3,
        bathrooms: 3,
        carpetArea: 1200,
        builtUpArea: 1450,
        imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        vastuCompliant: true,
        readyToMove: true,
        furnished: false,
        premium: true,
        newLaunch: false,
        luxury: true,
        contactNumber: "+919876543210",
        featured: true,
      },
      {
        title: "Premium City Apartment",
        description: "Well-located 2BHK apartment in the heart of Delhi. Perfect for professionals with easy access to metro and commercial areas.",
        location: "Connaught Place, Delhi",
        city: "Delhi",
        state: "Delhi",
        price: "28000000",
        propertyType: "apartment",
        bhkConfig: "2BHK",
        bedrooms: 2,
        bathrooms: 2,
        carpetArea: 1000,
        builtUpArea: 1200,
        imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        vastuCompliant: false,
        readyToMove: true,
        furnished: false,
        premium: false,
        newLaunch: false,
        luxury: false,
        contactNumber: "+919876543210",
        featured: true,
      },
      {
        title: "Garden Villa",
        description: "Spacious 4BHK villa with beautiful garden in Whitefield. Perfect for families looking for luxury living with nature.",
        location: "Whitefield, Bangalore",
        city: "Bangalore",
        state: "Karnataka",
        price: "45000000",
        propertyType: "villa",
        bhkConfig: "4BHK",
        bedrooms: 4,
        bathrooms: 4,
        carpetArea: 2400,
        builtUpArea: 2800,
        imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        vastuCompliant: true,
        readyToMove: false,
        furnished: false,
        premium: true,
        newLaunch: false,
        luxury: true,
        contactNumber: "+919876543210",
        featured: true,
      },
      {
        title: "Designer Home",
        description: "Beautifully designed 2BHK apartment with premium interiors. Fully furnished and ready to move in.",
        location: "Koramangala, Bangalore",
        city: "Bangalore",
        state: "Karnataka",
        price: "18000000",
        propertyType: "apartment",
        bhkConfig: "2BHK",
        bedrooms: 2,
        bathrooms: 2,
        carpetArea: 950,
        builtUpArea: 1100,
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        vastuCompliant: false,
        readyToMove: true,
        furnished: true,
        premium: false,
        newLaunch: false,
        luxury: false,
        contactNumber: "+919876543210",
        featured: true,
      },
      {
        title: "Smart Apartment",
        description: "Modern 3BHK apartment with smart home features. Located in prime Gurgaon with excellent connectivity.",
        location: "Gurgaon, Delhi NCR",
        city: "Delhi",
        state: "Haryana",
        price: "21000000",
        propertyType: "apartment",
        bhkConfig: "3BHK",
        bedrooms: 3,
        bathrooms: 3,
        carpetArea: 1150,
        builtUpArea: 1350,
        imageUrl: "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        vastuCompliant: true,
        readyToMove: false,
        furnished: false,
        premium: false,
        newLaunch: true,
        luxury: false,
        contactNumber: "+919876543210",
        featured: true,
      },
      {
        title: "Executive Penthouse",
        description: "Ultra-luxury penthouse with panoramic city views. Features private terrace, premium finishes, and exclusive amenities.",
        location: "Powai, Mumbai",
        city: "Mumbai",
        state: "Maharashtra",
        price: "65000000",
        propertyType: "apartment",
        bhkConfig: "4BHK",
        bedrooms: 4,
        bathrooms: 5,
        carpetArea: 2800,
        builtUpArea: 3200,
        imageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        vastuCompliant: false,
        readyToMove: true,
        furnished: false,
        premium: true,
        newLaunch: false,
        luxury: true,
        contactNumber: "+919876543210",
        featured: true,
      },
    ];

    for (const property of sampleProperties) {
      await this.createProperty(property);
    }
  }

  async getProperties(): Promise<Property[]> {
    return Array.from(this.properties.values());
  }

  async getFeaturedProperties(): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(property => property.featured);
  }

  async getProperty(id: number): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async getPropertiesByFilters(filters: {
    minPrice?: number;
    maxPrice?: number;
    city?: string;
    propertyType?: string;
    bhkConfig?: string;
  }): Promise<Property[]> {
    let properties = Array.from(this.properties.values());

    if (filters.minPrice) {
      properties = properties.filter(p => parseFloat(p.price) >= filters.minPrice!);
    }

    if (filters.maxPrice) {
      properties = properties.filter(p => parseFloat(p.price) <= filters.maxPrice!);
    }

    if (filters.city && filters.city !== "All Cities") {
      properties = properties.filter(p => p.city === filters.city);
    }

    if (filters.propertyType && filters.propertyType !== "All Types") {
      properties = properties.filter(p => p.propertyType === filters.propertyType?.toLowerCase());
    }

    if (filters.bhkConfig && filters.bhkConfig !== "Any BHK") {
      properties = properties.filter(p => p.bhkConfig === filters.bhkConfig);
    }

    return properties;
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const id = this.currentPropertyId++;
    const property: Property = { ...insertProperty, id };
    this.properties.set(id, property);
    return property;
  }

  async createContactInquiry(insertInquiry: InsertContactInquiry): Promise<ContactInquiry> {
    const id = this.currentInquiryId++;
    const inquiry: ContactInquiry = { 
      ...insertInquiry, 
      id,
      createdAt: new Date().toISOString(),
    };
    this.contactInquiries.set(id, inquiry);
    return inquiry;
  }

  async getContactInquiries(): Promise<ContactInquiry[]> {
    return Array.from(this.contactInquiries.values());
  }
}

export const storage = new MemStorage();
