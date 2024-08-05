import {expect} from "chai";
import hre from "hardhat";

describe("DeVote", function () {
  let DeVote;
  let devote: any;
  let owner;

  const candidates = ["Alice", "Bob"];
  const states = ["CA", "TX"];

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    DeVote = await hre.ethers.getContractFactory("DeVote");
    [owner] = await hre.ethers.getSigners();

    // Deploy the contract
    devote = await DeVote.deploy(candidates, states);
  });

  describe("Deployment", function () {
    it("Should set the correct candidates", async function () {
      expect(await devote.getCandidates()).to.deep.equal(candidates);
    });

    it("Should set the correct states", async function () {
      expect(await devote.getStateList()).to.deep.equal(states);
    });
  });

  describe("Voting", function () {
    it("Should allow a user to vote for a candidate in a state", async function () {
      const userId = "user1";
      const candidateName = "Alice";
      const state = "CA";

      await devote.vote(userId, candidateName, state);

      const votes = await devote.getVotes();
      const californiaVotes = votes.find((result: any) => result.state === state);
      const aliceVotes = californiaVotes.votes.find((vote: any) => vote.candidate === candidateName);

      expect(aliceVotes.votes).to.equal(1);
    });

    it("Should not allow a user to vote more than once", async function () {
      const userId = "user2";
      const candidateName = "Bob";
      const state = "TX";

      await devote.vote(userId, candidateName, state);

      await expect(devote.vote(userId, candidateName, state)).to.be.revertedWith("You have already voted.");
    });

    it("Should not allow a vote for an invalid candidate", async function () {
      const userId = "user3";
      const candidateName = "Charlie";
      const state = "CA";

      await expect(devote.vote(userId, candidateName, state)).to.be.revertedWith("Invalid candidate name.");
    });
  });

  describe("Get Votes", function () {
    it("Should return the correct vote counts", async function () {
      await devote.vote("user1", "Alice", "CA");
      await devote.vote("user2", "Alice", "TX");
      await devote.vote("user3", "Bob", "CA");

      const votes = await devote.getVotes();

      const californiaVotes = votes.find((result: any) => result.state === "CA").votes;
      const texasVotes = votes.find((result: any) => result.state === "TX").votes;

      const aliceCAVotes = californiaVotes.find((vote: any) => vote.candidate === "Alice").votes;
      const bobCAVotes = californiaVotes.find((vote: any) => vote.candidate === "Bob").votes;
      const aliceTXVotes = texasVotes.find((vote: any) => vote.candidate === "Alice").votes;
      const bobTXVotes = texasVotes.find((vote: any) => vote.candidate === "Bob").votes;

      expect(aliceCAVotes).to.equal(1);
      expect(bobCAVotes).to.equal(1);
      expect(aliceTXVotes).to.equal(1);
      expect(bobTXVotes).to.equal(0);
    });
  });
});
