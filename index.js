const command = require ("commander");
const files = require("fs");

const program =  new command;

program
.requiredOption ('-i, --input <path>', 'шлях до вхідного файлу')
.option('-o, --output <path>','шлях до файлу для запису результату')
.option('-d, --display ','вивід результату у консоль')

program.parse(process.argv);

const option = program.opts();

if(!option.input){
    console.error("Please, specify input file");
    process.exit(1);
}

if(!files.existsSync(option.input)){
    console.error("Cannot find input file");
    process.exit(1);
}

console.log("Input file exists", option.input);
console.log("Output file", option.output || "not specified");
console.log("Do you wanna display?", option.display ? "yes" : "no");
