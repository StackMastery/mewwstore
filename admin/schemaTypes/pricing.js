import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default {
  name: 'pricing',
  title: 'Pricing',
  type: 'document',
  orderings: [orderRankOrdering],

  fields: [
    // 🔹 Pricing order
    orderRankField({ type: 'pricing' }),

    {
      name: 'name',
      title: 'Plan Name',
      type: 'string',
      validation: Rule => Rule.required(),
    },

    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },

    {
      name: 'price',
      title: 'Price',
      type: 'object',
      fields: [
        {
          name: 'normal',
          title: 'Normal Price',
          type: 'number',
          validation: Rule => Rule.required(),
        },
        {
          name: 'discount',
          title: 'Discount Price',
          type: 'number',
        },
      ],
    },

    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          name: 'featureItem',
          title: 'Feature',
          type: 'object',
          fields: [
            // 🔹 Feature order
            orderRankField({ type: 'featureItem' }),

            {
              name: 'type',
              title: 'Feature Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Product Reference', value: 'product' },
                  { title: 'Custom Feature', value: 'custom' },
                ],
                layout: 'radio',
              },
              validation: Rule => Rule.required(),
            },

            {
              name: 'product',
              title: 'Product',
              type: 'reference',
              to: [{ type: 'product' }],
              hidden: ({ parent }) => parent?.type !== 'product',
            },

            {
              name: 'name',
              title: 'Feature Name',
              type: 'string',
              hidden: ({ parent }) => parent?.type !== 'custom',
            },

            {
              name: 'link',
              title: 'Feature Link',
              type: 'url',
              hidden: ({ parent }) => parent?.type !== 'custom',
            },
          ],
        },
      ],
    },

    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
  ],
}
