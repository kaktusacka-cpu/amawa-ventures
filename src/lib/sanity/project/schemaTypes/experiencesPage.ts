import {defineType, defineField} from 'sanity'

export const experiencesPage = defineType({
  name: 'experiencesPage',
  title: 'Experiences Page',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      initialValue: {current: 'experiences'},
    }),
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      initialValue: 'Experiences',
    }),

    // Hero
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({name: 'title', title: 'Title', type: 'localeString'}),
        defineField({name: 'tagline', title: 'Tagline', type: 'localeText'}),
        defineField({name: 'description', title: 'Description', type: 'localeText'}),
        defineField({name: 'ctaLabel', title: 'CTA Label', type: 'localeString'}),
      ],
    }),

    // Status labels
    defineField({
      name: 'statusLabels',
      title: 'Status Labels',
      type: 'object',
      fields: [
        defineField({name: 'upcoming', title: 'Upcoming Label', type: 'localeString'}),
        defineField({name: 'current', title: 'Current Label', type: 'localeString'}),
      ],
    }),

    // Categories
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'localeString'}),
            defineField({name: 'title', title: 'Title', type: 'localeString'}),
            defineField({name: 'description', title: 'Description', type: 'localeText'}),
            defineField({
              name: 'experiences',
              title: 'Experiences',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({name: 'title', title: 'Title', type: 'localeString'}),
                    defineField({name: 'description', title: 'Description', type: 'localeText'}),
                    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
                    defineField({name: 'imageAlt', title: 'Image Alt Text', type: 'localeString'}),
                    defineField({
                      name: 'isUpcoming',
                      title: 'Is Upcoming?',
                      type: 'boolean',
                      initialValue: false,
                    }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
  ],
})
