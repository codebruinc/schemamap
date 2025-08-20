import { Template } from '../types';

export const shopifyInventoryTemplate: Template = {
  key: 'shopify-inventory',
  title: 'Shopify Inventory',
  notes: [
    'Available can be negative for adjustments',
    'Location defaults to "default" if not specified',
    'SKU will be automatically uppercased',
  ],
  fields: [
    {
      key: 'variant_sku',
      label: 'Variant SKU',
      required: true,
      type: 'string',
      transform: ['trim', 'upper'],
      synonyms: ['sku', 'product sku'],
    },
    {
      key: 'available',
      label: 'Available',
      required: true,
      type: 'number',
      transform: ['number'],
      synonyms: ['qty', 'stock', 'on hand', 'quantity', 'inventory'],
    },
    {
      key: 'location',
      label: 'Location',
      type: 'string',
      transform: ['trim'],
      synonyms: ['warehouse', 'store', 'location name'],
    },
    {
      key: 'cost',
      label: 'Cost',
      type: 'number',
      transform: ['number'],
      synonyms: ['unit cost', 'cost per item', 'wholesale cost'],
    },
  ],
};