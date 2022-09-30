import React from "react";
import "../styles/NewCity.css";
import Input from "../components/Input";
import { useCreateCityMutation } from "../features/citiesAPI";
import { useRef } from "react";
import Alert from "../components/Alert/Alert";

export default function NewCity() {
  const [createCity, { data: city, error }] = useCreateCityMutation();
  let msg = "";
  let messageCity = city?.message;

  if (city?.success) {
    msg = messageCity;
  } else {
    msg = error?.data.message;
  }

  const photoRef = useRef();
  const cityRef = useRef();
  const countryRef = useRef();
  const populationRef = useRef();
  const foundedRef = useRef();

  const form = [
    {
      label: "City",
      htmlFor: "city",
      type: "text",
      placeholder: "Enter a city",
      value: cityRef,
    },
    {
      label: "Country",
      htmlFor: "country",
      type: "text",
      placeholder: "Enter a country",
      value: countryRef,
    },
    {
      label: "Population",
      htmlFor: "population",
      type: "number",
      placeholder: "Enter a population",
      value: populationRef,
    },
    {
      label: "Photo",
      htmlFor: "photo",
      type: "text",
      placeholder: "Enter a photo",
      value: photoRef,
    },
    {
      label: "Founded",
      htmlFor: "founded",
      type: "date",
      placeholder: "Enter a founded",
      value: foundedRef,
    },
  ];

  function newCity(e) {
    e.preventDefault();

    const dataCity = {
      city: cityRef.current.value,
      photo: photoRef.current.value,
      country: countryRef.current.value,
      population: populationRef.current.value,
      founded: foundedRef.current.value,
    };
    createCity(dataCity);
  }

  return (
    <div className="NewCity-container">
      <h1>New City</h1>
      <form className="NewCity-form" onSubmit={newCity}>
        {form.map((input) => (
          <Input
            label={input.label}
            htmlFor={input.htmlFor}
            type={input.type}
            key={input.label}
            value={input.value}
          />
        ))}
        <Alert label={"Create"} message={msg} />
      </form>
    </div>
  );
}
