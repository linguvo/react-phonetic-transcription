"use client"
import { useState } from "react";
import { InputPhonetic, } from "react-phonetic-transcription";

export default function Home() {
  const [text, setText] = useState("");

  return (
    <div>
      <h1>
        Input Phonetic
      </h1>

      <span className="fonetis text-lg">
        {text}
      </span>

      <InputPhonetic
        sx={{
          mt: 2,
        }}
        addValue={(newValue) => {
          setText(text + newValue);
        }}
      />
    </div>
  );
}
