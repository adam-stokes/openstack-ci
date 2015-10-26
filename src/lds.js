"use strict";

import Juju from "./juju";
import shell from "shelljs";

export default class LDS{
    constructor(){
        this.juju = new Juju();
    }
    loginPage(){
        let ip = this.juju.getPublicIP("haproxy");
        return shell.exec(`curl -Ls --insecure 'http://${ip}/account/standalone/openstack'`, {silent: true});
    }
}
