#!/bin/bash
if [ ! -d "/etc/letsencrypt" ]
then
  sudo wget -r --no-parent -A 'epel-release-*.rpm' https://dl.fedoraproject.org/pub/epel/7/x86_64/Packages/e/
  sudo rpm -Uvh dl.fedoraproject.org/pub/epel/7/x86_64/Packages/e/epel-release-*.rpm
  sudo yum-config-manager --enable epel*
  sudo amazon-linux-extras install epel -y
  
  sudo yum install -y certbot python2-certbot-nginx
fi