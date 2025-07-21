import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'

export const aboutMe = defineType({
  name: 'aboutMe',
  title: 'About Me',
  type: 'object',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'profilePicture',
      title: 'Profile Picture',
      type: 'image',
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true, // Allows cropping/positioning
      },
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'team',
      title: 'Team',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'Media', value: 'Media'},
          {title: 'Computer Engineering', value: 'Computer Engineering'},
          {title: 'Events', value: 'Events'},
          {title: 'Music', value: 'Music'},
          {title: 'Marketing', value: 'Marketing'},
          {title: 'Audio', value: 'Audio'},
          {title: 'Sports Broadcasting', value: 'Sports Broadcasting'},
          {title: 'Sports Marketing', value: 'Sports Marketing'},
          {title: 'Programming', value: 'Programming'},
          {title: 'General Manager', value: 'General Manager'},
          {title: 'Office Manager', value: 'Office Manager'}
        ],
      },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      validation: (Rule) => Rule.required().max(30),
      description: 'A short bio about this person (max 30 characters)',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'team',
      media: 'profilePicture',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Untitled Person',
        subtitle: `${subtitle || 'No team'} Team`,
        media: media,
      }
    },
  },
})