import React, { useState } from 'react';
import { PenTool, Sparkles, Loader, X } from 'lucide-react';
import { Button } from '../../shared/components';
import { StoryItem } from '../../shared/types';
import { polishStory } from '../../shared/services/geminiService';
import { StoryCard } from './components/StoryCard';
import { MOCK_STORIES } from '../../data/mocks';

export const Stories: React.FC = () => {
  const [stories, setStories] = useState<StoryItem[]>(MOCK_STORIES);
  const [isWriting, setIsWriting] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPolishing, setIsPolishing] = useState(false);

  const handlePolish = async () => {
    if (!content) return;
    setIsPolishing(true);
    const polished = await polishStory(content);
    setContent(polished);
    setIsPolishing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStory: StoryItem = {
      id: Date.now().toString(),
      title,
      author: 'Rahul C.',
      batch: 2010,
      date: 'Just now',
      content,
      likes: 0,
      hasLiked: false,
    };
    setStories([newStory, ...stories]);
    setIsWriting(false);
    setTitle('');
    setContent('');
  };

  const handleLike = (id: string) => {
    setStories(stories.map(story => {
      if (story.id === id) {
        const newHasLiked = !story.hasLiked;
        const newLikes = newHasLiked ? story.likes + 1 : story.likes - 1;

        if (newHasLiked) {
          alert(`You liked "${story.title}"!`);
        }

        return {
          ...story,
          hasLiked: newHasLiked,
          likes: newLikes,
        };
      }
      return story;
    }));
  };

  const handleComment = (_id: string, title: string) => {
    const comment = prompt(`Write a comment for "${title}":`);
    if (comment) {
      alert('Thanks! Your comment has been posted (Simulated).');
    }
  };

  const shareStory = (platform: 'facebook' | 'linkedin', story: StoryItem) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Read this story by ${story.author}: ${story.title}`);
    let shareUrl = '';

    if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`;
    } else if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className="space-y-6 md:space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-gray-900">Alumni Stories</h2>
          <p className="text-gray-500 mt-1">
            Nostalgia, achievements, and memories from the corridors of Raiganj.
          </p>
        </div>
        <Button onClick={() => setIsWriting(true)} className="flex items-center gap-2 w-full sm:w-auto">
          <PenTool className="w-4 h-4" /> Share Your Story
        </Button>
      </div>

      {isWriting && (
        <StoryForm
          title={title}
          content={content}
          isPolishing={isPolishing}
          onTitleChange={setTitle}
          onContentChange={setContent}
          onPolish={handlePolish}
          onSubmit={handleSubmit}
          onCancel={() => setIsWriting(false)}
        />
      )}

      <div className="space-y-6">
        {stories.map(story => (
          <StoryCard
            key={story.id}
            story={story}
            onLike={handleLike}
            onComment={handleComment}
            onShare={shareStory}
          />
        ))}
      </div>
    </div>
  );
};

// Sub-components
interface StoryFormProps {
  title: string;
  content: string;
  isPolishing: boolean;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onPolish: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const StoryForm: React.FC<StoryFormProps> = ({
  title,
  content,
  isPolishing,
  onTitleChange,
  onContentChange,
  onPolish,
  onSubmit,
  onCancel,
}) => (
  <div className="bg-white p-6 rounded-2xl border border-brand-200 shadow-lg animate-fade-in relative z-10">
    <button type="button" onClick={onCancel} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" aria-label="Close story form">
      <X className="w-5 h-5" />
    </button>
    <h3 className="text-lg font-bold text-gray-900 mb-4">Write a Story</h3>
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          required
          type="text"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none text-base md:text-sm"
          placeholder="A memorable day..."
          value={title}
          onChange={e => onTitleChange(e.target.value)}
        />
      </div>
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="block text-sm font-medium text-gray-700">Your Story</label>
          <button
            type="button"
            onClick={onPolish}
            disabled={!content || isPolishing}
            className="text-xs flex items-center gap-1 text-brand-600 font-medium hover:text-brand-800 disabled:opacity-50"
          >
            {isPolishing ? <Loader className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
            Polish with AI
          </button>
        </div>
        <textarea
          required
          rows={6}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none resize-none text-base md:text-sm"
          placeholder="Start writing here..."
          value={content}
          onChange={e => onContentChange(e.target.value)}
        />
        <p className="text-xs text-gray-400 mt-1">
          Tip: Use the AI button to fix grammar and enhance the nostalgic tone.
        </p>
      </div>
      <div className="flex justify-end gap-3 flex-col sm:flex-row">
        <Button type="button" variant="ghost" onClick={onCancel} className="w-full sm:w-auto">
          Cancel
        </Button>
        <Button type="submit" className="w-full sm:w-auto">
          Publish Story
        </Button>
      </div>
    </form>
  </div>
);
