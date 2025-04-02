import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './VideoLessons.css';

const VideoLessons = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // YouTube API key - you'll need to get your own from Google Cloud Console
  const API_KEY = 'AIzaSyBQg9PgR3Xft8DZ0tJBFQiJPqdGzacMQms';

  const searchVideos = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(
          searchQuery + ' tutorial'
        )}&type=video&key=${API_KEY}`
      );
      const data = await response.json();

      if (data.items) {
        setVideos(data.items);
      } else {
        throw new Error('No videos found');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="video-lessons-container">
      <div className="video-lessons-header">
        <h1>Video Lessons</h1>
        <p>Search for educational videos on any topic</p>
      </div>

      <form onSubmit={searchVideos} className="search-form">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for topics like 'Algebra basics' or 'Physics laws'"
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Searching for videos...</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      <div className="video-grid">
        {videos.map((video) => (
          <div key={video.id.videoId} className="video-card">
            <div className="video-thumbnail">
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
              />
              <div className="play-icon">▶</div>
            </div>
            <div className="video-info">
              <h3>{video.snippet.title}</h3>
              <p className="channel">{video.snippet.channelTitle}</p>
              <button
                onClick={() =>
                  window.open(
                    `https://www.youtube.com/watch?v=${video.id.videoId}`,
                    '_blank'
                  )
                }
                className="watch-button"
              >
                Watch Video
              </button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => navigate(-1)} className="back-button">
        Back to Dashboard
      </button>
    </div>
  );
};

export default VideoLessons;