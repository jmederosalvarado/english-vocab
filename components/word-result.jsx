import Phonetic from "./phonetic";
import Meaning from "./meaning";

export default function WordResult({ wordResult }) {
  return (
    <div className="mt-5 px-10">
      <h1 className="text-center text-gray-700 font-bold">{wordResult.word}</h1>
      <div className="flex flex-wrap justify-center gap-1 mt-3">
        {wordResult.phonetics.map((p, i) => (
          <Phonetic phonetic={p} key={i} />
        ))}
      </div>
      <div className="flex flex-col items-center gap-3 mt-3">
        {wordResult.meanings.map((m, i) => (
          <Meaning meaning={m} key={i} />
        ))}
      </div>
    </div>
  );
}
