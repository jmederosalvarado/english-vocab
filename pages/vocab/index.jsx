import RandomGenerator from "random-seed";
import { promises as fs } from "fs";
import path from "path";

export default function Vocab({ words, date }) {
  return (
    <div className="pb-10">
      <h1 className="text-2xl text-gray-700 font-extrabold tracking-wide text-center mt-4">
        Words of the day
      </h1>
      {JSON.stringify(date)}
      <div className="h-24"></div>
      {JSON.stringify(words)}
    </div>
  );
}

export async function getStaticProps() {
  const date = new Date(Date.now());
  date.setUTCHours(0, 0, 0, 0);
  const seed = date.toUTCString();
  const random = new RandomGenerator(seed);

  const wordsfile = path.join(process.cwd(), "data", "words.txt");
  const words = (await fs.readFile(wordsfile, "utf8"))
    .split("\n")
    .map((w) => w.trim())
    .filter((w) => w.length > 0);

  // const start = random.intBetween(0, words.length - 1);
  const start = Math.floor(Math.random() * (words.length - 1));
  const wtake = Array(3);
  for (let i = 0; i < wtake.length; i++) {
    wtake[i] = words[(start + i) % words.length];
  }
  console.log(wtake);

  return {
    props: {
      words: wtake,
      date: {
        year: date.getUTCFullYear(),
        month: date.getUTCMonth(),
        day: date.getUTCDate(),
      },
    },
    revalidate: 30,
  };
}
