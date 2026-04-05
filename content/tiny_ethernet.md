---
id: tiny_ethernet
title: "Tiny Networks with Ethernet"
aliases: []
tags: []
authors:
  - cyuria
layout: base.njk
---

Ethernet is a lovely tool commonly used to connect to the internet over a wired
connection. People often choose to use ethernet because it can improve
bandwidth and reduce latency. For embedded use cases, it also can reduce power
consumption and manufacturing costs. Also systems such as power over ethernet
can be utilised for further benefits.

Ethernet itself isn't synonymous with the internet protocol though. Instead
it's a standard for connecting a bunch of computers together on a shared
network.

From a physical perspective, every computer connected to the same ethernet
network is actually physically linked. That is, if you send a stream of data
over ethernet, every other connected computer will see that packet. A network
like this is referred to as a backplane (or rather the hardware that enables it
is).

The way computers decide whether a piece of data is meant for them is that each
ethernet packet contains an IP address, and a computer will "listen" for that
address. This is what lets tools like wireshark sniff local network traffic not
going to your computer.

One interesting problem here is how ethernet handles collisions. Several
alternative protocols have been proposed in order to solve this problem in a
smart way, however ethernet simply performs exponential backoff. If two
computers try to send at the same time, the cables are electrically connected,
so they can detect that. All they do then is wait a bit of time and try again.

# Connecting Two Computers

Most Linux based systems will have the [ip(8)] utility. `ip` is a low level
utility used for managing network devices, interfaces and tunnels. It allows us
to enable and disable devices such as the network card, as well as assign IP
addresses to our computer. If you are on FreeBSD for example, you will need to
find your own equivalent for these commands.

In the days of yonder there were two types of ethernet cables, regular cables
and crossover cables. These enabled the `rx` (receive) and `tx` (transmit)
lines to properly connect so that the `tx` line didn't connect to the `tx` line
on another computer. These days however, network cards are able to negotiate
which line becomes `rx` and which becomes `tx` through Auto–MDI-X, so crossover
cables are no longer required. If you have particularly old hardware, you
should check if you need a crossover cable or not (if you have a 64 bit
computer you probably don't need one).

With cable in hand, you can now simply connect any two computers directly by
plugging one end into one computer and the other end into the other computer.
If you prefer, you can also connect them through a network hub, or a device
that provides equivalent functionality, like a router or switch. Note that
network switches and some routers will likely require some configuration on
your end to get the switch to recognise your personally assigned IP addresses.

From there you need to decide what each computer's IP address should be. These
can really be anything you like, but probably don't pick an IP address already
in use by another device on a connected network. Choosing an address in the
private range is a good idea.

```sh
ip link show
ip addr show
ip route show
```

You might have multiple devices at which point you can also specify just one of
the devices. The examples here will use the modern device naming, but you may
have devices named something like `eth0` depending on your distribution.

```sh
ip link show enp1s0
ip addr show enp1s0
ip route show dev enp1s0
```

To add an IP address for a device you need to do two things, first tell the
device what it's IP address is, so it can listen for packets going to that
address, and second tell the other computer(s) which network device to send
outbound packets going to that address to.

```sh
# This computer
ip addr add dev enp1s0 10.0.0.1
# Other computer(s)
ip route add dev enp1s0 10.0.0.1
```

You then need to do this again for each other computer. Note that the order of
these commands doesn't matter, as long as they are all run on their respective
computers.

If you are unsure at any point, you can check what your current addresses and
routes are.
```sh
ip addr show
ip route show
```

Keep in mind that this process assigns temporary static IP addresses, which
means if you reboot you'll need to run these commands again. The IP addresses
are static in that they are fixed. You've chosen them. Normally dynamic IP
addresses are automatically assigned when connecting to a network, but in this
case neither of our two computers is set up to do dynamic assignment, so we are
manually assigning them instead.

Once you have successfully set up the addresses and routes, you can test the
connection in a variety of ways.
```sh
ping 10.0.0.2
ssh 10.0.0.2
```

# Transferring Data

This of course doesn't sound very useful by itself. What you can do with this
however is transfer arbitrary data. The obvious way here is using ssh, which of
course requires that you open up ssh access. Because we are on our own local
network however (the network consisting of a single cable between our two
computers), we don't actually need the encryption/tunneling functionality of
ssh. In fact we can just directly use `netcat`.

Here are some examples for file transfer, ripped directly from the [nmap
website][ncat file transfer].

```sh
nc --listen >mybigfile
nc --send-only 10.0.0.1 <mybigfile
```

```sh
nc --listen | tar xz
tar cz <files> | nc --send-only 10.0.0.1
```

To get this to work, you might need to open port 31337, which is netcat's
default port, for TCP connections in your firewall or use a different, already
open, port.

```sh
# Ubuntu
ufw allow 31337
# Red Hat
firewall-cmd --add-port=31337/tcp
# Arch, Debian
nft add rule inet filter input tcp dport 5123 ct state new,established accept
# Legacy
iptables -A INPUT -p tcp --dport 31337 -j ACCEPT
```

If you are using this for large data transfers, which you want at high speed,
it might make sense to manually call the compression program to get full
control, instead of the limited options available to `tar`'s builtin
compression support. Here we are using zstd level 10 compression.

```sh
nc --listen | zstd -d | tar x
tar c ... | zstd -z -10 | nc --send-only 10.0.0.1
```

You should choose the compression algorithm and level based on your specific
hardware, both your CPU and networking hardware. Most modern laptops and
motherboards have gigabit ethernet, which means at most 125 MB/s may be
transfered at once. If the only serious CPU workload you have is compression,
you can use a more powerful compression algorithm to improve your transfer
time. You can use a tool like [pv(1)] to view how fast your data transfer is
occuring. Another good resource on choosing compression algorithms is [Use Fast
Data Algorithms by Joey Lynch].

It is also important to note how compressible your data is. Plain text files
tend to compress fairly well. Piping data out from `/dev/random` won't lead to
very good compression results.

```sh
nc --listen | zstd -d | tar x
tar c ... | pv | zstd -z -10 | nc --send-only 10.0.0.1
```

Or if you want to measure the network throughput:

```sh
nc --listen | zstd -d | tar x
tar c ... | zstd -z -10 | pv -8k | nc --send-only 10.0.0.1
```

You can also similarly put pv on the receiver, or both.

If you want to use this type of data transfer on a network you don't fully
control, you will want to use ssh. Alternatively, the nmap project's version of
netcat provides support for encrypted connections with ssl, see [their
website][ncat ssl].

[ip(8)]: https://man.archlinux.org/man/ip.8
[ncat file transfer]: https://nmap.org/ncat/guide/ncat-file-transfer.html
[pv(1)]: https://man.archlinux.org/man/pv.1
[Use Fast Data Algorithms by Joey Lynch]: https://jolynch.github.io/posts/use_fast_data_algorithms/
[ncat ssl]: https://nmap.org/ncat/guide/ncat-ssl.html
