const fs = require('fs');

let buf='';

async function getContent(fileName){
    const p = new Promise(function(resolve,reject){
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

    try{
        buf = await p;// trigger the resolve(), and put ¡®buf¡¯ as the input
        console.log(buf.toString());
    }catch(e){
        console.error(e);  //trigger the reject()
    }
}

getContent('wrapFSinPromise/abc.txt')

//getContent('ddd.txt')