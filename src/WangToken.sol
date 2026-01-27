// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {
    ERC20
} from "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

/// @title WangToken，可配置的 ERC20 代币（基于 OpenZeppelin）
/// @notice 部署时指定 name、symbol、totalSupply、decimals，全部一次性铸造给部署者
contract WangToken is ERC20 {
    uint8 private immutable _customDecimals;

    /// @param _name 代币名称
    /// @param _symbol 代币符号
    /// @param _decimals 小数位位数
    /// @param _totalSupply 总发行量（按 `_decimals` 精度，外面可以传入「人类可读数量 * 10**_decimals」）
    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        uint256 _totalSupply
    ) ERC20(_name, _symbol) {
        _customDecimals = _decimals;
        // 所有初始代币铸造给部署者
        _mint(msg.sender, _totalSupply);
    }

    /// @notice 返回部署时指定的小数位
    function decimals() public view virtual override returns (uint8) {
        return _customDecimals;
    }
}
