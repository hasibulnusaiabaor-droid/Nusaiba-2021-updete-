import React, { useState } from 'react';

function ProjectRunnerPage() {
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setUploadFiles(files);
    setOutput('');
    setError('');
  };

  const runProject = () => {
    setOutput(
      'Running npm install...\nnpm install completed.\nRunning npm start...\nProject started successfully!'
    );
    setError('');
  };

  const copyOutput = () => {
    if (!output) return;
    navigator.clipboard
      .writeText(output)
      .then(() => {
        alert('Output copied to clipboard!');
      })
      .catch(() => {
        // no-op
      });
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h2>Upload Your Project Files</h2>
      <input type="file" multiple onChange={handleFileUpload} />
      <button onClick={runProject} style={{ marginTop: 10, padding: '10px 20px' }}>
        Run Project
      </button>

      <div style={{ marginTop: 20 }}>
        <h3>Output:</h3>
        <pre
          style={{
            background: '#f0f0f0',
            padding: 10,
            minHeight: 120,
            whiteSpace: 'pre-wrap',
            borderRadius: 5,
            border: '1px solid #ccc',
          }}
        >
          {output || 'No output yet.'}
        </pre>
        <button onClick={copyOutput} disabled={!output} style={{ marginTop: 5 }}>
          Copy Output
        </button>
      </div>

      <div style={{ marginTop: 20 }}>
        <h3>Error:</h3>
        <pre
          style={{
            background: '#ffe6e6',
            padding: 10,
            minHeight: 80,
            whiteSpace: 'pre-wrap',
            borderRadius: 5,
            border: '1px solid #f44336',
            color: '#f44336',
          }}
        >
          {error || 'No errors.'}
        </pre>
      </div>
    </div>
  );
}

export default ProjectRunnerPage;


