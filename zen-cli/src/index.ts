#!/usr/bin/env node
import {command, parse, version} from 'commander'
import { join } from 'path'

//@ts-ignore
import packageJson from '../package.json'

import { mapActions } from './commands'

version(`@zen/cli ${packageJson.version}`)

process.env.ZEN_CLI_VERSION = packageJson.version

Reflect.ownKeys(mapActions).forEach((action: any) => {
    command(action)
           .alias(mapActions[action].alias)
           .description(mapActions[action].description)
           //@ts-ignore
           .option(...(mapActions[action].option))
           .action(() => {
               const fn = require(join(__dirname, `/commands/${action}`))[action]
               fn(...process.argv.slice(3))
           })
})

parse()