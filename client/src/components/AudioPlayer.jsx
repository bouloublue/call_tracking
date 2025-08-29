// components/AudioPlayer.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axisoInstance from "../utils/axiosInstance";
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL;

const AudioPlayer = ({ recordingSid }) => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("recordingSid", recordingSid)

  useEffect(() => {
    if (!recordingSid) {
      setLoading(false);
      setError('No recording SID provided');
      return;
    }

    const controller = new AbortController();
     const source = axios.CancelToken.source();

    const fetchRecording = async () => {
        try {
        const url = await axisoInstance.get(`${API_BASE_URL}/api/call/${recordingSid}`);
        setAudioUrl(url);
        setError(null);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error('Error loading recording:', err);
          setError(err.message || 'Failed to load recording');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecording();

    return () => {
      controller.abort();
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [recordingSid]);

  if (loading) {
    return (
      <div className="audio-loading">
        <div className="loading-spinner"></div>
        <span>Loading recording...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="audio-error">
        <span>⚠️ Recording unavailable</span>
        <small>{error}</small>
      </div>
    );
  }

  return (
    <div className="audio-player-container">
      <audio
        controls
        controlsList="nodownload" // Hide download button (we'll provide our own)
        src={audioUrl}
        style={{ width: '100%', maxWidth: '250px' }}
      >
        Your browser does not support the audio element.
      </audio>
      {audioUrl && (
        <a
          href={audioUrl}
          download={`recording-${recordingSid}.mp3`}
          className="download-btn"
          title="Download recording"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
        </a>
      )}
    </div>
  );
};

AudioPlayer.propTypes = {
  recordingSid: PropTypes.string
};

export default AudioPlayer;

