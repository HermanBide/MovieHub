import React from 'react'
import { img_300, unavailable } from "../../config/config"
import "./SingleContent.css"
import Badge from '@mui/material/Badge';
import ContentModal from '../contentModal/ContentModal';

const SingleContent = ({ id, poster, title, date, media_type, vote_average}) => {
  return (
    <ContentModal id={id} media_type={media_type} >
    <Badge badgeContent={vote_average} color={vote_average > 6 ? "primary" : "warning"}/>
      <img className='poster' src={poster ? `${img_300}/${poster}`: unavailable } />
      <b className="title">{title}</b>
      <span>
        { media_type === "tv" ? "TV Series" : "Movie"}
      </span>
      <span className="subTitle">{date}</span>
    </ContentModal>
  )
}

export default SingleContent