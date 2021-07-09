#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const path_1 = require("path");
//@ts-ignore
const package_json_1 = __importDefault(require("../package.json"));
const commands_1 = require("./commands");
commander_1.version(`@zen/cli ${package_json_1.default.version}`);
process.env.ZEN_CLI_VERSION = package_json_1.default.version;
Reflect.ownKeys(commands_1.mapActions).forEach((action) => {
    commander_1.command(action)
        .alias(commands_1.mapActions[action].alias)
        .description(commands_1.mapActions[action].description)
        //@ts-ignore
        .option(...(commands_1.mapActions[action].option))
        .action(() => {
        const fn = require(path_1.join(__dirname, `/commands/${action}`))[action];
        fn(...process.argv.slice(3));
    });
});
commander_1.parse();
