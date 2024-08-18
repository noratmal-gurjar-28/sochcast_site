import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchEpisodes } from "../features/podcast/podcastSlice";
import { CiShare2 } from "react-icons/ci";
import { IoIosAddCircle } from "react-icons/io";
import AudoPlayer from '../components/mp3Player/player'
import { IoPlayCircleOutline } from "react-icons/io5";

const EpisodeList = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const episodes = useSelector((state) => state?.podcast?.episodes) || [];
  const status = useSelector((state) => state.podcast.status);
  const error = useSelector((state) => state.podcast.error);
  const [showOverviewInfo, setshowOverviewInfo] = useState({});
  const [episodesUrl, setEpisodesUrl] = useState([]);

  const updateEpisodesList = useCallback((episodesData) => {
    const manipulatedEpisodeData = episodesData.map((episode) => ({
      url: episode.file,
      name: episode.name,
      episodeNumber: episode.episode_number,
      episodeImage: episode.episode_compressed_image,
      duration: episode.duration
    }));
    setEpisodesUrl(manipulatedEpisodeData);
  }, []);

  const handleEpisodeSelection = (selectedEpisode) => {
    const remainingEpisodes = episodes.filter((episode) => episode.id !== selectedEpisode.id);
    const updatedEpisodesList = [selectedEpisode, ...remainingEpisodes];
    updateEpisodesList(updatedEpisodesList);
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  useEffect(() => {
    if (slug) {
      dispatch(fetchEpisodes(slug));
    }
  }, [dispatch, slug]);

  useEffect(() => {
    if (episodes) {
      setshowOverviewInfo(episodes[0]?.shows[0]);
      updateEpisodesList(episodes);
    }
  }, [episodes, updateEpisodesList]);

  if (status === "loading")
    return <h5 className="mt-5 pt-5 loader text-center">Loading...</h5>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div className=" pt-4">
      <div className="container">
        <div className="">
          <div className="card-container" key={showOverviewInfo?.id}>
            <div className="row">
              <div className="col-md-12 col-12 col-xl-3 col-lg-3 mt-3">
                <img
                  className="w-100 img-epsido"
                  src={showOverviewInfo?.show_image}
                />
              </div>
              <div className="col-12 col-md-12 col-lg-9 col-xl-9 mt-3">
                <div className="col-7">
                  <h1>{showOverviewInfo?.name}</h1>
                </div>
                <div className="col-10 mt-3">
                  <p
                    className="episodes-para"
                    dangerouslySetInnerHTML={{
                      __html: showOverviewInfo?.description,
                    }}
                  />

                <div>
                <h6 className="text-success pb-3 pt-2">
                    Type: {showOverviewInfo?.show_format}
                  </h6>
                  {showOverviewInfo && showOverviewInfo?.hosts && (showOverviewInfo?.hosts[0]?.first_name || showOverviewInfo?.hosts[0]?.last_name) && (
                    <h6 className=" pb-3 pt-2">
                      By: {`${showOverviewInfo?.hosts[0]?.first_name} ${showOverviewInfo?.hosts[0]?.last_name}`}
                    </h6>
                  )}
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <hr className=""></hr>
        </div>

        <div>
          <h3 className="text-left my-4 pt-3">
            <u>All Episodes List</u>
          </h3>
        </div>
        {episodes && episodes.length > 0 ? (
          <div className="pb-5">
            {episodes.map((episode) => (
              <div className="card-container episode-card" key={episode.id} onClick={() => handleEpisodeSelection(episode)}>
                <div className="episode-play-button col-1 pr-2">
                  <IoPlayCircleOutline />
                </div>
                <div className="image-card col-12 col-md-2">
                  <img className="mx-auto" src={episode.episode_image} />
                </div>
                <div className="col-12 col-md-5">
                  <p className="episode-number mb-0">Episode No: {episode.episode_number}</p>
                  <h6 className="episode-name mb-0">{episode.name}</h6>
                </div>
                <div className="col-12 col-md-1">
                  <div>{episode.publish_date}</div>
                </div>
                <div className="col-12 col-md-1">
                  <div>{formatDuration(episode.duration)}</div>
                </div>
                <div className="col-12 col-md-1 icon-pointer">
                  <CiShare2 className="" size={20} />
                </div>
                <div className="col-12 col-md-1 icon-pointer">
                  <IoIosAddCircle className="" size={20} />
                </div>
              </div>
            ))}
            <AudoPlayer episodesUrl={episodesUrl} />
          </div>
        ) : (
          <p>No Episodes Available</p>
        )}
      </div>
    </div>
  );
};
export default EpisodeList;
