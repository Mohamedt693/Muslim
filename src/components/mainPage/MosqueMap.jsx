import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

function MosqueMap() {
    const [location, setLocation] = useState(null);
    const [mosques, setMosques] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;
            setLocation([lat, lng]);

            const query = `
                [out:json];
                node
                ["amenity"="place_of_worship"]
                (around:5000,${lat},${lng});
                out;
            `;

            fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`)
                .then((res) => res.json())
                .then((data) => {
                setMosques(data.elements);
        });
        },
        (err) => {
            console.error(err);
        }
    );
    }, []);

    return (
        <div  className="w-full">
            {location && (
                <MapContainer
                center={location}
                zoom={15}
                className='h-[300px] w-full border-none rounded-t-[50px] '
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    <Marker position={location}>
                        <Popup>أنت هنا</Popup>
                    </Marker>

                    {mosques.map((mosque) => (
                        <Marker key={mosque.id} position={[mosque.lat, mosque.lon]}>
                            <Popup>
                                مسجد بالقرب منك <br />
                                ID: {mosque.id}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            )}
        </div>
    );
}

export default MosqueMap;
