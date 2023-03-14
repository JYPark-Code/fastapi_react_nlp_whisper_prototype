import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaMicrophone, FaSync, FaCopy } from "react-icons/fa";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";

import "./Mic2Txt.css";

const Mic2Text = ({ transcript, setTranscript }) => {
  const [recording, setRecording] = useState(false);
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const {
    transcript: finalTranscript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const toggleRecording = () => {
    if (recording) {
      SpeechRecognition.stopListening();
      setRecording(false);
    } else {
      SpeechRecognition.startListening({
        continuous: true,
      });
      setRecording(true);
    }
  };

  const handleClear = () => {
    resetTranscript();
    setTranscript("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(finalTranscript);
    setShowCopyNotification(true);
    setTimeout(() => {
      setShowCopyNotification(false);
    }, 2000);
  };

  return (
    <div className="mic2txt-container">
      <h1>Mic to Text</h1>
      <div className="audio-controls">
        <button className="audio-button" onClick={toggleRecording}>
          <div className="audio-icon">
            {recording ? <FaMicrophone color="red" /> : <FaMicrophone />}
          </div>
        </button>
        <button className="audio-button" onClick={handleClear}>
          <div className="audio-icon">
            <FaSync />
          </div>
        </button>
      </div>
      <textarea
        value={finalTranscript}
        onChange={(event) => setTranscript(event.target.value)}
        readOnly={!recording}
      />
      <div className="copy-button-container">
        <button className="copy-button" onClick={handleCopy}>
          <div className="copy-icon">
            <FaCopy />
          </div>
          <div className="copy-text">Copy</div>
        </button>
        {showCopyNotification && (
          <div className="copy-notification">Copied to clipboard!</div>
        )}
      </div>
    </div>
  );
};

Mic2Text.propTypes = {
  transcript: PropTypes.string,
  setTranscript: PropTypes.func,
};

export default Mic2Text;
