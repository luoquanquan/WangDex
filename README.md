# WangDex

## Anvil

```shell
$ anvil
```

## Deploy

```shell
# Deploy WangToken
forge script script/WangToken.s.sol:WangTokenScript --rpc-url http://127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast

# Deploy WangDex
forge script script/WangDex.s.sol:WangDexScript --rpc-url http://127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast
```

## Cast

```shell
$ cast <subcommand>
```

## Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```
