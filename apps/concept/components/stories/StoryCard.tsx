import React from 'react';
import { StoryItem } from '../../types';
import { Quote, Heart, MessageCircle, Facebook, Linkedin } from 'lucide-react';

interface StoryCardProps {
    story: StoryItem;
    onLike: (id: string) => void;
    onComment: (id: string, title: string) => void;
    onShare: (platform: 'facebook' | 'linkedin', story: StoryItem) => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story, onLike, onComment, onShare }) => {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold flex-shrink-0">
                        {story.author.charAt(0)}
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900">{story.author}</h4>
                        <p className="text-xs text-gray-500">Batch of {story.batch} • {story.date}</p>
                    </div>
                </div>
                <Quote className="w-6 h-6 md:w-8 md:h-8 text-brand-100" />
            </div>
            <h3 className="text-lg md:text-xl font-serif font-bold text-gray-800 mb-3">{story.title}</h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm md:text-base">
                {story.content}
            </p>
            <div className="mt-6 flex items-center gap-6 border-t border-gray-50 pt-4">
                <button 
                    onClick={() => onLike(story.id)}
                    className={`flex items-center gap-2 text-sm transition-colors ${story.hasLiked ? 'text-pink-600 font-medium' : 'text-gray-500 hover:text-pink-600'}`}
                >
                    <Heart className={`w-4 h-4 ${story.hasLiked ? 'fill-current' : ''}`} /> 
                    {story.hasLiked ? 'Liked' : 'Like'} {story.likes > 0 && `(${story.likes})`}
                </button>
                <button 
                    onClick={() => onComment(story.id, story.title)}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-brand-600 transition-colors"
                >
                    <MessageCircle className="w-4 h-4" /> Comment
                </button>

                <div className="flex-1"></div>
                
                <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
                    <span className="hidden sm:inline text-xs text-gray-400 font-medium">Share</span>
                    <button onClick={() => onShare('facebook', story)} className="text-gray-400 hover:text-[#1877F2] transition-colors" title="Share on Facebook">
                        <Facebook className="w-4 h-4" />
                    </button>
                    <button onClick={() => onShare('linkedin', story)} className="text-gray-400 hover:text-[#0A66C2] transition-colors" title="Share on LinkedIn">
                        <Linkedin className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};