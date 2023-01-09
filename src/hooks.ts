import { useEffect, useState } from "react";

const ONE_HOUR = 3.6e6;
const TWO_MINUTES = 120000;

export const useGeolocaton = (): [
  isLoading: boolean,
  position?: GeolocationPosition,
  error?: string
] => {
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState<GeolocationPosition>();

  useEffect(() => {
    let isCancelled = false;

    if ("geolocation" in navigator) {
      setIsLoading(true);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (!isCancelled) {
            setIsLoading(false);
            setPosition(position);
          }
        },
        (error) => {
          if (!isCancelled) {
            setIsLoading(false);
            setError(`ERROR(${error.code}): ${error.message}`);
          }
        },
        {
          maximumAge: ONE_HOUR,
          timeout: TWO_MINUTES,
          enableHighAccuracy: false,
        }
      );
    } else {
      alert("Geolocation is not available");
    }

    return () => {
      isCancelled = true;
    };
  }, []);

  return [isLoading, position, error];
};
