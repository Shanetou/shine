import { useEffect, useRef, useState } from "react";
import SunCalc from "suncalc";
console.log("SunCalc:", SunCalc);

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

export const useSunPosition = (latitude: number, longitude: number) => {
  const ref = useRef(new Date());
  console.log("ref:", ref);

  const { sunrise, sunset } = SunCalc.getTimes(
    ref.current,
    latitude,
    longitude
  );
  console.log("sunset:", sunset);
  console.log("sunrise:", sunrise);
};
