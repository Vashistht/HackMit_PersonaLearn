import React from "react";
import BottomNavigation from '@mui/material/BottomNavigation';

const Navigation = () => {
  return (
    <div>
        <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
        </BottomNavigation>
</div>
  )
}

export default Navigation