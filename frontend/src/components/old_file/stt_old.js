import { useState } from 'react';
import './STT.css';

function STT() {
  const [audioFile, setAudioFile] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [showCopyNotification, setShowCopyNotification] = useState(false);

  async function handleFileUpload(event) {
    const file = event.target.files[0];
    setAudioFile(file);
  }

  async function handleTranscribe() {
    const formData = new FormData();
    formData.append('file', audioFile);

    const response = await fetch('http://localhost:8000/stt_only_uploadfile/', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    setResponseText(JSON.stringify(data, null, 2));
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
      <button onClick={handleTranscribe}>Transcribe</button>
      <br />
      <p>Response:</p>
      <textarea value={responseText} onChange={handleTextChange}></textarea>
      <br />
      <button onClick={handleCopy}>Copy Response</button>
      {showCopyNotification && <div className="copy-notification">Copied to clipboard!</div>}
    </div>
  );
}

export default STT;
