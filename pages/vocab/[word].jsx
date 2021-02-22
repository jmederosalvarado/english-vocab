import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import WordResult from "../../components/word-result";

export default function VocabWord() {
  const router = useRouter();
  const { word } = router.query;

  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(undefined);

  useEffect(() => {
    async function search(word) {
      setResult(undefined);
      setBusy(true);
      const result = (
        await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`
        )
      ).data;
      setResult(result);
      setBusy(false);
    }

    search(word);
  }, [word]);

  return (
    <div className="pb-10">
      <div className="mt-5">
        {result &&
          result.map((wordResult, i) => (
            <WordResult wordResult={wordResult} key={i} />
          ))}
      </div>
      {busy && (
        <div className="text-gray-500 text-sm font-bold uppercase tracking-wide text-center mt-5 animate-pulse">
          loading
        </div>
      )}
    </div>
  );
}
