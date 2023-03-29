import React, { useEffect, useState} from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import { makeStyles } from "@mui/styles";
import TheatersIcon from "@mui/icons-material/Theaters";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "#370617",
    zIndex: 100,
  },
});

function MainNav() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    if(value === 0) {
      navigate("/")
    } else if(value === 1) {
      navigate("/movies")
    }
    else if(value === 2) {
      navigate("/series")
    }
    else if(value === 3) {
      navigate("/search")
    }
  }, [value, navigate]);

  return (
    <Box>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
    
        <BottomNavigationAction label="Trending" icon={<WhatshotIcon />} />
        <BottomNavigationAction label="Movies" icon={<TheatersIcon />} />
        <BottomNavigationAction label="Series" icon={<LiveTvIcon />} />
        <BottomNavigationAction label="Search" icon={<SavedSearchIcon />} />
      </BottomNavigation>
    </Box>
  );
}

export default MainNav;
