#!/usr/bin/env bash

# Delete previous output otherwise pig will complain
rm -r www/output_json

/opt/pig-0.15.0/bin/pig -x local src/csv2json_noaa.pig
