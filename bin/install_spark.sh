#!/usr/bin/env bash

echo "Downloading and installing apache apark for hadoop 2.6+"
wget http://d3kbcqa49mib13.cloudfront.net/spark-1.6.1-bin-hadoop2.6.tgz -P /tmp/
sudo tar -xvf /tmp/spark-1.6.1-bin-hadoop2.6.tgz -C /opt
