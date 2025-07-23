// src/app/pages/home/page.tsx
"use client";
import { useEffect, useState, useRef } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
} from "@vis.gl/react-google-maps";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import { IconSalad } from "@tabler/icons-react";
import classNames from "classnames";

// --- Config ---
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_K ?? "";
const MAP_ID = process.env.NEXT_PUBLIC_MAP_ID;
const PLACE_IDS = [
  "ChIJt8Q3HABhwokRc3FsBemPWAo",
  "ChIJ9RZaPe1hwokRoGMR7RhXktM",
  "ChIJJfzcN-SAwokR6VTcpIHr9zU",
  "ChIJi9LPFP2AwokROEz8m72oHCA",
  "ChIJ8XonSp2BwokR27itfnrCH2E",
  "ChIJH8HG1CGBwokRCez0KWQ-sKs",
  "ChIJTZ7trrWBwokRgl98XxCpYNc",
  "ChIJLTyKNzKBwokRdwYZS0_fsTg",
  "ChIJQyZIvVeAwokR5xffYPDTgBM",
  "ChIJRZbKButEwokRrCIdokj9GCo",
  "ChIJ0xshHIxfwokRh6uQgQpjhf4",
  "ChIJy2zqfWJfwokRskbl93Mhi0M",
  "ChIJkYVe8uNfwokRWW22i9QHJTk",
  "ChIJXbr7UwBfwokRj09Z7emv1Hk",
  "ChIJB1TKt9dFwokR7hFl_NhDub4",
  "ChIJHVvKcpkv6IkRJ-BEHLPoKtA",
  "ChIJr3n5MyFewokRT9dhgQhY86c",
  "ChIJS7kQysRfwokRtmx0UqxW0rY",
  "ChIJwQ1sixRfwokRKYHuVItD2Wc",
  "ChIJm9Yen5FfwokR9ILDHkuOGOc",
  "ChIJ1f8aVABfwokRf_xKf0uyGi8",
  "ChIJhTGR_D5fwokRiLZx_ChoguU",
  "ChIJ45vTLgpfwokRpEvRbYSRiYQ",
  "ChIJx83YoyJZwokRQmzSXiiCAk8",
  "ChIJBQiIkQRhwokR67CNAmU4W3s",
  "ChIJnWJTs7yLwokRgHezdHwp9h4",
  "ChIJdQpc845EwokRB-Z-deVJoCI",
  "ChIJYZtTKRf1wokRhIdo4iq_o1o",
  "ChIJ7_FlYr30wokRCPEP1ZtUxHU",
  "ChIJ9Wui4jn1wokR7mFR_sT287o",
  "ChIJtzox9gvhwokR6mCU0wvVGBY",
  "ChIJa7gEeahZwokRXPN6Y_WqYO0",
  "ChIJOcgkuDwp6IkR02-uiidFiek",
  "ChIJe_xu_X8p6IkR59HFEitRTlk",
  "ChIJVfP1vztZwokRkfAldZ2khvc",
  "ChIJ8zYw_-VfwokRfMz25U3CbGM",
  "ChIJ7bpiKTZhwokRCttlTx-eXXg",
  "ChIJwRJFh-xZwokRPUKz_quhEX4",
  "ChIJA00WLcJfwokRUuqYNKLrIwU",
  "ChIJdXwnP6ZfwokRNh0vi9vTla0",
  "ChIJ8TsMli9fwokRtHEQqOSZtww",
  "ChIJw7N1GyFewokRqiBS32i7kJM",
  "ChIJ4VMjWotZwokRnkSXezyMBgc",
  "ChIJe4Nudf5hwokRUdcvpaHvQII",
  "ChIJ6-sc9ZWLwokRonfjDtQ5h8g",
  "ChIJX9oyBOBhwokRtNomVphsklY",
  "ChIJLWQJgFWLwokRzExNPnQWRA4",
  "ChIJn8RTCHZfwokRgsRAnQD-mv4",
  "ChIJ1-kYoXphwokRGRfu5Ili2oE",
  "ChIJO7ZEFdBhwokR0QSRhPN3P8I",
  "ChIJEY8HbmuHwokRefE73OVT97I",
  "ChIJKTdDwiwgTIYR_IrgimZrluY",
  "ChIJvwz50XcfTIYRCszoyuUPTp4",
  "ChIJLTsML3kfTIYRgbaV0OS-S3E",
  "ChIJTYNkTaM9TIYRZQ0pZ1m6j-o",
  "ChIJHX80awA9TIYRIwBRTxqeRRU",
  "ChIJi4mzoxYjTIYRRd1v7XC0G6c",
  "ChIJ46o6l647TIYRf99EEWRDE6w",
  "ChIJbWjOvU0pTIYRejZUV8w-4wM",
  "ChIJ41ACmGkpTIYR6Q51tGzn_zI",
  "ChIJvQMExSkXTIYRSlVmCaxhzzI",
  "ChIJe1POEAA9TIYRca8VYVjWcd8",
  "ChIJKQO5V9wnTIYRYJnV25wn1dc",
  "ChIJbygIK-JhwokRgLf883QH3II",
  "ChIJ80wRvvphwokRtxBFNUQz18U",
  "ChIJs_GSrAxfwokRrXbHbDCmc5w",
  "ChIJG_Jmx9FhwokRRLOXdi6Z1a0",
  "ChIJvzYdC9mHwokR0DJqtP1KwWE",
  "ChIJdTrzacBYwokR6DHjw1ICQ7k",
  "ChIJg3XWIaRZwokRNItIv7SgVcg",
  "ChIJ04fgjKxfwokRJhS7n4zAVBM",
  "ChIJ13AWhdQ76IkRBp_NSwSACBU",
  "ChIJx2JkxxVZwokRQwS9pr0nrNk",
];
const ESTATE_GREEN = "#1E392A";

