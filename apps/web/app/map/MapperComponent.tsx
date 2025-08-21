'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import * as Papa from 'papaparse';
import { 
  templates, 
  guessMapping,
  validateRows,
  applyMapping,
  Template,
  GuessMappingResult,
  ValidationResult,
  BusinessWarning 
} from '@schemamap/engine';
import Link from 'next/link';

const LARGE_FILE_LIMIT = 2000;

export default function MapperComponent() {
  const searchParams = useSearchParams();
  const schema = searchParams.get('schema') || 'shopify-products';
  const template = templates[schema as keyof typeof templates] as Template;

  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [mapping, setMapping] = useState<GuessMappingResult>({});
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [showLargeFileModal, setShowLargeFileModal] = useState(false);
  const [transforms, setTransforms] = useState<Record<string, string[]>>({});

  // Load sample CSV if specified in URL hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('#sample=')) {
      const sampleType = hash.split('#sample=')[1];
      
      // Inline 5-row samples for instant loading
      const sampleData = {
        'products': [
          { 'Product Title': 'Wireless Headphones', 'Handle': 'wireless-headphones', 'Status': 'active', 'Published': 'TRUE', 'SKU': 'WH001', 'Price': '89.99', 'Description': 'Premium wireless headphones', 'Vendor': 'AudioTech', 'Category': 'Electronics', 'Stock': '50', 'Inventory Policy': 'continue' },
          { 'Product Title': 'Coffee Mug', 'Handle': 'coffee-mug-ceramic', 'Status': 'active', 'Published': 'FALSE', 'SKU': 'MUG002', 'Price': '12.50', 'Description': 'Ceramic coffee mug', 'Vendor': 'HomeBrew', 'Category': 'Kitchen', 'Stock': '100', 'Inventory Policy': 'continue' },
          { 'Product Title': 'Yoga Mat', 'Handle': 'yoga-mat-premium', 'Status': 'active', 'Published': 'TRUE', 'SKU': 'YM003', 'Price': '0.00', 'Description': 'Premium yoga mat', 'Vendor': 'FitLife', 'Category': 'Sports', 'Stock': '25', 'Inventory Policy': 'continue' },
          { 'Product Title': 'Notebook Set', 'Handle': 'notebook-set-leather', 'Status': 'active', 'Published': 'TRUE', 'SKU': 'NB004', 'Price': '24.99', 'Description': 'Leather notebook set', 'Vendor': 'PaperCraft', 'Category': 'Stationery', 'Stock': '0', 'Inventory Policy': 'deny' },
          { 'Product Title': 'Phone Case', 'Handle': 'phone-case-clear', 'Status': 'active', 'Published': 'TRUE', 'SKU': 'PC005', 'Price': '15.00', 'Description': 'Clear protective case', 'Vendor': 'TechGuard', 'Category': 'Accessories', 'Stock': '200', 'Inventory Policy': 'continue' }
        ],
        'inventory': [
          { 'SKU': 'WH001', 'Available Qty': '45', 'Location': 'Main Warehouse', 'Unit Cost': '35.00' },
          { 'SKU': 'MUG002', 'Available Qty': '-5', 'Location': 'Store A', 'Unit Cost': '4.50' },
          { 'SKU': 'YM003', 'Available Qty': '20', 'Location': 'Main Warehouse', 'Unit Cost': '18.00' },
          { 'SKU': 'NB004', 'Available Qty': '0', 'Location': 'Store B', 'Unit Cost': '8.99' },
          { 'SKU': 'PC005', 'Available Qty': '180', 'Location': 'Distribution Center', 'Unit Cost': '5.50' }
        ],
        'customers': [
          { 'Email': 'john.smith@example.com', 'Full Name': 'John Smith', 'Phone': '+1-555-0123', 'Street Address': '123 Main St', 'Apt': 'Unit 4B', 'City': 'New York', 'State': 'NY', 'ZIP': '10001', 'Country': 'US', 'Notes': 'VIP Customer' },
          { 'Email': 'sarah.doe@company.co.uk', 'Full Name': 'Sarah Doe', 'Phone': '+44-20-7946-0958', 'Street Address': '42 Baker Street', 'City': 'London', 'State': 'England', 'ZIP': 'NW1 6XE', 'Country': 'GB', 'Notes': 'Corporate account' },
          { 'Email': 'mike.davis@tech.ca', 'Full Name': 'Mike Davis', 'Phone': '+1-416-555-0125', 'Street Address': '789 Pine St', 'City': 'Toronto', 'State': 'ON', 'ZIP': 'M5H 2N2', 'Country': 'CA', 'Notes': '' },
          { 'Email': 'emma@startup.io', 'Full Name': 'Emma Chen', 'Phone': '+1-415-555-0199', 'Street Address': '1 Hacker Way', 'City': 'Menlo Park', 'State': 'CA', 'ZIP': '94301', 'Country': 'US', 'Notes': 'Bulk orders' },
          { 'Email': 'invalid-email-format', 'Full Name': 'Alex Brown', 'Phone': '+1-555-0127', 'Street Address': '654 maple ln', 'City': 'phoenix', 'State': 'az', 'ZIP': '85001', 'Country': 'us', 'Notes': 'Data needs cleanup' }
        ]
      };

      const data = sampleData[sampleType as keyof typeof sampleData];
      if (data) {
        const detectedHeaders = Object.keys(data[0] || {});
        
        setHeaders(detectedHeaders);
        setCsvData(data);
        
        // Auto-generate mapping
        const autoMapping = guessMapping(detectedHeaders, template);
        setMapping(autoMapping);
        
        // Initialize transforms
        const initialTransforms: Record<string, string[]> = {};
        template.fields.forEach(field => {
          initialTransforms[field.key] = [];
        });
        setTransforms(initialTransforms);
      }
    }
  }, [template]);

  const handleFileUpload = useCallback((file: File) => {
    if (file.size > 100 * 1024 * 1024) { // 100MB limit
      alert('File too large. Maximum size is 100MB.');
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      preview: LARGE_FILE_LIMIT + 1, // Parse one extra to detect if it's large
      complete: (results) => {
        if (results.errors.length > 0) {
          console.warn('CSV parsing warnings:', results.errors);
        }

        const data = results.data as any[];
        const detectedHeaders = Object.keys(data[0] || {});
        
        if (data.length > LARGE_FILE_LIMIT) {
          setShowLargeFileModal(true);
          return;
        }

        setHeaders(detectedHeaders);
        setCsvData(data);
        setCsvFile(file);
        
        // Auto-generate mapping
        const autoMapping = guessMapping(detectedHeaders, template);
        setMapping(autoMapping);
        
        // Initialize transforms
        const initialTransforms: Record<string, string[]> = {};
        template.fields.forEach(field => {
          initialTransforms[field.key] = [];
        });
        setTransforms(initialTransforms);
      }
    });
  }, [template]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const csvFile = files.find(file => file.type === 'text/csv' || file.name.endsWith('.csv'));
    if (csvFile) {
      handleFileUpload(csvFile);
    }
  }, [handleFileUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  }, [handleFileUpload]);

  const validateMapping = useCallback(() => {
    if (csvData.length === 0) return;
    
    const validationResult = validateRows(csvData, template, mapping);
    setValidation(validationResult);
  }, [csvData, template, mapping]);

  useEffect(() => {
    if (Object.keys(mapping).length > 0) {
      validateMapping();
    }
  }, [mapping, validateMapping]);

  const downloadMappedCSV = useCallback(() => {
    if (csvData.length === 0) return;
    
    const result = applyMapping(csvData, template, mapping);
    const csv = Papa.unparse(result.rows);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = csvFile ? csvFile.name.replace('.csv', '_mapped.csv') : 'mapped.csv';
    a.click();
    URL.revokeObjectURL(url);
  }, [csvData, template, mapping, transforms, csvFile]);

  const downloadMapping = useCallback(() => {
    const mappingData = {
      schema: schema,
      mapping: mapping,
      transforms: transforms
    };
    const blob = new Blob([JSON.stringify(mappingData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${schema}-mapping.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [schema, mapping, transforms]);

  const getCLICommand = useCallback(() => {
    return `schemamap map --schema ${schema} --mapping mapping.json < input.csv > output.csv`;
  }, [schema]);

  if (!template) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Schema not found</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
              SchemaMap
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-xl text-gray-600">{template.title} Mapper</span>
          </div>
          <p className="text-gray-600">
            Map your CSV to {template.title} format with validation
          </p>
        </div>
      </header>

      {/* Privacy Banner */}
      <div className="bg-blue-50 border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <p className="text-blue-800 text-sm text-center">
            🔒 Processing happens in your browser. We do not upload your CSV. Share links include only the mapping, never your data.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!csvFile ? (
          // File upload area
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <input
              type="file"
              accept=".csv"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="text-gray-600">
                <div className="text-6xl mb-4">📁</div>
                <h3 className="text-xl font-semibold mb-2">Drop your CSV file here</h3>
                <p className="mb-4">or click to browse</p>
                <div className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-block font-semibold">
                  Choose File
                </div>
              </div>
            </label>
          </div>
        ) : (
          // Mapping interface
          <div className="space-y-8">
            {/* File info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">File Information</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Filename</span>
                  <p className="text-gray-900">{csvFile.name}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Rows</span>
                  <p className="text-gray-900">{csvData.length.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Columns</span>
                  <p className="text-gray-900">{headers.length}</p>
                </div>
              </div>
            </div>

            {/* Mapping interface */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Field Mapping</h2>
                <p className="text-gray-600 text-sm mt-1">
                  Required fields are marked with *
                </p>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {template.fields.map(field => (
                    <div key={field.key} className="grid md:grid-cols-4 gap-4 items-center p-4 border rounded-lg">
                      <div>
                        <div className="font-medium flex items-center gap-1">
                          {field.label}
                          {field.required && <span className="text-red-500">*</span>}
                        </div>
                        <div className="text-sm text-gray-500">{field.key}</div>
                      </div>
                      
                      <div>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={mapping[field.key] || ''}
                          onChange={(e) => {
                            const newMapping = { ...mapping };
                            if (e.target.value) {
                              newMapping[field.key] = e.target.value;
                            } else {
                              delete newMapping[field.key];
                            }
                            setMapping(newMapping);
                          }}
                        >
                          <option value="">Select column...</option>
                          {headers.map(header => (
                            <option key={header} value={header}>{header}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        {field.transform && (
                          <div className="flex flex-wrap gap-1">
                            {field.transform.map(transform => (
                              <label key={transform} className="flex items-center text-xs">
                                <input
                                  type="checkbox"
                                  className="mr-1"
                                  checked={transforms[field.key]?.includes(transform) || false}
                                  onChange={(e) => {
                                    setTransforms(prev => ({
                                      ...prev,
                                      [field.key]: e.target.checked
                                        ? [...(prev[field.key] || []), transform]
                                        : (prev[field.key] || []).filter(t => t !== transform)
                                    }));
                                  }}
                                />
                                {transform}
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        {mapping[field.key] && csvData.length > 0 && (
                          <div className="text-sm text-gray-600 truncate">
                            Preview: {csvData[0][mapping[field.key]!]}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Validation results */}
            {validation && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Validation Results</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {validation.okCount.toLocaleString()}
                    </div>
                    <div className="text-gray-600">Rows OK</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-red-600 mb-2">
                      {validation.errorCount.toLocaleString()}
                    </div>
                    <div className="text-gray-600">Rows with errors</div>
                  </div>
                </div>
                
                {validation.sampleErrors.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold mb-3">Error Samples:</h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {validation.sampleErrors.map((error, idx) => (
                        <div key={idx} className="text-sm">
                          <span className="font-mono text-gray-600">Row {error.row}, {error.field}:</span>
                          <span className="text-red-600 ml-2">{error.issue}</span>
                        </div>
                      ))}
                    </div>
                    {validation.errorCount > validation.sampleErrors.length && (
                      <div className="text-sm text-gray-500 mt-2">
                        ... and {validation.errorCount - validation.sampleErrors.length} more errors
                      </div>
                    )}
                  </div>
                )}

                {validation.businessWarnings && validation.businessWarnings.length > 0 && (
                  <div className="mt-6">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h3 className="font-semibold text-yellow-900 mb-3 flex items-center gap-2">
                        ⚠️ Business Logic Warnings
                      </h3>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {validation.businessWarnings.map((warning, idx) => (
                          <div key={idx} className="text-sm text-yellow-800">
                            <span className="font-mono text-yellow-700">Row {warning.row}:</span>
                            <span className="ml-2">{warning.message}</span>
                          </div>
                        ))}
                      </div>
                      {validation.businessWarnings.length === 10 && (
                        <div className="text-sm text-yellow-600 mt-2">
                          Showing first 10 warnings only
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Export buttons */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Export</h2>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={downloadMappedCSV}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
                  disabled={csvData.length === 0}
                >
                  Download Mapped CSV
                </button>
                <button
                  onClick={downloadMapping}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Download Mapping JSON
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(getCLICommand())}
                  className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold"
                >
                  Copy CLI Command
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Large file modal */}
      {showLargeFileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg mx-4">
            <h3 className="text-lg font-semibold mb-4">Large File Detected</h3>
            <p className="text-gray-600 mb-4">
              Your file has more than {LARGE_FILE_LIMIT.toLocaleString()} rows. 
              For unlimited processing, use our free CLI tool:
            </p>
            
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <p className="text-sm font-medium mb-2">Copy this command:</p>
              <code className="text-sm bg-gray-900 text-gray-100 p-2 rounded block break-all">
                {getCLICommand()}
              </code>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(getCLICommand());
                  alert('CLI command copied to clipboard!');
                }}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2"
              >
                📋 Copy CLI Command
              </button>
            </div>
            
            <div className="flex gap-3">
              <Link
                href="/cli"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold flex-1 text-center"
              >
                Get CLI Tool
              </Link>
              <button
                onClick={() => setShowLargeFileModal(false)}
                className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded font-semibold"
              >
                Cancel
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mt-4">
              Alternative: Purchase a one-off browser pass ($5) for 24h unlimited processing.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}