import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Counterbtn from "./Counterbtn";
import data from "./Azkar.json";
// Material ui
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RefreshIcon from "@mui/icons-material/Refresh";

function Morningazkar() {
  const [Count, setCount] = useState({});

  const handleCounterChange = (index, newValue) => {
    setCount((prev) => ({
      ...prev,
      [index]: newValue,
    }));
  };


  return (
    <div >

      <div className="w-full flex items-center justify-between">
        <h1 className="my-10 text-xl font-semibold" >اذكار الصباح</h1>
        <div>
          <IconButton size="large" aria-label="back-arrow">
            <RefreshIcon
              onClick={() => {
                window.location.reload();
              }}
              fontSize="inherit"
              color="secondary"
            />
          </IconButton>
          <Link to={"/"}>
            <IconButton size="large" aria-label="back-arrow">
              <ArrowBackIcon fontSize="inherit" color="secondary" />
            </IconButton>
          </Link>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data["أذكار الصباح"].map((d, index) => {
          if (Count[index] <= 0) {
            return null;
          } else
            return (
              <div className="shadow-2xl rounded-md p-6" key={index}>
                <div className="h-[300px] relative" style={{display: [index].Count === 0 ? "none" : "block",}}>
                  <h5 className="text-2xl mb-2">{d.content}</h5>
                  <h6 className="text-sm text-gray-500">{d.description}</h6>
                  <div className="absolute bottom-0.5 w-full ">
                    <Counterbtn
                      count={d.count}
                      onCountChange={(newCount) =>
                        handleCounterChange(index, newCount)
                      }
                    />
                  </div>
                </div>
              </div>
            );
        })}
      </div>
    </div>
  );
}

export default Morningazkar;
