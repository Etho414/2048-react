
import React, {useState} from 'react';
import './App.css';

function App() {
  const game_height = 4
  const game_width = 4
  const game_height_percent = 100 / game_height + "%"
  const game_width_percent = 100 / game_width + "%"
  let [game_array] = useState([])
  const [loaded_game, setLoadGame] = useState(false)
  const [update_ticker, setTicker] = useState(0)

  function constructGameArray() {
    for (let i = 0; i < game_height; i++) {
      game_array[i] = new Array(game_width);

      for (let v = 0; v < game_width; v++) {
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

  function multSpot(x,y) {
    game_array[x][y] = game_array[x][y] * 2;
  }

  function removeSpot(x,y) {
    game_array[x][y] = 0;
  }

  function shoveArray(dir) { 
    if (dir == "r" || dir == "l") {
      for (let i = 0; i < game_height; i++) {

        let zeroArray = []
        let nonZeroArray = []

        for (let v = 0; v < game_width; v++) {
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
      
      for (let v = 0; v < game_width; v++) {
        let zeroArray = []
        let nonZeroArray = []

        for (let i  = 0; i < game_height; i++) { 
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

        for (let i  = 0; i < game_height; i++) { 
            game_array[i][v] = doneArray[i]
        } 
      }
    }
  }

  function createRandom() {

    let randI = Math.floor(Math.random() * game_height) 
    let randV = Math.floor(Math.random() * game_width)

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
      for (let v = 0; v < game_width; v++) {
        for (let i  = 0; i < game_height - 1; i++) { 
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
    setTicker(update_ticker + 1)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="gameWindow">
          { 
            game_array.map(
              (msg, index) => {
              return (
                <div className="gameRow" key={index} style = {{height: game_height_percent}}>
                  {
                    msg.map(
                      (numberVal, iindex) => {
                        return (
                          <label className = "gameLabel" key={iindex} style={{width: game_width_percent}} >

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
