"use strict";
require("babel/polyfill");

import fs from "fs";
import { XRegExp } from "xregexp";
import expandTilde from "expand-tilde";
import shell from "shelljs";
import Promise from "bluebird";
import LDS from "./lds";

export default class OpenstackCI {
    constructor() {
        this.config = {};
        this.token;
        this.auth;
        this.catalog;
        this.lds = new LDS();
    }

    set rcFileRaw(contents){
        this._rcFileRaw = contents;
    }

    parseCreds(){
        let authCreds = XRegExp("OS_USERNAME=(?<username>.*)\n.*" +
                                "OS_PASSWORD=(?<password>.*)\n.*" +
                                "OS_TENANT_NAME=(?<tenantName>.*)\n.*" +
                                "OS_AUTH_URL=(?<authUrl>[https:\\/\\/\\d+.]+):(?<port>\\d+)\\/.*\n.*" +
                                "OS_REGION_NAME=(?<region>.*)", "img");

        let contents = this.getCreds();
        let match = XRegExp.exec(contents, authCreds);
        return {
            auth: {
                tenantName: match.tenantName,
                passwordCredentials: {
                    username: match.username,
                    password: match.password
                }
            },
            url: match.authUrl,
            port: match.port,
            region: match.region
        };
    }

    getCreds(){
        let rcFile = expandTilde("~/.cloud-install/openstack-admin-rc");
        let rcFileRaw = fs.readFileSync(rcFile, "utf-8");
        return rcFileRaw;
    }

    query(endpoint, segment){
        let cmd = `curl -s -H "X-Auth-Token:${this.token.id}" "${endpoint}/${segment}"`;
        let res = shell.exec(cmd, {silent: true});
        return Promise.resolve(JSON.parse(res.output));
    }

    authenticate(){
        this.auth = this.parseCreds();
        let encodeAuth = JSON.stringify(this.auth.auth);
        let curlCmd = `curl -s ${this.auth.url}:${this.auth.port}/v2.0/tokens -X 'POST' -d '{"auth": ${encodeAuth}}' -H "Content-Type: application/json"`;
        let res = shell.exec(curlCmd, {silent: true});
        let outputJson = JSON.parse(res.output);
        this.catalog = outputJson.access.serviceCatalog;
        this.token = outputJson.access.token;
    }

    pretty(data){
        console.log(JSON.stringify(data, null, 2));
    }

    getEndPoint(name){
        for (let v of this.catalog) {
            if (v.name === name) {
                return Promise.resolve(v.endpoints[0].publicURL);
            }
        }
    }
}
