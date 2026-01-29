import React, { useState } from 'react';
import { Sparkles, Send, Copy, RefreshCw } from 'lucide-react';
import { Button } from '../../shared/components';
import { generateReconnectionMessage } from '../../shared/services/geminiService';

const TONES = ['nostalgic', 'casual', 'professional'] as const;
type Tone = (typeof TONES)[number];

export const ReconnectionAssistant: React.FC = () => {
  const [name, setName] = useState('');
  const [batch, setBatch] = useState('');
  const [memory, setMemory] = useState('');
  const [tone, setTone] = useState<Tone>('nostalgic');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!name || !batch) return;
    setIsLoading(true);
    try {
      const msg = await generateReconnectionMessage(name, batch, memory, tone);
      setGeneratedMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 md:p-8 border-b border-gray-100 bg-brand-50/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-brand-100 rounded-lg">
              <Sparkles className="w-5 h-5 text-brand-600" />
            </div>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-gray-900">Ice Breaker AI</h2>
          </div>
          <p className="text-sm md:text-base text-gray-600">
            Lost for words? Let our AI draft a warm message to reconnect with your old batchmate from
            Raiganj High.
          </p>
        </div>

        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <InputSection
            name={name}
            batch={batch}
            memory={memory}
            tone={tone}
            isLoading={isLoading}
            onNameChange={setName}
            onBatchChange={setBatch}
            onMemoryChange={setMemory}
            onToneChange={setTone}
            onGenerate={handleGenerate}
          />
          <OutputSection message={generatedMessage} />
        </div>
      </div>
    </div>
  );
};

// Sub-components
interface InputSectionProps {
  name: string;
  batch: string;
  memory: string;
  tone: Tone;
  isLoading: boolean;
  onNameChange: (value: string) => void;
  onBatchChange: (value: string) => void;
  onMemoryChange: (value: string) => void;
  onToneChange: (tone: Tone) => void;
  onGenerate: () => void;
}

const InputSection: React.FC<InputSectionProps> = ({
  name,
  batch,
  memory,
  tone,
  isLoading,
  onNameChange,
  onBatchChange,
  onMemoryChange,
  onToneChange,
  onGenerate,
}) => (
  <div className="space-y-4 md:space-y-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Friend&apos;s Name</label>
      <input
        type="text"
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-base md:text-sm"
        placeholder="e.g. Anirban Das"
        value={name}
        onChange={e => onNameChange(e.target.value)}
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Batch Year</label>
      <input
        type="text"
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-base md:text-sm"
        placeholder="e.g. 2012"
        value={batch}
        onChange={e => onBatchChange(e.target.value)}
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Shared Memory (Optional)
      </label>
      <textarea
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all resize-none text-base md:text-sm"
        rows={3}
        placeholder="e.g. We used to share tiffin near the banyan tree..."
        value={memory}
        onChange={e => onMemoryChange(e.target.value)}
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
      <div className="flex flex-wrap gap-2">
        {TONES.map(t => (
          <button
            key={t}
            onClick={() => onToneChange(t)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize transition-colors flex-1 md:flex-none ${
              tone === t ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>

    <Button onClick={onGenerate} disabled={isLoading || !name} className="w-full">
      {isLoading ? (
        <span className="flex items-center">
          <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Generating...
        </span>
      ) : (
        'Draft Message'
      )}
    </Button>
  </div>
);

const OutputSection: React.FC<{ message: string }> = ({ message }) => (
  <div className="bg-gray-50 rounded-xl p-6 relative flex flex-col h-full min-h-[250px] md:min-h-[300px]">
    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
      AI Suggestion
    </label>

    {message ? (
      <div className="flex-1">
        <p className="text-gray-800 leading-relaxed whitespace-pre-line font-medium font-serif text-base md:text-lg">
          &ldquo;{message}&rdquo;
        </p>
        <div className="mt-6 flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigator.clipboard.writeText(message)}
            className="flex-1 md:flex-none justify-center"
          >
            <Copy className="w-4 h-4 mr-2" /> Copy
          </Button>
          <Button
            size="sm"
            onClick={() => alert('Simulated: Message sent!')}
            className="flex-1 md:flex-none justify-center"
          >
            <Send className="w-4 h-4 mr-2" /> Send
          </Button>
        </div>
      </div>
    ) : (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-400 text-center">
        <Sparkles className="w-8 h-8 mb-2 opacity-50" />
        <p className="text-sm">Fill in the details to generate a personalized message.</p>
      </div>
    )}

    <div className="absolute bottom-0 right-0 p-4 opacity-5">
      <div className="text-8xl md:text-9xl font-serif">&rdquo;</div>
    </div>
  </div>
);
