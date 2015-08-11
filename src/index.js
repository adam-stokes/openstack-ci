"use strict";
require("babel/polyfill");

import fs from "mz/fs";
import toml from "toml";

export
default class OpenstackCI {
    constructor() {
        this.config = {};
    }
    parse(path) {
        return fs.readFile(path, "utf-8").then(contents => {
            return toml.parse(contents);
        });
    }
}
