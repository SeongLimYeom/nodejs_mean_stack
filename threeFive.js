function threeFive(){

  for(i=1;i<=100;i++){

    if(i%3 === 0 && i%5 === 0 ){
    console.log("ThreeFive");

    }else if(i%3 === 0){
    console.log("Three");

    }else if(i%5 === 0){
    console.log("Five");

    }else{
    console.log(i);

    }//else

  }//for

}//threeFive

threeFive();
