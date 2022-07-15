import React, { useState, useEffect } from 'react'
import '../Container/Container.css'
import Buttons from './Buttons';
import Timerdisplay from './Timerdisplay';

const Container = () => {

    const [input, setInput] = useState('');
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(true)
    const [time, setTime] = useState(0);

    const arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    
    let maxChar = 20;

    const getRandomString = () => {
		let res = ''
		for (let i = 0; i < 1; i++) {
			res = res + arr[Math.floor(Math.random() * 20) % maxChar]
		}
		return res
	}

    const [random, setRandom] = useState(getRandomString());
	const [text, setText] = useState(random)

    const generateText = () => {
        const alphabets = getRandomString()
        setRandom(alphabets)
        setText(alphabets)
    }

    // ************************ input and main logic part ***********************
    
    const keyPress = (event) => {
            const eventInputValue = event.target.value; 
            console.log(eventInputValue);
            const correctInput = eventInputValue.charAt(eventInputValue.length - 1).toUpperCase() === text;
            console.log(correctInput);  
            if(correctInput === true){
                generateText();
                setInput(eventInputValue);
            } else{
		        setTime(time + 500);
            }

            if (eventInputValue.length >= 20) {
                const isSuccess = Score ? time <= Score : true ;
                setIsActive(false)
                if (isSuccess){
                    setText('SUCCESS')
                    localStorage.setItem('Score', time);
                }
                else
                    setText('FAIL')
                    
            }       
    }

// **********  timer part *************************


    useEffect(() => {
        let timer = null
        if (isActive && isPaused === false) {
            timer = setInterval(() => {
                setTime((time) => time + 10)
            }, 10)
        } else {
            clearInterval(timer)
        }
        return () => {
            clearInterval(timer)
        }
    }, [isActive, isPaused])

    const Score = localStorage.getItem('Score')
		? localStorage.getItem('Score')
		: 0

    const start = () => {
        setIsActive(true)
		setIsPaused(false)
    }

    const reset = () => {
		setInput('')
        setTime(0)
        generateText()
        setIsActive(false)
    }

  return (
    <div className='container'>
        <p className='displayTime'>9:41</p>
        <div className='icons'>
        <ion-icon name="wifi-outline"></ion-icon>
        <ion-icon name="battery-full-outline"></ion-icon>
        </div>
        <h3>Type the Alphabet</h3>
        <p>Typing Game to see how fast you type. Timer <br/> starts when you do :)</p>
        <div className='alphabet'>
            <h2>{text}</h2>
        </div>
        <h4><Timerdisplay time={time} Score={Score}/></h4>
        <p>my best time:{Score / 1000}s!</p>
        <div className='input-btn'>
            <input type="text" placeholder='Type here' value={input} onChange={ keyPress } disabled={!isActive}  />
            <Buttons isActive={isActive || input.length >= 20} reset={reset} start={start} />
        </div>

    </div>
  )
}

export default Container