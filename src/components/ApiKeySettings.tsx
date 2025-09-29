import React, { useState, useEffect } from 'react';
import { Key, Save, X } from 'lucide-react';
import { aiService } from '../services/aiService';

interface ApiKeySettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApiKeySettings: React.FC<ApiKeySettingsProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Load existing API key
      const savedKey = aiService.loadApiKey();
      if (savedKey) {
        setApiKey(savedKey);
      }
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleSave = () => {
    if (apiKey.trim()) {
      aiService.saveApiKey(apiKey.trim());
      onClose();
    }
  };

  const handleCancel = () => {
    // Reset to saved key or empty
    const savedKey = aiService.loadApiKey();
    setApiKey(savedKey || '');
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Key className="h-5 w-5 text-ai-blue" />
            <h2 className="text-lg font-semibold text-gray-900">Gemini API Key</h2>
          </div>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
              API Key
            </label>
            <div className="relative">
              <input
                id="apiKey"
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Gemini API key"
                autoComplete="new-password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ai-blue focus:border-transparent pr-10"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showKey ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <p className="mb-2">
              Get your API key from{' '}
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ai-blue hover:underline"
              >
                Google AI Studio
              </a>
            </p>
            <p>Your API key is stored locally in your browser and never sent to our servers.</p>
          </div>
        </form>

        <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!apiKey.trim()}
              className="flex items-center space-x-2 px-4 py-2 bg-ai-blue text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>Save Key</span>
            </button>
          </div>
      </div>
    </div>
  );
};

export default ApiKeySettings;
