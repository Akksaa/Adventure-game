#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

// Game variables:

const lines: string = `\n------------------------------------\n`
const gameName: string = `\n------- DUNGEON CRAWLER GAME -------\n`;
let userHealth: number = 100;
let enemyHealth: number = Math.floor(Math.random() * 100);
let userDamage: number = Math.floor(Math.random() * 50) +5;
let enemyDamage: number = Math.floor(Math.random() * 50) +5;
let potion = 3;
let potionedHealth = Math.floor(Math.random() * 25 + 5);
const enemies : string[] = ["Zombie", "Skeleton", "Goblin", "Giant Spider"];
let enemy : string = enemies[Math.floor(Math.random() * (enemies.length))];
console.log(chalk.bold.yellow(gameName));


// Player Name:

let user = await inquirer.prompt([{
    name: "name",
    type: "input",
    message: "Enter your name first:"    
}]);

// Match begins:
let match = `\t${user.name.toUpperCase()} VS ${enemy}\t`;
    console.log(chalk.blueBright(`\n------- The Match Starts -------\n`))
    console.log(chalk.blueBright(match));
    console.log(chalk.blueBright(`\n\t${user.name.toUpperCase()}'s Health: ${userHealth}\t`));
    console.log(chalk.blueBright(`\t${enemy}'s Health: ${enemyHealth}\t`));
    console.log(chalk.blueBright(lines));

// Action: 
while (true) {

    let whatTodo = await inquirer.prompt([{
        name: "option",
        message: "What would you like to do:",
        type: "list",
        choices: ["Attack", "Drink Health Potion", "Run", "Hide"]
    }]);
    
    if(whatTodo.option == "Attack"){

        let takenDamage: number = Math.floor(Math.random() * userDamage)+1;
        let givenDamage: number = Math.floor(Math.random() * enemyDamage)+1;
    
        userHealth = userHealth - takenDamage;
        enemyHealth = enemyHealth - givenDamage;

        console.log(chalk.blueBright(`\n---------- ATTACK ----------`))
        console.log(chalk.greenBright(`\n${user.name.toUpperCase()} Charged ${givenDamage} Damage to ${enemy}!`));
        console.log(chalk.redBright(`${user.name.toUpperCase()} got ${takenDamage} Damage in Response!`));
    
        if(userHealth > 0 && enemyHealth > 0){
           console.log(chalk.blueBright(`\n\t${user.name.toUpperCase()}'s Health: ${userHealth}`));
           console.log(chalk.blueBright(`\t${enemy}'s Health: ${enemyHealth}`));
        };
        console.log(chalk.blueBright(lines));
        
    }
    else if(whatTodo.option == "Drink Health Potion"){

        
        userHealth = userHealth + potionedHealth;
        
        if(potion > 0){

            console.log(chalk.blueBright(`\n---- DRINK HEALTH POTION ----\n`));
            console.log(chalk.blueBright(`${user.name.toUpperCase()} has ${potion} Potion!`))
            console.log(chalk.greenBright(`${user.name.toUpperCase()} has Secured ${potionedHealth} Health!`));
            console.log(chalk.blueBright(`\n\t${user.name.toUpperCase()}'s Health: ${userHealth}`));
            console.log(chalk.blueBright(`\t${enemy}'s Health: ${enemyHealth}`));
            console.log(chalk.blueBright(lines));
            potion -= 1;
        }
        else{
            console.log(chalk.blueBright(lines));
            console.log(chalk.redBright(`\tNo More Health Potions!`));
            console.log(chalk.blueBright(lines));
        }


    } 
    else if(whatTodo.option == "Run"){

        let runDamage = Math.floor(Math.random() * userHealth) +1;
        userHealth = userHealth - runDamage
        console.log(chalk.blueBright(`\n------------- RUN -------------\n`));
        console.log(chalk.redBright(`${user.name.toUpperCase()}'s Health is Decreasing Due to Excessive Running!`));

        if(userHealth > 0){

            console.log(chalk.blueBright(`\n\t${user.name.toUpperCase()}'s Health: ${userHealth}`));
            console.log(chalk.blueBright(`\t${enemy}'s Health: ${enemyHealth}`));
            console.log(chalk.blueBright(lines));
        }
        else{
            console.log(chalk.redBright(`\n\t${user.name.toUpperCase()}'s Health: 0\n`))
        }
    }else if(whatTodo.option == "Hide"){

        console.log(chalk.blueBright(`\n------------- HIDE -------------\n`));
        console.log(chalk.greenBright(`${user.name.toUpperCase()} Is Hidden In A Room!`))
        console.log(chalk.redBright(`Oh No!! ${enemy} Has Caught You!!\n`));
        console.log(chalk.redBright(`${user.name.toUpperCase()} Has Been Defeated By ${enemy}!`));
        console.log(chalk.redBright(`Better Luck Next Time!`));
        console.log(chalk.blueBright(lines));
        break;
    }

    if(enemyHealth <= 0){

        console.log(chalk.greenBright(`${enemy} Has Been Defeated!`));
        console.log(chalk.greenBright(`${user.name.toUpperCase()} Has Won This Battle!`));
        console.log(chalk.blueBright(lines));
        break;
    }
    else if (userHealth <= 0){

        console.log(chalk.redBright(`${user.name.toUpperCase()} Has Been Defeated By ${enemy}!`));
        console.log(chalk.redBright(`Better Luck Next Time!`));
        console.log(chalk.blueBright(lines));
        break;
    };
}   