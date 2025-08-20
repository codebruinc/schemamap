export type Field = {
  key: string;
  label: string;
  required?: boolean;
  type: 'string' | 'number' | 'boolean' | 'enum';
  enumValues?: string[];
  transform?: ('trim' | 'upper' | 'number' | 'boolean')[];
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

export type ValidationResult = {
  okCount: number;
  errorCount: number;
  sampleErrors: ValidationError[];
};

export type MappingResult = {
  headers: string[];
  rows: any[];
};

export type GuessMappingResult = Record<string, string>; // targetKey -> sourceHeader