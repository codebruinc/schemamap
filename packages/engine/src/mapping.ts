import * as levenshtein from 'fast-levenshtein';
import { Template, Field, GuessMappingResult, ValidationResult, ValidationError, MappingResult } from './types';

/**
 * Auto-map CSV headers to template fields using fuzzy matching + synonyms
 */
export function guessMapping(headers: string[], template: Template): GuessMappingResult {
  const mapping: GuessMappingResult = {};
  
  for (const field of template.fields) {
    const candidates = [field.label, field.key, ...(field.synonyms || [])];
    let bestMatch = '';
    let bestScore = Infinity;
    
    for (const header of headers) {
      const normalizedHeader = header.toLowerCase().trim();
      
      for (const candidate of candidates) {
        const normalizedCandidate = candidate.toLowerCase();
        
        // Exact match gets priority
        if (normalizedHeader === normalizedCandidate) {
          bestMatch = header;
          bestScore = 0;
          break;
        }
        
        // Contains match
        if (normalizedHeader.includes(normalizedCandidate) || normalizedCandidate.includes(normalizedHeader)) {
          const score = Math.abs(normalizedHeader.length - normalizedCandidate.length);
          if (score < bestScore) {
            bestMatch = header;
            bestScore = score;
          }
        }
        
        // Fuzzy match
        const distance = levenshtein.get(normalizedHeader, normalizedCandidate);
        const similarity = 1 - distance / Math.max(normalizedHeader.length, normalizedCandidate.length);
        
        if (similarity > 0.7 && distance < bestScore) {
          bestMatch = header;
          bestScore = distance;
        }
      }
      
      if (bestScore === 0) break; // Found exact match
    }
    
    if (bestMatch && bestScore < 3) {
      mapping[field.key] = bestMatch;
    }
  }
  
  return mapping;
}

/**
 * Apply transforms to a value based on field configuration
 */
function applyTransforms(value: any, transforms: string[] = []): any {
  if (value === null || value === undefined) return value;
  
  let result = value;
  
  for (const transform of transforms) {
    switch (transform) {
      case 'trim':
        result = typeof result === 'string' ? result.trim() : result;
        break;
      case 'upper':
        result = typeof result === 'string' ? result.toUpperCase() : result;
        break;
      case 'number':
        if (typeof result === 'string') {
          const parsed = parseFloat(result.replace(/[^0-9.-]/g, ''));
          result = isNaN(parsed) ? result : parsed;
        }
        break;
      case 'boolean':
        if (typeof result === 'string') {
          const lower = result.toLowerCase().trim();
          if (['true', '1', 'yes', 'y', 'on'].includes(lower)) {
            result = 'TRUE';
          } else if (['false', '0', 'no', 'n', 'off'].includes(lower)) {
            result = 'FALSE';
          }
        } else if (typeof result === 'boolean') {
          result = result ? 'TRUE' : 'FALSE';
        }
        break;
    }
  }
  
  return result;
}

/**
 * Validate a single value against a field definition
 */
function validateValue(value: any, field: Field): string | null {
  // Handle required fields
  if (field.required && (value === null || value === undefined || value === '')) {
    return `Required field is empty`;
  }
  
  // Skip validation for empty optional fields
  if (!field.required && (value === null || value === undefined || value === '')) {
    return null;
  }
  
  // Type validation
  switch (field.type) {
    case 'number':
      if (typeof value !== 'number' && isNaN(parseFloat(String(value)))) {
        return `Must be a number, got: ${value}`;
      }
      if (field.key.includes('price') && parseFloat(String(value)) < 0) {
        return `Price cannot be negative: ${value}`;
      }
      break;
      
    case 'boolean':
      if (!['TRUE', 'FALSE', true, false].includes(value)) {
        return `Must be TRUE or FALSE, got: ${value}`;
      }
      break;
      
    case 'enum':
      if (field.enumValues && !field.enumValues.includes(String(value))) {
        return `Must be one of: ${field.enumValues.join(', ')}, got: ${value}`;
      }
      break;
      
    case 'string':
      if (field.key === 'email' && typeof value === 'string') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return `Invalid email format: ${value}`;
        }
      }
      break;
  }
  
  return null;
}

/**
 * Validate rows against template and mapping
 */
export function validateRows(
  rows: any[],
  template: Template,
  mapping: GuessMappingResult
): ValidationResult {
  const errors: ValidationError[] = [];
  let okCount = 0;
  
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    let rowHasError = false;
    
    for (const field of template.fields) {
      const sourceHeader = mapping[field.key];
      if (!sourceHeader) {
        // Skip unmapped fields unless required
        if (field.required) {
          errors.push({
            row: i + 1,
            field: field.label,
            issue: 'Field not mapped',
          });
          rowHasError = true;
        }
        continue;
      }
      
      let value = row[sourceHeader];
      
      // Apply transforms
      value = applyTransforms(value, field.transform);
      
      // Validate
      const error = validateValue(value, field);
      if (error) {
        errors.push({
          row: i + 1,
          field: field.label,
          issue: error,
          value,
        });
        rowHasError = true;
      }
    }
    
    if (!rowHasError) {
      okCount++;
    }
  }
  
  return {
    okCount,
    errorCount: rows.length - okCount,
    sampleErrors: errors.slice(0, 10), // First 10 errors
  };
}

/**
 * Apply mapping and transforms to produce clean CSV
 */
export function applyMapping(
  rows: any[],
  template: Template,
  mapping: GuessMappingResult
): MappingResult {
  const headers = template.fields.map(field => field.label);
  const mappedRows = [];
  
  for (const row of rows) {
    const mappedRow: any = {};
    
    for (const field of template.fields) {
      const sourceHeader = mapping[field.key];
      let value = sourceHeader ? row[sourceHeader] : '';
      
      // Apply transforms
      value = applyTransforms(value, field.transform);
      
      // Use field label as the output header
      mappedRow[field.label] = value;
    }
    
    mappedRows.push(mappedRow);
  }
  
  return {
    headers,
    rows: mappedRows,
  };
}