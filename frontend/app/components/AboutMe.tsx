import { Image } from "next-sanity/image";
import { urlForImage } from "@/sanity/lib/utils";

interface AboutMeBlock {
  _type: 'aboutMe';
  _key: string;
  profilePicture?: {
    asset?: {
      _ref: string;
    };
  };
  name?: string;
  team?: string;
  bio?: string;
}

interface AboutMeProps {
  block: AboutMeBlock;
  index: number;
}

export default function AboutMe({ block }: AboutMeProps) {
  if (!block) {
    return null;
  }

  // Team name now comes directly from Sanity as the display title
  const displayName = block.team || 'Team';

  return (
    <div className="container pt-50 my-12">
      <div className="text-center">
        {/* Team Section Header */}
        <h2 className="text-3xl font-bold text-black mb-12">
          {displayName}
        </h2>
        
        {/* Person */}
        <div className="flex justify-center">
          <div className="flex flex-col items-center max-w-xs">
            {/* Circular Profile Picture */}
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-4">
              {block.profilePicture?.asset?._ref ? (
                <Image
                  src={urlForImage(block.profilePicture)?.url() as string}
                  alt={block.name || 'Team Member'}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">No Photo</span>
                </div>
              )}
            </div>
            
            {/* Name */}
            <h3 className="text-lg font-semibold text-black mb-2">
              {block.name || 'Unnamed'}
            </h3>

            {/* Bio (if needed) */}
            {block.bio && (
              <p className="text-sm text-gray-600 text-center leading-relaxed">
                {block.bio}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}