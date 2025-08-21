import Link from 'next/link';
import { ArrowRight, Download, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopify Inventory CSV Mapper — SchemaMap',
  description: 'Step-by-step guide to map and validate your Shopify Inventory CSV using SchemaMap',
};

export default function ShopifyInventoryDocsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to map a CSV to Shopify Inventory",
    "step": [
      {"@type":"HowToStep","text":"Export your inventory CSV or prepare your source file"},
      {"@type":"HowToStep","text":"Open the mapper: https://schemamap.app/map?schema=shopify-inventory"},
      {"@type":"HowToStep","text":"Check the auto-mapped fields; fix any unmapped ones"},
      {"@type":"HowToStep","text":"Review errors (negative available quantities, missing SKUs)"},
      {"@type":"HowToStep","text":"Download the validated CSV and import to Shopify"}
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <Link href="/" className="hover:text-gray-900">Home</Link>
              <span>/</span>
              <Link href="/docs" className="hover:text-gray-900">Docs</Link>
              <span>/</span>
              <span className="text-gray-900">Shopify Inventory CSV Mapper</span>
            </nav>
            <h1 className="text-3xl font-bold text-gray-900">
              Shopify Inventory CSV Mapper — SchemaMap
            </h1>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <ArrowRight className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold text-blue-900">Quick Start</h2>
            </div>
            <p className="text-blue-800 mb-4">
              Skip the reading and start mapping your inventory CSV right now:
            </p>
            <Link 
              href="/map?schema=shopify-inventory#sample=inventory"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors"
            >
              Try Sample Inventory CSV <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          <div className="prose max-w-none">
            <h2>Step-by-step process</h2>
            
            <h3>1. Export your inventory CSV or prepare your source file</h3>
            <p>
              You can map any CSV with inventory data. Common sources include:
            </p>
            <ul>
              <li>Existing Shopify inventory export (Products → Export → CSV)</li>
              <li>Warehouse management system exports</li>
              <li>Supplier inventory feeds</li>
              <li>Manual inventory spreadsheets</li>
            </ul>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <h4 className="text-base font-semibold mb-2">💡 Pro tip</h4>
              <p className="text-sm text-gray-600 mb-3">
                Don't have a CSV to test? Download our sample file:
              </p>
              <a 
                href="/samples/shopify-inventory-sample.csv"
                download
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                Download sample inventory CSV
              </a>
            </div>

            <h3>2. Open the mapper</h3>
            <p>
              <Link href="/map?schema=shopify-inventory" className="text-blue-600 hover:underline font-medium">
                Open the Shopify Inventory mapper
              </Link> and upload your CSV. The tool will:
            </p>
            <ul>
              <li>Parse your file in the browser (never uploaded to our servers)</li>
              <li>Auto-detect column mappings using smart fuzzy matching</li>
              <li>Show you a preview of mapped fields</li>
            </ul>

            <h3>3. Check the auto-mapped fields; fix any unmapped ones</h3>
            <p>
              Review the mapping table. Required fields are highlighted in red if unmapped. 
              Common mappings our tool recognizes:
            </p>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-medium">Target Field</th>
                    <th className="text-left p-3 font-medium">Common Source Names</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-3 font-medium">Variant SKU</td>
                    <td className="p-3 text-gray-600">sku, product sku</td>
                  </tr>
                  <tr className="border-t bg-gray-50">
                    <td className="p-3 font-medium">Available</td>
                    <td className="p-3 text-gray-600">qty, stock, on hand, quantity, inventory</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3 font-medium">Location</td>
                    <td className="p-3 text-gray-600">warehouse, store, location name</td>
                  </tr>
                  <tr className="border-t bg-gray-50">
                    <td className="p-3 font-medium">Cost</td>
                    <td className="p-3 text-gray-600">unit cost, cost per item, wholesale cost</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>4. Review errors (negative available quantities, missing SKUs)</h3>
            <p>
              The validator will check for common issues:
            </p>
            <ul>
              <li><strong>Required fields missing:</strong> Variant SKU, Available</li>
              <li><strong>Invalid quantities:</strong> Available must be numeric (can be negative for adjustments)</li>
              <li><strong>Missing SKUs:</strong> Each row must have a variant SKU</li>
              <li><strong>Invalid costs:</strong> Cost must be numeric if provided</li>
            </ul>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Common fixes</h4>
              <ul className="text-yellow-800 text-sm space-y-1">
                <li><strong>SKUs will be automatically uppercased</strong> for consistency.</li>
                <li><strong>Location defaults to "default"</strong> if not specified.</li>
                <li><strong>Available can be negative</strong> for inventory adjustments.</li>
                <li><strong>Remove currency symbols</strong> from cost fields ($, €, etc.)</li>
              </ul>
            </div>

            <h3>5. Download the validated CSV and import to Shopify</h3>
            <p>
              Once validation passes, download your clean CSV. You can then:
            </p>
            <ul>
              <li>Import directly to Shopify via Products → Import</li>
              <li>Use it with inventory management systems</li>
              <li>Save the mapping.json file to reuse with similar data</li>
            </ul>

            <h2>Advanced usage</h2>
            
            <h3>Save and reuse mappings</h3>
            <p>
              If you regularly import similar CSV files, download the mapping.json file. 
              You can then use our CLI tool for automated processing:
            </p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
              <code>schemamap map --schema shopify-inventory --mapping mapping.json &lt; input.csv &gt; output.csv</code>
            </pre>

            <h3>Bulk processing</h3>
            <p>
              For files larger than 2,000 rows, use the <Link href="/cli" className="text-blue-600 hover:underline">CLI tool</Link> which 
              has no size limits and processes files locally.
            </p>

            <h2>Need help?</h2>
            <p>
              <Link href="https://github.com/codebruinc/schemamap/issues" className="text-blue-600 hover:underline">
                Open an issue on GitHub
              </Link> if you encounter problems or need support for additional CSV formats.
            </p>
          </div>
        </main>
      </div>
    </>
  );
}