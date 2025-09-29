import React, { useState } from 'react';
import { InteractiveElement, InteractiveElementType } from '../../../types';
import { usePresentationStore } from '../../stores/presentationStore';
import aiService from '../../services/aiService';
import { validateJSON, debounce } from '../../utils';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface InteractivePanelProps {
  elements: InteractiveElement[];
  slideId: number;
}

const InteractivePanel: React.FC<InteractivePanelProps> = ({ elements, slideId }) => {
  const [showSchemaReference, setShowSchemaReference] = useState(false);
  const [schemaInput, setSchemaInput] = useState('');

  // Check if there's a schema validator element and get its schema
  const schemaValidator = elements.find(el => el.type === InteractiveElementType.SCHEMA_VALIDATOR);
  const expectedSchema = schemaValidator?.config?.expected_schema;

  const renderElement = (element: InteractiveElement) => {
    switch (element.type) {
      case InteractiveElementType.NOTE_TAKING:
        return <NoteTakingElement element={element} slideId={slideId} />;

      case InteractiveElementType.CHECKLIST:
        return <ChecklistElement element={element} slideId={slideId} />;

      case InteractiveElementType.CODE_EDITOR:
        return <CodeEditorElement element={element} />;

      case InteractiveElementType.PROMPT_TESTER:
        return <PromptTesterElement element={element} onResponseGenerated={setSchemaInput} />;

      case InteractiveElementType.SCHEMA_VALIDATOR:
        return <SchemaValidatorElement element={element} inputValue={schemaInput} onInputChange={setSchemaInput} />;

      default:
        return (
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600">Interactive element: {element.type}</p>
          </div>
        );
    }
  };

  return (
    <div className="interactive-panel h-full bg-gray-50 p-4">
      <div className="space-y-4">
        {/* Workflow Indicators */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200 p-4">
          <h3 className="text-sm font-medium text-gray-800 mb-3">📝 Workshop Workflow</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
              <span className="text-sm text-gray-700">Test Your Prompt</span>
            </div>
            <div className="text-gray-400">→</div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
              <span className="text-sm text-gray-700">Validate JSON Output</span>
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            Use the prompt tester below to generate JSON, then paste the result here for validation.
          </p>
        </div>

        {/* Schema Reference Panel */}
        {expectedSchema && (
          <div className="bg-white rounded-lg border border-blue-200 overflow-hidden">
            <button
              onClick={() => setShowSchemaReference(!showSchemaReference)}
              className="w-full bg-blue-50 px-4 py-3 border-b border-blue-200 flex items-center justify-between hover:bg-blue-100 transition-colors"
            >
              <h3 className="text-sm font-medium text-blue-800">📋 Expected JSON Schema</h3>
              {showSchemaReference ? (
                <ChevronUp className="h-4 w-4 text-blue-600" />
              ) : (
                <ChevronDown className="h-4 w-4 text-blue-600" />
              )}
            </button>
            {showSchemaReference && (
              <div className="p-4 bg-blue-50">
                <div className="bg-gray-900 rounded p-3 font-mono text-sm text-gray-100 overflow-x-auto">
                  <pre>{JSON.stringify(expectedSchema, null, 2)}</pre>
                </div>
                <p className="text-xs text-blue-700 mt-2">
                  Use this schema as a reference when crafting your prompt and validating your JSON output.
                </p>
              </div>
            )}
          </div>
        )}

        {elements.map((element) => (
          <div key={element.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-800">{element.title}</h3>
            </div>
            <div className="p-4">
              {renderElement(element)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Note Taking Element
const NoteTakingElement: React.FC<{ element: InteractiveElement; slideId: number }> = ({
  element: _element,
  slideId
}) => {
  const { addParticipantNote } = usePresentationStore();
  const [note, setNote] = React.useState('');
  const [saving, setSaving] = React.useState(false);

  // Load existing notes on mount
  React.useEffect(() => {
    const existingNotes = usePresentationStore.getState().participantNotes.get(slideId);
    if (existingNotes) {
      setNote(existingNotes);
    }
  }, [slideId]);

  const handleSave = async () => {
    if (!note.trim()) return;

    setSaving(true);
    try {
      await addParticipantNote(slideId, note);
      // Could show a success message here
    } catch (error) {
      console.error('Failed to save notes:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-3">
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Take notes here..."
        className="w-full h-32 p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-ai-blue focus:border-transparent"
      />
      <button
        onClick={handleSave}
        disabled={!note.trim() || saving}
        className="w-full px-4 py-2 bg-ai-blue text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {saving ? 'Saving...' : 'Save Notes'}
      </button>
    </div>
  );
};

// Checklist Element
const ChecklistElement: React.FC<{ element: InteractiveElement; slideId: number }> = ({
  element,
  slideId: _slideId
}) => {
  const [checkedItems, setCheckedItems] = React.useState<Set<number>>(new Set());

  const items = element.config?.items || [];

  const handleCheck = (index: number) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedItems(newChecked);
  };

  return (
    <div className="space-y-2">
      {items.map((item: string, index: number) => (
        <label key={index} className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={checkedItems.has(index)}
            onChange={() => handleCheck(index)}
            className="h-4 w-4 text-ai-blue rounded border-gray-300 focus:ring-ai-blue"
          />
          <span className="text-sm text-gray-700">{item}</span>
        </label>
      ))}
      <div className="mt-4 text-xs text-gray-500">
        Completed: {checkedItems.size} / {items.length}
      </div>
    </div>
  );
};

// Placeholder components for other element types
const CodeEditorElement: React.FC<{ element: InteractiveElement }> = ({ element: _element }) => (
  <div className="text-center text-gray-500 py-8">
    <div className="text-4xl mb-2">📝</div>
    <p>Code editor will be implemented</p>
  </div>
);

const PromptTesterElement: React.FC<{ element: InteractiveElement; onResponseGenerated?: (response: string) => void }> = ({ element: _element, onResponseGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTestPrompt = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError('');
    setResponse('');

    try {
      const result = await aiService.testPrompt(prompt);
      if (result.error) {
        setError(result.error);
      } else {
        setResponse(result.content);
        // Automatically populate the schema validator
        if (onResponseGenerated) {
          onResponseGenerated(result.content);
        }
      }
    } catch (err) {
      setError('Failed to test prompt');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Prompt
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your AI prompt here..."
          className="w-full h-24 p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-ai-blue focus:border-transparent"
        />
      </div>

      <button
        onClick={handleTestPrompt}
        disabled={!prompt.trim() || isLoading}
        className="w-full px-4 py-2 bg-ai-blue text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Testing...' : 'Test Prompt'}
      </button>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {response && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              AI Response
            </label>
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
              ✓ Auto-sent to validator
            </span>
          </div>
          <div className="bg-gray-50 p-3 rounded-md border">
            <pre className="text-sm text-gray-800 whitespace-pre-wrap">{response}</pre>
          </div>
          <button
            onClick={() => onResponseGenerated && onResponseGenerated(response)}
            className="mt-2 text-xs px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Send to Validator Again
          </button>
        </div>
      )}
    </div>
  );
};

const SchemaValidatorElement: React.FC<{ element: InteractiveElement; inputValue?: string; onInputChange?: (value: string) => void }> = ({ element, inputValue = '', onInputChange }) => {
  const [localJsonInput, setLocalJsonInput] = useState('');
  const [validation, setValidation] = useState<{ isValid: boolean; errors: string[]; warnings: string[] } | null>(null);

  // Use external input value if provided, otherwise use local state
  const jsonInput = inputValue || localJsonInput;
  const setJsonInput = onInputChange || setLocalJsonInput;

  // Debounced validation function (3-second delay)
  const debouncedValidate = React.useMemo(
    () => debounce(async (input: string) => {
      if (!input.trim()) {
        setValidation(null);
        return;
      }

      // First check if it's valid JSON
      const jsonValidation = validateJSON(input);
      if (!jsonValidation.isValid) {
        setValidation({
          isValid: false,
          errors: [jsonValidation.error || 'Invalid JSON'],
          warnings: []
        });
        return;
      }

      // Then validate against schema
      const schema = element.config?.expected_schema;
      if (schema) {
        const schemaValidation = await aiService.validateSchema(input, schema);
        setValidation({
          isValid: schemaValidation.isValid,
          errors: schemaValidation.errors || [],
          warnings: schemaValidation.warnings || []
        });
      } else {
        setValidation({ isValid: true, errors: [], warnings: [] });
      }
    }, 3000),
    [element.config?.expected_schema]
  );

  // Trigger validation when input changes
  React.useEffect(() => {
    debouncedValidate(jsonInput);
  }, [jsonInput, debouncedValidate]);

  const handleValidate = async () => {
    if (!jsonInput.trim()) return;

    // First check if it's valid JSON
    const jsonValidation = validateJSON(jsonInput);
    if (!jsonValidation.isValid) {
      setValidation({
        isValid: false,
        errors: [jsonValidation.error || 'Invalid JSON'],
        warnings: []
      });
      return;
    }

    // Then validate against schema
    const schema = element.config?.expected_schema;
    if (schema) {
      const schemaValidation = await aiService.validateSchema(jsonInput, schema);
      setValidation({
        isValid: schemaValidation.isValid,
        errors: schemaValidation.errors || [],
        warnings: schemaValidation.warnings || []
      });
    } else {
      setValidation({ isValid: true, errors: [], warnings: [] });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          JSON Input
          <span className="text-xs text-gray-500 ml-2">(validates automatically after 3 seconds)</span>
        </label>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Paste your JSON here..."
          className="w-full h-32 p-3 border border-gray-300 rounded-md resize-none font-mono text-sm focus:ring-2 focus:ring-ai-blue focus:border-transparent"
        />
      </div>

      <button
        onClick={handleValidate}
        disabled={!jsonInput.trim()}
        className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Validate Now
      </button>

      {validation && (
        <div className="space-y-3">
          <div className={`p-3 rounded-md ${
            validation.isValid
              ? 'bg-green-50 border border-green-200'
              : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center">
              {validation.isValid ? (
                <span className="text-green-700 font-medium">✓ Valid JSON</span>
              ) : (
                <span className="text-red-700 font-medium">✗ Invalid JSON</span>
              )}
            </div>
          </div>

          {validation.errors.length > 0 && (
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-red-800">Errors:</h4>
              {validation.errors.map((error, index) => (
                <div key={index} className="text-sm text-red-700 bg-red-50 p-2 rounded">
                  {error}
                </div>
              ))}
            </div>
          )}

          {validation.warnings.length > 0 && (
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-amber-800">Warnings:</h4>
              {validation.warnings.map((warning, index) => (
                <div key={index} className="text-sm text-amber-700 bg-amber-50 p-2 rounded">
                  {warning}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InteractivePanel;
