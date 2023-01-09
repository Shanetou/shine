import "./App.css";
import { useGeolocaton } from "./hooks";

export const App = () => {
  const [isLoading, position, error] = useGeolocaton();

  return (
    <div className="App">
      <header className="App-header">
        {isLoading ? (
          <div>Finding the sun...</div>
        ) : (
          <div>
            {error && <p>error</p>}

            {position ? (
              <>
                <p>Latitude: {`${position?.coords.latitude}`}</p>
                <p>Longitude: {`${position?.coords.longitude}`}</p>
              </>
            ) : null}
          </div>
        )}
      </header>
    </div>
  );
};
