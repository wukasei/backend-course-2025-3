const { Command } = require("commander");
const files = require("fs");

const program =  new Command;

program
.requiredOption ('-i, --input <path>', 'шлях до вхідного файлу')
.option('-o, --output <path>','шлях до файлу для запису результату')
.option('-d, --display','вивід результату у консоль')
.option('-m, --mfo', 'показувати код МФО перед назвою')
.option('-n, --normal', 'показувати лише банки зі статусом 1 "Нормальний"');

program.parse(process.argv);

const options = program.opts();

if(!options.input){
    console.error("Please, specify input file");
    process.exit(1);
}

if(!files.existsSync(options.input)){
    console.error("Cannot find input file");
    process.exit(1);
}

const readFiles = files.readFileSync(options.input);
let banks
try{
    banks = JSON.parse(readFiles);
}
catch (error){
    console.error("Invalid JSON file");
    process.exit(1);
}

if (!Array.isArray(banks)) {
    banks = Object.values(banks);
}

if (options.normal) {
    banks = banks.filter(bank => Number(bank.COD_STATE) === 1);
}

//console.log(banks[0]);
//process.exit(); 


const outputLines = banks.map(bank => {
    const mfo = bank.MFO ? `${bank.MFO} ` : ''; 
    const name = bank.SHORTNAME || bank.FULLNAME || 'Unknown';
    return `${mfo}${name}`;
});



if (options.display) {
    console.log(outputLines.join("\n"));
}

if (options.output) {
    files.writeFileSync(options.output, outputLines.join("\n"));
}

