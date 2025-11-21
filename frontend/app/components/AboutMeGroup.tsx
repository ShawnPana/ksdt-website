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

interface AboutMeGroupProps {
  block: {
    _type: 'aboutMeGroup';
    _key: string;
    team: string;
    people: AboutMeBlock[];
  };
  index: number;
}

export default function AboutMeGroup({ block }: AboutMeGroupProps) {
  if (!block || !block.people || block.people.length === 0) {
    return null;
  }

  return (
    <div className="container my-12">
      <div className="text-center">
        {/* Team Section Header */}
        <h2 className="text-3xl font-bold text-black mb-12">
          {block.team}
        </h2>
        
        {/* People Grid */}
        <div className="flex flex-wrap justify-center gap-8">
          {block.people.map((person) => (
            <div key={person._key} className="flex flex-col items-center max-w-xs">
              {/* Circular Profile Picture */}
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-4">
                {person.profilePicture?.asset?._ref ? (
                  <Image
                    src={urlForImage(person.profilePicture)?.url() as string}
                    alt={person.name || 'Team Member'}
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
                {person.name || 'Unnamed'}
              </h3>

              {/* Bio (if needed) */}
              {person.bio && (
                <p className="text-sm text-gray-600 text-center leading-relaxed">
                  {person.bio}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}