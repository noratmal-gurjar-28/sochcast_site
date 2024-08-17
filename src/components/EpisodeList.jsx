import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchEpisodes } from "../features/podcast/podcastSlice";
import { Link } from "react-router-dom";
import { CiShare2 } from "react-icons/ci";
import { IoIosAddCircle } from "react-icons/io";

const EpisodeList = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const episodes = useSelector((state) => state?.podcast?.episodes) || [];
  const status = useSelector((state) => state.podcast.status);
  const error = useSelector((state) => state.podcast.error);
  const [showOverviewInfo, setshowOverviewInfo] = useState({});

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [audioSrc, setAudioSrc] = useState(null);

  const handlePlayClick = (audioUrl) => {
    setAudioSrc(audioUrl);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setAudioSrc(null);
  };

  console.log("one data ", showOverviewInfo);

  useEffect(() => {
    if (slug) {
      dispatch(fetchEpisodes(slug));
    }
  }, [dispatch, slug]);

  useEffect(() => {
    if (episodes) {
      setshowOverviewInfo(episodes[0]?.shows[0]);
    }
  }, [episodes]);

  if (status === "loading")
    return <h5 className="mt-5 pt-5 loader text-center">Loading...</h5>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div className=" pt-4">
      <div className="container">
        <div className="">
          {console.log(showOverviewInfo)}
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

                  <h6 className="text-success pb-3 pt-2">
                    Format: {showOverviewInfo?.show_format}
                  </h6>
                  <button
                    className="btn-play"
                    type="submit"
                    onClick={() => handlePlayClick(showOverviewInfo?.file)}
                  >
                    Play
                  </button>

                  {isPopupOpen && (
                    <div className="popup-overlay">
                      <div className="popup-content text-center">
                        <button
                          className="close-popup"
                          onClick={handleClosePopup}
                        >
                          Close the Player
                        </button>
                        <audio className="audio-tag" controls src={audioSrc}>
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    </div>
                  )}
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
              <div className="card-container" key={episode.id}>
                <div className="col-12 col-md-1">
                  <p className="mb-0">SL No: {episode.episode_number}</p>
                </div>
                <div className="image-card col-12 col-md-2">
                  <img className="mx-auto" src={episode.episode_image} />
                </div>
                <div className="col-12 col-md-5">
                  <h6 className="episode-name mb-0">{episode.name}</h6>
                </div>
                <div className="col-12 col-md-1">
                  <div>{episode.publish_date}</div>
                </div>

                <div className="col-12 col-md-1">
                  <div>{episode.duration} Min</div>
                </div>
                <div className="col-12 col-md-1 icon-pointer">
                  <CiShare2 className="" size={20} />
                </div>
                <div className="col-12 col-md-1 icon-pointer">
                  <IoIosAddCircle className="" size={20} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No Episodes Available</p>
        )}
      </div>
    </div>
  );
};
export default EpisodeList;
