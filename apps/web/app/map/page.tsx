'use client';

export const dynamic = 'force-dynamic';

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
  ValidationResult 
} from '@schemamap/engine';
import { 
  Upload, 
  Download, 
  AlertCircle, 
  CheckCircle, 
  Settings, 
  Copy,
  FileText,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

const LARGE_FILE_LIMIT = 2000;

export default function MapperPage() {
  const searchParams = useSearchParams();
  const schemaParam = searchParams.get('schema') as keyof typeof templates;
  
  const [template, setTemplate] = useState<Template | null>(null);
  const [csvData, setCsvData] = useState<any[] | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [mapping, setMapping] = useState<GuessMappingResult>({});
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showLargeFileModal, setShowLargeFileModal] = useState(false);

  // Initialize template from URL param
  useEffect(() => {
    if (schemaParam && templates[schemaParam]) {
      setTemplate(templates[schemaParam]);
    }
  }, [schemaParam]);

  // Load mapping from URL hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#m=')) {
      try {
        const mappingJson = atob(hash.substring(3));
        const loadedMapping = JSON.parse(mappingJson);
        setMapping(loadedMapping);
      } catch (error) {
        console.error('Failed to load mapping from URL:', error);
      }
    }
  }, []);

  const handleFileUpload = useCallback((file: File) => {
    if (!template) return;

    setIsProcessing(true);
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data as any[];
        const fileHeaders = results.meta.fields || [];
        
        if (data.length > LARGE_FILE_LIMIT) {
          setShowLargeFileModal(true);
          setIsProcessing(false);
          return;
        }
        
        setCsvData(data);
        setHeaders(fileHeaders);
        
        // Auto-generate mapping if not already set
        if (Object.keys(mapping).length === 0) {
          const autoMapping = guessMapping(fileHeaders, template);
          setMapping(autoMapping);
        }
        
        setIsProcessing(false);
      },
      error: (error) => {
        console.error('CSV parsing error:', error);
        alert('Failed to parse CSV file. Please check the format.');
        setIsProcessing(false);
      }
    });
  }, [template, mapping]);

  // Validate when data or mapping changes
  useEffect(() => {
    if (csvData && template && Object.keys(mapping).length > 0) {
      const result = validateRows(csvData, template, mapping);
      setValidation(result);
    }
  }, [csvData, template, mapping]);

  const updateMapping = (fieldKey: string, sourceHeader: string) => {
    const newMapping = { ...mapping };
    if (sourceHeader === '') {
      delete newMapping[fieldKey];
    } else {
      newMapping[fieldKey] = sourceHeader;
    }
    setMapping(newMapping);
    
    // Update URL hash
    const encodedMapping = btoa(JSON.stringify(newMapping));
    window.location.hash = `m=${encodedMapping}`;
  };

  const downloadMappedCsv = () => {
    if (!csvData || !template) return;
    
    const result = applyMapping(csvData, template, mapping);
    const csv = Papa.unparse({
      fields: result.headers,
      data: result.rows
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.key}-mapped.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadMapping = () => {
    const json = JSON.stringify(mapping, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template?.key}-mapping.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyCliCommand = () => {
    const command = `schemamap map --schema ${template?.key} --mapping mapping.json < input.csv > output.csv`;
    navigator.clipboard.writeText(command);
    alert('CLI command copied to clipboard!');
  };

  if (!template) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Schema not found</h1>
          <p className="text-gray-600 mb-4">Please select a valid schema:</p>
          <div className="space-y-2">
            <Link href="/map?schema=shopify-products" className="block text-blue-600 hover:underline">
              Shopify Products
            </Link>
            <Link href="/map?schema=shopify-inventory" className="block text-blue-600 hover:underline">
              Shopify Inventory  
            </Link>
            <Link href="/map?schema=stripe-customers" className="block text-blue-600 hover:underline">
              Stripe Customers
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">
                {template.title} Mapper
              </h1>
            </div>
          </div>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* File Upload */}
            {!csvData && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">1. Upload your CSV</h2>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files[0];
                    if (file?.type === 'text/csv' || file?.name.endsWith('.csv')) {
                      handleFileUpload(file);
                    }
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = '.csv';
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) handleFileUpload(file);
                    };
                    input.click();
                  }}
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    Drop your CSV file here or click to browse
                  </p>
                  <p className="text-gray-500">
                    Free for files up to {LARGE_FILE_LIMIT.toLocaleString()} rows
                  </p>
                </div>
              </div>
            )}

            {/* File Info */}
            {csvData && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">File loaded</h2>
                  <button
                    onClick={() => {
                      setCsvData(null);
                      setHeaders([]);
                      setMapping({});
                      setValidation(null);
                    }}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Upload different file
                  </button>
                </div>
                <div className="text-sm text-gray-600">
                  {csvData.length.toLocaleString()} rows, {headers.length} columns
                </div>
              </div>
            )}

            {/* Mapping Table */}
            {csvData && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">2. Review field mapping</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Target Field</th>
                        <th className="text-left py-2">Required</th>
                        <th className="text-left py-2">Source Column</th>
                        <th className="text-left py-2">Preview</th>
                      </tr>
                    </thead>
                    <tbody>
                      {template.fields.map((field) => (
                        <tr key={field.key} className="border-b">
                          <td className="py-3">
                            <div className="font-medium">{field.label}</div>
                            {field.synonyms && (
                              <div className="text-xs text-gray-500">
                                Also matches: {field.synonyms.join(', ')}
                              </div>
                            )}
                          </td>
                          <td className="py-3">
                            {field.required ? (
                              <span className="text-red-600">Required</span>
                            ) : (
                              <span className="text-gray-400">Optional</span>
                            )}
                          </td>
                          <td className="py-3">
                            <select
                              value={mapping[field.key] || ''}
                              onChange={(e) => updateMapping(field.key, e.target.value)}
                              className="border border-gray-300 rounded px-3 py-1 text-sm w-full max-w-xs"
                            >
                              <option value="">-- Not mapped --</option>
                              {headers.map(header => (
                                <option key={header} value={header}>{header}</option>
                              ))}
                            </select>
                          </td>
                          <td className="py-3">
                            {mapping[field.key] && csvData[0] && (
                              <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                {String(csvData[0][mapping[field.key]]).substring(0, 30)}
                                {String(csvData[0][mapping[field.key]]).length > 30 && '...'}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Validation Results */}
            {validation && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">3. Validation results</h2>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <div>
                      <div className="text-2xl font-bold text-green-900">
                        {validation.okCount.toLocaleString()}
                      </div>
                      <div className="text-green-700">Rows valid</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                    <div>
                      <div className="text-2xl font-bold text-red-900">
                        {validation.errorCount.toLocaleString()}
                      </div>
                      <div className="text-red-700">Rows with errors</div>
                    </div>
                  </div>
                </div>

                {validation.sampleErrors.length > 0 && (
                  <details className="mb-4">
                    <summary className="cursor-pointer font-medium text-gray-900 mb-2">
                      Sample errors ({validation.sampleErrors.length} shown)
                    </summary>
                    <div className="space-y-2">
                      {validation.sampleErrors.map((error, i) => (
                        <div key={i} className="text-sm text-red-700 bg-red-50 p-2 rounded">
                          <strong>Row {error.row}</strong>, {error.field}: {error.issue}
                          {error.value && <span className="text-gray-600"> (value: "{error.value}")</span>}
                        </div>
                      ))}
                    </div>
                  </details>
                )}

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={downloadMappedCsv}
                    disabled={validation.errorCount > 0}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    Download Mapped CSV
                  </button>
                  
                  <button
                    onClick={downloadMapping}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
                  >
                    <FileText className="w-5 h-5" />
                    Download mapping.json
                  </button>
                  
                  <button
                    onClick={copyCliCommand}
                    className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
                  >
                    <Copy className="w-5 h-5" />
                    Copy CLI command
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Template Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                {template.title}
              </h3>
              
              {template.notes && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Tips:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {template.notes.map((note, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Field List */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-3">Required Fields</h3>
              <ul className="text-sm space-y-1">
                {template.fields.filter(f => f.required).map(field => (
                  <li key={field.key} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      mapping[field.key] ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                    {field.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Large File Modal */}
      {showLargeFileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Large file detected</h3>
            <p className="text-gray-600 mb-6">
              Your file has more than {LARGE_FILE_LIMIT.toLocaleString()} rows. 
              Processing large files is free if you use the CLI, or you can buy a one-off pass ($5) to process in the browser.
            </p>
            <div className="flex gap-3">
              <Link
                href="/cli"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold flex-1 text-center"
              >
                Use CLI (Free)
              </Link>
              <button
                onClick={() => setShowLargeFileModal(false)}
                className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}