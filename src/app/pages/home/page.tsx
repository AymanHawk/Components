"use client";
import { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
} from "@vis.gl/react-google-maps";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import classNames from "classnames";

// COLORS
const ESTATE_GREEN = "#1E392A"; // replace with your brand or match their demo

const API_KEY = "AIzaSyBT28bFMVCed4uiYx0QLKVdc8us4Ne1E-w";
const MAP_ID = "e69365758e39f05a997dfb1b";
const PLACE_IDS = [
  "ChIJt8Q3HABhwokRc3FsBemPWAo",
  "ChIJ9RZaPe1hwokRoGMR7RhXktM",
];

type Place = {
  name: string;
  address?: string;
  rating?: number;
  location: google.maps.LatLngLiteral;
  placeId: string;
  photoUrl?: string;
};

function CustomPlaceMarker({ place }: { place: Place }) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Placeholder photo
  const photo =
    place.photoUrl ||
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=facearea&w=400&h=400";

  const pinVariants = {
    initial: {
      width: 34,
      height: 34,
      borderRadius: "50%",
      backgroundColor: ESTATE_GREEN,
      boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
      zIndex: 10,
    },
    hovered: {
      width: 80,
      height: 80,
      borderRadius: "50%",
      transition: { duration: 0.22, ease: easeInOut },
      zIndex: 20,
    },
    clicked: {
      width: 320,
      height: 170,
      borderRadius: "20px",
      transition: { duration: 0.25, ease: easeInOut },
      zIndex: 30,
    },
  };

  const showState = clicked ? "clicked" : hovered ? "hovered" : "initial";

  return (
    <>
      <AdvancedMarker
        position={place.location}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setClicked(true)}
        className={classNames(
          "real-estate-marker cursor-pointer select-none",
          hovered && "z-20",
          clicked && "z-30"
        )}
        title={place.name}
      >
        {/* Main Pin */}
        <motion.div
          className={classNames(
            "relative flex items-center",
            "custom-pin overflow-hidden shadow-lg"
          )}
          initial="initial"
          animate={showState}
          variants={pinVariants}
          style={{
            backgroundColor: ESTATE_GREEN,
            border: `2px solid #155838`,
          }}
        >
          {/* Image or Icon (icon fades out on hover, image fades in) */}
          <motion.div
            className={classNames(
              "image-container w-full h-full flex items-center justify-center absolute left-0 top-0"
            )}
            style={{
              borderRadius: clicked ? "20px" : "50%",
              backgroundColor: "transparent",
              zIndex: 1,
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
            animate={{
              opacity: hovered || clicked ? 1 : 0,
            }}
            transition={{ duration: 0.22 }}
          >
            <motion.img
              src={photo}
              alt={place.name}
              className={classNames(
                "object-cover",
                clicked ? "w-full h-full" : "w-full h-full"
              )}
              initial={{ scale: 1 }}
              animate={{ scale: clicked ? 1.02 : hovered ? 1.06 : 1 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
          {/* Icon, shown when NOT hovered/clicked */}
          <motion.span
            className="icon absolute left-0 top-0 w-full h-full flex items-center justify-center text-white text-xl"
            animate={{
              opacity: hovered || clicked ? 0 : 1,
              scale: hovered || clicked ? 0.7 : 1,
            }}
            transition={{ duration: 0.18 }}
            style={{ zIndex: 2 }}
          >
            🍽️
          </motion.span>
          {/* Info panel (slide in on click) */}
          <AnimatePresence>
            {clicked && (
              <motion.div
                key="details"
                className="details-container absolute right-0 top-0 h-full flex flex-col justify-between px-6 py-4 bg-white/95 text-gray-900 z-20 shadow-xl"
                style={{
                  minWidth: 180,
                  maxWidth: 240,
                  borderTopRightRadius: 16,
                  borderBottomRightRadius: 16,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  left: "80px",
                  top: 0,
                  height: "100%",
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25 }}
              >
                <button
                  className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white rounded-full p-1 border border-gray-200 shadow"
                  onClick={(e) => {
                    e.stopPropagation();
                    setClicked(false);
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 20 }}
                  >
                    close
                  </span>
                </button>
                <div className="font-bold text-lg mb-1 mt-2">{place.name}</div>
                {place.address && (
                  <div className="text-gray-600 text-sm mb-2">
                    {place.address}
                  </div>
                )}
                {place.rating && (
                  <div className="text-yellow-700 text-sm mb-2">
                    <span>⭐</span> {place.rating}
                  </div>
                )}
                <a
                  href={`https://www.google.com/maps/place/?q=place_id:${place.placeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm mb-2"
                >
                  View on Google Maps
                </a>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Pin "tip" */}
          <motion.div
            className="tip"
            style={{
              position: "absolute",
              bottom: -12,
              left: "50%",
              transform: "translateX(-50%) rotate(45deg)",
              width: 16,
              height: 16,
              zIndex: -1,
              borderRadius: clicked ? 4 : 0,
              background: ESTATE_GREEN,
            }}
            animate={{
              scale: hovered || clicked ? 1.4 : 1,
            }}
            transition={{ duration: 0.22 }}
          ></motion.div>
        </motion.div>
      </AdvancedMarker>
    </>
  );
}

function PlaceMarkers() {
  const map = useMap();
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    if (!map || !window.google) return;
    const service = new window.google.maps.places.PlacesService(map);

    PLACE_IDS.forEach((placeId) => {
      service.getDetails(
        {
          placeId,
          fields: ["name", "geometry", "formatted_address", "rating", "photos"],
        },
        (result, status) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            result?.geometry?.location
          ) {
            let photoUrl: string | undefined;
            if (result.photos && result.photos.length > 0) {
              photoUrl = result.photos[0].getUrl({
                maxWidth: 400,
                maxHeight: 400,
              });
            }
            setPlaces((current) => [
              ...current,
              {
                name: result.name || "",
                address: result.formatted_address,
                rating: result.rating,
                placeId: placeId,
                location: {
                  // @ts-expect-error geometry checked above
                  lat: result.geometry.location.lat(),
                  // @ts-expect-error geometry checked above
                  lng: result.geometry.location.lng(),
                },
                photoUrl,
              },
            ]);
          }
        }
      );
    });
  }, [map]);

  return (
    <>
      {places.map((p, i) => (
        <CustomPlaceMarker key={i} place={p} />
      ))}
    </>
  );
}

function UserLocationMarker() {
  const [location, setLocation] = useState<google.maps.LatLngLiteral | null>(
    null
  );

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        // Optionally handle error
        console.warn("Geolocation not allowed or failed", err);
      }
    );
  }, []);

  if (!location) return null;

  return (
    <AdvancedMarker position={location}>
      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white">
        <span className="text-white font-bold text-lg">U</span>
      </div>
    </AdvancedMarker>
  );
}

export default function HighlightPlacesMap() {
  return (
    <APIProvider apiKey={API_KEY} libraries={["places"]}>
      <div className="w-full max-w-3xl text-center mb-6 mt-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
          Halal Eats in NYC
        </h1>
        <p className="text-md md:text-lg text-gray-700 dark:text-gray-300">
          Explore handpicked halal restaurants and see your own location on the
          map.
        </p>
      </div>
      <div className="w-full max-w-4xl h-[65vh] min-h-[350px] overflow-hidden flex items-center justify-center">
        <Map
          defaultCenter={{ lat: 40.7128, lng: -74.006 }}
          defaultZoom={12}
          mapId={MAP_ID}
          className="w-full h-full"
        >
          <PlaceMarkers />
          <UserLocationMarker />
        </Map>
      </div>
    </APIProvider>
  );
}
