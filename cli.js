// the file to build the command line interface
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import {cookRecipe, previousRecipes} from './app.js';

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
                });
        },
        // handler function
        (args) => {
            if (args.type === 'name') {
                cookRecipe('name', args.variable);
            } 
            else if (args.type === 'firstLetter') {
                cookRecipe('firstLetter', args.variable);
            }
            else{
                cookRecipe('id', args.variable);
            }
        }
    ).command(
        'previousRecipes',
        'view the previous recipes', 
        () => {}, 
        () => {
            previousRecipes();
        }

    ).help().argv;
