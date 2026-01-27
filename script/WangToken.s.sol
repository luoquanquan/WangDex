// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {WangToken} from "../src/WangToken.sol";

/// @notice 部署 WangToken 的脚本示例
/// @dev 可根据需要修改下面的常量参数
contract WangTokenScript is Script {
    // 在这里配置你要部署的 WangToken 参数
    string constant NAME = "WangToken";
    string constant SYMBOL = "WANG";
    uint8 constant DECIMALS = 18;
    uint256 constant TOTAL_SUPPLY = 1_000_000 * 10 ** DECIMALS; // 100 万个代币

    function run() external {
        vm.startBroadcast();

        // 部署 WangToken
        WangToken token = new WangToken(NAME, SYMBOL, DECIMALS, TOTAL_SUPPLY);

        vm.stopBroadcast();

        console.log("WangToken deployed at:", address(token));
    }
}
