#!/usr/bin/env bash

echo "Installing nginx"
sudo apt-get update -yqq
sudo apt-get install -yqq nginx

echo "Adding timemap config to nginx"
sudo rm /etc/nginx/sites-enabled/default
sudo cp conf/timemap.conf /etc/nginx/conf.d/

echo "Reloading nginx"
sudo service nginx reload

echo "Visit http://localhost to view timemap website"