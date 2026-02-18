---
id: eduroam
title: "how do i connect to eduroam?"
aliases: []
tags: []
layout: base.njk
---

# how do i connect to eduroam on \<distro\>?

**⚠️ disclaimer: ⚠️ this is (predominately) a guide for a tool not written/managed by the linux society. please use your own best judgement when using third party tools which handle your unsw credentials. you use third party tools at your own risk and we are not responsible for any damage arising from your use of them.**

**tldr: try [arubaquickconnect4all](https://github.com/alzer89/ArubaQuickConnect4All)**

eduroam at unsw is an aruba-managed wireless network, meaning that it only officially supports ubuntu. if you are looking to connect on a distro other than ubuntu, an option is [arubaquickconnect4all](https://github.com/alzer89/ArubaQuickConnect4All). 
by doing so, you will get higher speeds compared to using unsw-iot :)

all the following steps assume you have cloned the repo already (see steps on github).

## running with geckodriver (firefox):

geckodriver seems to work better than chromedriver. install it via your distro's package manager.

```sh
pip install .
aqc4all --browser firefox
```

## what is the 'onboarding portal url'

1. go here: [unsw get online](https://www.unsw.edu.au/myit/services/wifi-network/connecting-to-the-unsw-network/get-online/standard-unsw-linux-device)
2. click get online
3. accept the terms and conditions
4. select 'personal device'
5. the onboarding portal link is the page's domain

an example is if we have a site such as https://linsoc.cc/join, the domain part you would provide would be https://linsoc.cc.

## 'this environment is externally managed' when i run `pip install`

create a virtual environment first/use uv.

```sh
python -m venv venv
source venv/bin/activate
pip install .
```

if you have uv, just run `uv run aqc4all`

## 'none not found' when i run the program

you are missing either chromedriver or geckodriver. install this via your distro's package manager. if you choose geckodriver, make sure you use the `--browser firefox` flag.

## i don't want to use aqc4all!

please note that the below is a temporary solution which may stop working at any time.

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

# (note: password is like written in plaintext so dont show anyone :3)

```

## have an issue not found here?

find us in the [linux society discord](https://linsoc.cc/discord) and we can help with troubleshooting :) this guide is also a work in progress! please give us feedback <3
