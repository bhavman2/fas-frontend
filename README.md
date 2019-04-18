# ⚡️ Lightning Wi-Fi - Forwarding Authentication Service (FAS)

[![tippin.me](https://badgen.net/badge/tippin.me/@bhavman2/blue)](https://tippin.me/@bhavman2)

Lightning Wi-Fi FAS provides a captive portal paywall for Wi-Fi networks and requires users to pay 100 sats (0.000002BTC) on Bitcoin's Layer 2 - Lightning Network for 1 hour of internet access. The Wi-Fi network and captive portal are created using a Raspberry Pi and open source software [nodogsplash](https://github.com/nodogsplash/nodogsplash). Once a client joins the Wi-Fi network, they are forwarded to the Lightning Wifi FAS, where their payment is processed and they are granted internet access. The invoice generation and payment processing are handled on the back-end using [BTCPay Server](https://github.com/btcpayserver/btcpayserver) and [lightning-charge](https://github.com/ElementsProject/lightning-charge).

### Demo: Desktop View 
![Desktop View](https://s3-us-west-1.amazonaws.com/bhavik-personal-website/Lightning-Wifi-Desktop.gif)

### Demo: iOS Zap Wallet
![iPhone View](https://s3-us-west-1.amazonaws.com/bhavik-personal-website/Lightning-Wifi-Zap.gif)


## Future Development

* Create Docker image of FAS with easily configurable settings
* Create image Raspbian Stretch w/ pre-configured software
* Improve network throughput using the Raspberry Pi's on-board Wi-Fi chip or find external hardware solution
