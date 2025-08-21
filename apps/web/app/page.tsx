import Link from 'next/link';
import { ArrowRight, Shield, Code, Zap, CheckCircle, Download } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
                SchemaMap
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/docs" className="text-gray-600 hover:text-gray-900">Docs</Link>
              <Link href="/cli" className="text-gray-600 hover:text-gray-900">CLI</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
              <Link href="https://github.com/codebruinc/schemamap" className="text-gray-600 hover:text-gray-900">GitHub</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
            Map messy CSVs to Shopify/Stripe in 30 seconds
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Drop your file, pick a template, download a clean, validated CSV. No login. Runs in your browser.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link 
              href="/map?schema=shopify-products"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-2 transition-colors"
            >
              Open Shopify Products Mapper <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/map?schema=shopify-inventory"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-2 transition-colors"
            >
              Open Shopify Inventory Mapper <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/map?schema=stripe-customers"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-2 transition-colors"
            >
              Open Stripe Customers Mapper <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Trust Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>No signup</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              <span>Files stay on your device</span>
            </div>
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-green-500" />
              <span>Open source (MIT)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How it works</h2>
            <p className="text-xl text-gray-600">Three simple steps to clean data</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Drop your CSV</h3>
              <p className="text-gray-600">Upload any messy CSV file. Processing happens entirely in your browser - no data leaves your device.</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Auto-map fields</h3>
              <p className="text-gray-600">Our smart engine matches your headers to the target schema. Review and adjust the mapping as needed.</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Download clean CSV</h3>
              <p className="text-gray-600">Get a validated, properly formatted CSV ready to import into Shopify, Stripe, or any other platform.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Files */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Try with sample files</h2>
          <p className="text-xl text-gray-600 mb-8">Download these sample CSVs to test the mapping tool</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/samples/shopify-products-sample.csv" 
              download
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              Shopify Products Sample
            </a>
            <a 
              href="/samples/shopify-inventory-sample.csv" 
              download
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              Shopify Inventory Sample
            </a>
            <a 
              href="/samples/stripe-customers-sample.csv" 
              download
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              Stripe Customers Sample
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">SchemaMap</h3>
              <p className="text-gray-600 text-sm">Open source CSV mapping tool for Shopify and Stripe.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Tools</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/map?schema=shopify-products" className="text-gray-600 hover:text-gray-900">Shopify Products</Link></li>
                <li><Link href="/map?schema=shopify-inventory" className="text-gray-600 hover:text-gray-900">Shopify Inventory</Link></li>
                <li><Link href="/map?schema=stripe-customers" className="text-gray-600 hover:text-gray-900">Stripe Customers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/docs" className="text-gray-600 hover:text-gray-900">Documentation</Link></li>
                <li><Link href="/cli" className="text-gray-600 hover:text-gray-900">CLI Tool</Link></li>
                <li><Link href="/for-ai" className="text-gray-600 hover:text-gray-900">For AI Assistants</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="text-gray-600 hover:text-gray-900">Privacy</Link></li>
                <li><Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link></li>
                <li><a href="https://github.com/codebruinc/schemamap" className="text-gray-600 hover:text-gray-900">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
            <div className="mb-2">
              Built by <a href="https://codebru.com" className="text-blue-600 hover:text-blue-800 hover:underline" target="_blank" rel="noopener noreferrer">codebru.com</a>
            </div>
            <div>
              © 2025 SchemaMap. Released under MIT License.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}