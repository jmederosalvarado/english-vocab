import { useState } from "react";
import PlayIconSM from "../icons/heroicons/small/play";

export default function Phonetic({ phonetic }) {
  const [canPlay, setCanPlay] = useState(false);

  const audio = new Audio(phonetic.audio);
  audio.oncanplaythrough = () => setCanPlay(true);

  return (
    <button
      className="focus:outline-none inline-flex items-center bg-gray-500 px-2 py-1 rounded-full"
      onClick={() => {
        if (canPlay) {
          setCanPlay(false);
          audio.play();
        }
      }}
    >
      <PlayIconSM className="w-4 h-4 text-white flex-shrink-0" />
      <span className="ml-1 text-xs text-white">{phonetic.text}</span>
    </button>
  );
}
