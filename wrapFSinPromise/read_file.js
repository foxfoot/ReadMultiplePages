const fs = require('fs');

let buf;

async function getContent(fileName, resolve, reject){
    return new Promise(function(resolve,reject){
        fs.readFile(fileName, (e, data)=>{
            if(e){
                console.log('Error: ' + e);
                reject(e);
                return;
            }

            console.log('Succeeded data: ' + data);
            resolve(data);
        });
    });
}

getContent('wrapFSinPromise/abc.txt').then(data => {
    buf = data;
    console.log("result: " + buf)
}).catch(e=>{
    console.log("result error: " + e);
})
