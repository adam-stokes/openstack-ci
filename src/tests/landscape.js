/* global it describe */
"use strict";

import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import OpenstackCI from "../";

describe("Landscape Autopilot Installer Test Runner", () =>{
    let ci = new OpenstackCI();
    it("should allow logging into autopilot", () => {
        let res = ci.lds.loginPage();
        expect(res.output).to.have.string("Welcome! - Landscape");
    });
});
