import CurrentWeather from "./components/cards/CurrentWeather"
import ForecastWeather from "./components/cards/ForecastWeather"
import Map from "./components/Map"
import Footer from "./components/Footer"


function App() {

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="grid grid-cols-1 gap-4 px-0 sm:p-4 lg:px-8 xl:px-16 xl:grid-cols-3">
          <div className="xl:col-span-3">
            <Map />
          </div>
          <div className="xl:col-span-1">
            <CurrentWeather />
          </div>
          <div className="xl:col-span-2">
            <ForecastWeather />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
