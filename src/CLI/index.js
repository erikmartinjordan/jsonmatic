#!/usr/bin/env node
import chalk       from 'chalk';
import path        from 'path';
import fs          from 'fs';
import { program } from 'commander';
import * as utils  from './utils.js';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Defining the program
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let { version } = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url)));

program
    .version(version)
    .description('CLI');

program
    .option('-j, --json <file>', 'transform JSON to CSV')
    .option('-c, --csv  <file>', 'transform CSV to JSON')
    .parse();

const options = program.opts();

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Check if arguments are correct
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
if(options.json && options.csv){

    console.log(chalk.red('❌ You can transform only one file at once.'));
    console.log(chalk.green('✅ Use jsonmatic --json <name> to transform a JSON into a CSV'));
    console.log(chalk.green('✅ Use jsonmatic --csv  <name> to transform a CSV into a JSON'));

    process.exit(1);

}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Transform JSON into CSV
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
if(options.json){

    try{

        let rawdata = fs.readFileSync(options.json);
        let json = JSON.parse(rawdata);

        utils.validateJSON(json);
        
        let csv = utils.transformToCSV(json);

        fs.writeFileSync('result.csv', csv.map(row => row.join(',')).join('\n'));
        
        console.log(chalk.green(`✅ ${options.json} transformed to result.csv`));

    }
    catch(e){

        console.log(chalk.red('❌ The JSON is not valid.'));
        process.exit(1);

    }

}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Transform CSV into JSON
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
if(options.csv){

    try{

        let rawdata = fs.readFileSync(options.csv);
        let csv = rawdata.toString().split(/\r\n|\n|\r/).map(line => line.split(','));

        utils.validateCSV(csv);

        let json = utils.transformToJSON(csv);

        fs.writeFileSync('result.json', JSON.stringify(json, null, 2));
        
        console.log(chalk.green(`✅ ${options.csv} transformed to result.json`));

    }
    catch(e){

        console.log(e);

        console.log(chalk.red('❌ The CSV is not valid.'));
        process.exit(1);

    }

}