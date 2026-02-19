---
id: eduroam
title: "how do i connect to eduroam on $distro?"
aliases: []
tags: []
authors:
  - isobelmcrae
layout: base.njk
---

*(Want to connect to UNSW-IoT instead? See [/iot](/iot))*

> [!WARNING]
> This is (predominately) a guide for a tool not written/managed by the Linux Society. Please use your own best judgement when using third party tools which handle your UNSW credentials. You use third party tools at your own risk and we are not responsible for any damage arising from your use of them.

**TLDR: try [arubaquickconnect4all](https://github.com/alzer89/ArubaQuickConnect4All)**

Eduroam at UNSW is an Aruba-managed wireless network, meaning that it only officially supports Ubuntu. If you are looking to connect on a distro other than Ubuntu, an option is [arubaquickconnect4all](https://github.com/alzer89/ArubaQuickConnect4All).
By doing so, you (may) get higher speeds compared to using UNSW-IoT :)

All the following steps assume you have cloned the repo already (see steps on Github).

## Running with Geckodriver (Firefox):

Geckodriver seems to work better than Chromedriver. Install it via your distro's package manager, or find it [here](https://github.com/mozilla/geckodriver/releases).

```sh
pip install .
aqc4all --browser firefox
```

## What is the 'onboarding portal URL'?

1. Go here: [UNSW Get Online](https://www.unsw.edu.au/myit/services/wifi-network/connecting-to-the-unsw-network/get-online/standard-unsw-linux-device)
2. Click 'Get Online'
3. Accept the terms and conditions
4. Select 'personal device'
5. The onboarding portal link is the page's domain

An example is if we have a site such as https://linsoc.cc/join, the domain part you would provide would be https://linsoc.cc.

## 'This environment is externally managed' when I run `pip install`

Create a virtual environment first/use `uv`.

```sh
python -m venv venv
source venv/bin/activate
pip install .
```

if you have `uv`, just run `uv run aqc4all`

## ‘None not found’ when I run the `acq4all`

You are missing either Chromedriver or Geckodriver. Install this via your distro's package manager. If you choose Geckodriver, make sure you use the `--browser firefox` flag.

## I don't want to use `aqc4all`!

>[!WARNING]
> Please note that the below is a temporary solution which may stop working at any time. The following also **stores your UNSW password in plaintext.**

```sh
 nmcli connection edit
 # type wifi in to make a new wifi connection

    set connection.id yourConnectionName

    set wifi.ssid eduroam

    set 802-1x.eap peap

    set 802-1x.phase2-auth mschapv2

    set 802-1x.identity zID@ad.unsw.edu.au

    set 802-1x.password yourPassword

    set wifi-sec.key-mgmt wpa-eap

    save

    activate

    quit # if you want to leave

```

## Have an issue not found here?

Find us in the [Linux Society Discord](https://linsoc.cc/discord) and we can help with troubleshooting :) This guide is also a work in progress! Please give us feedback <3
