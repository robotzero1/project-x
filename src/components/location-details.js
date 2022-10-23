import React from "react";
import { isIOS, isMobile } from "react-device-detect";
import {
  locationDetailsBlock,
  locationDetailAddressHours,
  locationDetailVenueHours,
  locationDetailVenueAddress,
  locationIcons,
} from "../components/layout.module.css";

const openMap = (latitude, longitude) => {
  const mapUrl = "?q=" + latitude + "," + longitude;
  let mapUrlFullPath = "";
  // Check if a mobile device exists, or is web browser
  if (isMobile) {
    mapUrlFullPath = isIOS ? "maps://" + mapUrl : "geo:" + mapUrl;
  } else {
    mapUrlFullPath = "https://www.google.com/maps/dir//lat,long/@" + mapUrl;
  }
  window.open(mapUrlFullPath, "_system");
};

const LocationDetails = ({ venue }) => {
  return (
    <div className={locationDetailsBlock}>
      <hr></hr>
      <div className={locationDetailAddressHours}>
        <div className={locationDetailVenueAddress}>{venue.venue_address}</div>
        <div className={locationDetailVenueHours}>{venue.venue_hours}</div>
      </div>

      <div className={locationIcons}>
        {venue.venue_map && (
          <div
            title="Open on Map"
            onClick={() =>
              openMap(
                venue.venue_map.split(", ")[0],
                venue.venue_map.split(", ")[1]
              )
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
              width="30px"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <path
                d="M9 6.882l-7-3.5v13.236l7 3.5l6-3l7 3.5V7.382l-7-3.5l-6 3zM15 15l-6 3V9l6-3v9z"
                fill="rgba(255, 168, 0, 1)"
              />
            </svg>
          </div>
        )}
        {venue.venue_website && (
          <div title="Venue Website">
            <a href={venue.venue_website}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26px"
                viewBox="0 0 24 24"
                fill="rgba(0, 0, 0, 1)"
                stroke="rgba(255, 168, 0, 1)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                display="block"
                id="Globe"
              >
                <circle cx="12" cy="12" r="10" />
                <ellipse
                  cx="12"
                  cy="12"
                  rx="10"
                  ry="4"
                  transform="rotate(90 12 12)"
                />
                <path d="M2 12h20" />
              </svg>
            </a>
          </div>
        )}
        {venue.venue_telephone && (
          <div title="Call the Venue">
            <a href={`tel:${venue.venue_telephone}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
                width="30px"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 20 18"
              >
                <path
                  d="M11.229 11.229c-1.583 1.582-3.417 3.096-4.142 2.371c-1.037-1.037-1.677-1.941-3.965-.102c-2.287 1.838-.53 3.064.475 4.068c1.16 1.16 5.484.062 9.758-4.211c4.273-4.274 5.368-8.598 4.207-9.758c-1.005-1.006-2.225-2.762-4.063-.475c-1.839 2.287-.936 2.927.103 3.965c.722.725-.791 2.559-2.373 4.142z"
                  fill="rgba(255, 168, 0, 1)"
                />
              </svg>
            </a>
          </div>
        )}
        {venue.venue_email && (
          <div title="Email the Venue">
            <a href={`mailto:${venue.venue_email}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
                width="28px"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 36 30"
              >
                <path
                  class="clr-i-solid clr-i-solid-path-1"
                  d="M32.33 6a2 2 0 0 0-.41 0h-28a2 2 0 0 0-.53.08l14.45 14.39z"
                  fill="rgba(255, 168, 0, 1)"
                />
                <path
                  class="clr-i-solid clr-i-solid-path-2"
                  d="M33.81 7.39l-14.56 14.5a2 2 0 0 1-2.82 0L2 7.5a2 2 0 0 0-.07.5v20a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V8a2 2 0 0 0-.12-.61zM5.3 28H3.91v-1.43l7.27-7.21l1.41 1.41zm26.61 0h-1.4l-7.29-7.23l1.41-1.41l7.27 7.21z"
                  fill="rgba(255, 168, 0, 1)"
                />
              </svg>
            </a>
          </div>
        )}
      </div>
      <hr></hr>
    </div>
  );
};

export default LocationDetails;
