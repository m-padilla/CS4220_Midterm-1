// the file to build the command line interface
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import {displaySearchHistory, cookRecipe} from './app.js';

yargs(hideBin(process.argv))
    // $0 expands the file name
    // <> indicate that the command is manadatory
    // [] indicate that options are optional
    .usage('$0: Usage <command> [options]')
    .command(
        // command name with argument
        'search <type> <variable>',
        // description
        'search meal recipe',
        // builder function to add a positional argument and option
        (yargs) => {
            yargs
                .positional('type', {
                    describe: 'different ways of searching meal recipe',
                    type: 'string',
                    choices: ['name', 'firstLetter' , 'id']
                })
                .positional('variable', {
                    describe: 'searching keyword',
                    type: 'string',
                })
                .option('cache', {
                    alias: 'c',
                    describe: 'Return cached results when available',
                    type: 'boolean',
                    default: false
                });
        },
        // handler function
        (args) => {
            if (args.type === 'name') {
                cookRecipe('name', args.variable, args.cache);
            } 
            else if (args.type === 'firstLetter') {
                if (args.variable.length === 1) {
                    cookRecipe('firstLetter', args.variable, args.cache);
                } else {
                    console.log('Please only enter 1 letter');
                }
            }
            else{
                cookRecipe('id', args.variable, args.cache);
            }
        }
    ).command(
        'history',
        'lists previous searches',
        () => {}, // no positional arguments needed
        () => {
            displaySearchHistory();
        }
    ).help().argv;