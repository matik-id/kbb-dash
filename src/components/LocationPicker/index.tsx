import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';

interface LocationPickerProps {
  onChange: (position: { lat: number; lng: number }) => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ onChange }) => {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    const handleMapClick = (e: { latlng: { lat: number; lng: number } }) => {
      setPosition(e.latlng);
      onChange(e.latlng);
    };

    // const map = useMapEvent('click', handleMapClick);

    // return () => {
    //   map.off('click', handleMapClick);
    // };
  }, [onChange]);

  return position === null ? null : (
    <MapContainer center={{ lat: 51.505, lng: -0.09 }} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    </MapContainer>
  );
};

export default LocationPicker;