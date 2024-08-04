import { expect } from "chai";
import hre from "hardhat";

describe("DeVote", function () {
  let DeVote;
  let devote: any;
  let owner;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    DeVote = await hre.ethers.getContractFactory("DeVote");
    [owner] = await hre.ethers.getSigners();

    // Deploy the contract
    devote = await DeVote.deploy();
  });

  describe("Deployment", function () {
    it("Should set an empty message", async function () {
      expect(await devote.message()).to.equal("");
    });
  });

  describe("Set message", function () {
    it("Should set the message", async function () {
      expect(await devote.message()).to.equal("");

      const setMessageTx = await devote.setMessage("Hello, DeVote!");
      await setMessageTx.wait();

      expect(await devote.message()).to.equal("Hello, DeVote!");
    });

    it("Should change the message", async function () {
      expect(await devote.message()).to.equal("");

      const setMessageTx1 = await devote.setMessage("Hello, DeVote!");
      await setMessageTx1.wait();

      expect(await devote.message()).to.equal("Hello, DeVote!");

      const setMessageTx2 = await devote.setMessage("Goodbye, DeVote!");
      await setMessageTx2.wait();

      expect(await devote.message()).to.equal("Goodbye, DeVote!");
    });
  });
});
