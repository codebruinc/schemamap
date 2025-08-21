export type Field = {
  key: string;
  label: string;
  required?: boolean;
  type: 'string' | 'number' | 'boolean' | 'enum';
  enumValues?: string[];
  transform?: ('trim' | 'upper' | 'lower' | 'number' | 'boolean')[];
  synonyms?: string[];
};

export type Template = {
  key: 'shopify-products' | 'shopify-inventory' | 'stripe-customers';
  title: string;
  fields: Field[];
  notes: string[];
};

export type ValidationError = {
  row: number;
  field: string;
  issue: string;
  value?: any;
};

export type BusinessWarning = {
  row: number;
  type: 'unpublished_with_inventory' | 'zero_price_active' | 'deny_policy_no_stock';
  message: string;
};

export type ValidationResult = {
  okCount: number;
  errorCount: number;
  sampleErrors: ValidationError[];
  businessWarnings?: BusinessWarning[];
};

export type MappingResult = {
  headers: string[];
  rows: any[];
};

export type GuessMappingResult = Record<string, string>; // targetKey -> sourceHeader