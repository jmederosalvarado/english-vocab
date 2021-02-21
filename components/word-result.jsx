import Phonetic from "./phonetic";
import Meaning from "./meaning";

export default function WordResult({ wordResult }) {
  return (
    <div className="mt-5 px-10">
      <h1 className="text-center text-gray-700 font-bold">{wordResult.word}</h1>
      <div className="flex flex-wrap justify-center mt-3">
        {wordResult.phonetics.map((p, i) => (
          <Phonetic phonetic={p} key={i} className="mx-0.5" />
        ))}
      </div>
      <div className="flex flex-col items-center mt-3">
        {wordResult.meanings.map((m, i) => (
          <Meaning meaning={m} key={i} className="my-1.5" />
        ))}
      </div>
    </div>
  );
}
