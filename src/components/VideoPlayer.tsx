
import React, { useState } from 'react';

interface VideoPlayerProps {
  videoId: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId, title }) => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    console.error(`Video with ID ${videoId} failed to load`);
    setHasError(true);
  };

  // Use the new HomeschoolPop video for Data and Patterns lesson or when there's an error
  const getActualVideoId = () => {
    // If it's the Data and Patterns lesson or if there's an error, use the new video
    if (title.includes('Data and Patterns') || hasError || videoId === 'existing-data-patterns-video') {
      return 'CzFLDtvN_Xk';
    }
    return videoId;
  };

  const actualVideoId = getActualVideoId();

  return (
    <div className="timeline-style overflow-hidden">
      <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl">
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-xl"
          src={`https://www.youtube.com/embed/${actualVideoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onError={handleError}
        ></iframe>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg gradient-text">{title}</h3>
      </div>
    </div>
  );
};

export default VideoPlayer;
