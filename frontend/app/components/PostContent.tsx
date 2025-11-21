import { type PortableTextBlock } from "next-sanity";
import Image from "next/image";
import PortableText from "./PortableText";
import { urlForImage } from "@/sanity/lib/utils";

interface ContentBlock {
  _type: 'contentBlock';
  _key: string;
  content: PortableTextBlock[];
}

interface ImageBlock {
  _type: 'imageBlock';
  _key: string;
  image: any;
  alt: string;
  caption?: string;
  size?: 'small' | 'medium' | 'large' | 'full';
  alignment?: 'left' | 'center' | 'right';
}

interface GalleryBlock {
  _type: 'galleryBlock';
  _key: string;
  images: Array<{
    _key: string;
    asset: any;
    alt: string;
    caption?: string;
  }>;
  layout?: 'grid' | 'carousel' | 'masonry';
  columns?: number;
}

type PostContentBlock = ContentBlock | ImageBlock | GalleryBlock | any; // Allow any for backwards compatibility

interface PostContentProps {
  content: PostContentBlock[];
}

export default function PostContent({ content }: PostContentProps) {
  if (!content?.length) return null;
  
  // Don't do the old-style check anymore - handle each block individually

  const getSizeClasses = (size?: string) => {
    switch (size) {
      case 'small':
        return 'max-w-sm';
      case 'medium':
        return 'max-w-xl';
      case 'large':
        return 'max-w-3xl';
      case 'full':
        return 'w-full';
      default:
        return 'max-w-3xl';
    }
  };

  const getAlignmentClasses = (alignment?: string) => {
    switch (alignment) {
      case 'left':
        return 'mr-auto';
      case 'right':
        return 'ml-auto';
      case 'center':
      default:
        return 'mx-auto';
    }
  };

  return (
    <div className="space-y-8">
      {content.map((block) => {
        // Handle case where block might not have _key
        const key = block._key || Math.random().toString(36).substring(7);
        
        switch (block._type) {
          case 'block':
            // Old format - direct block type (for backwards compatibility)
            return (
              <div key={key} className="prose prose-lg max-w-none">
                <PortableText value={[block] as PortableTextBlock[]} />
              </div>
            );
            
          case 'contentBlock':
            if (!block.content) return null;
            return (
              <div key={key} className="prose prose-lg max-w-none">
                <PortableText value={block.content} />
              </div>
            );

          case 'imageBlock':
            const imageUrl = block.image?.asset ? urlForImage(block.image)?.url() : null;
            if (!imageUrl) return null;
            
            return (
              <figure 
                key={key} 
                className={`${getSizeClasses(block.size)} ${getAlignmentClasses(block.alignment)}`}
              >
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src={imageUrl}
                    alt={block.alt}
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
                  />
                </div>
                {block.caption && (
                  <figcaption className="mt-2 text-sm text-gray-600 text-center">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case 'galleryBlock':
            if (!block.images?.length) return null;
            const columnClass = block.columns === 2 ? 'grid-cols-2' : 
                               block.columns === 4 ? 'grid-cols-2 md:grid-cols-4' : 
                               'grid-cols-2 md:grid-cols-3';
            
            return (
              <div key={key} className="my-12">
                {block.layout === 'grid' ? (
                  <div className={`grid ${columnClass} gap-4`}>
                    {block.images?.map((image: {
                      _key?: string;
                      asset: any;
                      alt: string;
                      caption?: string;
                    }) => {
                      const galleryImageUrl = image.asset ? urlForImage(image)?.url() : null;
                      if (!galleryImageUrl) return null;
                      
                      return (
                        <figure key={image._key || Math.random().toString(36).substring(7)} className="relative">
                          <Image
                            src={galleryImageUrl}
                            alt={image.alt}
                            width={600}
                            height={400}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          {image.caption && (
                            <figcaption className="mt-1 text-xs text-gray-600">
                              {image.caption}
                            </figcaption>
                          )}
                        </figure>
                      );
                    })}
                  </div>
                ) : (
                  // Placeholder for carousel/masonry layouts
                  <div className="text-center text-gray-500">
                    {block.layout} layout coming soon
                  </div>
                )}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}