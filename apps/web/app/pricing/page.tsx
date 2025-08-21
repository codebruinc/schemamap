'use client';

import { CheckCircle, Code } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Pricing</h1>
          <p className="text-gray-600 mt-2">Free for most. One-off credit for large files.</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Free Tier */}
          <div className="bg-white border-2 border-green-200 rounded-lg p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Free</h2>
              <div className="text-4xl font-bold text-green-600 mb-2">$0</div>
              <p className="text-gray-600">Perfect for most use cases</p>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Process up to 2,000 rows per file</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Unlimited files</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>All schemas (Shopify, Stripe)</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Browser-only processing</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>No signup required</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Download mapping files</span>
              </li>
            </ul>
            
            <Link 
              href="/"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg text-center block transition-colors"
            >
              Start Mapping
            </Link>
          </div>

          {/* Large Files */}
          <div className="bg-white border-2 border-blue-200 rounded-lg p-8 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </span>
            </div>
            
            <div className="text-center mb-6 mt-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Large File Pass</h2>
              <div className="text-4xl font-bold text-blue-600 mb-2">$5</div>
              <p className="text-gray-600">One-off payment via Stripe</p>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-blue-500" />
                <span>Process up to 250,000 rows</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-blue-500" />
                <span>Valid for 24 hours on this device</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-blue-500" />
                <span>All free features included</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-blue-500" />
                <span>Still browser-only processing</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-blue-500" />
                <span>No account required</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-blue-500" />
                <span>Instant activation</span>
              </li>
            </ul>
            
            <button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              onClick={() => alert('Large file payment coming soon! Use the CLI for unlimited processing.')}
            >
              Buy Large File Pass
            </button>
          </div>

          {/* CLI / Team */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">CLI / Team</h2>
              <div className="text-4xl font-bold text-gray-900 mb-2">Free</div>
              <p className="text-gray-600">Self-hosted or automated</p>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3">
                <Code className="w-5 h-5 text-gray-500" />
                <span>Unlimited file size</span>
              </li>
              <li className="flex items-center gap-3">
                <Code className="w-5 h-5 text-gray-500" />
                <span>Command-line interface</span>
              </li>
              <li className="flex items-center gap-3">
                <Code className="w-5 h-5 text-gray-500" />
                <span>Perfect for automation</span>
              </li>
              <li className="flex items-center gap-3">
                <Code className="w-5 h-5 text-gray-500" />
                <span>Self-host the web version</span>
              </li>
              <li className="flex items-center gap-3">
                <Code className="w-5 h-5 text-gray-500" />
                <span>Open source (MIT)</span>
              </li>
              <li className="flex items-center gap-3">
                <Code className="w-5 h-5 text-gray-500" />
                <span>CI/CD pipeline ready</span>
              </li>
            </ul>
            
            <Link
              href="/cli"
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg text-center block transition-colors"
            >
              Get CLI Tool
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Why is the basic version free?</h3>
              <p className="text-gray-600 text-sm">
                We believe data mapping should be accessible to everyone. The free tier covers most small 
                to medium business needs while being completely privacy-safe.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What happens after 24 hours?</h3>
              <p className="text-gray-600 text-sm">
                Your large file pass expires, but you can always use the free CLI tool for unlimited 
                processing, or purchase another pass if you prefer the web interface.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Do you store my payment information?</h3>
              <p className="text-gray-600 text-sm">
                No. All payments are handled by Stripe. We only receive a success/failure notification 
                and generate a temporary token for your browser.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I get a refund?</h3>
              <p className="text-gray-600 text-sm">
                Since the large file pass activates immediately and works entirely in your browser, 
                we cannot offer refunds. Try the free version first to ensure it meets your needs.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}