# Shopify Inventory CSV Import Contract

**Template Version:** 2025.1.0  
**Rule Version:** 1.0.0  
**Last Verified:** 2025-01-14  

## Authority Sources

This template strictly follows official Shopify documentation:

- [Exporting or importing inventory with a CSV file](https://help.shopify.com/en/manual/products/inventory/getting-started-with-inventory/inventory-csv)
- [Using CSV files to import and export products](https://help.shopify.com/en/manual/products/import-export/using-csv)

## Headers (Exact Output)

### Required Headers
```csv
Variant SKU,Available
```

### Complete Header Set
```csv
Variant SKU,Available,Location,Cost
```

### Multi-Location Format
For stores with multiple locations, additional columns may include:
- Location-specific quantity columns
- On hand, Available, Unavailable, Committed, Incoming columns

## Data Types & Validation

### String Fields
- **Variant SKU**: Required, trimmed, auto-uppercased
- **Location**: Optional, trimmed, defaults to "default" if not specified

### Number Fields
- **Available**: Required, integer, negative allowed for adjustments, range: -999,999 to 999,999
- **Cost**: Optional, numeric (decimal), unit cost per item

## File Format Requirements

### Encoding & Delimiters
- **Encoding**: UTF-8 only
- **Delimiters**: Comma-separated values
- **Line endings**: LF or CRLF tolerant
- **Quoting**: Fields with commas must be wrapped in double quotes

### Import Behavior
- Updates "On hand" inventory quantities only
- Does not override other inventory state quantities
- Available inventory calculated based on imported On hand values

## Multi-Location Requirements

### Location Handling
- **Single location**: Use Variant Inventory Qty column
- **Multi-location**: Use separate CSV with Location column
- **Separate rows per location**: Each SKU/location combination requires its own row
- **Case sensitivity**: Location names are case-sensitive and must match existing locations

### Column Headers for Multi-Location
- Legacy format: `<Name of location>` column headers
- Modern format: Location column with quantity columns

## Input Tolerances (Coerced)

### Numeric Coercion
- `  -50  ` → `-50` (whitespace trimmed)
- `100,00` → `100.00` (comma decimal to dot)
- Leading zeros preserved for SKUs, stripped for numbers

## Business Logic Warnings (Non-Fatal)

1. **large_negative_inventory**: Large negative inventory (< -100) - verify intentional adjustment
2. **high_qty_no_cost**: Large quantity adjustment (>100) but no unit cost specified

## Out of Scope

- Complex inventory tracking states
- Automated location creation
- Bulk location management
- Historical inventory audit trails

## CLI Help Example

```bash
schemamap map --schema shopify-inventory --help

SHOPIFY INVENTORY CSV MAPPER

Required headers: Variant SKU, Available
Optional headers: Location, Cost

Data types:
  - SKU: text, auto-uppercased
  - Available: integer, negative allowed for adjustments
  - Cost: decimal number for unit cost

Multi-location:
  - Use separate rows for each SKU/location combination
  - Location names are case-sensitive
  - Defaults to "default" location if not specified

File requirements:
  - UTF-8 encoding required
  - Comma-separated values
  - Import updates "On hand" quantities only

Examples:
  schemamap map --schema shopify-inventory < input.csv > output.csv
  schemamap validate --schema shopify-inventory input.csv
```

## Test Coverage

- **Golden fixtures**: Valid minimal and complete inventory adjustments
- **Red fixtures**: Invalid numbers, missing required fields
- **Business warnings**: Large negative adjustments, high quantity without cost
- **Multi-location scenarios**: Location-specific inventory updates