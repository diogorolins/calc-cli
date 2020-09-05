const { Command, flags } = require("@oclif/command");
const { cli } = require("cli-ux");
const inquirer = require("inquirer");
const chalk = require("chalk");

class SolveCommand extends Command {
  async run() {
    const first = await cli.prompt(chalk.bgBlue("Digit first number"));
    const second = await cli.prompt(chalk.bgBlue("Digit second number"));

    let operation = flags.operation;
    if (!operation) {
      let responses = await inquirer.prompt([
        {
          name: "operation",
          message: chalk.bgGray("select operation"),
          type: "list",
          choices: [{ name: "+" }, { name: "-" }, { name: "/" }, { name: "*" }],
        },
      ]);
      operation = responses.operation;
    }
    try {
      const result = eval(`${first}${operation}${second}`);
      this.log(chalk.green(`Answer: ${result}`));
    } catch (err) {
      this.log(chalk.red("Invalid Number!!"));
    }
  }
}

SolveCommand.description = `Solve asic operations
...
Cli application that solves basic math operations
`;

module.exports = SolveCommand;
