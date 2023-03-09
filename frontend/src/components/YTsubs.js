import { useState } from 'react';
import './YTsubs.css';

function YTsubs() {
  const [videoUrl, setVideoUrl] = useState('');
  const [subtitleText, setSubtitleText] = useState('');
  const [showCopyNotification, setShowCopyNotification] = useState(false);

  async function handleTranscribe() {
    const formattedUrl = `http://localhost:8000/stt_youtube_video?link=${encodeURIComponent(videoUrl)}`;
  
    const response = await fetch(formattedUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });
  
    if (response.ok) {
      const data = await response.json();
      setSubtitleText(JSON.stringify(data, null, 2));
    } else {
      console.error('Error:', response.status, response.statusText);
    }
  }

  function handleTextChange(event) {
    setSubtitleText(event.target.value);
  }

  function handleCopy() {
    navigator.clipboard.writeText(subtitleText);
    setShowCopyNotification(true);
    setTimeout(() => {
      setShowCopyNotification(false);
    }, 2000);
  }

  return (
    <div className="ytsubs-container">
      <h1>YouTube Subtitles Page</h1>
      <p>Enter a YouTube video URL:</p>
      <input type="text" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} />
      <br />
      <button onClick={handleTranscribe}>Transcribe</button>
      <br />
      <p>Subtitles:</p>
      <textarea value={subtitleText} onChange={handleTextChange}></textarea>
      <br />
      <button onClick={handleCopy}>Copy Subtitles</button>
      {showCopyNotification && <div className="copy-notification">Copied to clipboard!</div>}
    </div>
  );
}

export default YTsubs;
