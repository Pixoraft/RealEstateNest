import { openWhatsApp } from "@/lib/utils";

export default function WhatsAppFloat() {
  const handleClick = () => {
    openWhatsApp("Hi, I am interested in your real estate services", window.location.origin);
  };

  return (
    <a 
      href="#" 
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
      className="whatsapp-float"
      aria-label="Contact via WhatsApp"
    >
      <span style={{ fontSize: '30px' }}>📱</span>
    </a>
  );
}
