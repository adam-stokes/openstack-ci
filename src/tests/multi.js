/* global it describe before */
"use strict";
import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import _ from "lodash";
import OpenstackCI from "../";

describe("Multi Installer Test Runner", () =>{
    let ci = new OpenstackCI();
    let jsonOut;
    before(() =>{
        jsonOut = ci.juju.status();
        ci.authenticate();
    });
    it("should pass on juju status", () => {
        expect(jsonOut.services).to.exist;
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
        expect(ci.getEndPoint("nova")).to.be.fulfilled;
    });
    it("should have glance images", () => {
        /* EG:
           curl -s http://10.0.6.83:5000/v2.0/tokens -X 'POST' -d '{"auth": {"passwordCredentials":{"username":"admin","password":"pass"}}}' -H "Content-Type: application/json"
        */
        ci.getEndPoint("nova").then(url => {
            return ci.query(url, "images");
        }).then(result => {
            expect(result.images).to.not.be.empty;
        });
    });
    it("should return a neutron api endpoint", () =>{
        expect(ci.getEndPoint("network")).to.be.fulfilled;
    });
});
