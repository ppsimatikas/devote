import {buildModule} from "@nomicfoundation/hardhat-ignition/modules";

const parties = ['Republicans', 'Democrats']
const states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "DC"]

const DeVoteModule = buildModule("DeVoteModule", (m) => {
  const devote = m.contract("DeVote", [parties, states], {});
  return { devote };
});

export default DeVoteModule;
