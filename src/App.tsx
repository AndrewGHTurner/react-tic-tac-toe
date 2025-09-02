
import { useState } from 'react';
import './App.css'

export default function App() {
  class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
  }

  const [state, setState] = useState([['','',''], ['','',''], ['','','']]);

  const [winnerText, setWinnerText] = useState("No Winner Yet");

  function checkIsWinner(lastPlay: Point, state: string[][])
  {
    const y = lastPlay.y;
    const x = lastPlay.x;
    let char = state[y][x];


    if(x == 0)
    {
      if(state[y][x + 1] == char && state[y][x + 2] == char)
        return true;
      if (y == 0)
      {
        if(state[y + 1][x + 1] == char && state[y + 2][x + 2] == char)//diagnal
          return true;
      }
      else if (y == 2)
      {
        if(state[y - 1][x + 1] == char && state[y - 2][x + 2] == char)//diagnal
          return true;
      }
    }

    if(x == 1)
    {
      if(state[y][x-1] == char && state[y][x + 1] == char)
        return true;
    }

    if(x == 2)
    {
      if(state[y][x - 1] == char && state[y][x - 2] == char)
      {
        return true;
      }
      if(y == 2)
      {
        if(state[y - 1][x - 1] == char && state[y - 2][x - 2] == char)//diagnal
          return true;
      }
      else if(y == 0)
      {
        if(state[y + 1][x - 1] == char && state[y + 2][x - 2] == char)//diagnal
          return true;
      }
    }
  //Y
      if(y == 0)
    {
      if(state[y + 1][x] == char && state[y + 2][x] == char)
        return true;
    }

    if(y == 1)
    {
      if(state[y - 1][x] == char && state[y + 1][x] == char)
        return true;
    }

    if(y == 2)
    {
      if(state[y - 1][x] == char && state[y - 2][x] == char)
      {
        return true;
      }
    }

  }
  const [currentPlayer, setCurrentPlayer] = useState('X');
  function Square({index}: {index:Point}){
    const value = state[index.y][index.x];
    let squareClass =
      value === "X" ? "squareX" :
      value === "O" ? "squareO" : "square";

    function handelClick(){
      if(state[index.y][index.x] == '')
      {
        const newState = state.map(row => [...row]);
        newState[index.y][index.x] = currentPlayer;
        setState(newState);
        if(newState[index.y][index.x] == 'X')
        {
          squareClass = "squareX";
          setCurrentPlayer('O');
        }else{
          squareClass = "squareO";
          setCurrentPlayer('X');
        }

        if(checkIsWinner(index, newState))
        {
          console.log("HHH");
          setWinnerText(newState[index.y][index.x] + " is the winner");
        }
      }
    

    }
    return <button onClick={handelClick} className={squareClass}>{state[index.y][index.x]}</button>
  }

  function Board(){
    return (
    <div className="board">
      <div className='board-row'>
        <Square index={new Point(0,0)}/>
        <Square index={new Point(1,0)}/>
        <Square index={new Point(2,0)}/>
      </div>
      <div className='board-row'>
        <Square index={new Point(0,1)}/>
        <Square index={new Point(1,1)}/>
        <Square index={new Point(2,1)}/>
      </div>
      <div className='board-row'>
        <Square index={new Point(0,2)}/>
        <Square index={new Point(1,2)}/>
        <Square index={new Point(2,2)}/>
      </div>
    </div>
    );
  }


  return (
    <div className='app'>
      <Board></Board>
      <div className = "winnerText">{winnerText}</div>
    </div>
  );
}
