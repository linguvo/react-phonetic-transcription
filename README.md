# React Phonetic Transcription

Phonetic transcription tools with react js for input, outputing, etc.

<img title="React Phonetic Transcription" alt="React Phonetic Transcription" src="./docs/ilus.gif" style="width:300px" />


## Future update

Let me know what you want. You can write issue on my repo.

## Example

```js

import React,{useState} from "react";
import { InputPhonetic, TextToPhonetic } from "react-phonetic-transcription";

const [text,setText] = useState("");

<TextToPhonetic>
    {text}
</TextToPhonetic>

<InputPhonetic
  sx={{
    mt: 2,
  }}
  addValue={(newValue) => {
    setValue(text + newValue);
  }}
/>
```

## API

```js
function InputPhonetic({
    addValue, // for the output if you click the phonetic symbol
    useRemember = true, // Remembering your last phonetic symbol
    dataDefault = common_java,
    height = "300px", // the height of phonetic keyboard
    ...rest
})
```

```js
function TextToPhonetic({ children, ...rest }) {
  return (
    <span className="fonetis" {...rest}>
      {children}
    </span>
  );
}
```
