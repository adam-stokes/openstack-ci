/* global it describe before */
"use strict";
import { expect } from "chai";
import shell from "shelljs";
import _ from "lodash";
import OpenstackCI from "../";

describe("Single Installer Test Runner", () =>{
    let ci = new OpenstackCI();
    let res;
    let jsonOut;
    let knownServices = ["rabbitmq-server", "glance", "glance-simplestreams-sync", "openstack-dashboard",
                         "neutron-api", "neutron-gateway", "nova-cloud-controller",
                         "mysql", "nova-compute", "keystone"];
    before(() =>{
        res = shell.exec("sudo lxc-attach -n openstack-single-stokachu -- su - ubuntu -c 'JUJU_HOME=~/.cloud-install/juju juju status --format=json'", {silent: true});
        if(res.code === 0){
            jsonOut = JSON.parse(res.output);
            // console.log(jsonOut);
        }
        ci.parseCreds();
        console.log(ci.auth());
    });
    it("should pass on juju status", () => {
        expect(res.code).to.equal(0);
    });
    it("should have 4 started machines", () => {
        for (let i = 0; i < 4; i++){
            expect(jsonOut.machines[i]["agent-state"]).to.equal("started");
        }
    });
    it("should contain all default services", () => {
        _.filter(knownServices, svc => {
            expect(jsonOut.services[svc]).to.exist;
        });
    });
    it("should contain all default started services", () => {
        _.filter(knownServices, svc => {
            expect(jsonOut.services[svc].units[`${svc}/0`]["agent-state"]).to.equal("started");
        });
    });
});
