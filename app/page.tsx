'use client';

import React from 'react';

interface ImageSectionProps {
  src: string;
  alt: string;
  hasOverlay?: boolean;
}

export default function HoneystixxLanding() {
  // Prevent right-click context menu
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    return false;
  };

  // Prevent drag
  const handleDragStart = (e: React.DragEvent<HTMLImageElement>) => {
    e.preventDefault();
    return false;
  };

  // Navigate to order page
  const goToOrder = () => {
    window.location.href = '/order';
  };

  const ImageSection: React.FC<ImageSectionProps> = ({ src, alt, hasOverlay = false }) => (
    <div 
      className="relative w-full max-w-4xl mx-auto"
      onContextMenu={handleContextMenu}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-auto select-none pointer-events-none"
        draggable="false"
        onDragStart={handleDragStart}
      />
      {hasOverlay && (
        <button
          onClick={goToOrder}
          className="absolute inset-0 w-full h-full cursor-pointer bg-transparent hover:bg-purple-500/5 transition-colors duration-300"
          aria-label="View offer details"
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      {/* Hero Section */}
      <ImageSection src="/one.png"
        alt="Hello Beautiful - Vaginal pH Testing"
      />

      {/* Product Display */}
      <ImageSection src="/two.png"
        alt="Honeystixx Product"
      />

      {/* Benefits Section */}
      <ImageSection src="/three.png"
        alt="Honeystixx Benefits"
      />

      {/* Pricing/Offer Section with Clickable Overlay */}
      <ImageSection src="/four.png"
        alt="70% OFF Special Offer"
        hasOverlay={true}
      />

      {/* Product Display 2 */}
      <ImageSection src="/five.png"
        alt="Honeystixx Product Display"
      />

      {/* Why Honeystixx */}
      <ImageSection src="/six.png"
        alt="Why Honeystixx - Test Before You Treat"
      />

      {/* How to Use - pH Swab Test */}
      <ImageSection src="/eight.png"
        alt="How to Perform a Vaginal pH Swab Test"
      />

      {/* How to Use - UTI Test */}
      <ImageSection src="/seven.png"
        alt="How to Perform a Vaginal UTI Test"
      />

      {/* Final CTA */}
      <ImageSection src="/nine.png"
        alt="Test Before You Treat"
        hasOverlay={true}
      />

      {/* Floating CTA Button */}
      <div className="fixed bottom-6 item-center justify-center w-full flex z-50">
        <button
          onClick={goToOrder}
          className="flex flex-col bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 font-semibold text-lg"
        >
          <label className='tangerine-regular text-xl'>
            Get your honeystixx - 70% OFF
          </label>
          <span className='text-[10px] text-muted-forground tracking-widest'>(FREE SHIPPING)</span>
        </button>
      </div>

      {/* CSS to prevent selection and copying */}
      <style jsx>{`
        * {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          -webkit-user-drag: none;
          -khtml-user-drag: none;
          -moz-user-drag: none;
          -o-user-drag: none;
        }
        
        img {
          pointer-events: none;
          -webkit-user-drag: none;
          -khtml-user-drag: none;
          -moz-user-drag: none;
          -o-user-drag: none;
          user-drag: none;
        }
      `}</style>
    </div>
  );
}