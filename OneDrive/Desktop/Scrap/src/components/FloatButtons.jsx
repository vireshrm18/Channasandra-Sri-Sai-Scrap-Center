import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export default function FloatButtons() {
  return (
    <div className="floater-group" aria-label="Quick Contact Actions">
      {/* Call Button */}
      <a 
        href="tel:+918861247315" 
        className="floater floater-call" 
        title="Call Sai Scrap"
        aria-label="Call Sai Scrap at 8861247315"
      >
        <Phone size={24} />
      </a>
      
      {/* WhatsApp Button */}
      <a 
        href="https://wa.me/918861247315?text=Hi%20Sai%20Scrap%20Team,%20I'd%20like%20to%20get%20a%20price%20quote%20for%20some%20recyclable%20scrap%20materials." 
        target="_blank" 
        rel="noopener noreferrer" 
        className="floater floater-wa" 
        title="Message us on WhatsApp"
        aria-label="Chat with Sai Scrap on WhatsApp"
      >
        <MessageCircle size={26} />
      </a>
    </div>
  );
}
