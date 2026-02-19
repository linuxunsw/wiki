---
id: wifi
title: "Connecting to UNSW wifi"
aliases: []
tags: []
authors:
  - cyuria
layout: base.njk
---

## Current Options

There are currently three different options for connecting to UNSW's WiFi
network.
- [Modern eduroam](#modern-eduroam)
- [The IoT network](#iot)
- [Legacy eduroam](#legacy-eduroam)

### Modern Eduroam

_Read the [full article](/eduroam)_

This is the most compatible with the officially supported methods. This method
involves creating an X.509 TLS certificate and connecting to the network over
EAP-TLS.

Someone unaffiliated with the Linux Society reverse engineered the certificate
distribution system and uploaded a python script (dubbed `aqc4all`) which does
this online. The script automates downloading the necessary one time token,
generating the necessary X.509 certificates, supplying them to UNSW and
installing them on your system. The script also includes built-in
configurations for a variety of common wireless backends such as
NetworkManager.

Some people have expressed concerns about the security of specifying a custom
root CA certificate and the difficulty of setting up modern eduroam.

The modern eduroam script (aqc4all) claims to support Linux, \*BSD and others.

### IoT

_Read the [full article](/iot)_

Another popular option for connecting to eduroam is to set up your device as an
IoT (Internet of Things) device. This requires you to disable MAC address
randomisation if you have it enabled.

The IoT network is a separate network to eduroam, which can only be found on
UNSW campus. It has the SSID of `UNSW-IoT` and uses WPA2 PSK. The password is
randomly generated and assigned to your given MAC address from a dashboard for
managing IoT devices, thus each IoT device has its own password.

Some users of the IoT network claim it has similar network speeds to eduroam,
while some users of eduroam claim the IoT network is slower. No formal testing
has been performed however.

If you have a particularly obscure or dysfunctional device that cannot connect
via EAP-TLS or for various reasons you are unable or unwilling to generate the
requisite X.509 certificate for eduroam, you may find it easier to connect as
an IoT device.

### Legacy Eduroam

>[!WARNING]
> This connection method has known security issues.

_Read the [full section](/eduroam#i-dont-want-to-use-aqc4all)_

This is an old method of connecting to eduroam with NetworkManager. This method
is now outdated. It requires some manual configuration and uses password based
authentication. With this kind of configuration, the password usually ends up
stored in plaintext in the network configuration file.

Some people have found success with this method, but it shouldn't be relied
upon as it is no longer supported and may be removed at any time.

## Background

In 2024 UNSW migrated their WiFi to a new network, managed externally by HPE
Aruba. This new network requires students (and staff) to connect via a newer
protocol called EAP-TLS[^1].

This is a definitive upgrade because the old system used PEAP-MSCHAPv2, which
has a number of known security issues[^2]. Just as an example, it uses MD4
checksums, which have been broken since 1995.

Because the new UNSW network is managed externally by HPE Aruba, it suffers all
the consequences of poorly designed enterprise software. HPE Aruba is primarily
designed to support organisations with IT managed devices, unlike UNSW which
has a liberal bring-your-own-device policy. This means the support for Linux
systems begins and ends at a specific version of Ubuntu.

During the transitional period to the new network, a few members of the Linux
Society spent multiple hours going through the official IT channels to attempt
to find a solution. Eventually it was proposed to connect to the IoT network as
an IoT device. This would enable *some* kind of connectivity, at least
temporarily, even if it wasn't an ideal solution.

Around this time, a GitHub repository surfaced, claiming to offer connectivity
to Aruba Quick Connect wireless networks (the exact kind of network UNSW now
uses). There were however a couple of issues with the repository, including its
unfortunate lack of documentation, ensuring the few attempts to connect through
this new open source tool failed.

For the next short while, connecting to the IoT network was the most widely
recommended option internally among Linux Society members.

The next serious change was when a couple of those members were introduced to
the author of the aforementioned GitHub repository, who generously walked them
through the process step-by-step. This guidance enabled several core members,
including society executives, to connect to eduroam instead of the IoT network.

Later on, after this process was described to multiple people on multiple
occasions, [Isobel](https://github.com/isobelmcrae) decided it would probably
be a good idea to write it all down, leading to the initial creation of [how do
i connect to eduroam on \<distro\>?](/eduroam) and similar page on the [IoT
network](/iot), with this page itself following shortly after.

[^1]: [EAP-TLS - Wikipedia](https://en.wikipedia.org/wiki/Extensible_Authentication_Protocol#EAP_Transport_Layer_Security_(EAP-TLS))

[^2]: [2024 Security Analysis of PEAP-MSCHAPv2](https://www.securew2.com/blog/security-analysis-of-peap-mschapv2)
