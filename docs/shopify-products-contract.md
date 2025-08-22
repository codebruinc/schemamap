# Shopify Products CSV Import Contract

**Template Version:** 2025.1.0  
**Rule Version:** 1.0.0  
**Last Verified:** 2025-01-14  

## Authority Sources

This template strictly follows official Shopify documentation:

- [Using CSV files to import and export products](https://help.shopify.com/en/manual/products/import-export/using-csv)
- [Importing products with a CSV file](https://help.shopify.com/en/manual/products/import-export/import-products)
- [Solutions to common product CSV import problems](https://help.shopify.com/en/manual/products/import-export/common-import-issues)

## Headers (Exact Output)

### Required Headers
```csv
Title,Handle,Status,Published,Variant SKU,Variant Price
```

### Complete Header Set
```csv
Title,Handle,Status,Published,Variant SKU,Variant Price,Body (HTML),Vendor,Product Category,Tags,Variant Inventory Qty,Variant Inventory Policy,Image Src
```

## Data Types & Validation

### String Fields
- **Title**: Required, trimmed, no empty values
- **Handle**: Required, trimmed, URL-friendly recommended (lowercase, hyphens)
- **Variant SKU**: Required, trimmed, auto-uppercased
- **Body (HTML)**: Optional, accepts HTML content
- **Vendor**: Optional, trimmed
- **Product Category**: Optional, trimmed
- **Tags**: Optional, trimmed, comma-separated values supported
- **Image Src**: Optional, trimmed, URL format

### Number Fields
- **Variant Price**: Required, numeric only (no currency symbols), ≥ 0
- **Variant Inventory Qty**: Optional, integer, negative allowed for adjustments, range: -999,999 to 999,999

### Boolean Fields
- **Published**: Required, TRUE/FALSE (case-insensitive)
  - **Accepted inputs**: true, false, TRUE, FALSE, 1, 0, yes, no, y, n, on, off
  - **Output format**: TRUE or FALSE

### Enum Fields
- **Status**: Required, case-insensitive → lowercase output
  - **Valid values**: active, draft, archived
- **Variant Inventory Policy**: Optional, case-insensitive → lowercase output
  - **Valid values**: deny, continue

## File Format Requirements

### Encoding & Delimiters
- **Encoding**: UTF-8 only
- **Delimiters**: Comma-separated values
- **Line endings**: LF or CRLF tolerant
- **Quoting**: Fields with commas, quotes, or newlines must be wrapped in double quotes

### Size Limits
- Maximum file size: 15 MB
- Maximum new variants per 24h: 1,000 (non-Plus stores)

## Input Tolerances (Coerced)

### Numeric Coercion
- `19,99` → `19.99` (comma decimal to dot)
- `$29.99` → Error (currency symbols not allowed)
- `  25.00  ` → `25.00` (whitespace trimmed)

### Boolean Coercion
- `true`, `yes`, `1`, `y`, `on` → `TRUE`
- `false`, `no`, `0`, `n`, `off` → `FALSE`
- Case-insensitive matching

### Enum Coercion
- `ACTIVE`, `Active` → `active`
- `DENY`, `Deny` → `deny`

## Business Logic Warnings (Non-Fatal)

1. **unpublished_with_inventory**: Product has inventory but Published=FALSE
2. **zero_price_active**: Active product has $0 price
3. **deny_policy_no_stock**: Inventory policy is "deny" but quantity ≤ 0

## Out of Scope

- Multi-image row handling
- Advanced Shopify taxonomy mapping
- Product variants with complex option structures
- Custom fields beyond standard CSV template

## CLI Help Example

```bash
schemamap map --schema shopify-products --help

SHOPIFY PRODUCTS CSV MAPPER

Required headers: Title, Handle, Status, Published, Variant SKU, Variant Price
Optional headers: Body (HTML), Vendor, Product Category, Tags, Variant Inventory Qty, Variant Inventory Policy, Image Src

Data types:
  - Numbers: decimal notation (19.99), no currency symbols
  - Booleans: TRUE/FALSE (accepts true/false, 1/0, yes/no)
  - Enums: Status (active|draft|archived), Policy (deny|continue)

File requirements:
  - UTF-8 encoding required
  - Comma-separated values
  - Max 15MB file size
  - Quote fields containing commas/newlines

Examples:
  schemamap map --schema shopify-products < input.csv > output.csv
  schemamap validate --schema shopify-products input.csv
```

## Test Coverage

- **Golden fixtures**: Valid minimal and complete examples
- **Red fixtures**: Invalid data that should fail validation with clear messages
- **Fuzz fixtures**: Edge cases (boolean variations, number formats, quoted fields, header synonyms)
- **Round-trip**: Mapping idempotence verification