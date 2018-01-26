function num(n,m){
    console.log(n);
    if(n<m){
        num(n+1,m);
        console.log(n);
    }
}
num(2, 5);