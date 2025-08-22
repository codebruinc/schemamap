# Awesome List PR Templates

## 1. Awesome Shopify PR

**Target:** https://github.com/julionc/awesome-shopify

**Section:** Under "Tools and Utilities"

**PR Title:** Add SchemaMap - CSV to Shopify Products/Inventory mapper

**PR Description:**
```
Add SchemaMap — browser CSV mapper & validator for Shopify (MIT)

SchemaMap is a privacy-focused tool that maps messy CSV files to proper Shopify formats:
- Shopify Products CSV (with variants, pricing, inventory)
- Shopify Inventory CSV (stock levels, locations)
- Browser-only processing (files never leave your device)
- Smart auto-mapping with validation
- CLI available for automation

Features:
- No login required
- Direct links: /map/shopify-products, /map/shopify-inventory
- Open source (MIT)
- Sample CSVs included

Repo: https://github.com/codebruinc/schemamap
Live: https://schemamap.app
```

**Content to add:**
```md
- [SchemaMap](https://schemamap.app) - Browser CSV mapper for Shopify Products/Inventory with smart auto-mapping and validation. No login, privacy-safe. ([Source](https://github.com/codebruinc/schemamap))
```

---

## 2. Awesome CSV PR

**Target:** https://github.com/secretGeek/AwesomeCSV

**Section:** Under "Tools for Dealing with CSV" → "Convert to/from CSV"

**PR Title:** Add SchemaMap - CSV mapper for Shopify/Stripe schemas

**PR Description:**
```
Add SchemaMap — CSV mapper & validator for ecommerce platforms

SchemaMap converts messy CSV files to proper formats for:
- Shopify Products (with variants, inventory, pricing)
- Shopify Inventory (stock levels, locations)  
- Stripe Customers (billing, shipping addresses)

Key features:
- Browser-only processing (privacy-safe)
- Smart fuzzy header matching
- Comprehensive validation with error reporting
- CLI for automation and large files
- Open source (MIT licensed)

Perfect for data migration, bulk imports, and CSV cleanup.

Repo: https://github.com/codebruinc/schemamap
Live: https://schemamap.app
```

**Content to add:**
```md
- [SchemaMap](https://schemamap.app) - Map CSV files to Shopify/Stripe schemas with smart auto-mapping and validation. Browser-only processing. ([Source](https://github.com/codebruinc/schemamap))
```

---

## 3. Awesome Stripe PR

**Target:** https://github.com/Derjyn/awesome-stripe

**Section:** Under "Resources" → "Data Migration / Import Tools" (or create new section)

**PR Title:** Add SchemaMap - CSV to Stripe Customers mapper

**PR Description:**
```
Add SchemaMap — CSV mapper for Stripe Customers import

SchemaMap helps migrate customer data to Stripe by mapping CSV files to proper Stripe Customer format:
- Customer email, name, description
- Billing and shipping addresses  
- Phone numbers and metadata
- Smart header detection and validation

Features:
- Browser-only processing (no data upload)
- Fuzzy header matching (handles various CSV formats)
- Validation with specific error reporting
- CLI for bulk processing
- Open source (MIT)

Great for migrating from other platforms or cleaning up customer data before Stripe import.

Repo: https://github.com/codebruinc/schemamap
Live: https://schemamap.app/map/stripe-customers
```

**Content to add:**
```md
- [SchemaMap](https://schemamap.app) - CSV mapper for Stripe Customers with auto-mapping and validation. Browser-only, privacy-safe. ([Source](https://github.com/codebruinc/schemamap))
```

---

## Execution Steps:

1. **Fork each repository**
2. **Create branch** (e.g., `add-schemamap`)
3. **Add the content** to appropriate section
4. **Submit PR** with the template description
5. **Be patient** - maintainers review when they can

## GitHub Action Marketplace

The action is now tagged as `action-v1`. To publish:

1. Go to: https://github.com/codebruinc/schemamap/blob/main/.github/actions/schemamap-validate/action.yml
2. You should see a banner saying "Publish this Action to the GitHub Marketplace"
3. Click it and follow the publishing flow
4. Choose categories: "Testing", "Utilities"
5. Use description: "Validate CSV files against SchemaMap templates (Shopify/Stripe)"

## CLI Publishing (needs npm login)

After `npm login`:
```bash
cd packages/engine
npm publish

cd ../cli  
# Update package.json to use published @schemamap/engine
npm publish
```