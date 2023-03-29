import React, {useState} from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const CustomPagination = ({ setPage, numOfPages = 10}) => {
    

 const pageChange = (page) => {
    setPage(page);
    window.scroll(0,0)
 }
  return (
    <div style={{ width: "100%", display: "flex", justifyContent:"center", marginTop: 10,}} >

    <Pagination onChange={(e) => pageChange(e.target.textContent)} count={numOfPages} variant="outlined" color='primary' hideNextButton hidePrevButton/>
    </div>

  )
}

export default CustomPagination