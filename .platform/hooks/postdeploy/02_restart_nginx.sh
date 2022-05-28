#!/bin/bash
sudo rm -rf /etc/letsencrypt
sudo cp -r /data/letsencrypt /etc

sudo cp /data/nginx.conf /etc/nginx

sudo systemctl reload nginx