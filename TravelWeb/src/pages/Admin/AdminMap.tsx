"use client";
import axios from "axios";
import Feature from "ol/Feature";
import Map from "ol/Map";
import View from "ol/View";
import Point from "ol/geom/Point";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import "ol/ol.css";
import { fromLonLat, transform } from "ol/proj";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import { Style } from "ol/style";
import Icon from "ol/style/Icon";
import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "./layout";
import { CiCirclePlus } from "react-icons/ci";
import { PopupModal } from "../../components/layouts/ContainerModal";
import { LocationTable } from "../../components/Location/LocationTable";
import { Toaster, toast } from "sonner";

interface SelectedLocation {
  name: string;
  longitude: number;
  latitude: number;
}
interface AdminMapProps {
  id: string;
}

export const AdminMap: React.FC<AdminMapProps> = ({ id }) => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [map, setMap] = useState<Map | null>(null);
  const [selectedLocation, setSelectedLocation] =
    useState<SelectedLocation | null>(null);

  // Use useRef to store a reference to the markerLayer
  const markerLayerRef = useRef<VectorLayer<VectorSource> | null>(null);

  useEffect(() => {
    const mapInstance = new Map({
      target: id,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([84.138244, 28.402031]),
        zoom: 3,
        maxZoom: 30,
        minZoom: 7.1,
      }),
    });

    // Create the markerLayer once
    const markerLayer = new VectorLayer({
      source: new VectorSource(),
      style: new Style({
        image: new Icon({
          src: "/assets/pointer.svg",
          scale: 0.5, // Adjust this value to change the size of the SVG icon
        }),
      }),
    });

    // Add the markerLayer to the map
    mapInstance.addLayer(markerLayer);

    // Store a reference to markerLayer
    markerLayerRef.current = markerLayer;

    setMap(mapInstance);

    return () => {
      if (mapInstance) {
        mapInstance.dispose();
      }
    };
  }, [id]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchTerm}&countrycodes=NPL&bounded=1`,
        { withCredentials: false }
      );

      if (response.data.length > 0) {
        const result = response.data[0];
        const [lon, lat] = [parseFloat(result.lon), parseFloat(result.lat)];

        console.log("Destination Location:", { latitude: lat, longitude: lon });

        // Transform the coordinates to the map's projection
        const [transformedLon, transformedLat] = transform(
          [lon, lat],
          "EPSG:4326",
          "EPSG:3857"
        );

        // Display the location in the box
        setSelectedLocation({
          name: result.display_name,
          longitude: transformedLon,
          latitude: transformedLat,
        });

        const isWithinBounds =
          transformedLon >= 8000000 &&
          transformedLon <= 10000000 &&
          transformedLat >= 2500000 &&
          transformedLat <= 3500000;

        console.log("Transformed Coordinates:", {
          transformedLon,
          transformedLat,
        });

        if (isWithinBounds && map) {
          // Animate to the searched location
          map.getView().animate({
            center: [transformedLon, transformedLat],
            duration: 1000, // Animation duration in milliseconds
            zoom: 8, // You can adjust the zoom level as needed
          });

          // Clear existing features from the markerLayer
          const mapSource = markerLayerRef.current?.getSource();
          if (mapSource) {
            mapSource.clear();
          }

          // Add a new feature for the searched location
          mapSource?.addFeature(
            new Feature({
              geometry: new Point([transformedLon, transformedLat]),
            })
          );
        } else {
          alert("We only guide you throughout Nepal.");
        }
      } else {
        alert("Location not found!");
      }
    } catch (error) {
      console.error("Error fetching geocoding data:", error);
      alert("Error fetching geocoding data. Please try again.");
    }
  };

  const handleSetLocation = async () => {
    try {
      if (selectedLocation) {
        const response = await axios.post(
          "http://localhost:8082/location/addLocation",
          {
            location: selectedLocation.name,
            longitude: selectedLocation.longitude,
            latitude: selectedLocation.latitude,
          }
        );

        toast.success("location added successfully")

      } else {
        alert("No location selected.");
      }
    } catch (error) {
      console.error("Error saving location:", error);
      alert("Error saving location. Please try again.");
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
    <AdminLayout>
    <div className="w-full h-full p-10 bg-slate-100 rounded ">
      {/* Adjust the div styles based on your layout requirements */}
      <div className="flex justify-center items-start">
        <div className="w-[100%] mr-5">
          <input
            type="text"
            placeholder="Search location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-black p-2 border w-full border-gray-300 rounded-md mb-5"
          />

        </div>
        <div className="flex justify-between span w-full">
  <button
    onClick={handleSearch}
    className="p-2 px-3 bg-green-600 text-white text-center text-xl rounded hover:bg-green-700 focus:outline-none focus:ring focus:border-green-700 transition"
  >
    Search
  </button>
  <div className="items-end">
  <button
    onClick={handleOpenModal}
    className="bg-blue-800 p-3 px-4 rounded "
  >  
    <div className="flex items-center">
      <div className="mr-2">
        <CiCirclePlus size={32} color="white" />
      </div>
      <span className="text-white font-semibold">Manage Locations</span>
    </div>
  </button>
  </div>

</div>

      </div>
      {selectedLocation && (
        <div className="mb-4">
          <p>Name: {selectedLocation.name}</p>
          <p>Longitude: {selectedLocation.longitude}</p>
          <p>Latitude: {selectedLocation.latitude}</p>
          <button
            onClick={handleSetLocation}
            className=" mt-2 p-2 px-3 bg-green-600 text-white text-center text-xl rounded hover:bg-green-700 focus:outline-none focus:ring focus:border-green-700 transition"
          >
            Set in Map
            <Toaster className="absolute right-0 transform translate-x-16transition-transform duration-300 ease-in-out" richColors />
          </button>
        </div>
      )}
      <div
        id={id}
        className="mx-auto mt-12 w-full h-[50vh] border border-gray-300 rounded-md"
      ></div>
    </div>
    </AdminLayout>
    <div>
    <PopupModal isOpen={showModal} onClose={handleCloseModal}>
        <LocationTable/>
      </PopupModal>
    </div>

    </>
  );
};
