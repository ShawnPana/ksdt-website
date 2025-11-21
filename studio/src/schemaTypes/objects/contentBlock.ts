import {defineType, defineField} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export const contentBlock = defineType({
  name: 'contentBlock',
  title: 'Text Content',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      content: 'content',
    },
    prepare({content}) {
      const text = content
        ?.filter((block: any) => block._type === 'block')
        .map((block: any) => block.children?.map((child: any) => child.text).join(''))
        .join(' ')
        .slice(0, 100)
      
      return {
        title: text || 'Text Content',
        subtitle: 'Text Block',
      }
    },
  },
})