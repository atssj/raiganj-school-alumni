
import React, { useState } from 'react';
import { Image as ImageIcon, FileText, Download, Upload, Filter, X, Maximize2, ZoomIn, ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { MOCK_GALLERY, MOCK_ARCHIVE } from '../data/mocks';
import { GalleryPhoto } from '../types';

export const Gallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'photos' | 'archive'>('photos');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxImage, setLightboxImage] = useState<GalleryPhoto | null>(null);

  const categories = ['All', 'Campus', 'Reunion', 'Sports', 'Old Days'];

  const filteredPhotos = selectedCategory === 'All' 
    ? MOCK_GALLERY 
    : MOCK_GALLERY.filter(photo => photo.category === selectedCategory);

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">Gallery & Archive</h2>
          <p className="text-gray-500 mt-1 text-sm md:text-base">Preserving the visual history and documents of Raiganj schools.</p>
        </div>
        <Button className="flex items-center gap-2">
            <Upload className="w-4 h-4" /> Contribute
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-gray-100 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('photos')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
            activeTab === 'photos' 
              ? 'bg-white text-gray-900 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <ImageIcon className="w-4 h-4" /> Photo Gallery
        </button>
        <button
          onClick={() => setActiveTab('archive')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
            activeTab === 'archive' 
              ? 'bg-white text-gray-900 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <FileText className="w-4 h-4" /> Digital Archive
        </button>
      </div>

      {activeTab === 'photos' && (
        <div className="animate-fade-in">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  selectedCategory === cat
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-brand-200 hover:text-brand-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {filteredPhotos.map((photo) => (
              <div 
                key={photo.id} 
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-gray-100"
                onClick={() => setLightboxImage(photo)}
              >
                <img 
                  src={photo.url} 
                  alt={photo.caption} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <p className="text-white font-medium truncate">{photo.caption}</p>
                  <p className="text-brand-200 text-xs">{photo.year} • {photo.category}</p>
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Maximize2 className="w-4 h-4 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'archive' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
          {MOCK_ARCHIVE.map((doc) => (
            <div key={doc.id} className="group bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-lg hover:border-brand-100 transition-all duration-300">
              <div className="aspect-[3/4] bg-gray-50 rounded-xl overflow-hidden mb-4 relative shadow-inner border border-gray-100">
                 <img 
                  src={doc.coverImage} 
                  alt={doc.title} 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
                 />
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                    <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold shadow-sm">
                        View
                    </div>
                 </div>
              </div>
              <div className="flex justify-between items-start gap-2">
                <div>
                    <h3 className="font-bold text-gray-900 leading-tight">{doc.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{doc.type} • {doc.year}</p>
                </div>
                <button className="text-gray-400 hover:text-brand-600 transition-colors" title="Download">
                    <Download className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
                <span>{doc.size}</span>
                <span className="flex items-center gap-1 hover:text-brand-600 cursor-pointer">Preview <ArrowRight className="w-3 h-3"/></span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in" onClick={() => setLightboxImage(null)}>
          <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors">
            <X className="w-8 h-8" />
          </button>
          
          <div className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-full flex items-center justify-center">
                <img 
                src={lightboxImage.url} 
                alt={lightboxImage.caption} 
                className="max-w-full max-h-[80vh] rounded-lg shadow-2xl object-contain"
                />
            </div>
            <div className="mt-6 text-center">
                <h3 className="text-2xl font-serif font-bold text-white">{lightboxImage.caption}</h3>
                <div className="flex items-center justify-center gap-4 mt-2">
                    <span className="px-3 py-1 rounded-full bg-white/10 text-brand-200 text-sm border border-white/10">
                        {lightboxImage.category}
                    </span>
                    <span className="text-gray-400 text-sm">|</span>
                    <span className="text-gray-300 text-sm">Year: {lightboxImage.year}</span>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
