"use client";

import React from "react";
import SearchManufacturer from "./SearchManufacturer";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type="submit" className={`ml-3 z-10 ${otherClasses}`}>
    <Image
      src="/magnifying-glass.svg"
      alt="magnifying glass"
      width={40}
      height={40}
      className="object-contain"
    />
  </button>
);


const SearchBar = () => {
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");

  const router = useRouter();

  const heandleSearch = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(manufacturer==='' && model==='') {
      return alert("Please fill in the search bar")
    }

updatesearchParams(model.toLowerCase(),manufacturer.toLowerCase())

  };
  
  //if we have some data we have to update the url. for that we have created a new function updatesearchParams
const updatesearchParams = (model:string, manufacturer:string) => {

      // Create a new URLSearchParams object using the current URL search parameters
      const searchParams = new URLSearchParams(window.location.search);

      // Update or delete the 'model' search parameter based on the 'model' value
      if (model) {
        searchParams.set("model", model);
      } else {
        searchParams.delete("model");
      }

  // Update or delete the 'manufacturer' search parameter based on the 'manufacturer' value
  if (manufacturer) {
    searchParams.set("manufacturer", manufacturer);
  } else {
     searchParams.delete("manufacturer");
  }

     // Generate the new pathname with the updated search parameters
     const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

     router.push(newPathname);


}

  return (
    <form className="searchbar" onSubmit={heandleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />

        <SearchButton otherClasses="sm:hidden" />
      </div>

      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          height={25}
          width={25}
          className="absolute w-[20] h-[20] ml-4"
          alt="car model"
        />

        <input
          type="text"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Tiguan"
          className="searchbar__input"
        />

        <SearchButton otherClasses="sm:hidden" />
      </div>
        <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
