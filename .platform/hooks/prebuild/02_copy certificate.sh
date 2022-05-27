#!/bin/bash
if [ -d "/data/letsencrypt" ]
then
  sudo rm -r /etc/letsencrypt
  sudo rm -r /etc/nginx

  sudo cp -r /data/letsencrypt /etc
  sudo cp -r /data/nginx /etc
fi