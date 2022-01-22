import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState("");
  const [lastText, setLastText] = useState("");
  const [result, setResult] = useState<boolean>(false);
  const [hasResult, setHasResult] = useState<boolean>(false);

  const palindromeChecker = (text: string): void => {
    if (text.length > 0) {
      text = text.replace(/\W|\s|_/g, "").toLowerCase();
      let reversedStr = text.split("").reverse().join("");
      setResult(text === reversedStr);
      setHasResult(true);
      setText('');
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredText = event.target.value;
    setText(enteredText);
    setLastText(enteredText);
  };

  const onInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setHasResult(false);
  };

  const handleKeypress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      palindromeChecker(text);
      event.currentTarget.blur();
    }
  };

  useEffect(() => {
    return () => {
      setHasResult(false);
      setText('');
      setLastText('');
      setResult(false);
    }
  }, []);

  return (
    <div className="App">
      <header>
        <h1>palindrome <span></span></h1>
      </header>
      <div className="wrapper">
        <div className="checker">
          <input type="text"
            placeholder="type here..."
            onFocus={onInputFocus} value={text}
            onChange={handleInput}
            onKeyPress={handleKeypress} />
          <button onClick={() => palindromeChecker(text)}>check</button>
          <span> or press enter</span>
        </div>
        <div className="result">
          {hasResult &&
            <p><span>{lastText}</span> is {result == false ? 'not' : ''} a palindrome.</p>
          }
        </div>

      </div>
    </div>
  );
}

export default App;
