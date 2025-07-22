import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatIndianPrice(price: string | number): string {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  if (numPrice >= 10000000) { // 1 crore
    const crores = numPrice / 10000000;
    return `₹${crores.toFixed(1)} Crore${crores > 1 ? 's' : ''}`;
  } else if (numPrice >= 100000) { // 1 lakh
    const lakhs = numPrice / 100000;
    return `₹${lakhs.toFixed(1)} Lakh${lakhs > 1 ? 's' : ''}`;
  } else {
    return `₹${numPrice.toLocaleString('en-IN')}`;
  }
}

export function openWhatsApp(propertyTitle: string, propertyLink: string): void {
  const message = `Hi! I'm interested in "${propertyTitle}". Property Link: ${propertyLink}`;
  const phoneNumber = "919876543210"; // Indian format
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, '_blank');
}

export function calculateEMI(loanAmount: number, interestRate: number, loanTenure: number) {
  const monthlyRate = interestRate / 12 / 100;
  const numberOfPayments = loanTenure * 12;
  
  const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
              (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  const totalAmount = emi * numberOfPayments;
  const totalInterest = totalAmount - loanAmount;
  
  return {
    monthlyEMI: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalAmount: Math.round(totalAmount)
  };
}
