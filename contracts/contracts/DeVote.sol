// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract DeVote {
    string public message;

    function setMessage(string memory _message) public {
        message = _message;
    }
}
