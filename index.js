/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import fs from "fs";
import qrimage from "qr-image";
import inquirer from "inquirer";
// import { error } from "console";

inquirer.prompt([
  {
    type: 'input',       // type of question
    name: 'url',    // variable name to store answer
    message: 'enter a url'
  },
  {
    type: 'list',        // type: list selection
    name: 'choice',
    message: 'Do you want to generate QR code?',
    choices: ['YES', 'NO']
  }
]).then((answers) => {
    if(answers.choice=='YES'){
        
        const qr_png = qrimage.image(answers.url, { type: 'png' });

        fs.writeFile("url.txt",`${answers.url}`,(err)=>{
            if(err)throw err;
            console.log("url saved in url.txt");
        })
        
        qr_png.pipe(fs.createWriteStream('qr-code.png'));
    
        console.log('QR code image saved as qr-code.png');
    }
    else{
        console.log("Task Aborted!");
    }

});

