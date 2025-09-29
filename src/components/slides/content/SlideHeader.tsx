import React from 'react';

interface SlideHeaderProps {
  title: string;
  subtitle?: string;
}

const SlideHeader: React.FC<SlideHeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="slide-header">
      <div className="text-center">
        <h1 className="text-hero font-bold text-white mb-element-gap leading-tight max-w-content mx-auto">
          {title}
        </h1>
        {subtitle && (
          <p className="text-subheading text-white/90 max-w-content mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
};

export default SlideHeader;
