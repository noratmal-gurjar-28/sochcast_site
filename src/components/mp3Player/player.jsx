import { useRef, useEffect, useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export default function AudoPlayer({ episodesUrl }) {
  const playerRef = useRef(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleClickNext = () => {
    const nextIndex = (currentTrackIndex + 1) % episodesUrl.length;
    setCurrentTrackIndex(nextIndex);
  };

  const handleClickPrevious = () => {
    const prevIndex = (currentTrackIndex - 1 + episodesUrl.length) % episodesUrl.length;
    setCurrentTrackIndex(prevIndex);
  };

  const handlePlay = () => {
    if(playerRef.current.audio.current.pause){
        playerRef.current.audio.current.play();
    }
  };

  const handlePause = () => {
    if(playerRef.current.audio.current.play){
        playerRef.current.audio.current.pause();
    }
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  const handleListen = (e) => {
    setCurrentTime(e.target.currentTime);
  };

  const handleLoadedMetadata = (e) => {
    setDuration(e.target.duration);
  };

  useEffect(() => {
    if (playerRef.current) {
        playerRef.current.audio.current.pause();
        playerRef.current.audio.current.load(); 
    }
  }, [currentTrackIndex]);
  
  const currentTrack = episodesUrl[currentTrackIndex];

  return (
    <div className="playlist-overlay">
        <div className="playlist-container">
            <div className="playlist-banner">
                <img className="w-50" src={currentTrack?.episodeImage}  alt={currentTrack?.name} />
            </div>
            <div className="playlist-col">
                <span className="playlist-episodeNumber">Episodes No - {currentTrack?.episodeNumber}</span>
                <h4>{currentTrack?.name}</h4>
                <AudioPlayer
                    ref={playerRef}
                    autoPlay
                    src={currentTrack?.url}
                    onPlay={handlePlay}
                    onPause={handlePause}
                    onClickNext={handleClickNext}
                    onClickPrevious={handleClickPrevious}
                    showSkipControls={true}   
                    showFilledProgress={true}
                    showJumpControls={false}
                    onLoadedMetadata={handleLoadedMetadata}
                    onListen={handleListen}
                    defaultCurrentTime={currentTime}
                    defaultDuration={duration}
                />
            </div>
        </div>
    </div>
  );
}
