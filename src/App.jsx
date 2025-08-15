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
      setError('Por favor selecciona un archivo DOCX válido.');
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
          setError('Error al convertir el archivo: ' + err.message);
        });
    };
    reader.readAsArrayBuffer(file);
  };

  // Copiar HTML/JSX al portapapeles
  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsxContent).then(() => {
      alert('Contenido copiado al portapapeles!');
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
    <main style={{ maxWidth: 900, margin: 'auto', padding: "0 20px" }}>
      <h1>
        <span>DOCX </span>
        <small>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 12h2.5M20 12l-6-6m6 6l-6 6m6-6H9.5" /></svg>
        </small>
        <span> JSX</span>
      </h1>
      <input type="file" accept=".docx" onChange={handleFile} />
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {htmlContent && (
        <>
          <h2>Previsualización</h2>
          <div
            style={{
              border: '1px solid #ddd',
              padding: 20,
              borderRadius: 5,
              background: '#fafafa',
              maxHeight: 400,
              overflowY: 'auto',
            }}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          <h2>Código JSX generado</h2>

          <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
            <button onClick={copyToClipboard} style={{ padding: '8px 16px' }}>
              Copiar HTML/JSX al portapapeles
            </button>
            <button onClick={toggleFormatting} style={{ padding: '8px 16px' }}>
              {isFormatted ? 'Ver sin formato' : 'Formatear'}
            </button>
          </div>

          <pre
            style={{
              background: '#eee',
              padding: 10,
              whiteSpace: 'pre-wrap',
              maxHeight: 400,
              overflowY: 'auto',
              fontFamily: 'monospace',
            }}
          >
            {jsxContent}
          </pre>
        </>
      )}
    </main>
  );
}

export default App;
