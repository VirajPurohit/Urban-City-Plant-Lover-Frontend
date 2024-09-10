import { React, useEffect, useState } from "react";
import { cities } from "../utils/cities";
import axios from "axios";
import PlantCards from "./PlantCards";
import { Spinner } from "react-bootstrap";

export default function PlantSuggestion() {
  const [APIcity, setAPICity] = useState("");
  const [cityOption, setCityOption] = useState([]);
  const [cityFromForm, setCityFromForm] = useState("");
  const [disableFormOne, setdisableFormOne] = useState(false);
  const [disableFormTwo, setdisableFormTwo] = useState(false);
  const [disableBtnOne, setdisableBtnOne] = useState(false);
  const [disableBtnTwo, setdisableBtnTwo] = useState(false);
  const [APIdata, setAPIData] = useState(null);
  const [loading, setloading] = useState(false);

  async function getResponseFromAPI(city, plantType) {
    let data = null;
    try {
      data = await axios.post("http://localhost:5000/confirmAddress", {
        cityName: city,
        plantTypeVal: plantType,
      });
    } catch (err) {
      console.log(err);
    }
    if (data.status === 200) {
      setAPIData(data.data);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (event.target.form.value === "form1") {
      setdisableFormTwo(true);
      setdisableBtnOne(true);
    } else {
      setdisableFormOne(true);
      setdisableBtnTwo(true);
    }
    setloading(true);
    await getResponseFromAPI(
      event.target.city.value,
      event.target.plantType.value
    );
    setloading(false);
  }

  function handleChange(event) {
    const state = event.target.value;
    if (state !== "") {
      setCityOption("");
      setCityOption(cities[state]);
    } else {
      setCityOption([]);
    }
  }

  function handleCityChange(event){
    const city = event.target.value;
    if(city !== ""){
      setCityFromForm(city);
    }
    else{
      setCityFromForm("");
    }
    
    
  }

  useEffect(() => {
    alert(
      "We wish to access your location, to provide plant suggestions based on it"
    );
    if ("geolocation" in navigator) {
      setloading(true);
      navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        axios
          .post(`http://localhost:5000/getAddr/${lat}/${long}`)
          .then((response) => {
            if (response.status === 200) {
              setAPICity(response.data);
              setloading(false);
            } else {
              throw new Error(response.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
    
  }, []);

  if (APIdata !== null) {
    return <PlantCards data={APIdata.results} city={cityFromForm === ""? APIcity: cityFromForm } />;
  }
  if (loading) {
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <Spinner animation="border" varaint="success" />
      </div>
    );
  }
 
  if (APIcity !== "") {
    return (
      <>
        <div>
          We have detected your location is {APIcity}.<br />
          If correct,please select type of plant and confirm,
          <br />
          else please select your city and type of plant in the section below.
          <br />
          <br />
        </div>
        <form onSubmit={handleSubmit}>
          <fieldset disabled={disableFormOne}>
            <input type="hidden" id="form" value="form1" />
            <input type="hidden" id="city" name="city" value={APIcity} />
            <label for="plantType">
              {" "}
              Select between Indoor/ Outdoor plants{" "}
            </label>
            <br />
            <select name="plantType">
              <option value="indoor">Indoor</option>
              <option value="outdoor">Outdoor</option>
            </select>
            <br />
            <br />
            <button type="submit" disabled={disableBtnOne}>
              Confirm
            </button>
          </fieldset>
        </form>
        <br />
        <hr />
        <br />
        {/*--------Selecting City Manually --------------*/}
        <h2> Select your city</h2>
        <form onSubmit={handleSubmit}>
          <fieldset disabled={disableFormTwo}>
            <input type="hidden" id="form" value="form2" />
            <label for="state">Select State:</label>
            <br />
            <select name="state" id="state" onChange={handleChange}>
              <option value="" selected>
                Please select your state
              </option>
              <option value="maharashtra">Maharashtra</option>
              <option value="telangana">Telangana</option>
            </select>
            <br />
            <br />

            <label for="city"> Select your city of residence:</label>
            <br />
            <select name="city" id="city" onChange={handleCityChange}>
            <option value="" selected>
                Please select your city
              </option>
              {cityOption.map(function (city, index) {
                return (
                  <option key={index} value={city}>
                    {city}
                  </option>
                );
              })}
            </select>
            <br />
            <br />
            <label for="plantType">
              {" "}
              Select between Indoor/ Outdoor plants{" "}
            </label>
            <br />
            <select name="plantType">
              <option value="indoor">Indoor</option>
              <option value="outdoor">Outdoor</option>
            </select>
            <br />
            <br />
            <button type="submit" disabled={disableBtnTwo}>
              Confirm
            </button>
            <br />
          </fieldset>
        </form>
      </>
    );
  }
}
