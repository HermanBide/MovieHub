import React, { useState, useEffect } from "react";
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Button from "@mui/material/Button";
import Backdrop from '@material-ui/core/Backdrop';
import YouTubeIcon from '@mui/icons-material/YouTube';
import "./ContentModal.css";
import axios from "axios";
import {   img_500,
  unavailable,
  unavailableLandscape, } from "../../config/config"
  import Carousel from "../carousel/carousel"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};



export default function ContentModal({ children, media_type, id }) {
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setContent(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setVideo(data.results[0]?.id.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="content_modal">
      <Button onClick={handleOpen} className="media_content">
        {children}
      </Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        display="flex"
      >
        <Fade in={open}>
         <Box sx={style}>
        <div className="ContentModal">
              <img
                  src={content?.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content?.title ? `${content.title}` : unavailable}
                  className="ContentModal__portrait"
                />
                <img
                  src={ content?.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content?.title ? `${content.title}` : unavailable}
                  className="ContentModal__landscape"
                />
              <div className="ContentModal__about">
                <span className="ContentModal__title">
                  {content?.title ? `${content.title}` : unavailable } (
                  {(
                    content?.first_air_date ||
                    content?.release_date ||
                    "-----"
                  ).substring(0, 4)}
                  ){" "}
                  <div className="ContentModal__about">
                    <span className="ContentModal__title">
                      {content?.name || content?.title} (
                      {(
                        content?.first_air_date ||
                        content?.release_date ||
                        "-----"
                      ).substring(0, 4)}
                      )
                    </span>
                    {content?.tagline && (
                      <i className="tagline">{content?.tagline}</i>
                    )}

                    <span className="ContentModal__description">
                      {content?.overview}
                    </span>

                    <div>
                      <Carousel id={id} media_type={media_type} />
                    </div>
                    
                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button> 
                  </div>
                </span> 
                {content?.tagline && (
                  <i className="tagline">{content?.tagline}</i>
                )}

                <span className="ContentModal__description">
                  {content?.overview}
                </span>

                <div>
                  <Carousel id={id} media_type={media_type} />
                </div>

                <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal> 
    </div>
  );
}
