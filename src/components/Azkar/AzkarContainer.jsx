import React from 'react';
import { Link } from 'react-router-dom';

function AzkarContainer({ title, icon, to }) {
    return (
        <Link to={to} style={{ textDecoration: 'none' }}>
            <div className="w-[200px] h-auto rounded-md bg-white shadow-md overflow-hidden flex flex-col items-center">
                <div
                    className="w-full h-[200px] bg-cover bg-center"
                    style={{ backgroundImage: `url(${icon})` }}
                ></div>
                <div className="p-2 w-full text-center">
                    <h5 className="text-black text-lg font-bold">{title}</h5>
                </div>
            </div>
    </Link>
  );
}

export default AzkarContainer;


