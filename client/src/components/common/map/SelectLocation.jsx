import { useContext, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
// import "leaflet/dist/leaflet.css";
import BookingContext from '../../../context/booking/BookingContext';

const MapClickHandler = ({ setLocation, setMarkerVisible}) => {
    const bookingCtx = useContext(BookingContext)
 
  useMapEvents({
    click(event) { 
      const { lat, lng } = event.latlng;
      setLocation([lat, lng]); // Update the location
      bookingCtx.handleMapLocation([lat, lng]) 
      setMarkerVisible(true); // Show the marker after selecting the location
      
    }
  }); 
  return null;
};

const SelectLocation = () => {

  const [location, setLocation] = useState([23.259933,77.412613]); // No location initially
  const [markerVisible, setMarkerVisible] = useState(false); // Marker visibility flag
 
  return (  
    <div className="flex flex-col items-center justify-center h-30 w-48">
        <div className=" w-72 max-w-4xl"> 
          <MapContainer
            className="h-48 w-full rounded-lg shadow-lg"
            zoom={10} 
            center={location || [20.5937, 78.9629]} // Default to a general location if not selected yet
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Map click handler component */}
            <MapClickHandler  setLocation={setLocation} setMarkerVisible={setMarkerVisible} />

            {/* Show marker if a location has been selected */}
            {markerVisible && location && (
              <Marker position={location}>
                <Popup>
                  Selected Location: <br />
                  Latitude: {location[0]}, Longitude: {location[1]}
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
  
    </div>
  );
};

export default SelectLocation;  