#!/usr/bin/env bash

echo "Installing nginx"
sudo apt-get update
sudo apt-get install nginx

echo "Adding timemap config to nginx"
sudo cp conf/timemap.conf /etc/nginx/conf.d/

echo "Reloading nginx"
sudo service nginx reload

echo "Visit http://localhost to view timemap website"