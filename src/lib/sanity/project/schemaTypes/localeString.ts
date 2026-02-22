import {defineType} from 'sanity'

export const localeString = defineType({
  name: 'localeString',
  title: 'Localized String',
  type: 'object',
  fields: [
    {name: 'en', title: 'English', type: 'string'},
    {name: 'es', title: 'Español', type: 'string'},
    {name: 'sk', title: 'Slovensky', type: 'string'},
  ],
})

export const localeText = defineType({
  name: 'localeText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    {name: 'en', title: 'English', type: 'text'},
    {name: 'es', title: 'Español', type: 'text'},
    {name: 'sk', title: 'Slovensky', type: 'text'},
  ],
})
