---
id: iot
title: "how do i connect to UNSW-IoT?"
aliases: []
tags: []
authors:
  - l1mey112
layout: base.njk
---

(Want to connect to eduroam instead? See [/eduroam](/eduroam))

## How do I connect to UNSW-IoT on anything?


Take it from me you do NOT want to use Eduroam if you want to get (probably) MITMed. In my experience using IoT has given me zero issues, it's just as fast and doesn't get in your way. The only issue is that in certain locations (~3 locations out of 10000000000s) like Keith Burrows the reception is slightly patchy.

![Connction to UNSW-IoT on i3status bar](/assets/UNSW-IoT-connection.png)

The way UNSW-IoT works is that you put down your MAC address in an online portal and just connect. **This will not work with setups and operating systems that randomise your MAC address (iOS, Mac), but Linux has nothing so this is unlikely.**

<div>

---

---


</div>

See the bottom of the document at [#acquire-your-macv4-address](#acquire-your-macv4-address) to get your MACv4 address, it should look like the string `XX:XX:XX:XX:XX:XX` where each `XX` are hex bytes.

1. **Go here** [https://www.unsw.edu.au/myit/services/wifi-network/connecting-to-the-unsw-network/get-online/internet-of-things-device](https://www.unsw.edu.au/myit/services/wifi-network/connecting-to-the-unsw-network/get-online/internet-of-things-device) - Click **Get online →**

2. **You'll get to here** [https://onboard-portal.it.unsw.edu.au/guest/mac_create.php](https://onboard-portal.it.unsw.edu.au/guest/mac_create.php) (See image)

3. Type in your MAC address, click create, and you're done!

4. **Connect to UNSW-IoT**, like `iwctl station wlan0 connect UNSW-IoT`.

![Create new UNSW-IoT device portal](/assets/UNSW-IoT-create-new-device.png)




<div>

---

---


</div>


## Acquire your MACv4 address

**Disclaimer. There is probably a much easier way to do this with NetworkManager, Gnome, KDE have their own facilities but I don't use those.**

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

## iwctl?

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


