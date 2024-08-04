import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DeVoteModule = buildModule("DeVoteModule", (m) => {
  const devote = m.contract("DeVote", [], {});

  return { devote };
});

export default DeVoteModule;
