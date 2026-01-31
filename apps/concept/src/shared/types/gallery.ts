export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  category: 'Campus' | 'Reunion' | 'Sports' | 'Old Days' | 'Saraswati Puja' | 'Exhibitions' | 'Career Guidance';
  year: number;
}

export interface ArchiveDocument {
  id: string;
  title: string;
  type: 'Yearbook' | 'Magazine' | 'Document';
  year: number;
  coverImage: string;
  size: string;
}
