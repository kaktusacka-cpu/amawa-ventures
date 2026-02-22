import {defineType, defineField} from 'sanity'

export const whatWeDoPage = defineType({
  name: 'whatWeDoPage',
  title: 'What We Do Page',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      initialValue: {current: 'what-we-do'},
    }),
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      initialValue: 'What We Do',
    }),

    // Hero
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({name: 'title', title: 'Title', type: 'localeString'}),
        defineField({name: 'leadText', title: 'Lead Text', type: 'localeText'}),
        defineField({name: 'secondaryText', title: 'Secondary Text', type: 'localeText'}),
        defineField({name: 'ctaLabel', title: 'CTA Label', type: 'localeString'}),
      ],
    }),

    // Areas of work
    defineField({
      name: 'areas',
      title: 'Areas of Work',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'localeString'}),
            defineField({
              name: 'descriptions',
              title: 'Description Paragraphs',
              type: 'array',
              of: [{type: 'localeText'}],
            }),
          ],
        },
      ],
    }),
  ],
})
