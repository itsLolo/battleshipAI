var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
ctx.font = "30px Arial";

const amountCells = 10;
const cellSize = c.offsetWidth / amountCells;


var cellBoard = new Array();

for (let i = 0; i < amountCells; i++) {
  cellBoard.push(new Array(amountCells).fill(0));
}



var boats = [
  {
    size: 2,
    amount: 1
  },
  {
    size: 3,
    amount: 2
  },
  {
    size: 4,
    amount: 1
  },
  {
    size: 5,
    amount: 1
  }
];

if (!0) {
  boats = [
    {
      size: 3,
      amount: 1
    }
  ];
}


var highest = 0;

function calculate(){

  for (let i = 0; i < amountCells; i++) {
    cellBoard[i] = cellBoard[i].map((cell)=>{
      return isNaN(cell) ? cell : 0
    });
  }

  boats.forEach((boat) => {

    for (var x = 0; x < amountCells; x++) {
      for (var y = 0; y < amountCells; y++) {

        var yNextMiss = cellBoard[x].slice(y).indexOf('m');
        yNextMiss = yNextMiss < 0 ? amountCells : yNextMiss;
        //console.log(yNextMiss);

        var xNextMiss = cellBoard.slice(x).map((cell)=>{
          return cell[y]
        }).indexOf('m');
        xNextMiss = xNextMiss < 0 ? amountCells : xNextMiss;
        console.log(xNextMiss);


        if(x <= amountCells - boat.size && x <= xNextMiss - boat.size + 0){
          for (var i = 0; i < boat.size; i++) {

            if(!isNaN(cellBoard[x+i][y])) cellBoard[x+i][y] += boat.amount;

            if(cellBoard[x+i][y] > highest){
              highest = cellBoard[x+i][y];
            }
          }
        }

        if(y <= amountCells - boat.size && y <= yNextMiss - boat.size + 0){
          for (var i = 0; i < boat.size; i++) {

            if(!isNaN(cellBoard[x][y+i])) cellBoard[x][y+i] += boat.amount;

            if(cellBoard[x][y+i] > highest){
              highest = cellBoard[x][y+i];
            }
          }
        }


      }
    }

  });

  console.log(cellBoard);
  renderCanvas();
}

function renderCanvas(){
  for (var x = 0; x < amountCells; x++) {
    for (var y = 0; y < amountCells; y++) {
      let cellVal = cellBoard[x][y];
      if(cellVal == "m"){
        ctx.fillStyle = '#fff';
      }else{
        ctx.fillStyle = `hsl(${130 - (mapRange(cellVal, 0, highest, 0, 130))},100%,50%)`;
      }
      ctx.fillRect(y * cellSize, x * cellSize, y * cellSize + cellSize, x * cellSize + cellSize);

      ctx.fillStyle = '#000';
      ctx.fillText(cellVal, y * cellSize, x * cellSize + cellSize/2);
    }
  }
}


function mapRange (value, a, b, c, d) {
  value = (value - a) / (b - a);
  return c + value * (d - c);
}



c.addEventListener('click', (e)=>{
  var rect = e.target.getBoundingClientRect();
  var posX = Math.floor((e.clientX - rect.left) / cellSize);
  var posY = Math.floor((e.clientY - rect.top) / cellSize);
  console.log(posX);
  console.log(posY);
  cellBoard[posY][posX] = 'm';

  calculate();
});


calculate();
