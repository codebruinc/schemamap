# Stripe Customers CSV Import Contract

**Template Version:** 2025.1.0  
**Rule Version:** 1.0.0  
**Last Verified:** 2025-01-14  

## Authority Sources

This template follows Stripe Data Management import specifications:

- [Import external data into Stripe](https://docs.stripe.com/stripe-data/import-external-data)
- [Transform external data using Data Templates](https://docs.stripe.com/stripe-data/import-external-data/data-template)
- [Export file formats](https://docs.stripe.com/get-started/data-migrations/export-file-formats)

## Headers (Exact Output)

### Required Headers
```csv
Email
```

### Complete Header Set
```csv
Email,Name,Description,Phone,Address Line 1,Address Line 2,City,State,Postal Code,Country
```

## Data Types & Validation

### String Fields
- **Email**: Required, RFC-compliant validation (permissive), trimmed
- **Name**: Optional, trimmed, full customer name
- **Description**: Optional, trimmed, customer notes/memo
- **Phone**: Optional, trimmed, any format accepted (E.164 suggested)
- **Address Line 1**: Optional, trimmed, primary address
- **Address Line 2**: Optional, trimmed, secondary address (apt, suite, unit)
- **City**: Optional, trimmed
- **State**: Optional, trimmed, state/province/region
- **Postal Code**: Optional, trimmed, auto-uppercased, 3-12 characters
- **Country**: Optional, trimmed, auto-uppercased, accepts ISO-2 codes or common names

## Email Validation Rules

### Format Requirements
- Must contain exactly one @ symbol
- Local part (before @) cannot be empty
- Domain part (after @) cannot be empty
- Domain must contain at least one dot
- No consecutive dots in domain
- Maximum length: 254 characters
- Minimum length: 5 characters (a@b.c)

### Character Validation
- Allows: letters, numbers, dots, hyphens, underscores, and common symbols
- Uses RFC-compliant regex pattern
- Detailed error messages for specific format issues

## Phone Validation

### Format Tolerance
- **Length**: 7-20 characters accepted
- **Format**: Any format accepted (not prescriptive)
- **Suggestion**: E.164 format recommended (+1-555-123-4567)
- **Validation**: Must contain at least one digit
- **Examples**: +1-555-123-4567, (555) 123-4567, 555.123.4567

## Country Code Handling

### Input Formats Accepted
- **ISO-2 codes**: US, CA, GB, DE, etc.
- **Common names**: United States, Canada, United Kingdom, etc.
- **Case-insensitive**: us, US, united states → normalized

### Validation Rules
- Minimum length: 2 characters
- Maximum length: 56 characters (longest country name)
- Auto-normalized to uppercase
- Warns on unknown/suspicious values

## Address Validation

### Postal Code Requirements
- **Length**: 3-12 characters
- **Format**: Alphanumeric, spaces, hyphens allowed
- **Examples**: 90210, K1A 0A9, SW1A 1AA, 12345-6789
- **Auto-normalization**: Uppercase, trimmed

### Address Line Requirements
- **Optional**: All address fields are optional
- **Trimmed**: Whitespace collapsed and trimmed
- **Length**: Reasonable limits for international addresses

## File Format Requirements

### Encoding & Delimiters
- **Encoding**: UTF-8 required
- **Delimiters**: Comma-separated values
- **Line endings**: LF preferred (\n, not \r\n)
- **Quoting**: All fields containing commas must be wrapped in double quotes
- **Empty fields**: Left entirely empty (no character between delimiters)

### CSV Standards
- Header row required
- Fields with commas, quotes, or newlines must be quoted
- Double quotes inside quoted fields must be escaped as ""

## Input Tolerances (Coerced)

### Email Normalization
- Trimmed whitespace
- Case-insensitive domain validation
- Permissive character acceptance

### Address Normalization
- Trimmed whitespace
- Collapsed multiple spaces
- Uppercased postal codes and country codes

## Business Logic Warnings (Non-Fatal)

1. **minimal_customer_info**: Customer has only email - consider adding name or phone
2. **test_email_detected**: Email appears to be test/example address (contains test, example, demo)
3. **address_format_mismatch**: US customer but address missing house number

## Out of Scope

- Advanced email deliverability validation
- Phone number format standardization to E.164
- Address geocoding or validation
- Custom fields beyond standard customer attributes
- Payment method imports
- Subscription data imports

## CLI Help Example

```bash
schemamap map --schema stripe-customers --help

STRIPE CUSTOMERS CSV MAPPER

Required headers: Email
Optional headers: Name, Description, Phone, Address Line 1, Address Line 2, City, State, Postal Code, Country

Data types:
  - Email: RFC-compliant format required
  - Phone: any format accepted (E.164 suggested)
  - Country: ISO-2 codes or common names (auto-normalized)
  - Postal Code: 3-12 characters, auto-uppercased

File requirements:
  - UTF-8 encoding required
  - Comma-delimited values
  - Quote fields containing commas
  - Empty fields left entirely empty

Examples:
  schemamap map --schema stripe-customers < input.csv > output.csv
  schemamap validate --schema stripe-customers input.csv
```

## Test Coverage

- **Golden fixtures**: Valid minimal and complete customer records
- **Red fixtures**: Invalid emails, missing required fields
- **Email validation**: Missing @, multiple @, invalid domains, malformed addresses
- **Business warnings**: Test emails, minimal info, address format issues
- **International data**: Various country codes, postal formats, phone numbers