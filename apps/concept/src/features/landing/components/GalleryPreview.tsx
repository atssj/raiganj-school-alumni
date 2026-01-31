import React from 'react';
import { ViewState, GalleryPhoto } from '../../../shared/types';
import { Button, Reveal } from '../../../shared/components';
import { MOCK_GALLERY } from '../../../data/mocks';

interface GalleryPreviewProps {
  onNavigate: (view: ViewState) => void;
}

export const GalleryPreview: React.FC<GalleryPreviewProps> = ({ onNavigate }) => {
  return (
    <section id="gallery-preview" className="py-20 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">
                A Glimpse of Our Heritage
              </h2>
              <p className="text-gray-500 max-w-2xl">
                From the divine aura of Saraswati Puja to the creativity of Evening Exhibitions 
                and the path-shaping Career Guidance sessions.
              </p>
            </div>
            <Button
              variant="outline"
              className="w-full md:w-auto flex justify-center"
              onClick={() => onNavigate(ViewState.GALLERY)}
            >
              View Full Gallery
            </Button>
          </div>
        </Reveal>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {MOCK_GALLERY.map((photo, index) => (
            <Reveal key={photo.id} delay={index * 100} className="break-inside-avoid">
              <GalleryPhotoCard photo={photo} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

interface GalleryPhotoCardProps {
  photo: GalleryPhoto;
  index: number;
}

const GalleryPhotoCard: React.FC<GalleryPhotoCardProps> = ({ photo, index }) => {
  const rotation = index % 2 === 0 ? 'rotate-1' : '-rotate-1';

  return (
    <div
      className={`group relative bg-white p-2 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:z-10 hover:scale-[1.02] ${rotation} hover:rotate-0`}
    >
      <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
        <img
          src={photo.url}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          alt={photo.caption}
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white font-serif italic text-sm px-4 text-center">{photo.caption}</span>
        </div>
      </div>
      <div className="p-3 text-center">
        <p className="font-serif italic text-gray-700 text-sm md:text-base">{photo.caption}</p>
        <p className="text-xs text-brand-600 font-bold tracking-widest uppercase mt-1 opacity-60">
          {photo.category} • {photo.year}
        </p>
      </div>
    </div>
  );
};
