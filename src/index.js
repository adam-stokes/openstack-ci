"use strict";
require("babel/polyfill");

import fs from "fs";
import { XRegExp } from "xregexp";
import expandTilde from "expand-tilde";
// import shell from "shelljs";

export default class OpenstackCI {
    constructor() {
        this.config = {};
        this.rcFile = expandTilde("~/.cloud-install/openstack-admin-rc");
        this.rcFileRaw = fs.readFileSync(this.rcFile, "utf-8");
        this._authMap = {};
    }

    get auth(){
        return this._authMap;
    }

    parseCreds(){
        let authCreds = XRegExp("OS_USERNAME=(?<username>[A-Za-z0-9:\\/\\/\\.]+)" +
                                "OS_PASSWORD=(?<password>[A-Za-z0-9:\\/\\/\\.]+)" +
                                "OS_TENANT_NAME=(?<tenantName>[A-Za-z0-9:\\/\\/\\.]+)" +
                                "OS_AUTH_URL=(?<authUrl>[A-Za-z0-9:\\/\\/\\.]+)" +
                                "OS_REGION_NAME=(?<region>[A-Za-z0-9:\\/\\/\\.]+)", "img");

        let match = XRegExp.exec(this.rcFileRaw, authCreds);
        console.log(match);
        this.authMap = {
            username: match.username,
            password: match.password,
            tenant: match.tenantName,
            url: match.authUrl,
            region: match.region
        };
        //let cmd = `sudo lxc-attach -n openstack-single-stokachu -- su - ubuntu -c 'curl -s -X POST ${auth.url}/tokens -H "{Content-Type: application/json}" -d \'{"auth": {"tenantName": \'${match.tenant}\', "passwordCredentials": {"username": \'${match.username}\', "password": \'${match.password}}}'`;
        //console.log(cmd);
        //res = shell.exec(cmd);
    }
}
