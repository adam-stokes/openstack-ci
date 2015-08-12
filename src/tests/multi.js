/* global it describe before */
"use strict";
import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import shell from "shelljs";
import _ from "lodash";
import OpenstackCI from "../";

describe("Multi Installer Test Runner", () =>{
    let ci = new OpenstackCI();
    let res;
    let jsonOut;
    before(() =>{
        res = shell.exec("JUJU_HOME=~/.cloud-install/juju juju status --format=json", {silent: true});
        if(res.code === 0){
            jsonOut = JSON.parse(res.output);
        }
    });
    it("should pass on juju status", () => {
        expect(res.code).to.equal(0);
    });
    it("should contain all default services", () => {
        _.filter(ci.knownServices, svc => {
            expect(jsonOut.services[svc]).to.exist;
        });
    });
    it("should contain all default started services", () => {
        _.filter(ci.knownServices, svc => {
            expect(jsonOut.services[svc].units[`${svc}/0`]["agent-state"]).to.equal("started");
        });
    });
    it("should return a glance api endpoint", () =>{
        ci.authenticate();
        expect(ci.getEndPoint("nova")).to.be.fulfilled;
    });
    it("should have glance images", () => {
        /* EG:
           curl -s http://10.0.6.83:5000/v2.0/tokens -X 'POST' -d '{"auth": {"passwordCredentials":{"username":"admin","password":"pass"}}}' -H "Content-Type: application/json"
        */
        ci.authenticate();
        ci.getEndPoint("nova").then(url => {
            return ci.query(url, "images");
        }).then(result => {
            expect(result.images).to.not.be.empty;
        });
    });
});
