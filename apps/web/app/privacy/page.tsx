export const dynamic = 'force-dynamic';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose max-w-none">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-green-900 mb-2">🔒 Privacy-first by design</h2>
            <p className="text-green-800">
              SchemaMap processes your CSV files entirely in your browser. Your data never leaves your device 
              unless you explicitly choose to use optional paid features.
            </p>
          </div>

          <h2>What we collect</h2>
          
          <h3>Browser-only processing (Free version)</h3>
          <ul>
            <li><strong>Your CSV data:</strong> Never uploaded to our servers. Processed entirely in your browser using JavaScript.</li>
            <li><strong>Mappings:</strong> Only stored in your browser's URL hash and localStorage if you choose to save them.</li>
            <li><strong>Analytics:</strong> We do not use any analytics or tracking on the free version.</li>
          </ul>

          <h3>Optional paid features</h3>
          <ul>
            <li><strong>Large file processing:</strong> If you purchase a one-off credit for large files, we process payment through Stripe but do not store your personal information.</li>
            <li><strong>Payment data:</strong> Handled entirely by Stripe. We only receive a success/failure notification.</li>
            <li><strong>Token storage:</strong> A temporary token is stored in your browser's localStorage for 24 hours to unlock large file processing.</li>
          </ul>

          <h2>What we don't do</h2>
          <ul>
            <li>❌ Upload your CSV files to servers</li>
            <li>❌ Store your business data</li>
            <li>❌ Track you across the web</li>
            <li>❌ Require user accounts or logins</li>
            <li>❌ Sell your data to third parties</li>
            <li>❌ Use cookies for tracking (only functional localStorage)</li>
          </ul>

          <h2>Data retention</h2>
          <ul>
            <li><strong>CSV files:</strong> Never stored on our servers</li>
            <li><strong>Mappings:</strong> Only stored locally in your browser</li>
            <li><strong>Payment records:</strong> Handled by Stripe according to their privacy policy</li>
            <li><strong>Tokens:</strong> Automatically expire after 24 hours</li>
          </ul>

          <h2>Open source transparency</h2>
          <p>
            SchemaMap is fully open source under the MIT license. You can review our code, 
            host your own instance, or contribute improvements on{' '}
            <a href="https://github.com/codebruinc/schemamap" className="text-blue-600 hover:underline">
              GitHub
            </a>.
          </p>

          <h2>CLI tool</h2>
          <p>
            Our command-line tool processes files entirely on your local machine with no network 
            connectivity required. It includes the same mapping templates and validation logic 
            as the web version.
          </p>

          <h2>Questions or concerns</h2>
          <p>
            If you have questions about this privacy policy, please{' '}
            <a href="https://github.com/codebruinc/schemamap/issues" className="text-blue-600 hover:underline">
              open an issue on GitHub
            </a>.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8">
            <p className="text-sm text-gray-600">
              Last updated: December 2024<br/>
              This privacy policy may be updated as we add new features, but our core commitment 
              to privacy-first, browser-only processing will remain unchanged.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}