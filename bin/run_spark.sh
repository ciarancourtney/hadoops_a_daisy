#!/usr/bin/env bash

# Delete previous output otherwise spark will complain
rm www/output_json_spark/output.json

ve/bin/python src/spark_sql.py
