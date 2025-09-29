import React, { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { CodeWindowProps } from '../../../types';
import { usePresentationStore, useCodeWindowSelector } from '../../stores/presentationStore';
import { Play, Copy, Check } from 'lucide-react';

const CodeWindow: React.FC<CodeWindowProps> = ({ window, onCodeChange, onExecute }) => {
  const codeWindowState = useCodeWindowSelector(window.id);
  const [copied, setCopied] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  const currentCode = codeWindowState?.code || window.initial_code || '';

  const handleEditorChange = (value: string | undefined) => {
    const code = value || '';
    if (onCodeChange) {
      onCodeChange(code);
    }
    // Update store
    usePresentationStore.getState().updateCodeWindow(window.id, code);
  };

  const handleExecute = async () => {
    if (!onExecute || !window.executable) return;

    setIsExecuting(true);
    try {
      const result = await onExecute(currentCode);
      // Result handling would be implemented based on the execution service
      console.log('Execution result:', result);
    } catch (error) {
      console.error('Execution error:', error);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const getSizeClasses = () => {
    switch (window.size) {
      case 'small':
        return 'h-32';
      case 'medium':
        return 'h-48';
      case 'large':
        return 'h-64';
      case 'fullscreen':
        return 'h-full';
      default:
        return 'h-48';
    }
  };

  const getPositionClasses = () => {
    switch (window.position) {
      case 'left':
        return 'order-first';
      case 'right':
        return 'order-last';
      case 'center':
        return 'mx-auto';
      case 'bottom':
        return 'mt-auto';
      default:
        return '';
    }
  };

  return (
    <div className={`code-window bg-gray-800 rounded-lg border border-gray-700 overflow-hidden ${getSizeClasses()} ${getPositionClasses()}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-xs text-gray-400 font-medium">
            {window.language.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={handleCopy}
            className="p-1 text-gray-400 hover:text-white transition-colors"
            title="Copy code"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>

          {window.executable && (
            <button
              onClick={handleExecute}
              disabled={isExecuting}
              className="p-1 text-gray-400 hover:text-white disabled:opacity-50 transition-colors"
              title="Execute code"
            >
              <Play className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Editor */}
      <div className="h-full">
        <Editor
          height="100%"
          language={window.language}
          value={currentCode}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            readOnly: window.readonly,
            cursorBlinking: 'blink',
            renderWhitespace: 'selection',
            autoClosingBrackets: 'always',
            autoClosingQuotes: 'always',
          }}
          loading={
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"></div>
              <span className="ml-2">Loading editor...</span>
            </div>
          }
        />
      </div>

      {/* Output (if available) */}
      {codeWindowState?.output && (
        <div className="border-t border-gray-700 bg-gray-900 p-3">
          <div className="text-xs text-gray-400 mb-1">Output:</div>
          <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
            {codeWindowState.output}
          </pre>
        </div>
      )}

      {/* Expected Output Hint */}
      {window.expected_output && !codeWindowState?.output && (
        <div className="border-t border-gray-700 bg-gray-900 p-3">
          <div className="text-xs text-gray-500 mb-1">Expected Output:</div>
          <pre className="text-sm text-gray-500 font-mono whitespace-pre-wrap">
            {window.expected_output}
          </pre>
        </div>
      )}
    </div>
  );
};

export default CodeWindow;
