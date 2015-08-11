/* global it describe */
"use strict";
require("babel/polyfill");
import Promise from "bluebird";
import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
chai.should();
import shell from "shelljs";
import got from "got";

describe("Single Installer Test Runner", () =>{
    it("should pass on juju status", () => {
        let res = shell.exec("sudo lxc-attach -n openstack-single-stokachu -- su - ubuntu -c 'JUJU_HOME=~/.cloud-install/juju juju status --format=json'", {silent: true});
        expect(res.code).to.equal(0);
    });
});

describe("Autopilot Installer Test Runner", () =>{
    it("should return a login page", () => {
        Promise.resolve(got("")).then(result => {
            console.log(result);
            expect(result.code).to.equal(0);
        });
    });
});
