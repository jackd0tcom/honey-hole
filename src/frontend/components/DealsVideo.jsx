import { useState, useEffect } from "react";

const DealsVideo = () => {
  const [videoUrl, setVideoUrl] = useState(
    "https://www.youtube.com/embed/BVzmHPOdVBs?si=YSZ5NaCJ0IjQOFcd"
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideoSettings = async () => {
      try {
        const response = await fetch("/wp-json/honey-hole/v1/video-settings");
        if (response.ok) {
          const data = await response.json();
          setVideoUrl(data.video_url);
        }
      } catch (error) {
        console.error("Error fetching video settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoSettings();
  }, []);

  if (loading) {
    return <div>Loading video...</div>;
  }

  return (
    <>
      <iframe
        id="deal-video"
        width="100%"
        height="auto"
        src={videoUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </>
  );
};

export default DealsVideo;
