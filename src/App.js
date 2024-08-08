import logo from './logo.svg';
import './App.css';

function App() {
  const heightGame = 6
  const widthGame = 6
  const game_array = []
  
  function constructGameArray() {
    for (let i = 0; i < heightGame; i++) {

      game_array[i] = new Array(widthGame);
      for (let v = 0; v < widthGame; v++) {
        game_array[i][v] = 0;
      }
    }
  }
  constructGameArray()
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
  function shoveArray(dir) { // TODO: Rewrite shove LR algorithim
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
  function compressLR() {
    for (let i = 0; i < game_array.length; i++) {
      for (let v = 0; v < game_array[i].length - 1; v++) {
        if (game_array[i][v] && game_array[i][v] == game_array[i][v + 1] ) {
          console.log("Should mult")
          multSpot(i,v)
          removeSpot(i,v + 1)
        } 
      }
    }
  }
  function compressUD() {
    for (let v = 0; v < widthGame; v++) {
      for (let i  = 0; i < heightGame - 1; i++) { 
        if (game_array[i][v] == game_array[i+1][v]) {
          multSpot(i,v)
          removeSpot(i+1,v)
        }
      }
    } 

  }
  function mergeRight() {
    shoveArray("r") 
    compressLR()
    shoveArray("r")
    createRandom()
    printGameArray()

  }
  function mergeLeft() {
    shoveArray("l")
    compressLR()
    shoveArray("l")
    createRandom()
    printGameArray()

  }
  function mergeUp() {
    shoveArray("u")
    compressUD()
    shoveArray("u")
    createRandom()
    printGameArray()
  }
  function mergeDown() {
    shoveArray("d")
    compressUD()
    shoveArray("d")
    createRandom()
    printGameArray()
  
  }
  return (
    <div className="App">
      <header className="App-header">
          <button className="merge-right" onClick={mergeRight}>
            Merge Right 
          </button>
          <button className="merge-left" onClick={mergeLeft}>
            Merge Left 
          </button>
          <button className="merge-up" onClick={mergeUp}>
            Merge up 
          </button>
          <button className="merge-down" onClick={mergeDown}>
            Merge Down 
          </button>
      </header>
    </div>
  );
}

export default App;
