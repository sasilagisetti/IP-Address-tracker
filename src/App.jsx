import { useEffect, useRef, useState } from "react";
import btn_symbol from "./assets/images/icon-arrow.svg";
import bg_img_desk from "./assets/images/pattern-bg-desktop.png";
import bg_img_mob from "./assets/images/pattern-bg-mobile.png";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

function App() {
  const [ipData, setIpData] = useState();
  const inputData = useRef(0);
  const [position, setPosition] = useState([51.505, -0.09]);
  // const position = [51.505, -0.09];

  function SetViewOnClick({ coords }) {
    const map = useMap();
    map.setView(coords, map.getZoom());

    return null;
  }

  useEffect(() => {
    fetchingIpAddress();
  }, []);
  const fetchingIpAddress = async () => {
    const data = await fetch("https://ipapi.co/json/");
    const jsondata = await data.json();
    console.log(jsondata);
    setIpData(jsondata);
    setPosition([jsondata.latitude, jsondata.longitude]);
  };

  const handleClick = async () => {
    const data = await fetch(
      `https://ipapi.co/${inputData.current.value}/json/`
    );
    const jsondata = await data.json();
    console.log(jsondata);
    if (jsondata.error === true) {
      alert("Please Provise Valid IP Address");
      return 0;
    }
    setIpData(jsondata);
    setPosition([jsondata.latitude, jsondata.longitude]);

    // console.log(inputData.current.value);
  };

  useEffect(() => {
    fetchingMapData();
  }, []);
  const fetchingMapData = async () => {};
  // console.log(ipData);
  return (
    <div className="font-Rubik flex flex-col w-screen box-border relative h-[100vh] sm:h-screen">
      <div className='bg-[url("./assets/images/pattern-bg-mobile.png")] sm:bg-[url("./assets/images/pattern-bg-desktop.png")] bg-no-repeat bg-cover flex flex-col items-center pt-[2rem] pb-[6rem] gap-y-6'>
        <h1 className="text-white text-lg sm:text-3xl font-medium">IP Address Tracker</h1>
        <div className="w-[100%] flex flex-row items-center justify-center">
          <input
            type="text"
            placeholder="Search for any IP Address or Domain"
            className="px-4 sm:px-6 w-[70%] sm:w-[40%] py-2 sm:py-4 rounded-l-xl outline-none text-base sm:text-lg box-border"
            ref={inputData}
          />
          <button
            className="bg-black py-[0.81rem] sm:py-[1.42rem] px-4 sm:px-6 border-none rounded-r-xl text-lg flex flex-col items-center justify-center box-border"
            onClick={handleClick}
          >
            <img src={btn_symbol} alt="_btn" />
          </button>
        </div>
      </div>
      <div className="absolute top-[20%] sm:top-[25%] w-[100%] z-20 pointer-events-none">
        <div className="grid grid-cols-1 gap-y-4 sm:gap-y-0 sm:grid-cols-4 mx-auto px-6 sm:px-8 py-4 sm:py-6 gap-x-6 w-[85%] sm:w-[70%] bg-white rounded-3xl sm:rounded-xl shadow-xl">
          <div className="flex flex-col sm:gap-y-4 items-center sm:items-start border-[hsl(0,0%,59%)] md:border-r-[1px] pr-4 ">
            <p className="text-xs font-medium text-[hsl(0,0%,59%)] ">
              IP ADDRESS
            </p>
            <p className="w-full text-base sm:text-lg font-semibold break-words text-center sm:text-left">
              {ipData === undefined ? "192.184.188" : ipData?.ip}
            </p>
          </div>
          <div className="flex flex-col sm:gap-y-4 items-center sm:items-start border-[hsl(0,0%,59%)] md:border-r-[1px] pr-4 ">
            <p className="text-xs font-medium text-[hsl(0,0%,59%)]">LOCATION</p>
            <p className="sm:text-lg font-semibold text-center sm:text-left">
              {ipData?.city}, {ipData?.region}, {ipData?.country_name}
            </p>
          </div>
          <div className="flex flex-col sm:gap-y-4 items-center sm:items-start border-[hsl(0,0%,59%)] md:border-r-[1px] pr-4">
            <p className="text-xs font-medium text-[hsl(0,0%,59%)]">TIMEZONE</p>
            <p className="sm:text-lg font-semibold ">
              UTC: {ipData?.utc_offset.split("30")}:
              {ipData?.utc_offset.split("+05")}
            </p>
          </div>
          <div className="flex flex-col sm:gap-y-3 items-center sm:items-start border-[hsl(0,0%,59%)] pr-4">
            <p className="text-xs font-medium text-[hsl(0,0%,59%)]">ISP</p>
            <p className="sm:text-lg font-semibold text-center sm:text-left">{ipData?.org}</p>
          </div>
        </div>
      </div>
      <div className="box-border h-[100%] sm:h-[100%] z-10">
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={true}
            style={{ minHeight: "100%", minWidth: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={position}>
              <Popup>Your Here!</Popup>
            </Marker>
            <SetViewOnClick coords={position} />
          </MapContainer>
        </div>
      {/* </div> */}
    </div>
  );
}

export default App;
