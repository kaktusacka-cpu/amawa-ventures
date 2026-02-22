import {defineType, defineField} from 'sanity'

const localeStringFields = (name: string, title: string) =>
  defineField({name, title, type: 'localeString'})

const localeTextField = (name: string, title: string) =>
  defineField({name, title, type: 'localeText'})

const localizedCard = defineField({
  name: 'cards',
  title: 'Cards',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        localeStringFields('title', 'Title'),
        localeTextField('description', 'Description'),
        localeStringFields('cta', 'CTA Label'),
      ],
    },
  ],
})

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      initialValue: {current: 'home'},
    }),
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      initialValue: 'Home',
    }),

    // Navigation
    defineField({
      name: 'nav',
      title: 'Navigation',
      type: 'object',
      fields: [
        localeStringFields('about', 'About'),
        localeStringFields('experiences', 'Experiences'),
        localeStringFields('whatWeDo', 'What We Do'),
        localeStringFields('collaborate', 'Collaborate'),
        localeStringFields('getInTouch', 'Get in Touch'),
      ],
    }),

    // Hero
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        localeStringFields('eyebrow', 'Eyebrow'),
        localeStringFields('title', 'Title'),
        localeTextField('lead', 'Lead Text'),
        localeStringFields('thinkWord', 'Think Word'),
        localeStringFields('growWord', 'Grow Word'),
        localeTextField('subLead', 'Sub-lead Text'),
        localeStringFields('primaryCta', 'Primary CTA'),
        localeStringFields('secondaryCta', 'Secondary CTA'),
        localeStringFields('videoPlaceholder', 'Video Placeholder'),
      ],
    }),

    // About
    defineField({
      name: 'about',
      title: 'About Section',
      type: 'object',
      fields: [
        localeStringFields('title', 'Title'),
        localeTextField('description', 'Description'),
      ],
    }),

    // Paths
    defineField({
      name: 'paths',
      title: 'Paths Section',
      type: 'object',
      fields: [localeStringFields('title', 'Title'), localizedCard],
    }),

    // Core Work
    defineField({
      name: 'coreWork',
      title: 'Core Work Section',
      type: 'object',
      fields: [
        localeStringFields('eyebrow', 'Eyebrow'),
        localeStringFields('title', 'Title'),
        localizedCard,
      ],
    }),

    // Approach
    defineField({
      name: 'approach',
      title: 'Approach Section',
      type: 'object',
      fields: [
        localeStringFields('eyebrow', 'Eyebrow'),
        localeStringFields('title', 'Title'),
        localeTextField('description', 'Description'),
      ],
    }),

    // Impact
    defineField({
      name: 'impact',
      title: 'Impact Section',
      type: 'object',
      fields: [
        localeStringFields('eyebrow', 'Eyebrow'),
        localeStringFields('title', 'Title'),
        localeTextField('description', 'Description'),
        defineField({
          name: 'metrics',
          title: 'Metrics',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({name: 'value', title: 'Value', type: 'string'}),
                localeStringFields('label', 'Label'),
              ],
            },
          ],
        }),
      ],
    }),

    // Testimonials
    defineField({
      name: 'testimonials',
      title: 'Testimonials Section',
      type: 'object',
      fields: [
        localeStringFields('eyebrow', 'Eyebrow'),
        localeStringFields('title', 'Title'),
        localeTextField('quote', 'Quote'),
        localeStringFields('author', 'Author'),
        localeStringFields('role', 'Role'),
      ],
    }),

    // Contact
    defineField({
      name: 'contact',
      title: 'Contact Section',
      type: 'object',
      fields: [
        localeStringFields('eyebrow', 'Eyebrow'),
        localeStringFields('title', 'Title'),
        localeStringFields('formName', 'Form Name Placeholder'),
        localeStringFields('formEmail', 'Form Email Placeholder'),
        localeStringFields('formMessage', 'Form Message Placeholder'),
        localeStringFields('formSubmit', 'Form Submit Label'),
        localeStringFields('callTitle', 'Call Section Title'),
        localeTextField('callDescription', 'Call Section Description'),
        localeStringFields('callCta', 'Call CTA'),
        localeStringFields('connectTitle', 'Connect Title'),
        defineField({
          name: 'connectItems',
          title: 'Connect Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({name: 'en', title: 'English', type: 'string'}),
                defineField({name: 'es', title: 'Español', type: 'string'}),
                defineField({name: 'sk', title: 'Slovensky', type: 'string'}),
              ],
            },
          ],
        }),
      ],
    }),

    // Footer
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        localeStringFields('brand', 'Brand Name'),
        localeStringFields('copyright', 'Copyright Text'),
      ],
    }),

    // Additional Pages
    defineField({
      name: 'pages',
      title: 'Additional Pages',
      type: 'object',
      fields: [
        localeStringFields('aboutTitle', 'About Page Title'),
        localeTextField('aboutBody', 'About Page Body'),
        localeStringFields('experiencesTitle', 'Experiences Page Title'),
        localeTextField('experiencesBody', 'Experiences Page Body'),
        localeStringFields('whatWeDoTitle', 'What We Do Page Title'),
        localeTextField('whatWeDoBody', 'What We Do Page Body'),
        localeStringFields('collaborateTitle', 'Collaborate Page Title'),
        localeTextField('collaborateBody', 'Collaborate Page Body'),
      ],
    }),
  ],
})
