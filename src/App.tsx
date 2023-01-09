import "./App.css";
import { useGeolocaton, useSunPosition } from "./hooks";

const SunPosition = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  useSunPosition(latitude, longitude);

  return (
    <div>
      {/* {position && (
        <>
          <p>Latitude: {`${position?.coords.latitude}`}</p>
          <p>Longitude: {`${position?.coords.longitude}`}</p>
        </>
      )} */}
    </div>
  );
};

export const App = () => {
  const [isLoading, position, error] = useGeolocaton();

  return (
    <div className="App">
      <header className="App-header">
        {error && <div>{error && <p>error</p>}</div>}

        {position && !isLoading ? (
          <SunPosition
            latitude={position.coords.latitude}
            longitude={position.coords.longitude}
          />
        ) : (
          <div>Finding the sun...</div>
        )}
      </header>
    </div>
  );
};
