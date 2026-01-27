// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {WangDex} from "../src/WangDex.sol";

contract WangDexScript is Script {
    function run() external {
        vm.startBroadcast();

        WangDex dex = new WangDex();

        vm.stopBroadcast();

        console.log("WangDex deployed at:", address(dex));
    }
}
