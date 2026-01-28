// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import {WangDex} from "../src/WangDex.sol";
import {WangToken} from "../src/WangToken.sol";

contract WangDexTest is Test {
    WangDex internal dex;
    WangToken internal token;

    address internal user = address(0x1);

    function setUp() public {
        dex = new WangDex();
        token = new WangToken("WangToken", "WANG", 18, 1_000_000 ether);
    }

    function testDepositNative() public {
        deal(user, 10 ether);

        vm.prank(user);
        dex.depositNative{value: 1 ether}();

        assertEq(
            dex.balances(user, dex.NATIVE_TOKEN()),
            1 ether,
            "native balance not recorded"
        );
    }

    function testWithdrawNative() public {
        deal(user, 10 ether);

        vm.prank(user);
        dex.depositNative{value: 2 ether}();

        uint256 before = user.balance;

        vm.prank(user);
        dex.withdrawNative(1 ether);

        assertEq(
            dex.balances(user, dex.NATIVE_TOKEN()),
            1 ether,
            "native balance not updated"
        );
        assertEq(
            user.balance,
            before + 1 ether,
            "user ETH balance not increased"
        );
    }

    function testDepositToken() public {
        // 给 user 一些代币
        token.transfer(user, 1_000 ether);

        vm.startPrank(user);
        token.approve(address(dex), 100 ether);
        dex.depositToken(address(token), 100 ether);
        vm.stopPrank();

        assertEq(
            dex.balances(user, address(token)),
            100 ether,
            "token balance not recorded"
        );
        assertEq(
            token.balanceOf(address(dex)),
            100 ether,
            "dex token balance incorrect"
        );
    }

    function testWithdrawToken() public {
        // 先存入
        token.transfer(user, 1_000 ether);

        vm.startPrank(user);
        token.approve(address(dex), 100 ether);
        dex.depositToken(address(token), 100 ether);
        vm.stopPrank();

        uint256 beforeUser = token.balanceOf(user);

        vm.prank(user);
        dex.withdrawToken(address(token), 40 ether);

        assertEq(
            dex.balances(user, address(token)),
            60 ether,
            "internal token balance not reduced"
        );
        assertEq(
            token.balanceOf(user),
            beforeUser + 40 ether,
            "user token balance not increased"
        );
        assertEq(
            token.balanceOf(address(dex)),
            60 ether,
            "dex token balance not reduced"
        );
    }

    function testBalancesOfForNativeAndToken() public {
        // user 存入 1 ETH
        deal(user, 10 ether);
        vm.prank(user);
        dex.depositNative{value: 1 ether}();

        // user 存入 100 token
        token.transfer(user, 1_000 ether);
        vm.startPrank(user);
        token.approve(address(dex), 100 ether);
        dex.depositToken(address(token), 100 ether);
        vm.stopPrank();

        // 使用 balancesOf 读取
        uint256 nativeBalance = dex.balancesOf(user, dex.NATIVE_TOKEN());
        uint256 tokenBalance = dex.balancesOf(user, address(token));

        assertEq(nativeBalance, 1 ether, "balancesOf native mismatch");
        assertEq(tokenBalance, 100 ether, "balancesOf token mismatch");
    }

    function testCreateOrderStoresDataAndEmitsEvent() public {
        address fromToken = address(token);
        address toToken = address(0xBEEF);
        uint256 fromAmount = 10 ether;
        uint256 toAmount = 20 ether;

        // 先给 user 足够的 fromToken，并存入 dex，以后可以扩展成下单时锁定余额
        token.transfer(user, 100 ether);
        vm.startPrank(user);
        token.approve(address(dex), 50 ether);
        dex.depositToken(fromToken, 50 ether);

        // 期望事件
        vm.expectEmit(true, true, true, true);
        emit WangDex.CreateOrder(
            0, // 当前 orderId 初始为 0
            user,
            fromToken,
            toToken,
            fromAmount,
            toAmount,
            block.timestamp
        );

        dex.createOrder(fromToken, toToken, fromAmount, toAmount);
        vm.stopPrank();

        // 校验存储的订单数据
        (
            uint256 id,
            address orderUser,
            address storedFromToken,
            address storedToToken,
            uint256 storedFromAmount,
            uint256 storedToAmount,
            uint256 ts
        ) = dex.orders(0);

        assertEq(id, 0, "order id mismatch");
        assertEq(orderUser, user, "order user mismatch");
        assertEq(storedFromToken, fromToken, "fromToken mismatch");
        assertEq(storedToToken, toToken, "toToken mismatch");
        assertEq(storedFromAmount, fromAmount, "fromAmount mismatch");
        assertEq(storedToAmount, toAmount, "toAmount mismatch");
        assertEq(ts, block.timestamp, "timestamp mismatch");

        // orderId 自增
        assertEq(dex.orderId(), 1, "orderId not incremented");
    }
}
