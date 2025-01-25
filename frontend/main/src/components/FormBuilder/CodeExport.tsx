import React from 'react';
import { FormDesign } from '../types/form';
import { Shield, AlertTriangle } from 'lucide-react';

interface CodeExportProps {
  formDesign: FormDesign;
}

interface SecurityCheck {
  id: string;
  name: string;
  check: (html: string) => boolean;
  severity: 'warning' | 'error';
  message: string;
}

export default function CodeExport({ formDesign }: CodeExportProps) {
  const securityChecks: SecurityCheck[] = [
    {
      id: 'csrf',
      name: 'CSRF Protection',
      check: (html) => html.includes('csrf_token'),
      severity: 'error',
      message: 'Missing CSRF token protection',
    },
    {
      id: 'xss',
      name: 'XSS Prevention',
      check: (html) => !html.includes('onerror=') && !html.includes('javascript:'),
      severity: 'error',
      message: 'Potential XSS vulnerabilities detected',
    },
    {
      id: 'https',
      name: 'HTTPS Resources',
      check: (html) => !html.includes('http:'),
      severity: 'warning',
      message: 'Non-HTTPS resources detected',
    },
    {
      id: 'input-validation',
      name: 'Input Validation',
      check: (html) => html.includes('pattern=') || html.includes('required'),
      severity: 'warning',
      message: 'Missing input validation attributes',
    }
  ];

  const generateHTML = () => {
    const { theme } = formDesign;
    
    // Add CSRF token placeholder
    const csrfToken = '{{ csrf_token }}';
    
    const formStyles = `
      .custom-form {
        background-color: ${theme.backgroundColor};
        color: ${theme.textColor};
        font-family: ${theme.fontFamily};
        font-size: ${theme.fontSize};
        max-width: 28rem;
        margin: 0 auto;
        padding: 1.5rem;
        border-radius: 0.5rem;
      }
      .form-group { margin-bottom: 1.5rem; }
      .form-label {
        display: block;
        font-size: 0.875rem;
        font-weight: 500;
        margin-bottom: 0.25rem;
      }
      .form-input {
        width: 100%;
        padding: 0.5rem 0.75rem;
        border: 1px solid #d1d5db;
        border-radius: 0.375rem;
      }
      .form-submit {
        width: 100%;
        padding: 0.5rem 1rem;
        background-color: ${theme.buttonColor};
        color: white;
        border: none;
        ${theme.buttonStyle === 'rounded' ? 'border-radius: 9999px;' : ''}
        ${theme.buttonStyle === 'outlined'
          ? `
            background-color: transparent;
            border: 2px solid ${theme.buttonColor};
            color: ${theme.buttonColor};
          `
          : ''}
        ${theme.buttonStyle === 'filled' ? 'border-radius: 0.375rem;' : ''}
      }
      /* Security-focused styles */
      input[type="password"] {
        -webkit-text-security: disc;
        text-security: disc;
      }
      form:invalid button[type="submit"] {
        opacity: 0.7;
        cursor: not-allowed;
      }
    `;

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'unsafe-inline' 'self'; img-src 'self' https:; form-action 'self';">
    <meta name="referrer" content="no-referrer-when-downgrade">
    <title>${formDesign.name}</title>
    <style>${formStyles}</style>
</head>
<body>
    <form class="custom-form" method="POST" action="/submit" autocomplete="off" novalidate>
        <input type="hidden" name="_csrf" value="${csrfToken}">
        ${formDesign.fields
          .map((field) => {
            const sanitizedLabel = field.label.replace(/[<>]/g, '');
            const sanitizedPlaceholder = field.placeholder?.replace(/[<>]/g, '') || '';
            
            switch (field.type) {
              case 'text':
              case 'email':
              case 'password':
                return `
                  <div class="form-group">
                    <label class="form-label">
                      ${sanitizedLabel}${field.required ? ' *' : ''}
                    </label>
                    <input
                      type="${field.type}"
                      name="${field.id}"
                      class="form-input"
                      ${field.placeholder ? `placeholder="${sanitizedPlaceholder}"` : ''}
                      ${field.required ? 'required' : ''}
                      ${field.validation?.minLength ? `minlength="${field.validation.minLength}"` : ''}
                      ${field.validation?.maxLength ? `maxlength="${field.validation.maxLength}"` : ''}
                      ${field.type === 'email' ? 'pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"' : ''}
                      autocomplete="${field.type === 'password' ? 'new-password' : 'off'}"
                    >
                  </div>
                `;
              case 'select':
                return `
                  <div class="form-group">
                    <label class="form-label">
                      ${sanitizedLabel}${field.required ? ' *' : ''}
                    </label>
                    <select 
                      name="${field.id}"
                      class="form-input" 
                      ${field.required ? 'required' : ''}
                    >
                      <option value="">${sanitizedPlaceholder || 'Select an option'}</option>
                      ${field.options
                        ?.map(option => {
                          const sanitizedOption = option.replace(/[<>]/g, '');
                          return `<option value="${sanitizedOption}">${sanitizedOption}</option>`;
                        })
                        .join('\n')}
                    </select>
                  </div>
                `;
              case 'checkbox':
                return `
                  <div class="form-group">
                    <label class="form-label">
                      <input
                        type="checkbox"
                        name="${field.id}"
                        ${field.required ? 'required' : ''}
                      >
                      <span class="ml-2">${sanitizedLabel}</span>
                    </label>
                  </div>
                `;
              case 'radio':
                return `
                  <div class="form-group">
                    <label class="form-label">
                      ${sanitizedLabel}${field.required ? ' *' : ''}
                    </label>
                    ${field.options
                      ?.map(option => {
                        const sanitizedOption = option.replace(/[<>]/g, '');
                        return `
                          <div>
                            <label>
                              <input
                                type="radio"
                                name="${field.id}"
                                value="${sanitizedOption}"
                                ${field.required ? 'required' : ''}
                              >
                              <span class="ml-2">${sanitizedOption}</span>
                            </label>
                          </div>
                        `;
                      })
                      .join('\n')}
                  </div>
                `;
              case 'date':
                return `
                  <div class="form-group">
                    <label class="form-label">
                      ${sanitizedLabel}${field.required ? ' *' : ''}
                    </label>
                    <input
                      type="date"
                      name="${field.id}"
                      class="form-input"
                      ${field.required ? 'required' : ''}
                    >
                  </div>
                `;
              default:
                return '';
            }
          })
          .join('\n')}
        <button type="submit" class="form-submit">Submit</button>
    </form>
    <script>
      // Simple form validation
      document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        if (this.checkValidity()) {
          // Form is valid, you can submit it
          console.log('Form is valid');
        } else {
          // Form is invalid
          console.log('Form is invalid');
        }
      });
    </script>
