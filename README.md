## Prerequisites - Install Apache Pig

    get http://mirrors.whoishostingthis.com/apache/pig/latest/pig-0.15.0.tar.gz
    sudo tar -xvf pig-0.15.0.tar.gz -C /opt
    sudo chown -R ubuntu:ubuntu /opt/pig-0.15.0

## Running Pig script

    $ bin/run.sh

Check `output/` for results.

Note existing results must be deleted, otherwise use `DUMP myOutput;` instead of `STORE` to view output in stdout.
