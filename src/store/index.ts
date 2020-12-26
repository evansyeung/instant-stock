"use strict";
import { Bestbuy } from "./bestbuy";
import { Newegg } from "./newegg";
import { config } from "../config";


// Conditionally export stores to run puppeteer on based on local_secrets.env
export const Stores = {
  ...(config.store.shouldCheckBestbuy && { Bestbuy }),
  ...(config.store.shouldCheckNewegg && { Newegg }),
};
