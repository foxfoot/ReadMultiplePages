const https = require('https');

let url =  "https://jsonmock.hackerrank.com/api/movies/search/?Title=";

let allTitles = [];

function getOnePage(fullURL){
    return new Promise(function(resolve){
    /*if(!(typeof pageIndex === "number" && Number.isInteger(pageIndex) && pageIndex>0)){
        throw new Error('pageIndex is not a valid number.');
    }
    const fullURL = url + substr + "&page=" + pageIndex;
    */
        console.log(fullURL);
        https.get(fullURL, function(res){
            let body = '';
        
            res.on('data', function(chunk){
                body += chunk;
            });
        
            res.on('end', function(){
                const pageContent = JSON.parse(body);
                pageContent.data.forEach(v => {
                    allTitles.push(v.Title);
                    console.log("Got a response: ", v.Title);
                });

                resolve();
            });
        }).on('error', function(e){
                console.log("Got an error: ", e);
        })
    });
}

async function get(substr){
    return new Promise(function(resolve){
        const fullURL = url + substr;
        console.log(fullURL);
        https.get(fullURL, function(res){
            let body = '';
        
            res.on('data', function(chunk){
                body += chunk;
            });
        
            res.on('end', function(){
                const pageContent = JSON.parse(body);
                
                let subPages = [];
                for(let i=1; i<=pageContent.total_pages; ++i){
                    subPages.push(getOnePage(url + substr + "&page=" + i));
                }

                Promise.all(subPages).then(function(){
                    console.log("all resolved ");
                    resolve(allTitles);
                }).catch(err=>{
                    console.error(JSON.stringify(err, null, 2));
                    reject(err);
                })

                
            });
        }).on('error', function(e){
                console.log("Got an error: ", e);
        });
    });
}
module.exports = get;
