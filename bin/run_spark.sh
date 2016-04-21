#!/usr/bin/env bash

#Set working directory - This is important as www_data will execute from www directory by default
echo "Updating Working Directory..."
cd /home/ubuntu/hadoops_a_daisy

#www_data will not have JAVA_HOME set by default, therefore if it is not auto set we need to updat it
if [ -n "$JAVA_HOME" ]; then
    echo JAVA_HOME ALREADY SET TO:
    echo $JAVA_HOME
else
    echo  JAVA_HOME NOT SET, UPDATED TO:
    export JAVA_HOME=/usr/lib/jvm/java-8-oracle
fi

# Delete previous output otherwise spark will complain
rm www/output_json_spark/output.json

#Execute pig Script
echo "Executing Pig Script..."
ve/bin/python src/spark_sql.py
