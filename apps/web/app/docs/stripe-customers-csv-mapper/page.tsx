import Link from 'next/link';
import { ArrowRight, Download, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stripe Customers CSV Mapper — SchemaMap',
  description: 'Step-by-step guide to map and validate your Stripe Customers CSV using SchemaMap',
  openGraph: {
    title: 'Stripe Customers CSV Mapper — SchemaMap',
    description: 'Step-by-step guide to map and validate your Stripe Customers CSV using SchemaMap',
    url: 'https://schemamap.app/docs/stripe-customers-csv-mapper',
    siteName: 'SchemaMap',
    type: 'article',
  },
  twitter: {
    card: 'summary',
    title: 'Stripe Customers CSV Mapper — SchemaMap',
    description: 'Step-by-step guide to map and validate your Stripe Customers CSV using SchemaMap',
  },
};

export default function StripeCustomersDocsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to map a CSV to Stripe Customers",
    "step": [
      {"@type":"HowToStep","text":"Export your customer CSV or prepare your source file"},
      {"@type":"HowToStep","text":"Open the mapper: https://schemamap.app/map?schema=stripe-customers"},
      {"@type":"HowToStep","text":"Check the auto-mapped fields; fix any unmapped ones"},
      {"@type":"HowToStep","text":"Review errors (invalid email formats, missing required fields)"},
      {"@type":"HowToStep","text":"Download the validated CSV and import to Stripe"}
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
              <span className="text-gray-900">Stripe Customers CSV Mapper</span>
            </nav>
            <div className="flex items-center gap-4 mb-4">
              <Link href="/" className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
                SchemaMap
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-xl text-gray-600">Stripe Customers CSV Mapper</span>
            </div>
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
              Skip the reading and start mapping your customer CSV right now:
            </p>
            <Link 
              href="/map?schema=stripe-customers#sample=customers"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors"
            >
              Try Sample Customers CSV <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          <div className="prose max-w-none">
            <h2>Step-by-step process</h2>
            
            <h3>1. Export your customer CSV or prepare your source file</h3>
            <p>
              You can map any CSV with customer data. Common sources include:
            </p>
            <ul>
              <li>Existing Stripe customer export (Dashboard → Customers → Export)</li>
              <li>CRM system exports (Salesforce, HubSpot, etc.)</li>
              <li>E-commerce platform customer data</li>
              <li>Manual customer spreadsheets</li>
            </ul>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <h4 className="text-base font-semibold mb-2">💡 Pro tip</h4>
              <p className="text-sm text-gray-600 mb-3">
                Don't have a CSV to test? Download our sample file:
              </p>
              <a 
                href="/samples/stripe-customers-sample.csv"
                download
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                Download sample customers CSV
              </a>
            </div>

            <h3>2. Open the mapper</h3>
            <p>
              <Link href="/map?schema=stripe-customers" className="text-blue-600 hover:underline font-medium">
                Open the Stripe Customers mapper
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
                    <td className="p-3 font-medium">Email</td>
                    <td className="p-3 text-gray-600">e-mail, email address</td>
                  </tr>
                  <tr className="border-t bg-gray-50">
                    <td className="p-3 font-medium">Name</td>
                    <td className="p-3 text-gray-600">full name, customer name, display name</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3 font-medium">Phone</td>
                    <td className="p-3 text-gray-600">telephone, phone number, mobile</td>
                  </tr>
                  <tr className="border-t bg-gray-50">
                    <td className="p-3 font-medium">Address Line 1</td>
                    <td className="p-3 text-gray-600">addr1, address1, street address, address</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>4. Review errors (invalid email formats, missing required fields)</h3>
            <p>
              The validator will check for common issues:
            </p>
            <ul>
              <li><strong>Required fields missing:</strong> Email (the only required field)</li>
              <li><strong>Invalid email format:</strong> Must be valid email addresses</li>
              <li><strong>Postal code formatting:</strong> Will be automatically uppercased</li>
              <li><strong>Country formatting:</strong> Will be automatically uppercased</li>
            </ul>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Common fixes</h4>
              <ul className="text-yellow-800 text-sm space-y-1">
                <li><strong>Email must be in valid format</strong> (user@domain.com).</li>
                <li><strong>Country should be 2-letter code</strong> (US, CA) or full name.</li>
                <li><strong>Names will be properly capitalized</strong> automatically.</li>
                <li><strong>All address fields are optional</strong> except email.</li>
              </ul>
            </div>

            <h3>5. Download the validated CSV and import to Stripe</h3>
            <p>
              Once validation passes, download your clean CSV. You can then:
            </p>
            <ul>
              <li>Import directly to Stripe via Dashboard → Customers → Import</li>
              <li>Use it with payment processing integrations</li>
              <li>Save the mapping.json file to reuse with similar data</li>
            </ul>

            <h2>Advanced usage</h2>
            
            <h3>Save and reuse mappings</h3>
            <p>
              If you regularly import similar CSV files, download the mapping.json file. 
              You can then use our CLI tool for automated processing:
            </p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
              <code>schemamap map --schema stripe-customers --mapping mapping.json &lt; input.csv &gt; output.csv</code>
            </pre>

            <h3>Bulk processing</h3>
            <p>
              For files larger than 2,000 rows, use the <Link href="/cli" className="text-blue-600 hover:underline">CLI tool</Link> which 
              has no size limits and processes files locally.
            </p>

            <h2>Need help?</h2>
            <p>
              Check out these community discussions about CSV import issues:
            </p>
            <ul>
              <li>
                <a href="https://www.reddit.com/r/shopify/comments/1l9dlb1/problems_with_product_import_csv/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  Reddit: Problems with Product Import CSV
                </a>
              </li>
              <li>
                <a href="https://stackoverflow.com/questions/75590616/cannot-import-csv-product-list-to-shopify" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  Stack Overflow: Cannot import .CSV product list to Shopify
                </a>
              </li>
              <li>
                <a href="https://stackoverflow.com/questions/61882068/shopify-products-import-csv-validation-error-invalid-file" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  Stack Overflow: Shopify Products Import CSV Validation error invalid file
                </a>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </>
  );
}