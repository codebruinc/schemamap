import { shopifyProductsTemplate } from './shopify-products';
import { shopifyInventoryTemplate } from './shopify-inventory';
import { stripeCustomersTemplate } from './stripe-customers';

export const templates = {
  'shopify-products': shopifyProductsTemplate,
  'shopify-inventory': shopifyInventoryTemplate,
  'stripe-customers': stripeCustomersTemplate,
} as const;

export { shopifyProductsTemplate, shopifyInventoryTemplate, stripeCustomersTemplate };

export type TemplateKey = keyof typeof templates;