import { useEffect } from "react";
import { useState } from "react";
import styles from "./App.module.css";
import CountryCard from "./components/CountryCard/CountryCard";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");

  const fetchCountries = async () => {
    try {
      const res = await fetch("https://restcountries.com/v3.1/all");

      const data = await res.json();
      console.log(data);
      setCountries(data);
    } catch (error) {
      console.log(error);
    }
  };

  const performSearch = async (name) => {
    try {
      const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setCountries(data);
      } else {
        setCountries([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedSearch = debounce(performSearch, 500);
  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (searchText) {
      debouncedSearch(searchText);
    } else {
      fetchCountries();
    }
  }, [searchText]);

  return (
    <>
      <div className={styles.searchDiv}>
        <input
          className={styles.searchBox}
          placeholder="Search for countries..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className={styles.grid}>
        {countries.map((country, i) => (
          <CountryCard
            key={i}
            name={country.name.common}
            flag={country.flags.png}
          />
        ))}
      </div>
    </>
  );
}

export default App;