if (typeof window !== "undefined") {
  const apiKey = API_KEY;
  console.log(
    "[DEBUG] Loaded Google Maps API Key:",
    apiKey ? apiKey.slice(0, 4) + "..." + apiKey.slice(-4) : "NOT FOUND"
  );
}

// --- Types ---
type Place = {
  name: string;
  address?: string;
  rating?: number;
  location: google.maps.LatLngLiteral;
  placeId: string;
  photoUrl?: string;
};

// --- Modal for place details ---
function PlaceModal({
  place,
  onClose,
}: {
  place: Place;
  onClose: () => void;
}) {
  // Handle closing on click outside
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [onClose]);
  return (
    <motion.div
      ref={ref}
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -60, opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="absolute top-4 left-4 z-50 bg-white dark:bg-neutral-900 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-700 w-[320px] max-w-[95vw] overflow-hidden"
      style={{ pointerEvents: "auto" }}
    >
      <div className="w-full h-48 bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
        <img
          src={
            place.photoUrl ||
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=facearea&w=400&h=400"
          }
          alt={place.name}
          className="object-cover w-full h-full"
          style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
        />
      </div>
      <div className="p-5">
        <div className="font-bold text-lg mb-1">{place.name}</div>
        {place.address && (
          <div className="text-gray-600 dark:text-gray-300 text-sm mb-2">
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
        <button
          className="block mt-4 ml-auto px-3 py-1 bg-gray-100 dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded hover:bg-gray-200 dark:hover:bg-neutral-700 transition"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </motion.div>
  );
}

// --- Marker with Tabler icon and photo on hover ---
function CustomPlaceMarker({
  place,
  onClick,
}: {
  place: Place;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const pinVariants = {
    initial: {
      width: 44,
      height: 44,
      borderRadius: "50%",
      backgroundColor: ESTATE_GREEN,
      boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
      zIndex: 10,
      scale: 1,
    },
    hovered: {
      width: 70,
      height: 70,
      borderRadius: "50%",
      scale: 1.13,
      transition: { duration: 0.22, ease: easeInOut },
      zIndex: 20,
    },
  };

  const showState = hovered ? "hovered" : "initial";

  return (
    <AdvancedMarker
      position={place.location}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className={classNames("cursor-pointer select-none")}
      title={place.name}
    >
      <motion.div
        className="relative flex items-center justify-center overflow-hidden shadow-lg"
        initial="initial"
        animate={showState}
        variants={pinVariants}
        style={{
          backgroundColor: ESTATE_GREEN,
          border: `2px solid #155838`,
        }}
      >
        {/* ICON - hidden when hovered */}
        <motion.span
          className="icon absolute left-0 top-0 w-full h-full flex items-center justify-center text-white text-xl"
          animate={{
            opacity: hovered ? 0 : 1,
            scale: hovered ? 0.8 : 1,
          }}
          transition={{ duration: 0.18 }}
          style={{ zIndex: 3 }}
        >
          <IconSalad size={28} stroke={2.1} />
        </motion.span>
        {/* IMAGE - only on hover */}
        <motion.img
          src={
            place.photoUrl ||
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=facearea&w=400&h=400"
          }
          alt={place.name}
          className="object-cover absolute w-full h-full rounded-full"
          style={{
            zIndex: 2,
            pointerEvents: "none",
          }}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{
            opacity: hovered ? 1 : 0,
            scale: hovered ? 1.06 : 1,
          }}
          transition={{ duration: 0.18 }}
        />
      </motion.div>
    </AdvancedMarker>
  );
}

// --- Markers container ---
function PlaceMarkers({
  setOpenPlace,
}: {
  setOpenPlace: (place: Place | null) => void;
}) {
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
                  // @ts-expect-error geometry checked above - Google result typing is wrong
                  lat: result.geometry.location.lat(),
                  // @ts-expect-error geometry checked above - Google result typing is wrong
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
        <CustomPlaceMarker
          key={i}
          place={p}
          onClick={() => setOpenPlace(p)}
        />
      ))}
    </>
  );
}

// --- User location marker ---
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

// --- Main Page ---
export default function HighlightPlacesMap() {
  const [openPlace, setOpenPlace] = useState<Place | null>(null);

  return (
    <APIProvider apiKey={API_KEY} libraries={["places"]}>
      <div className="w-full max-w-3xl text-center mb-6 mt-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
          Halal Eats in NYC
        </h1>
        <p className="text-md md:text-lg text-gray-700 dark:text-gray-300">
          Explore handpicked halal restaurants and see your own location on the map.
        </p>
      </div>
      <div className="w-full max-w-4xl h-[65vh] min-h-[350px] relative overflow-hidden flex items-center justify-center">
        <Map
          defaultCenter={{ lat: 40.7128, lng: -74.006 }}
          defaultZoom={12}
          mapId={MAP_ID}
          className="w-full h-full"
        >
          <PlaceMarkers setOpenPlace={setOpenPlace} />
          <UserLocationMarker />
          <AnimatePresence>
            {openPlace && (
              <PlaceModal
                key={openPlace.placeId}
                place={openPlace}
                onClose={() => setOpenPlace(null)}
              />
            )}
          </AnimatePresence>
        </Map>
      </div>
    </APIProvider>
  );
}
