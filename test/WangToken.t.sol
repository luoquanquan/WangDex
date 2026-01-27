// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import {WangToken} from "../src/WangToken.sol";

contract WangTokenTest is Test {
    WangToken internal token;

    address internal deployer = address(this);

    function testConstructorSetsMetadataAndSupply() public {
        uint8 decimals_ = 6;
        uint256 totalSupply_ = 1_000_000 * 10 ** decimals_;

        token = new WangToken("WangToken", "WANG", decimals_, totalSupply_);

        assertEq(token.name(), "WangToken", "name mismatch");
        assertEq(token.symbol(), "WANG", "symbol mismatch");
        assertEq(token.decimals(), decimals_, "decimals mismatch");
        assertEq(token.totalSupply(), totalSupply_, "totalSupply mismatch");
        assertEq(
            token.balanceOf(deployer),
            totalSupply_,
            "initial balance should be minted to deployer"
        );
    }

    function testTransferWorks() public {
        uint8 decimals_ = 18;
        uint256 totalSupply_ = 1000 * 10 ** decimals_;

        token = new WangToken("WangToken", "WANG", decimals_, totalSupply_);

        address alice = address(0x1);

        // transfer some tokens to alice
        bool ok = token.transfer(alice, 100 * 10 ** decimals_);
        assertTrue(ok, "transfer should return true");
        assertEq(
            token.balanceOf(alice),
            100 * 10 ** decimals_,
            "alice balance incorrect"
        );
        assertEq(
            token.balanceOf(deployer),
            totalSupply_ - 100 * 10 ** decimals_,
            "deployer balance incorrect"
        );
    }
}
