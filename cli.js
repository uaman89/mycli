#!/usr/bin/env node

import { program } from "commander";
import {i18nFillMissedKeys} from  "./scripts/i18n-fill-missed-keys.js";

program
  .name("mycli")
  .description("My custom dev automation CLI")
  .version("1.0.0");

// Example command 1: run a saved shell command
program
  .command("i18n-fill")
  .description("add missed translations from en_GB")
  .action(() => {
    i18nFillMissedKeys();
  });

program.parse();
