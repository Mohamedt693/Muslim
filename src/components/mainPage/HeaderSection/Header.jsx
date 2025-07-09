import React from "react";
import CitySelectButton from "./citySelect";
import DateAndTime from "./DateAndTime";

function Header({ TimeZone, loading }) {
  return (
    <div className="flex items-center justify-between py-4">
      <CitySelectButton />
      <DateAndTime TimeZone={TimeZone} loading={loading} />
      <h1 className="text-4xl">مُسْلِم</h1>
    </div>
  );
}

export default Header;
