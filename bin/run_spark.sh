#!/usr/bin/env bash

# Delete previous output otherwise spark will complain
rm -r www/output_json_spark

ve/bin/python src/spark_sql.py
