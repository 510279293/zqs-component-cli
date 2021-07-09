#!/usr/bin/env node
import { command, parse, version } from 'commander';
import { join } from 'path'; //@ts-ignore

import packageJson from '../package.json';
import { mapActions } from './commands';
version("@zen/cli " + packageJson.version);
process.env.ZEN_CLI_VERSION = packageJson.version;
Reflect.ownKeys(mapActions).forEach(function (action) {
  var _command$alias$descri;

  (_command$alias$descri = command(action).alias(mapActions[action].alias).description(mapActions[action].description) //@ts-ignore
  ).option.apply(_command$alias$descri, mapActions[action].option).action(function () {
    var fn = require(join(__dirname, "/commands/" + action))[action];

    fn.apply(void 0, process.argv.slice(3));
  });
});
parse();