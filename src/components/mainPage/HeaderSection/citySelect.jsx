import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// Zustand
import { useStore } from "../../../Zustand/store";
// cities list
import {cities} from '../../../assets/list'

export default function CitySelectButton() {
  const {city, setCity} = useStore()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (selectedCityName) => {
    setAnchorEl(null);
    if (selectedCityName) {
      const cityData = cities.find((e) => e.cityName === selectedCityName);
      setCity(cityData);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="w-[150px] h-[40px] p-4 rounded-md bg-white text-black outline-none border-none shadow-md cursor-pointer flex items-center justify-between"
      >
        {city ? city.displayName : "اختار المدينة"}
        <ArrowDropDownIcon />
      </button>
      <Menu
        id="city-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(null)}
        slotProps={{
          paper: {
            sx: {
              width: "150px",
              maxHeight: "500px",
              bgcolor: "#fff",
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              mt: 1,
              p: 1,
            },
          },
        }}
      >
        {cities.map((c) => (
          <MenuItem
            key={c.cityName}
            selected={city?.cityName === c.cityName}
            onClick={() => handleClose(c.cityName)}
          >
            {c.displayName}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
