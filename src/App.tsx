import CurrentWeather from "./components/cards/CurrentWeather"
import ForecastWeather from "./components/cards/ForecastWeather"
import Map from "./components/Map"


function App() {

  return (
    <div className="grid grid-cols-1 gap-4 px-0 sm:p-4 lg:px-8 xl:px-12 xl:grid-cols-3">
      <div className="xl:col-span-3">
        <Map />
      </div>
      <div className="xl:col-span-1">
        <CurrentWeather />
      </div>
      <div className="xl:col-span-2">
        <ForecastWeather />
      </div>
    </div >
  )
}

export default App
