import { Copy, Download, Terminal } from 'lucide-react';
import Link from 'next/link';

export default function CLIPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-gray-900">SchemaMap</Link>
            <span>/</span>
            <span className="text-gray-900">CLI</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900">CLI Tool</h1>
          <p className="text-gray-600 mt-2">
            Process unlimited CSV files locally with the SchemaMap command-line tool
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Installation */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Download className="w-6 h-6" />
              Installation
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Install globally with npm:</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                  npm install -g @schemamap/cli
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Verify installation:</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                  schemamap --version
                </div>
              </div>
            </div>
          </section>

          {/* Basic Usage */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Terminal className="w-6 h-6" />
              Basic Usage
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">1. Generate a mapping file</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                  schemamap guess --schema shopify-products &lt; input.csv &gt; mapping.json
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">2. Apply the mapping</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                  schemamap map --schema shopify-products --mapping mapping.json &lt; input.csv &gt; output.csv
                </div>
              </div>
            </div>
          </section>

          {/* Examples for All Schemas */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Examples for All Schemas</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3 text-blue-600">Shopify Products</h3>
                <p className="text-gray-600 mb-2">Map product catalog data to Shopify's import format:</p>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm space-y-2">
                  <div># Auto-detect mappings and validate</div>
                  <div>schemamap map --schema shopify-products &lt; products.csv &gt; shopify_products.csv</div>
                  <div></div>
                  <div># With custom mapping file</div>
                  <div>schemamap map --schema shopify-products --mapping custom_mapping.json &lt; products.csv &gt; shopify_products.csv</div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3 text-green-600">Shopify Inventory</h3>
                <p className="text-gray-600 mb-2">Update inventory levels and locations:</p>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm space-y-2">
                  <div># Process inventory updates</div>
                  <div>schemamap map --schema shopify-inventory &lt; stock_levels.csv &gt; shopify_inventory.csv</div>
                  <div></div>
                  <div># Validate without output</div>
                  <div>schemamap validate --schema shopify-inventory &lt; stock_levels.csv</div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3 text-purple-600">Stripe Customers</h3>
                <p className="text-gray-600 mb-2">Import customer data to Stripe:</p>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm space-y-2">
                  <div># Map customer records</div>
                  <div>schemamap map --schema stripe-customers &lt; contacts.csv &gt; stripe_customers.csv</div>
                  <div></div>
                  <div># Generate mapping for review</div>
                  <div>schemamap guess --schema stripe-customers &lt; contacts.csv &gt; customer_mapping.json</div>
                </div>
              </div>
            </div>
          </section>

          {/* Advanced Features */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Advanced Features</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Process large files (no row limit):</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                  schemamap map --schema shopify-products &lt; large_catalog_1M_rows.csv &gt; output.csv
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Validate without output:</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                  schemamap validate --schema shopify-products &lt; input.csv
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Export errors to CSV:</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                  schemamap map --schema shopify-products --errors errors.csv &lt; input.csv &gt; output.csv
                </div>
              </div>
            </div>
          </section>

          {/* Help */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Help</h2>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
              schemamap --help
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}