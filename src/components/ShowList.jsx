import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchShows } from "../features/podcast/podcastSlice";
import "../App.css";
import { useNavigate } from "react-router-dom";

const ShowList = () => {
  const dispatch = useDispatch();
  const shows = useSelector((state) => state.podcast.shows) || [];
  console.log("showlist data", shows);
  const status = useSelector((state) => state.podcast.status);
  const error = useSelector((state) => state.podcast.error);

  const navigate = useNavigate();

  const handleShowAllEpisodes = (slug) => {
    navigate(`/episodes/${slug}`);
  };

  useEffect(() => {
    if (status == "idle") {
      dispatch(fetchShows());
    }
  }, [status, dispatch]);

  if (status === "loading")
    return <h5 className="mt-5 pt-5 loader text-center">Loading...</h5>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div className="container">
      <h4 className="mt-4 mb-3 pr-5 text-center text-capitalize">Available Shows</h4>
      {status === "succeeded" ? (
        shows.length > 0 ? (
          <div className="show-list-container">
            {shows?.map((show) => (
              <div
                key={show.slug}
                className="show-item card border c-pointer p-0"
                onClick={() => handleShowAllEpisodes(show.slug)}
              >
                <img src={show.show_image} alt={show.title} className="p-0" />
                <div className="card-body px-1">
                  <h3 className="name-title">{show.name}</h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No shows available</p>
        )
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default ShowList;
