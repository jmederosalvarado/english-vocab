export default function Meaning({ meaning }) {
  return (
    <div className="max-w-sm w-full">
      <div className="text-xs font-bold text-gray-700 text-right">
        {meaning.partOfSpeech}
      </div>
      <div className="text-sm leading-tight">
        {meaning.definitions.map((d, i) => (
          <div className="" key={i}>
            <div className="text-gray-900 font-semibold mt-1">
              {d.definition}
            </div>
            <div className="text-gray-500 font-semibold mt-1">
              {d.example && `"${d.example}"`}
            </div>
            {d.synonyms && (
              <div className="text-gray-700 text-xs font-semibold mt-1">
                <span className="font-bold">synonyms: </span>
                {d.synonyms.join(", ")}.
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
