
import React, {useState} from 'react';
import './App.css';

function App() {
  const heightGame = 4
  const widthGame = 4
  const heightGamePercent = 100/heightGame + "%"
  const widthGamePercent = 100/widthGame + "%"
  let [game_array] = useState([])
  const [loaded_game, setLoadGame] = useState(false)
  const [updateTicker, setTicker] = useState(0)

  function constructGameArray() {
    for (let i = 0; i < heightGame; i++) {

      game_array[i] = new Array(widthGame);
      for (let v = 0; v < widthGame; v++) {
        game_array[i][v] = 2;
      }
    }
  }
  if (loaded_game == false) {
    console.log("Loading")
    constructGameArray()
    setLoadGame(true)
  }
  function printGameArray() {
    let string = ""
    for (let i = 0; i < game_array.length; i++) {
        string = string + game_array[i] + "\n" 
    }
    console.log(string)
  }
  printGameArray()
  function multSpot(x,y) {
    game_array[x][y] = game_array[x][y] * 2;
  }

  function removeSpot(x,y) {
    game_array[x][y] = 0;
  }
  function shoveArray(dir) { 
    if (dir == "r" || dir == "l") {

      
      for (let i = 0; i < heightGame; i++) {
        let zeroArray = []
        let nonZeroArray = []
        for (let v = 0; v < widthGame; v++) {
          if (game_array[i][v] == 0) {
            zeroArray.push(0)
          }  else {
            nonZeroArray.push(game_array[i][v])
          }          
        
        }
        let doneArray = []
        if (dir == "l") {
          doneArray = [...nonZeroArray, ...zeroArray]
        } else {
          doneArray = [...zeroArray, ...nonZeroArray]
        }
        game_array[i] = doneArray
      }
    } else if (dir == "u"  || dir == "d") {
      
      for (let v = 0; v < widthGame; v++) {
        let zeroArray = []
        let nonZeroArray = []
        for (let i  = 0; i < heightGame; i++) { 
            if (game_array[i][v] == 0) {
              zeroArray.push(0) 
            } else {
              nonZeroArray.push(game_array[i][v])
          }
        }
        let doneArray;  
        if (dir == "u") {
         doneArray = [...nonZeroArray, ...zeroArray] 
        } else {
          doneArray = [...zeroArray, ...nonZeroArray]
        }
        for (let i  = 0; i < heightGame; i++) { 
            game_array[i][v] = doneArray[i]
        } 

      }

    }

  }
  function createRandom() {
   let randI = Math.floor(Math.random() * heightGame) 
    let randV = Math.floor(Math.random() * widthGame)
    if (game_array[randI][randV] == 0) {
      game_array[randI][randV] = 2
    } else {
      createRandom()
    }

  }

  function compress(dir) {
    if (dir == "r" || dir == "l") {
      for (let i = 0; i < game_array.length; i++) {
        for (let v = 0; v < game_array[i].length - 1; v++) {
          if (game_array[i][v] && game_array[i][v] == game_array[i][v + 1] ) {
            multSpot(i,v)
            removeSpot(i,v + 1)
          } 
        }
      }
    } else if (dir == "u" || dir == "d") {
      for (let v = 0; v < widthGame; v++) {
        for (let i  = 0; i < heightGame - 1; i++) { 
          if (game_array[i][v] == game_array[i+1][v]) {
            multSpot(i,v)
            removeSpot(i+1,v)
          }
        }
      }
    }
  }
  function merge(dir) {
    shoveArray(dir)
    compress(dir)
    shoveArray(dir)
    createRandom()
    printGameArray()
    setTicker(updateTicker + 1)
  }
  return (
    <div className="App">
      <header className="App-header">
        <div className="gameWindow">
          { 
            game_array.map(
              (msg, index) => {
              return (
                <div className="gameRow" key={index} style = {{height: heightGamePercent}}>
                  {
                    msg.map(
                      (numberVal, iindex) => {
                        return (
                          <label className = "gameLabel" key={iindex} style={{width: widthGamePercent}} >

                            {numberVal}
                          </label>
                        );
                      }
                    )
                  }
                </div>
              );
              }
            )
          }
        </div>
          <button className="merge-right" onClick={() => merge("r")}>
            Merge Right 
          </button>
          <button className="merge-left" onClick={() => merge("l")}>
            Merge Left 
          </button>
          <button className="merge-up" onClick={() => merge("u")}>
            Merge up 
          </button>
          <button className="merge-down" onClick={() => merge("d")}>
            Merge Down 
          </button>
      </header>
    </div>
  );
}

export default App;
