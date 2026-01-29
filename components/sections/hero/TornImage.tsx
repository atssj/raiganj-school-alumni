interface TornImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function TornImage({ src, alt, className = '' }: TornImageProps) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Torn edge pseudo-element */}
      <div
        className="absolute inset-0 bg-white -z-10"
      />
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain drop-shadow-xl relative z-10"
      />
    </div>
  );
}
