# Security Policy

## Overview

SchemaMap is designed with privacy and security as core principles. This document outlines our security approach and how to report security concerns.

## Architecture Security

**Browser-Only Processing**: By default, SchemaMap processes all CSV files entirely in your browser using JavaScript. Your data never leaves your device.

**No Server Storage**: We do not store, log, or transmit your CSV data to our servers during browser-only processing.

**Static Hosting**: The web application is deployed as static files with no server-side processing or databases.

## Data Handling

### Browser Processing (Default)
- ✅ Files processed locally in JavaScript
- ✅ No network requests with your data  
- ✅ Data never leaves your device
- ✅ No server logs or storage

### Paid Processing (Large Files >2K rows)
For files exceeding 2,000 rows, users can optionally purchase server processing:
- Files are temporarily processed on secure servers
- Files are immediately deleted after processing
- No permanent storage or logs
- Processing happens in isolated environments

## Supported Versions

We provide security updates for the latest stable version of SchemaMap.

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | ✅ Yes             |
| < 1.0   | ❌ No              |

## Reporting Security Issues

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report security issues by emailing: **security@schemamap.app**

Include the following information:
- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Any suggested fixes or mitigations

We will acknowledge receipt within 48 hours and provide a detailed response within 5 business days.

## Security Best Practices for Users

1. **Use Browser Processing**: For maximum privacy, use the default browser-only processing
2. **Sanitize Data**: Remove sensitive information from CSV files before processing
3. **Verify Downloads**: Only download results you expect
4. **Keep CLI Updated**: If using the CLI, keep it updated to the latest version

## Third-Party Dependencies

SchemaMap minimizes external dependencies to reduce attack surface:
- Core mapping engine has zero external dependencies
- Web app uses standard React/Next.js ecosystem
- CLI uses minimal Node.js dependencies

We regularly audit dependencies for known vulnerabilities using automated tools.

## Responsible Disclosure

We appreciate the security research community's efforts to improve SchemaMap's security. We commit to:

1. Acknowledging your report within 48 hours
2. Providing regular updates on our investigation
3. Crediting researchers (with permission) in security advisories
4. Working with you to understand and resolve issues

## Questions

For general security questions, please email: **security@schemamap.app**

For non-security issues, please use our [GitHub Issues](https://github.com/codebruinc/schemamap/issues).

---

*Last updated: January 2025*