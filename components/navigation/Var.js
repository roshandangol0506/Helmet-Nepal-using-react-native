
var x=1;
var y=true;
var z=0;
const handleIncrement=()=>{
  x=x+1;
  if (x==10){
    x=2;
  }
}
const handleIncrementtwo=()=>{
  z=z+1;
  if (z%2==0){
    y=true;
  }
  else{
    y=false;
  }
}
export {handleIncrement, handleIncrementtwo, x, y};
