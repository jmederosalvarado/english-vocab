import Link from "next/link";
import RandomGenerator from "random-seed";
import words from "../../data/words.json";
import ChevronRightIconSM from "../../icons/heroicons/small/chevron-right";

export default function Vocab({ words }) {
  return (
    <div className="pb-10">
      <h1 className="text-2xl text-gray-700 font-extrabold tracking-wide text-center mt-4">
        Words of the day
      </h1>
      <div className="flex flex-col items-center mt-5">
        {words.map((w, i) => (
          <Link href={`/vocab/${w}`} key={i}>
            <a className="text-gray-600 font-bold focus:text-blue-700 hover:text-blue-500 w-40 mt-5 text-center flex justify-center items-center uppercase tracking-wide text-sm">
              {w}
              <ChevronRightIconSM className="w-4 h-4 ml-1" />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const date = new Date(Date.now());
  date.setUTCHours(0, 0, 0, 0);
  const seed = date.toUTCString();
  const random = new RandomGenerator(seed);

  const start = random.intBetween(0, words.length - 1);
  const wtake = Array(3);
  for (let i = 0; i < wtake.length; i++) {
    wtake[i] = words[(start + i) % words.length];
  }

  return {
    props: {
      words: wtake,
    },
  };
}
