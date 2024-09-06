import React, { useState, useRef } from 'react';
import './MusicPlayer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './IconLibrary';

const MusicPlayer = () => {
  const audioTracks = [
    { title: 'Track 1', src: 'Epi3.mp3' },
    { title: 'Track 2', src: 'ttsmaker.mp3' },
    { title: 'Track 3', src: 'track3.mp3' },
  ];

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleForward = () => {
    const audio = audioRef.current;
    audio.currentTime = Math.min(audio.currentTime + 10, duration);
  };

  const handleBackward = () => {
    const audio = audioRef.current;
    audio.currentTime = Math.max(audio.currentTime - 10, 0);
  };

  const handleNext = () => {
    setCurrentTrackIndex((currentTrackIndex + 1) % audioTracks.length);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleBack = () => {
    setCurrentTrackIndex(
      (currentTrackIndex - 1 + audioTracks.length) % audioTracks.length);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (event) => {
    const newTime = (event.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleTrackDoubleClick = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(false);
    setCurrentTime(0);
    audioRef.current.load(); // Load the new track
    audioRef.current.play(); // Play the new track
    setIsPlaying(true); // Set the player state to playing
  };
  //<button onClick={handleBackward}>Backward 10s</button>
  //<button onClick={handleForward}>Forward 10s</button>
  /*<div className="track-list">
          {audioTracks.map((track, index) => (
            <div
              key={index}
              className="track"
              onDoubleClick={() => handleTrackDoubleClick(index)}
            >
              {track.title}
            </div>
          ))}
    </div>*/
  return (
    <div className="music-player">
      <div className="upperBackground">
      </div>
      <div className="container">
        <audio
          ref={audioRef}
          src={audioTracks[currentTrackIndex].src}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleNext} // Automatically play next track when current track ends
        ></audio>
        <div className="trackName">{audioTracks[currentTrackIndex].title}</div>
        <div className="time">
          <span>Duration</span>
          {Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}
        </div>
        <div id="icons">
          <div><FontAwesomeIcon icon="star" /></div>
          <div><FontAwesomeIcon icon="envelope" /></div>
          <div><FontAwesomeIcon icon="heart" /></div>
        </div>
        <input
          type="range"
          value={(currentTime / duration) * 100 || 0}
          onChange={handleSeek}
        />
         
        <div className="controls" >
          <button onClick={handleBack}><FontAwesomeIcon icon="backward" /></button>
          <button className='customeButton' onClick={handlePlayPause}>{isPlaying ? <FontAwesomeIcon icon="pause" /> : <FontAwesomeIcon icon="play" />}</button>
          <button onClick={handleNext}><FontAwesomeIcon icon="forward" /></button>
        </div>
        

      </div>
    
    </div>
  );
};

export default MusicPlayer;
































/*import React, { useState, useRef } from 'react';
import './MusicPlayer.css'; // Import the CSS file

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (event) => {
    const newTime = (event.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        src="Epi3.mp3"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      ></audio>
      <button onClick={handlePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <input
        type="range"
        value={(currentTime / duration) * 100 || 0}
        onChange={handleSeek}
      />
      <div>
        {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')} / 
        {Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}
      </div>
    </div>
  );
};

export default MusicPlayer;*/
