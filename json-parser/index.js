const fs = require('fs');
const validStep1 = require("./tests/step2/valid2.json");
let inValidStep1;
try {
    const data = fs.readFileSync("./tests/step1/invalid.json", 'utf8');
    inValidStep1 = JSON.parse(data);
} catch (error) {
    // console.error("Invalid JSON:", error.message);
}


function main(json) {
   if (!json) {
    return "Go home!"
   }
    
    let stringiJSONFormat = JSON.stringify(json);
    let tokens = [];

    let i = 0; 
    while (i < stringiJSONFormat?.length) {
        const element = stringiJSONFormat[i];
        console.log("ele", element);
        if (element === ':'|| element === ',') {
            tokens.push(element)
        }
        if (element.startsWith('"')) {
            i+=1
           let str = '';
           let smallCounter = 0;
           while (stringiJSONFormat[i] !== '"') {
                str+=stringiJSONFormat[i]
                i++;
                smallCounter++
           }
           tokens.push(str)            
        }
        if (element === "{" || element === "}") {
            tokens.push(element);
        }
    
        i++; 
    }
    console.log("toke",tokens);
     
    return false

}

let res = main(validStep1);
console.log("Res", res);
