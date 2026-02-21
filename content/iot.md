---
id: iot
title: "how do i connect to UNSW-IoT?"
aliases: []
tags: []
authors:
  - l1mey112
  - isobelmcrae
layout: base.njk
---

*(Want to connect to eduroam instead? See [/eduroam](/eduroam))*

If you don't want to use eduroam, UNSW-IoT is another option. You may want to do this if you are not interested in `aqc4all`, or don't want to use the deprecated method of connecting to eduroam.

The issues with iot that you may have patchy reception in some buildings (e.g. Keith Burrows), and that iot isn't officially supported for personal devices.

![Connction to UNSW-IoT on i3status bar](/assets/UNSW-IoT-connection.png)

The way UNSW-IoT works is that you put down your MAC address in an online portal and they provide you a password to connect with. **This will not work with setups and operating systems that randomise your MAC address, so ensure you disable these settings :)**

See the bottom of the document at [#acquire-your-macv4-address](#acquire-your-macv4-address) to get your MACv4 address, it should look like the string `XX:XX:XX:XX:XX:XX` where each `XX` are hex bytes.

1. **Go here** [https://www.unsw.edu.au/myit/services/wifi-network/connecting-to-the-unsw-network/get-online/internet-of-things-device](https://www.unsw.edu.au/myit/services/wifi-network/connecting-to-the-unsw-network/get-online/internet-of-things-device) - Click **Get online →**

2. **You'll a page simlar to the image below.**

3. Type in your MAC address, click create, and you're done!

4. **Connect to UNSW-IoT using the password they provide to you**, like `iwctl station wlan0 connect UNSW-IoT` or `nmcli device wifi --ask connect UNSW-IoT`.

![Create new UNSW-IoT device portal](/assets/UNSW-IoT-create-new-device.png)

## Acquire your MACv4 address

### Use ip addr or /proc

Run

```sh
ip addr
```

and extract out the `XX:XX:XX:XX:XX:XX` for the thing that isn't the loopback, so in my case `wlan0`. It's censored yellow but you'll know it when you see it.

![Display of ip addr](/assets/UNSW-IoT-ipaddr.png)

Otherwise, you can use proc filesystem

```sh
cat /sys/class/net/wlan0/address
# XX:XX:XX:XX:XX:XX
```

### iwctl?

```sh
# if you are __ALREADY__ connected to some wifi network
# substitute wlan0 with whatever network interface you have
iwctl station wlan0 show
#
#            ....
#            Connected network     ???
#            IPv4 address          ??.??.??.??
#            ConnectedBss          XX:XX:XX:XX:XX:XX
#            ....
#            ....
#            ....
```
