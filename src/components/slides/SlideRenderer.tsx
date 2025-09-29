import React from 'react';
import { SlideRendererProps, SlideLayout } from '../../../types';
import StandardLayout from './layouts/StandardLayout';
import TwoColumnLayout from './layouts/TwoColumnLayout';
import CodeDemoLayout from './layouts/CodeDemoLayout';
import WorkshopLayout from './layouts/WorkshopLayout';

const SlideRenderer: React.FC<SlideRendererProps> = ({ slide, isActive, onComplete }) => {
  const renderLayout = () => {
    const layout = slide.layout || SlideLayout.STANDARD;

    const layoutProps = {
      slide,
      isActive,
      onComplete
    };

    switch (layout) {
      case SlideLayout.STANDARD:
        return <StandardLayout {...layoutProps} />;

      case SlideLayout.TWO_COLUMN:
        return <TwoColumnLayout {...layoutProps} />;

      case SlideLayout.CODE_DEMO:
        return <CodeDemoLayout {...layoutProps} />;

      case SlideLayout.WORKSHOP:
        return <WorkshopLayout {...layoutProps} />;

      case SlideLayout.COMPARISON:
        // TODO: Implement comparison layout
        return <StandardLayout {...layoutProps} />;

      case SlideLayout.FULLSCREEN_MEDIA:
        // TODO: Implement fullscreen media layout
        return <StandardLayout {...layoutProps} />;

      case SlideLayout.SPLIT_SCREEN:
        // TODO: Implement split screen layout
        return <TwoColumnLayout {...layoutProps} />;

      default:
        return <StandardLayout {...layoutProps} />;
    }
  };

  return (
    <div className={`slide-renderer fade-in h-full ${isActive ? 'slide-transition' : ''}`}>
      {renderLayout()}
    </div>
  );
};

export default SlideRenderer;
