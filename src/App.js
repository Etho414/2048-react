import logo from './logo.svg';
import './App.css';

function App() {
  const height = 4
  const width = 4
  const game_array = [
    [4,3,2,1],
    [2,0,2,0],
    [0,0,1,0],
    [0,1,0,4]
  ]
  
  function printGameArray() {
    let string = ""
    for (let i = 0; i < game_array.length; i++) {
        string = string + game_array[i]  + "\n"
    }
    console.log(string)
  }
  function multSpot(x,y) {
    game_array[x][y] = game_array[x][y] * 2;
  }

  function removeSpot(x,y) {
    game_array[x][y] = 0;
  }
  function shoveArray(dir) { // TODO: Rewrite shove LR algorithim
    if (dir == "r" || dir == "l") {
      for (let i = 0; i < game_array.length; i++) {
        let amountZero =0
        for(let v = game_array[i].length - 1; v >= 0; v--) {
          if (game_array[i][v] == 0) {
            amountZero++;
          }
        }
        const newArray = []
        if (dir == "r") {
          for(let v = 0; v < amountZero; v++) {
            newArray[v] = 0;
          }
          for(let v = 0; v < game_array[i].length; v++) {

            if (game_array[i][v] != 0) {
              newArray.push(game_array[i][v])
            } 
          }
        } else {
          
          for(let v = 0; v < game_array[i].length; v++) {

            if (game_array[i][v] != 0) {
              newArray.push(game_array[i][v])
            } 
          }

          for(let v = 0; v < amountZero; v++) {
            newArray.push(0);
          }
        }
        game_array[i] = newArray
      }
    } else if (dir == "u"  || dir == "d") {
      
      for (let v = 0; v < width; v++) {
        let zeroArray = []
        let nonZeroArray = []
        for (let i  = 0; i < height; i++) { 
            if (game_array[i][v] == 0) {
              zeroArray.push(0) 
            } else {
              nonZeroArray.push(game_array[i][v])
          }
        }
        let doneArray;  
        console.log(doneArray)
        if (dir == "u") {
         doneArray = [...nonZeroArray, ...zeroArray] 
        } else {
          doneArray = [...zeroArray, ...nonZeroArray]
        }
        for (let i  = 0; i < height; i++) { 
            game_array[i][v] = doneArray[i]
        } 

      }

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
  function mergeRight() {
    shoveArray("r") 
    compressLR()
    shoveArray("r")
    printGameArray()

  }
  function mergeLeft() {
    shoveArray("l")
    compressLR()
    shoveArray("l")
    printGameArray()

  }
  function mergeUp() {
    shoveArray("u")
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
      </header>
    </div>
  );
}

export default App;
