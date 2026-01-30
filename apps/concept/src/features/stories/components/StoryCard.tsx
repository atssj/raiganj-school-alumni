import React from 'react';
import { Quote, Heart, MessageCircle, Facebook, Linkedin } from 'lucide-react';
import { StoryItem } from '../../../shared/types';

interface StoryCardProps {
  story: StoryItem;
  onLike: (id: string) => void;
  onComment: (id: string, title: string) => void;
  onShare: (platform: 'facebook' | 'linkedin', story: StoryItem) => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story, onLike, onComment, onShare }) => {
  return (
    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold flex-shrink-0">
            {story.author.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold text-card-foreground">{story.author}</h4>
            <p className="text-xs text-muted-foreground">
              Batch of {story.batch} • {story.date}
            </p>
          </div>
        </div>
        <Quote className="w-6 h-6 md:w-8 md:h-8 text-brand-100" />
      </div>
      <h3 className="text-lg md:text-xl font-serif font-bold text-card-foreground mb-3">{story.title}</h3>
      <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm md:text-base">
        {story.content}
      </p>
      <div className="mt-6 flex items-center gap-6 border-t border-border pt-4">
        <button
          onClick={() => onLike(story.id)}
          className={`flex items-center gap-2 text-sm transition-colors ${
            story.hasLiked ? 'text-pink-600 font-medium' : 'text-muted-foreground hover:text-pink-600'
          }`}
        >
          <Heart className={`w-4 h-4 ${story.hasLiked ? 'fill-current' : ''}`} />
          {story.hasLiked ? 'Liked' : 'Like'} {story.likes > 0 && `(${story.likes})`}
        </button>
        <button
          onClick={() => onComment(story.id, story.title)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-600 transition-colors"
        >
          <MessageCircle className="w-4 h-4" /> Comment
        </button>

        <div className="flex-1" />

        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <span className="hidden sm:inline text-xs text-muted-foreground font-medium">Share</span>
          <button
            onClick={() => onShare('facebook', story)}
            className="text-muted-foreground hover:text-[#1877F2] transition-colors"
            title="Share on Facebook"
          >
            <Facebook className="w-4 h-4" />
          </button>
          <button
            onClick={() => onShare('linkedin', story)}
            className="text-muted-foreground hover:text-[#0A66C2] transition-colors"
            title="Share on LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
