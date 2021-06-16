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
    .command('jsonmatic')
    .arguments('<source> <destinaton>')
    .description('Transform a CSV into a JSON or vice versa')
    .action((source, destination) => {

        if     (source.endsWith('csv')  && destination.endsWith('json')) generateJSON(source, destination);
        else if(source.endsWith('json') && destination.endsWith('csv'))  generateCSV(source, destination);
        else   console.log(chalk.red('❌ The files are not valid.'));

    })
    .parse();

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Defining the JSON generator
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function generateJSON(source, destination){

    try{

        let rawdata = fs.readFileSync(source);
        let csv = rawdata.toString().split(/\r\n|\n|\r/).map(line => line.split(','));

        utils.validateCSV(csv);

        let json = utils.transformToJSON(csv);

        fs.writeFileSync(destination, JSON.stringify(json, null, 2));
        
        console.log(chalk.green(`✅ ${source} transformed to ${destination}`));

    }
    catch(e){

        console.log(chalk.red('❌ The CSV is not valid or does not exist.'));
        process.exit(1);

    }

}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Defining the CSV generator
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function generateCSV(source, destination){

    try{

        let rawdata = fs.readFileSync(source);
        let json = JSON.parse(rawdata);

        utils.validateJSON(json);
        
        let csv = utils.transformToCSV(json);

        fs.writeFileSync(destination, csv.map(row => row.join(',')).join('\n'));
        
        console.log(chalk.green(`✅ ${source} transformed to ${destination}`));

    }
    catch(e){

        console.log(chalk.red('❌ The JSON is not valid or does not exist.'));
        process.exit(1);

    }

}