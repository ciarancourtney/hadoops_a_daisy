## Prerequisites - Install Apache Pig

    wget http://mirrors.whoishostingthis.com/apache/pig/latest/pig-0.15.0.tar.gz
    sudo tar -xvf pig-0.15.0.tar.gz -C /opt
    sudo chown -R ubuntu:ubuntu /opt/pig-0.15.0

Assumptions:

1. Default user is 'ubuntu'
2. OS is Debian based Linux (ubuntu, debian etc)
2. Project is git cloned to /home/ubuntu/hadoops_a_daisy

    cd /home/ubuntu/
    git clone https://github.com/ciarancourtney/hadoops_a_daisy.git

3. No existing nginx server is running locally

## Running Pig script

    $ bin/run_csv2json.sh

Check `www/output_json` for results.

## Deploying web server

    $ bin/deploy_nginx.sh

This script will install nginx and copy a conf file to nginx's conf. The web site should then
by available at http://localhost/

## Installing Apache Spark

    $ bin/install_spark.sh

This script will extract the spark 1.6 binary to /opt

## Executing spark script

    $ bin/run_spark.sh

This will process the json object generated by pig into another json object for tm.js

## Public Demo

Visit http://52.49.131.157/ to view a live demo of the project


### References

Timemap and Timeline Javascript libraries
http://nickrabinowitz.com/portfolio/timemap-js/

https://pig.apache.org/

http://spark.apache.org/

https://www.nginx.com/resources/wiki/

Other languages used:
Python, javascript, html, php, shell scripting, PIG latin, Spark SQL
