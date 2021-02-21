import { useState } from "react";
import SearchIconSM from "../icons/heroicons/small/search";
import WordResult from "../components/word-result";
import axios from "axios";

function SearchBox({ onSearch }) {
  const [query, setQuery] = useState("");

  return (
    <div className="border flex items-center justify-around rounded-full px-2 py-1">
      <button className="focus:outline-none" onClick={() => onSearch(query)}>
        <SearchIconSM className="w-5 h-5 text-gray-600 flex-shrink-0" />
      </button>
      <input
        placeholder=""
        className="flex-grow focus:outline-none min-w-0 bg-transparent text-gray-600 placeholder-current font-medium px-2"
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            onSearch(query);
          }
        }}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
    </div>
  );
}

export default function Home() {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(undefined);

  async function handleSearch(query) {
    setResult(undefined);
    setBusy(true);
    const result = (
      await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en_US/${query}`
      )
    ).data;
    console.log(result);
    setResult(result);
    setBusy(false);
  }

  return (
    <>
      <h1 className="text-2xl text-gray-700 font-extrabold tracking-wide text-center mt-4">
        English Vocabulary
      </h1>
      <div className="w-48 mx-auto mt-10">
        <SearchBox onSearch={handleSearch} />
      </div>
      {result &&
        result.map((wordResult, i) => (
          <WordResult wordResult={wordResult} key={i} />
        ))}
      {busy && (
        <div className="text-gray-500 text-sm font-bold uppercase tracking-wide text-center mt-2 animate-pulse">
          loading
        </div>
      )}
    </>
  );
}
