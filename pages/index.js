import React, { useReducer, useEffect, useState } from "react";

const initialState = { hotels: [], filteredHotels: [] };

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { ...state, hotels: action.payload };
    case "FILTER":
      return {
        ...state,
        filteredHotels: state.hotels.filter((hotel) =>
          hotel.city.toLowerCase().includes(action.input.toLowerCase())
        ),
      };
    default:
      return { ...state };
  }
}
export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [input, setInput] = useState("");

  const fetchData = async () => {
    const fetchResult = await fetch(
      "https://content.newtonschool.co/v1/pr/63b85bcf735f93791e09caf4/hotels"
    );
    const jsonResult = await fetchResult.json();
    console.log(jsonResult);
    dispatch({ type: "FETCH_SUCCESS", payload: jsonResult });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch({ type: "FILTER", input });
  }, [input]);
  // console.log(state);
  return (
    <div className="App">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter city name"
      />

      {state.filteredHotels.map((hotel) => (
        <p key={hotel.hotel_name}>{hotel.hotel_name}</p>
      ))}
    </div>
  );
}
