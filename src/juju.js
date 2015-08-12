"use strict";
import shell from "shelljs";

export default class Juju{
    constructor(){}
    singleStatus(){
        let res = shell.exec("sudo lxc-attach -n openstack-single-stokachu -- su - ubuntu -c 'JUJU_HOME=~/.cloud-install/juju juju status --format=json'", {silent: true});
        if(res.code > 0){
            throw Error("Problem grabbing single install status output.");
        }
        return JSON.parse(res.output);
    }
    status(){
        let res = shell.exec("JUJU_HOME=~/.cloud-install/juju juju status --format=json", {silent: true});
        if(res.code > 0){
            throw Error("Problem grabbing juju status output.");
        }
        return JSON.parse(res.output);
    }
    getPublicIP(service){
        let statusOut = this.status();
        return statusOut.services[service].units[`${service}/0`]["public-address"];
    }
}
