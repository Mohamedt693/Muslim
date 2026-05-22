import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MosqueElement {
  id: number;
  lat: number;
  lon: number;
  tags?: {
    name?: string;
    [key: string]: string | undefined;
  };
}

function MosqueMap() {
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [mosques, setMosques] = useState<MosqueElement[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setLocation([lat, lng]);

        const query = `
          [out:json];
          node
            ["amenity"="place_of_worship"]
            ["religion"="islam"]
            (around:5000,${lat},${lng});
          out;
        `;

        fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`)
          .then((res) => res.json())
          .then((data) => {
            if (data && data.elements) {
              setMosques(data.elements);
            }
          })
          .catch((err) => console.error(err));
      },
      (err) => {
        console.error(err);
      }
    );
  }, []);

  return (
    <div className="w-full">
      {location && (
        <MapContainer
          center={location}
          zoom={15}
          className="h-[300px] w-full border-none"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <Marker position={location}>
            <Popup>أنت هنا</Popup>
          </Marker>

          {mosques.map((mosque) => (
            <Marker key={mosque.id} position={[mosque.lat, mosque.lon]}>
              <Popup>
                <strong>{mosque.tags?.name || 'مسجد بالقرب منك'}</strong>
                <br />
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