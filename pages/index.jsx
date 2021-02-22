import { useState } from "react";
import SearchIconSM from "../icons/heroicons/small/search";
import BookOpenIconSM from "../icons/heroicons/small/book-open";
import BookOpenIconMD from "../icons/heroicons/medium/book-open";
import WordResult from "../components/word-result";
import axios from "axios";
import Link from "next/link";

function SearchBox({ onSearch }) {
  const [query, setQuery] = useState("");

  return (
    <div className="border flex items-center justify-around rounded-xl px-2 py-1">
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
    setResult(result);
    setBusy(false);
  }

  return (
    <div className="pb-10">
      <h1 className="text-2xl text-gray-700 font-extrabold tracking-wide text-center mt-4">
        English Vocabulary
      </h1>
      <div className="w-48 mx-auto mt-10 flex justify-center items-center">
        <SearchBox onSearch={handleSearch} />
        <Link href="/vocab">
          {/* <a className="p-1 border rounded-lg ml-3">
            <BookOpenIconSM className="h-5 w-5 flex-shrink-0 text-gray-500 hover:text-indigo-300 focus:text-indigo-500" />
          </a> */}
          <a className="p-1 rounded-lg ml-3 bg-gray-600 hover:bg-indigo-500 focus:bg-indigo-700">
            <BookOpenIconSM className="h-5 w-5 flex-shrink-0 text-white" />
          </a>
        </Link>
      </div>
      {result &&
        result.map((wordResult, i) => (
          <WordResult wordResult={wordResult} key={i} />
        ))}
      {busy && (
        <div className="text-gray-500 text-sm font-bold uppercase tracking-wide text-center mt-5 animate-pulse">
          loading
        </div>
      )}
    </div>
  );
}
