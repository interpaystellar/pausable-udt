# USDI deploy info

USDI is a stablecoin issued by [IPN (Interstellar Payment Network)](https://interpaystellar.com/) on the [Nervos CKB](https://www.nervos.org/). 

Similar to the USDT issued by Tether, it is pegged to the US dollar at a 1:1 ratio. 

It is backed by 100% reserves of high - credit and highly liquid assets and strictly complies with regulations such as AML, CFT, and KYC.

USDI support [RGB++ protocol](https://github.com/utxostack/RGBPlusPlus-design) and [fiber protocol](https://www.ckbfiber.net/).

This document describes the deployment information of the script for developers.

## testnet

### info

Script of USDI is a upgradable Pausable-UDT. So there is a realated [typeid](https://docs.nervos.org/docs/script/type-id).

typeid info:

```
{
    "code_hash": "0x00000000000000000000000000000000000000000000000000545950455f4944",
    "hash_type": "type",
    "args": "0xf0bad0541211603bf14946e09ceac920dd7ed4f862f0ffd53d0d477d6e1d0f0b"
}
```

celldep will change after upgrade script, you can find latest info by pre typeid. current info is:

```
{
    "outPoint": {
        "txHash": "0xaec423c2af7fe844b476333190096b10fc5726e6d9ac58a9b71f71ffac204fee",
        "index": "0"
    },
    "depType": "code"
}
```

typescript of USDI

```
{
    "code_hash": "0xcc9dc33ef234e14bc788c43a4848556a5fb16401a04662fc55db9bb201987037",
    "hash_type": "type",
    "args": "0x71fd1985b2971a9903e4d8ed0d59e6710166985217ca0681437883837b86162f"
}
```

USDI identity (hash of pre typescript)

```
0x07ac97b5ff3df4b49f59a59f4d80d33d22c1263a57467c512c93b9c29b7a0de3
```

it's identity of USDI on explorer, see https://testnet.explorer.nervos.org/xudt/0x07ac97b5ff3df4b49f59a59f4d80d33d22c1263a57467c512c93b9c29b7a0de3

### example code

there are some example code:

* usdi-info.ts     --  get all info about USDI.
* usdi-tranfer.ts  --  transfer USDI to others.  

you can run them in [playground](https://live.ckbccc.com).

It depend on [SSRI](https://docs.ckbccc.com/modules/_ckb_ccc_ssri.html), so you need run SSRI server at first.

```
docker run -p 9090:9090 hanssen0/ckb-ssri-server
```

if you run SSRI server and playground on different machine. there will be a Cross-domain problem. you need run a reserve proxy to fix it.

use [caddy](https://caddyserver.com/) like this:

```
caddy.exe reverse-proxy --from :9090 --to 192.168.160.20:9090
```

`192.168.160.20` is ip which run SSRI server.

### faucet

You can get USDI on testnet from [faucet](https://faucet.interpaystellar.com/).


## mainnet

### info

Script of USDI is a upgradable xUDT now, we will upgrade it to Pausable-UDT later.

So there is a realated [typeid](https://docs.nervos.org/docs/script/type-id).

typeid info:

```
{
    "code_hash": "0x00000000000000000000000000000000000000000000000000545950455f4944",
    "hash_type": "type",
    "args": "0x9105ea69838511ca609518d27855c53fed1b5ffaff4cfb334f58b40627d211c4"
}
```

celldep will change after upgrade script, you can find latest info by pre typeid. current info is:

```
{
    "outPoint": {
        "txHash": "0xf6a5eef65101899db9709c8de1cc28f23c1bee90d857ebe176f6647ef109e20d",
        "index": 0
    },
    "depType": "code"
}
```

typescript of USDI

```
{
    "code_hash": "0xbfa35a9c38a676682b65ade8f02be164d48632281477e36f8dc2f41f79e56bfc",
    "hash_type": "type",
    "args": "0xd591ebdc69626647e056e13345fd830c8b876bb06aa07ba610479eb77153ea9f"
}
```

USDI identity (hash of pre typescript)

```
0x7f3fba3fb8d6e000176f7e1ae22e8cd02841dec6a8341dc69aeef46387a20664
```

it's identity of USDI on explorer, see https://explorer.nervos.org/xudt/0x7f3fba3fb8d6e000176f7e1ae22e8cd02841dec6a8341dc69aeef46387a20664
