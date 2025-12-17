export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },

    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },

    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'categoryTool'}], // categoryTool schema
      validation: (Rule) => Rule.required(),
    },

    {
      name: 'thumb',
      title: 'Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },

    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    },

    {
      name: 'discount',
      title: 'Discount (%)',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(100),
    },

    {
      name: 'demoUrl',
      title: 'Demo URL',
      type: 'url',
      description: 'Optional demo or preview link',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
          allowRelative: false,
        }),
    },

    {
      name: 'accessType',
      title: 'Access Type',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              {title: 'Cloud', value: 'cloud'},
              {title: 'Extension', value: 'extension'},
              {title: 'Credential', value: 'credential'},
              {title: 'Software', value: 'software'},
            ],
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    },

    {
      name: 'sources',
      title: 'Sources',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            // TYPE
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Image', value: 'img'},
                  {title: 'Video', value: 'video'},
                ],
                layout: 'radio',
              },
              validation: (Rule) => Rule.required(),
            },

            // IMAGE UPLOAD (only when type === img)
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              hidden: ({parent}) => parent?.type !== 'img',
            },

            // VIDEO FILE UPLOAD (only when type === video)

            // VIDEO URL (only when type === video)
            {
              name: 'videoUrl',
              title: 'Video URL (YouTube / Vimeo)',
              type: 'url',
              validation: (Rule) =>
                Rule.uri({
                  scheme: ['http', 'https'],
                }),
              hidden: ({parent}) => parent?.type !== 'video',
            },
          ],

          preview: {
            select: {
              type: 'type',
              image: 'image',
            },
            prepare(selection) {
              const {type, image} = selection
              return {
                title: type === 'img' ? 'Image Source' : 'Video Source',
                media: image,
              }
            },
          },
        },
      ],
    },

    {
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'q',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'a',
              title: 'Answer',
              type: 'text',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    },

    {
      name: 'refund',
      title: 'Refund Available',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {hotspot: true},
        },
      ],
      description: 'Product description / details',
    },
  ],
}
