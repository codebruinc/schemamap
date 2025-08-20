import { Copy, Download, Terminal } from 'lucide-react';

export default function CLIPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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