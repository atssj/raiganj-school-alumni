import React, { useState } from 'react';
import {
  Image as ImageIcon,
  FileText,
  Download,
  Upload,
  X,
  Maximize2,
  ArrowRight,
} from 'lucide-react';
import { Button } from '../../shared/components';
import { MOCK_GALLERY, MOCK_ARCHIVE } from '../../data/mocks';
import { GalleryPhoto } from '../../shared/types';

const CATEGORIES = ['All', 'Campus', 'Reunion', 'Sports', 'Old Days'];

export const Gallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'photos' | 'archive'>('photos');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState<GalleryPhoto | null>(null);

  const filteredPhotos =
    selectedCategory === 'All'
      ? MOCK_GALLERY
      : MOCK_GALLERY.filter(photo => photo.category === selectedCategory);

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">
            Gallery & Archive
          </h2>
          <p className="text-gray-500 mt-1 text-sm md:text-base">
            Preserving the visual history and documents of Raiganj schools.
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Upload className="w-4 h-4" /> Contribute
        </Button>
      </div>

      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'photos' && (
        <PhotosTab
          photos={filteredPhotos}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onPhotoClick={setLightboxImage}
        />
      )}

      {activeTab === 'archive' && <ArchiveTab />}

      {lightboxImage && <Lightbox photo={lightboxImage} onClose={() => setLightboxImage(null)} />}
    </div>
  );
};

// Sub-components
interface TabsProps {
  activeTab: 'photos' | 'archive';
  onTabChange: (tab: 'photos' | 'archive') => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => (
  <div className="flex p-1 bg-gray-100 rounded-xl w-fit">
    <TabButton active={activeTab === 'photos'} onClick={() => onTabChange('photos')} icon={ImageIcon}>
      Photo Gallery
    </TabButton>
    <TabButton active={activeTab === 'archive'} onClick={() => onTabChange('archive')} icon={FileText}>
      Digital Archive
    </TabButton>
  </div>
);

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, icon: Icon, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
      active ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
    }`}
  >
    <Icon className="w-4 h-4" /> {children}
  </button>
);

interface PhotosTabProps {
  photos: GalleryPhoto[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onPhotoClick: (photo: GalleryPhoto) => void;
}

const PhotosTab: React.FC<PhotosTabProps> = ({
  photos,
  selectedCategory,
  onCategoryChange,
  onPhotoClick,
}) => (
  <div className="animate-fade-in">
    <div className="flex flex-wrap gap-2 mb-6">
      {CATEGORIES.map(cat => (
        <CategoryFilterButton
          key={cat}
          category={cat}
          isActive={selectedCategory === cat}
          onClick={() => onCategoryChange(cat)}
        />
      ))}
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {photos.map(photo => (
        <PhotoCard key={photo.id} photo={photo} onClick={() => onPhotoClick(photo)} />
      ))}
    </div>
  </div>
);

interface CategoryFilterButtonProps {
  category: string;
  isActive: boolean;
  onClick: () => void;
}

const CategoryFilterButton: React.FC<CategoryFilterButtonProps> = ({
  category,
  isActive,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
      isActive
        ? 'bg-brand-600 text-white border-brand-600'
        : 'bg-white text-gray-600 border-gray-200 hover:border-brand-200 hover:text-brand-700'
    }`}
  >
    {category}
  </button>
);

interface PhotoCardProps {
  photo: GalleryPhoto;
  onClick: () => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onClick }) => (
  <div
    className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-gray-100"
    onClick={onClick}
  >
    <img
      src={photo.url}
      alt={photo.caption}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
      <p className="text-white font-medium truncate">{photo.caption}</p>
      <p className="text-brand-200 text-xs">
        {photo.year} • {photo.category}
      </p>
    </div>
    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <Maximize2 className="w-4 h-4 text-white" />
    </div>
  </div>
);

const ArchiveTab: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
    {MOCK_ARCHIVE.map(doc => (
      <ArchiveCard key={doc.id} doc={doc} />
    ))}
  </div>
);

import { ArchiveDocument } from '../../shared/types';

interface ArchiveCardProps {
  doc: ArchiveDocument;
}

const ArchiveCard: React.FC<ArchiveCardProps> = ({ doc }) => (
  <div className="group bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-lg hover:border-brand-100 transition-all duration-300">
    <div className="aspect-[3/4] bg-gray-50 rounded-xl overflow-hidden mb-4 relative shadow-inner border border-gray-100">
      <img
        src={doc.coverImage}
        alt={doc.title}
        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
        <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold shadow-sm">View</div>
      </div>
    </div>
    <div className="flex justify-between items-start gap-2">
      <div>
        <h3 className="font-bold text-gray-900 leading-tight">{doc.title}</h3>
        <p className="text-xs text-gray-500 mt-1">
          {doc.type} • {doc.year}
        </p>
      </div>
      <button className="text-gray-400 hover:text-brand-600 transition-colors" title="Download">
        <Download className="w-5 h-5" />
      </button>
    </div>
    <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
      <span>{doc.size}</span>
      <span className="flex items-center gap-1 hover:text-brand-600 cursor-pointer">
        Preview <ArrowRight className="w-3 h-3" />
      </span>
    </div>
  </div>
);

interface LightboxProps {
  photo: GalleryPhoto;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ photo, onClose }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
    onClick={onClose}
  >
    <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors">
      <X className="w-8 h-8" />
    </button>

    <div className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center" onClick={e => e.stopPropagation()}>
      <div className="relative w-full h-full flex items-center justify-center">
        <img
          src={photo.url}
          alt={photo.caption}
          className="max-w-full max-h-[80vh] rounded-lg shadow-2xl object-contain"
        />
      </div>
      <div className="mt-6 text-center">
        <h3 className="text-2xl font-serif font-bold text-white">{photo.caption}</h3>
        <div className="flex items-center justify-center gap-4 mt-2">
          <span className="px-3 py-1 rounded-full bg-white/10 text-brand-200 text-sm border border-white/10">
            {photo.category}
          </span>
          <span className="text-gray-400 text-sm">|</span>
          <span className="text-gray-300 text-sm">Year: {photo.year}</span>
        </div>
      </div>
    </div>
  </div>
);
