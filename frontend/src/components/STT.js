import { useState } from 'react';
import './STT.css';
import ClipLoader from 'react-spinners/ClipLoader';

function STT() {
  const [audioFile, setAudioFile] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleFileUpload(event) {
    const file = event.target.files[0];
    setAudioFile(file);
  }

  async function handleTranscribe() {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', audioFile);
    formData.append('Content-Type', 'audio/wav');

    const response = await fetch('http://localhost:8000/stt_only_uploadfile/', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      const data = await response.json();
      setResponseText(data.transcription);
    } else {
      console.error('Error:', response.status, response.statusText);
    }

    setLoading(false);
  }

  function handleTextChange(event) {
    setResponseText(event.target.value);
  }

  function handleCopy() {
    navigator.clipboard.writeText(responseText);
    setShowCopyNotification(true);
    setTimeout(() => {
      setShowCopyNotification(false);
    }, 2000);
  }

  return (
    <div className="stt-container">
      <h1>Speech to Text Page</h1>
      <p>Select an audio file to transcribe:</p>
      <input type="file" onChange={handleFileUpload} />
      <br />
      <button onClick={handleTranscribe} disabled={!audioFile}>
        Transcribe
      </button>
      <br />
      <div className="loading-spinner">
        <ClipLoader size={50} color={'#123abc'} loading={loading} />
      </div>
      {!loading && responseText ? (
        <>
          <p>Response:</p>
          <textarea value={responseText} onChange={handleTextChange}></textarea>
          <br />
          <button onClick={handleCopy}>Copy to Clipboard</button>
          {showCopyNotification && (
            <div className="copy-notification">Copied to clipboard!</div>
          )}
        </>
      ) : null}
    </div>
  );
}

export default STT;
