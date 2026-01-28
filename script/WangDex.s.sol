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

        // 将合约地址写入前端项目（frontend/src/contracts/addresses.json）
        string[] memory cmd = new string[](4);
        cmd[0] = "node";
        cmd[1] = "scripts/update-addresses.cjs";
        cmd[2] = "WangDex";
        cmd[3] = vm.toString(address(dex));
        vm.ffi(cmd);
    }
}
