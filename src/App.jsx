import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [checkNumber, setCheckNumber] = useState(false);
  const [checkChar, setCheckChar] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (checkNumber) str += "0123456789";
    if (checkChar) str += "!@#$%^&*()_+{}[]`~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, checkNumber, checkChar, setPassword])

  const copyPasswordtoClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {passwordGenerator()}, [length, checkNumber, checkChar, passwordGenerator])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-yellow-600 bg-blue-900'>
      <h1 className='text-3xl text-center text-white my-3'>Password Generator</h1>
      <div className='text-lg flex shadow rounded-lg overflow-hidden mb-4'>
        <input
        type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='Password'
        readOnly 
        ref={passwordRef}/>

        <button
        className='outline-none bg-blue-700 text-white px-4 py-0.5 shrink-0 hover:bg-blue-500'
        onClick={copyPasswordtoClipboard}>
          Copy
        </button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1 text-lg'>
          <input
          type="range"
          min={6}
          max={100}
          value={length}
          className="cursor-pointer"
          onChange={(e) => {setLength(e.target.value)}} />
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1 text-lg'>
          <input 
          type="checkbox"
          defaultChecked={checkNumber}
          id="numberInput"
          onChange={() => {setCheckNumber((checkNumber) => !checkNumber)}}
          />
          <label htmlFor="numberInput">Number</label>
        </div>
        <div className='flex items-center gap-x-1 text-lg'>
          <input 
          type="checkbox"
          defaultChecked={checkChar}
          id="charInput"
          onChange={() => {setCheckChar((checkChar) => !checkChar)}}
          />
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