</body>
</html>`;

    return html;
  };

  const html = generateHTML();
  const securityResults = securityChecks.map(check => ({
    ...check,
    passed: check.check(html)
  }));

  const copyToClipboard = () => {
    navigator.clipboard.writeText(html);
  };

  const downloadHTML = () => {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formDesign.name.toLowerCase().replace(/\s+/g, '-')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const hasErrors = securityResults.some(result => !result.passed && result.severity === 'error');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Export Form</h3>
        <div className="space-x-4">
          <button
            onClick={copyToClipboard}
            disabled={hasErrors}
            className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Copy to Clipboard
          </button>
          <button
            onClick={downloadHTML}
            disabled={hasErrors}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Download HTML
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex items-center mb-4">
          <Shield className="w-5 h-5 text-blue-600 mr-2" />
          <h4 className="font-medium">Security Checks</h4>
        </div>
        <div className="space-y-3">
          {securityResults.map(result => (
            <div key={result.id} className="flex items-start">
              <div className={`w-5 h-5 mt-0.5 mr-3 rounded-full flex items-center justify-center ${
                result.passed 
                  ? 'bg-green-100 text-green-600' 
                  : result.severity === 'error'
                    ? 'bg-red-100 text-red-600'
                    : 'bg-yellow-100 text-yellow-600'
              }`}>
                {result.passed ? '✓' : '!'}
              </div>
              <div>
                <div className="font-medium">{result.name}</div>
                {!result.passed && (
                  <div className={`text-sm ${
                    result.severity === 'error' ? 'text-red-600' : 'text-yellow-600'
                  }`}>
                    {result.message}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <pre className="whitespace-pre-wrap text-sm">
          {html}
        </pre>
      </div>
    </div>
  );
}