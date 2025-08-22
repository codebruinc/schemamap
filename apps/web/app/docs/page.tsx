import Link from 'next/link';
import { FileText, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documentation — SchemaMap',
  description: 'Complete guides for mapping CSV files to Shopify Products, Inventory, and Stripe Customers',
};

export default function DocsPage() {
  const guides = [
    {
      title: 'Shopify Products CSV Mapper',
      description: 'Map product catalogs, fix pricing errors, handle variants and inventory',
      href: '/docs/shopify-products-csv-mapper',
      color: 'green',
      tryLink: '/map?schema=shopify-products#sample=products'
    },
    {
      title: 'Shopify Inventory CSV Mapper', 
      description: 'Update stock levels, manage locations, handle inventory adjustments',
      href: '/docs/shopify-inventory-csv-mapper',
      color: 'blue',
      tryLink: '/map?schema=shopify-inventory#sample=inventory'
    },
    {
      title: 'Stripe Customers CSV Mapper',
      description: 'Import customer data, validate emails, format addresses',
      href: '/docs/stripe-customers-csv-mapper', 
      color: 'purple',
      tryLink: '/map?schema=stripe-customers#sample=customers'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-gray-900">SchemaMap</Link>
            <span>/</span>
            <span className="text-gray-900">Documentation</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
              SchemaMap
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-xl text-gray-600">Documentation</span>
          </div>
          <p className="text-gray-600 mt-2">
            Step-by-step guides for mapping your CSV files to Shopify and Stripe schemas
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-6">
          {guides.map((guide) => (
            <div key={guide.href} className="bg-white rounded-lg shadow border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${
                  guide.color === 'green' ? 'bg-green-100' :
                  guide.color === 'blue' ? 'bg-blue-100' : 'bg-purple-100'
                }`}>
                  <FileText className={`w-6 h-6 ${
                    guide.color === 'green' ? 'text-green-600' :
                    guide.color === 'blue' ? 'text-blue-600' : 'text-purple-600'
                  }`} />
                </div>
                
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {guide.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {guide.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    <Link 
                      href={guide.href}
                      className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium"
                    >
                      Read Guide <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link 
                      href={guide.tryLink}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white transition-colors ${
                        guide.color === 'green' ? 'bg-green-600 hover:bg-green-700' :
                        guide.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' : 
                        'bg-purple-600 hover:bg-purple-700'
                      }`}
                    >
                      Try Sample CSV
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">Quick Links</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-blue-900 mb-2">Tools</h3>
              <ul className="space-y-1 text-blue-800">
                <li><Link href="/cli" className="hover:underline">CLI Tool Documentation</Link></li>
                <li><Link href="/pricing" className="hover:underline">Pricing & Limits</Link></li>
                <li><Link href="/for-ai" className="hover:underline">For AI Assistants</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-blue-900 mb-2">Support</h3>
              <ul className="space-y-1 text-blue-800">
                <li><Link href="https://github.com/codebruinc/schemamap" className="hover:underline">GitHub Repository</Link></li>
                <li><a href="https://www.reddit.com/r/shopify/comments/1l9dlb1/problems_with_product_import_csv/" className="hover:underline" target="_blank" rel="noopener noreferrer">Community Help</a></li>
                <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="mt-8 bg-gray-100 rounded-lg p-4">
          <p className="text-sm text-gray-600 text-center">
            🔒 All processing happens in your browser. Your CSV files are never uploaded to our servers.
          </p>
        </div>
      </main>
    </div>
  );
}