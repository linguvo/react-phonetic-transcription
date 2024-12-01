# React Phonetic Transcription

Phonetic transcription tools with react js for input, outputing, etc.

<img title="React Phonetic Transcription" alt="React Phonetic Transcription" src="./docs/preview.gif" style="width:300px" />

## Future update

Let me know what you want. You can write issue on my repo.

## Example

```js

import React,{useState} from "react";
import { InputPhonetic } from "react-phonetic-transcription";

const [text,setText] = useState("");

<span className="phonetic">
    {text}
</span>

<InputPhonetic
  sx={{
    mt: 2,
  }}
  addValue={(newValue) => {
    setValue(text + newValue);
  }}
/>
```
