import { React, useEffect, useState } from "react";
import { cities } from "../utils/cities";
import axios from "axios";
import PlantCards from "./PlantCards";
import { Spinner } from "react-bootstrap";
import Error from "../components/Error";
import Header from "../components/Header";
import "./PlantSuggestion.css";

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
  const [error, SetError] = useState({
    isError: false,
    status: "",
    message: "",
    debugMsg: "",
    stack: "",
  });

  async function getResponseFromAPI(city, plantType) {
    let response;
    try {
      response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/plantSuggestions`,
        {
          cityName: city,
          plantTypeVal: plantType,
        },
        { withCredentials: true }
      );
      if (response && response.status === 200) {
        setAPIData(response.data);
      }
    } catch (err) {
      SetError({
        isError: true,
        status: err.response.status,
        message: err.message,
        debugMsg: err.response.data.msg,
        stack: err.response.data.stack,
      });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (event.target.city.value !== "") {
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
    } else {
      alert(
        "City is not selected, there might have been an unexpected error fetching your location. Kindly select city manually"
      );
    }
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

  function handleCityChange(event) {
    const city = event.target.value;
    if (city !== "") {
      setCityFromForm(city);
    } else {
      setCityFromForm("");
    }
  }

  useEffect(() => {
    alert(
      "We wish to access your location, to provide plant suggestions based on it. This info will not be stored anywhere"
    );
    function success(position) {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      const URL = `${process.env.REACT_APP_SERVER_URL}/getAddr/${lat}/${long}`;
      axios
        .post(URL)
        .then((response) => {
          if (response.status === 200) {
            //console.log(response.status, response);
            setAPICity(response.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function error(err) {
      console.log(
        `Navigator.geolocation.getCurrentPosition ERROR(${err.code}): ${err.message}`
      );
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  /* if (loading) {
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
  }*/

  return (
    <>
      {APIdata === null &&
        (error.isError ? (
          <Error err={error} />
        ) : loading ? (
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
        ) : (
          <>
            <Header isMobile={true} />
            <div className="plant-suggestion">
              We have detected your location is <b>{APIcity}</b>.<br />
              If correct,please select type of plant and confirm,
              <br />
              else please select your city and type of plant in the section
              below.
              <br />
              <br />
            </div>
            <form onSubmit={handleSubmit}>
              <fieldset disabled={disableFormOne}>
                <input type="hidden" id="form" value="form1" />
                <input type="hidden" id="city" name="city" value={APIcity} />
                <label htmlFor="plantType">
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
                <label htmlFor="state">Select State:</label>
                <br />
                <select name="state" id="state" onChange={handleChange}>
                  <option value="" defaultValue>
                    Please select your state
                  </option>
                  <option value="maharashtra">Maharashtra</option>
                  <option value="telangana">Telangana</option>
                </select>
                <br />
                <br />

                <label htmlFor="city"> Select your city of residence:</label>
                <br />
                <select name="city" id="city" onChange={handleCityChange}>
                  <option value="" defaultValue>
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
                <label htmlFor="plantType">
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
        ))}
      {APIdata !== null &&
        (error.isError ? (
          <Error err={error} />
        ) : (
          <>
            <Header isMobile={true} />
            <PlantCards
              data={APIdata.results}
              city={cityFromForm === "" ? APIcity : cityFromForm}
            />
          </>
        ))}
    </>
  );
}
