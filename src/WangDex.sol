// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {
    IERC20
} from "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

contract WangDex {
    address public constant NATIVE_TOKEN = address(0);

    // Events
    event Deposit(address indexed user, address indexed token, uint256 amount);
    event Withdraw(address indexed user, address indexed token, uint256 amount);

    // user => token => amount
    mapping(address => mapping(address => uint256)) public balances;

    constructor() {}

    // ========================= 存取款 =========================
    function depositNative() public payable {
        require(msg.value > 0, "Deposit zero");

        balances[msg.sender][NATIVE_TOKEN] += msg.value;
        emit Deposit(msg.sender, NATIVE_TOKEN, msg.value);
    }

    function withdrawNative(uint256 value) public {
        require(
            balances[msg.sender][NATIVE_TOKEN] >= value,
            "Insufficient balance"
        );

        balances[msg.sender][NATIVE_TOKEN] -= value;
        (bool ok, ) = msg.sender.call{value: value}("");
        require(ok, "ETH transfer failed");
        emit Withdraw(msg.sender, NATIVE_TOKEN, value);
    }

    function depositToken(address token, uint256 amount) public {
        require(amount > 0, "Deposit zero");

        IERC20(token).transferFrom(msg.sender, address(this), amount);
        balances[msg.sender][token] += amount;
        emit Deposit(msg.sender, token, amount);
    }

    function withdrawToken(address token, uint256 amount) public {
        require(balances[msg.sender][token] >= amount, "Insufficient balance");

        balances[msg.sender][token] -= amount;
        bool ok = IERC20(token).transfer(msg.sender, amount);
        require(ok, "Token transfer failed");
        emit Withdraw(msg.sender, token, amount);
    }
}
