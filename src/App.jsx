import { useState } from 'react';
import mammoth from 'mammoth';

function App() {
  const [htmlContent, setHtmlContent] = useState('');
  const [jsxContent, setJsxContent] = useState('');
  const [error, setError] = useState('');
  const [isFormatted, setIsFormatted] = useState(true);

  const handleFile = (event) => {
    setError('');
    const file = event.target.files[0];
    if (!file) return;

    if (
      file.type !==
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      setError("Please select a valid DOCX file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const arrayBuffer = e.target.result;
      mammoth
        .convertToHtml({ arrayBuffer })
        .then((result) => {
          setHtmlContent(result.value);
          const raw = result.value;
          const pretty = formatHtml(raw);
          setJsxContent(isFormatted ? pretty : raw);
        })
        .catch((err) => {
          setError("Error converting the file: " + err.message);
        });
    };
    reader.readAsArrayBuffer(file);
  };

  // Copiar HTML/JSX al portapapeles
  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsxContent).then(() => {
      alert('Content copied to clipboard!');
    });
  };

  // Toggle formateado
  const toggleFormatting = () => {
    const formatted = formatHtml(htmlContent);
    setIsFormatted(!isFormatted);
    setJsxContent(!isFormatted ? formatted : htmlContent);
  };

  // 💡 Función básica para formatear HTML con indentación (no perfecta, pero clara)
  const formatHtml = (html) => {
    const tab = '  ';
    let result = '';
    let indent = '';

    html
      .replace(/>\s+</g, '><') // quitar espacios innecesarios
      .split(/(?=<)|(?<=>)/g) // separar por etiquetas
      .forEach((line) => {
        if (line.match(/^<\/\w/)) {
          indent = indent.substring(tab.length);
        }
        result += indent + line + '\n';
        if (line.match(/^<\w[^>]*[^/]>/)) {
          indent += tab;
        }
      });

    return result.trim();
  };

  return (
    <main className="container">
      <header className="header">
        <h1 className="logo">
          <span className="highlight">DOCX</span>
          <small className="arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4 12h2.5M20 12l-6-6m6 6l-6 6m6-6H9.5"
              />
            </svg>
          </small>
          <span className="highlight">JSX</span>
        </h1>
        <p className="subtitle">
          Convert your Word (.docx) documents into clean React JSX instantly —
          ideal for legal documents like Terms & Conditions, Privacy Policies,
          contracts, and more.
        </p>
      </header>

      {/* Upload / Dropzone */}
      <section className="upload-section">
        <div
          className="dropzone"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files.length) {
              handleFile({ target: { files: e.dataTransfer.files } });
            }
          }}
        >
          <p>Drag & drop your .docx file here or</p>
          <label className="file-input">
            <input type="file" accept=".docx" onChange={handleFile} />
            <span>Choose a file</span>
          </label>
        </div>
        {error && <p className="error">{error}</p>}
      </section>

      {/* Results */}
      {htmlContent && (
        <section className="results">
          <h2>Preview</h2>
          <div
            className="preview"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          <h2>Generated JSX Code</h2>
          <div className="actions">
            <button onClick={copyToClipboard}>Copy to Clipboard</button>
            <button onClick={toggleFormatting}>
              {isFormatted ? "View Unformatted" : "Format"}
            </button>
          </div>

          <pre className="code-block">{jsxContent}</pre>
        </section>
      )}
    </main>
  );
}

export default App;
