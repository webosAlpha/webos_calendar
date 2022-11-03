import { VideoPlayer } from "@enact/sandstone/VideoPlayer";

const WeatherPanel = () => {
  return (
    <VideoPlayer
      className="static opacity-30 bg-black -z-50"
      autoPlay
      loop
      muted
      disabled
    >
      <source
        type="video/mp4"
        src="https://joy.videvo.net/videvo_files/video/free/2018-08/large_watermarked/180626_12_Seocho-Dong_20_preview.mp4"
      />
    </VideoPlayer>
  );
};

export default WeatherPanel;
