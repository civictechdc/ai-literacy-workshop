import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SlideContent as SlideContentType } from '../../../types';

interface SlideContentProps {
  content: SlideContentType;
}

// Custom Markdown renderer with AI-themed styling
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // Override default elements with custom styling
        p: ({ children }) => (
          <p className="text-body text-gray-700 mb-element-gap last:mb-0">{children}</p>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-gray-900">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic text-gray-700">{children}</em>
        ),
        ul: ({ children }) => (
          <ul className="space-y-content-gap mb-element-gap">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="space-y-content-gap mb-element-gap list-decimal list-inside">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="text-body text-gray-700 leading-relaxed pl-1">{children}</li>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-ai-blue pl-element-gap py-element-gap my-section-gap bg-blue-50/50 italic text-gray-800 rounded-r-md">
            {children}
          </blockquote>
        ),
        code: ({ children, className }) => {
          // Check if it's inline code (no className usually means inline)
          const isInline = !className;
          if (isInline) {
            return (
              <code className="bg-gray-100 px-2 py-0.5 rounded text-xs font-mono text-gray-800 border">
                {children}
              </code>
            );
          }
          return (
            <code className="block bg-gray-900 text-green-400 p-element-gap rounded-lg font-mono text-small overflow-x-auto border">
              {children}
            </code>
          );
        },
        h1: ({ children }) => (
          <h1 className="text-hero font-bold text-gray-900 mb-section-gap">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-title font-bold text-gray-900 mb-element-gap">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-heading font-bold text-gray-900 mb-element-gap">{children}</h3>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-ai-blue hover:text-blue-700 underline underline-offset-2 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

// Unified Content Block Component
type VisualTreatment = 'info' | 'highlight' | 'action' | 'step' | 'checklist' | 'resource';
type MarkerType = 'bullet' | 'emoji' | 'checkmark' | 'arrow' | 'number' | 'checkbox';

interface ContentBlockProps {
  title?: string;
  items: string[];
  treatment: VisualTreatment;
  marker?: MarkerType;
  markerIcon?: string;
  backgroundColor?: string;
  textColor?: string;
}

const ContentBlock: React.FC<ContentBlockProps> = ({
  title,
  items,
  treatment,
  marker = 'bullet',
  markerIcon,
  backgroundColor,
  textColor = 'text-gray-800'
}) => {
  if (!items || items.length === 0) return null;

  const getContainerClasses = () => {
    const baseClasses = "mb-section-gap";
    switch (treatment) {
      case 'highlight':
        return `${baseClasses} grid gap-element-gap`;
      case 'action':
      case 'checklist':
        return `${baseClasses} space-y-content-gap`;
      case 'step':
        return `${baseClasses} bg-gray-50 border border-gray-200 rounded-lg p-element-gap`;
      case 'resource':
        return `${baseClasses} grid gap-3`;
      default:
        return `${baseClasses} space-y-content-gap`;
    }
  };

  const getItemClasses = () => {
    const baseClasses = "flex items-start";
    switch (treatment) {
      case 'highlight':
        return `${baseClasses} p-element-gap bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100`;
      case 'action':
        return `${baseClasses} p-element-gap rounded-lg border`;
      case 'checklist':
        return `${baseClasses} p-element-gap bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors`;
      case 'resource':
        return "flex items-center p-3 bg-gray-50 rounded-lg";
      case 'step':
        return `${baseClasses} items-start`;
      default:
        return baseClasses;
    }
  };

  const getItemBackground = () => {
    switch (treatment) {
      case 'action':
        return backgroundColor || 'bg-blue-50 border-blue-200';
      default:
        return '';
    }
  };

  const renderMarker = (index: number) => {
    switch (marker) {
      case 'emoji':
        return <div className="text-3xl mr-element-gap mt-1 text-ai-blue">{markerIcon || '💡'}</div>;
      case 'checkmark':
        return <span className={`mr-element-gap text-xl ${textColor}`}>✓</span>;
      case 'arrow':
        return <span className={`mr-element-gap mt-0.5 text-xl ${textColor}`}>→</span>;
      case 'number':
        return (
          <span className="inline-flex items-center justify-center w-8 h-8 bg-ai-blue text-white text-small font-medium rounded-full mr-element-gap mt-0.5 flex-shrink-0">
            {index + 1}
          </span>
        );
      case 'checkbox':
        return (
          <input
            type="checkbox"
            className="mr-element-gap mt-0.5 h-5 w-5 text-ai-blue rounded border-gray-300 focus:ring-ai-blue"
            onChange={() => console.log('Checklist item completed:', items[index])}
          />
        );
      default: // bullet
        return <span className="inline-block w-2 h-2 bg-ai-blue rounded-full mt-element-gap mr-element-gap flex-shrink-0" />;
    }
  };

  const renderItemContent = (item: string, index: number) => {
    const contentClasses = `text-body leading-relaxed flex-1 ${treatment === 'resource' ? 'text-gray-700' : textColor}`;

    if (treatment === 'checklist') {
      return (
        <label className={getItemClasses()}>
          {renderMarker(index)}
          <div className={contentClasses}>
            <MarkdownRenderer content={item} />
          </div>
        </label>
      );
    }

    if (treatment === 'resource') {
      return (
        <div key={index} className={getItemClasses()}>
          <span className="text-gray-700">{item}</span>
        </div>
      );
    }

    return (
      <div key={index} className={`${getItemClasses()} ${getItemBackground()}`}>
        {renderMarker(index)}
        <div className={contentClasses}>
          <MarkdownRenderer content={item} />
        </div>
      </div>
    );
  };

  return (
    <div className="mb-section-gap">
      {title && (
        <h3 className="text-heading font-semibold text-gray-800 mb-element-gap capitalize">
          {title}
        </h3>
      )}
      <div className={getContainerClasses()}>
        {items.map((item, index) => renderItemContent(item, index))}
      </div>
    </div>
  );
};

const SlideContent: React.FC<SlideContentProps> = ({ content }) => {

  const renderKeyPoints = () => (
    <ContentBlock
      items={content.key_points || []}
      treatment="highlight"
      marker="emoji"
      markerIcon="💡"
    />
  );

  const renderResources = () => (
    <ContentBlock
      title="Resources"
      items={content.resources || []}
      treatment="resource"
    />
  );

  const renderChecklist = () => (
    <ContentBlock
      title="Checklist"
      items={content.checklist || []}
      treatment="checklist"
      marker="checkbox"
    />
  );

  const renderTemplate = () => (
    <ContentBlock
      title="Template"
      items={content.template || []}
      treatment="step"
      marker="number"
    />
  );

  const renderInstructions = () => (
    <ContentBlock
      title="Instructions"
      items={content.instructions || []}
      treatment="info"
      marker="bullet"
    />
  );

  const renderGuidelines = () => (
    <ContentBlock
      title="Guidelines"
      items={content.guidelines || []}
      treatment="info"
      marker="bullet"
    />
  );

  const renderAntiPatterns = () => (
    <ContentBlock
      title="What to Avoid"
      items={content.anti_patterns || []}
      treatment="info"
      marker="bullet"
    />
  );

  const renderRules = () => (
    <ContentBlock
      title="Rules"
      items={content.rules || []}
      treatment="info"
      marker="bullet"
    />
  );

  const renderApproach = () => (
    <ContentBlock
      title="Approach"
      items={content.approach || []}
      treatment="info"
      marker="bullet"
    />
  );

  const renderTakeaways = () => (
    <ContentBlock
      title="Key Takeaways"
      items={content.takeaways || []}
      treatment="action"
      marker="checkmark"
      backgroundColor="bg-green-50 border-green-200"
      textColor="text-green-600"
    />
  );

  const renderActions = () => (
    <ContentBlock
      title="Next Steps"
      items={content.actions || []}
      treatment="action"
      marker="arrow"
      backgroundColor="bg-blue-50 border-blue-200"
      textColor="text-blue-600"
    />
  );

  return (
    <div className="slide-content">
      {/* Description */}
      {content.description && (
        <div className="content-section mb-section-gap max-w-content mx-auto">
          <MarkdownRenderer content={content.description} />
        </div>
      )}

      {/* Goal */}
      {content.goal && (
        <div className="content-section mb-section-gap p-element-gap bg-yellow-50 border border-yellow-200 rounded-lg max-w-content mx-auto">
          <h3 className="text-subheading font-semibold text-yellow-800 mb-element-gap flex items-center">
            <span className="text-2xl mr-2">🎯</span>
            Goal
          </h3>
          <div className="text-body text-yellow-700">
            <MarkdownRenderer content={content.goal} />
          </div>
        </div>
      )}

      {/* Key Points */}
      {renderKeyPoints()}

      {/* Points (generic bullet points) */}
      {content.points && content.points.length > 0 && (
        <div className="content-section max-w-content mx-auto">
          <ContentBlock
            items={content.points.map(point => typeof point === 'string' ? point : '')}
            treatment="info"
            marker="bullet"
          />
        </div>
      )}

      {/* Template */}
      <div className="content-section max-w-content mx-auto">
        {renderTemplate()}
      </div>

      {/* Instructions */}
      <div className="content-section max-w-content mx-auto">
        {renderInstructions()}
      </div>

      {/* Guidelines */}
      <div className="content-section max-w-content mx-auto">
        {renderGuidelines()}
      </div>

      {/* Anti-patterns */}
      <div className="content-section max-w-content mx-auto">
        {renderAntiPatterns()}
      </div>

      {/* Rules */}
      <div className="content-section max-w-content mx-auto">
        {renderRules()}
      </div>

      {/* Approach */}
      <div className="content-section max-w-content mx-auto">
        {renderApproach()}
      </div>

      {/* Checklist */}
      <div className="content-section max-w-content mx-auto">
        {renderChecklist()}
      </div>

      {/* Takeaways */}
      <div className="content-section max-w-content mx-auto">
        {renderTakeaways()}
      </div>

      {/* Actions */}
      <div className="content-section max-w-content mx-auto">
        {renderActions()}
      </div>

      {/* Resources */}
      <div className="content-section max-w-content mx-auto">
        {renderResources()}
      </div>

      {/* Schema (for workshop slides) */}
      {content.schema && (
        <div className="content-section mb-section-gap max-w-content mx-auto">
          <h3 className="text-heading font-semibold text-gray-800 mb-element-gap">Schema</h3>
          <pre className="bg-gray-100 p-element-gap rounded-lg text-small overflow-x-auto border">
            {JSON.stringify(content.schema, null, 2)}
          </pre>
        </div>
      )}

      {/* Author and Date */}
      {(content.author || content.date) && (
        <div className="mt-section-gap pt-element-gap border-t border-gray-200 text-small text-gray-500 max-w-content mx-auto">
          {content.author && <div>Presented by: {content.author}</div>}
          {content.date && <div>Date: {content.date}</div>}
        </div>
      )}
    </div>
  );
};

export default SlideContent;
