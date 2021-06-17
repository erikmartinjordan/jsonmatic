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
    .description(console.log(chalk.cyan(`

     ██╗███████╗ ██████╗ ███╗   ██╗███╗   ███╗ █████╗ ████████╗██╗ ██████╗
     ██║██╔════╝██╔═══██╗████╗  ██║████╗ ████║██╔══██╗╚══██╔══╝██║██╔════╝
     ██║███████╗██║   ██║██╔██╗ ██║██╔████╔██║███████║   ██║   ██║██║     
██   ██║╚════██║██║   ██║██║╚██╗██║██║╚██╔╝██║██╔══██║   ██║   ██║██║     
╚█████╔╝███████║╚██████╔╝██║ ╚████║██║ ╚═╝ ██║██║  ██║   ██║   ██║╚██████╗
 ╚════╝ ╚══════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝

⚗️  https://github.com/erikmartinjordan/jsonmatic
 
`)));

program
    .command('transform')
    .arguments('<source> <destinaton>')
    .description('✨ transform a CSV into a JSON or vice versa')
    .action((source, destination) => {

        console.log('Transforming...');
        if     (source.endsWith('csv')  && destination.endsWith('json')) generateJSON(source, destination);
        else if(source.endsWith('json') && destination.endsWith('csv'))  generateCSV(source, destination);
        else   console.log(chalk.red('❌ The files are not valid.'));

    });

program
    .command('merge')
    .arguments('<files...>')
    .description('➕ merge multiple JSON into one unique file')
    .action(files => {

        console.log('Generating files...');
        if   (files.every(file => file.endsWith('json'))) generateMerge(files);
        else console.log(chalk.red('❌ The files are not valid.'));

    });

program
    .command('help')
    .description('🆘 display help for command')

program
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
        
        console.log(chalk.green(`✅ ${source} was transformed into ${destination}`));

    }
    catch(e){

        console.log(chalk.red(`❌ ${e}`));
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
        
        console.log(chalk.green(`✅ ${source} was transformed into ${destination}`));

    }
    catch(e){

        console.log(chalk.red(`❌ ${e}`));
        process.exit(1);

    }

}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Defining the merge generator
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function generateMerge(files){

    try{
        
        let jsonfiles = files.map(file => ({
            
            name: file,
            json: JSON.parse(fs.readFileSync(file))
        
        }));

        let merge = utils.mergeMultipleJSONs(jsonfiles);

        fs.writeFileSync('merge.json', JSON.stringify(merge, null, 2));
        
        console.log(chalk.green(`✅ ${files} merged into merge.json`));

    }
    catch(e){

        console.log(chalk.red(`❌ ${e}`));
        process.exit(1);

    }

}