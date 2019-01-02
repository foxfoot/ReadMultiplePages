const movie = require('./getMovie');


let res = [];
movie('bat').then(function(v){
    console.log("result size=" + v.length)
    res = v;
    res.sort().forEach((element, i) => {
        console.log("Result " + (i+1) + ": " + element)
    });
}).catch(err=>console.log(err));
