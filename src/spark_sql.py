#!/opt/spark-1.6.1-bin-hadoop2.6/bin/pyspark

"""

Refs:
pyspark import for pycharm debugging: http://renien.com/blog/accessing-pyspark-pycharm/

"""

import os
import sys
import json

os.environ['SPARK_HOME'] = "/opt/spark-1.6.1-bin-hadoop2.6"
sys.path.append("/opt/spark-1.6.1-bin-hadoop2.6/python")
sys.path.append("/opt/spark-1.6.1-bin-hadoop2.6/python/lib/py4j-0.9-src.zip")

try:
    from pyspark import SparkContext
    from pyspark import SparkConf
    from pyspark import SQLContext
    print ("Successfully imported Spark Modules")
except ImportError as e:
    print ("Can not import Spark Modules", e)
    sys.exit(1)


if __name__ == "__main__":
    sc = SparkContext(appName="PythonSQL")
    sqlContext = SQLContext(sc)

    with open('/home/ubuntu/hadoops_a_daisy/www/output_json/part-r-00000') as json_payload:
        data = json.load(json_payload)

    # Truncate to limitSortedInput object only
    ds = [json.dumps(item) for item in data['limitSortedInput']]
    dataframe = sqlContext.jsonRDD(sc.parallelize(ds))
    dataframe.printSchema()

    # Should print:
    #
    # root
    # |-- ELEVATION: double (nullable = true)
    # |-- SNOW: long (nullable = true)
    # |-- SNOW_Time_of_Observation: string (nullable = true)
    # |-- STATION: string (nullable = true)
    # |-- STATION_NAME: string (nullable = true)
    # |-- date: string (nullable = true)
    # |-- lat: double (nullable = true)
    # |-- lon: double (nullable = true)

    # Cache for iterative performance
    dataframe.cache()
    dataframe.registerTempTable("temp_table")

    # Query data using standard SQL
    spark_sql = sqlContext.sql("SELECT STATION_NAME, date, SNOW, ELEVATION, lat, lon FROM temp_table WHERE (lat BETWEEN 30 AND 45) AND (lon BETWEEN -130 AND -118)").collect()

    with open('/home/ubuntu/hadoops_a_daisy/www/output_json_spark/output.json', 'w') as outfile:
        json.dump(spark_sql, outfile)

    # Shutdown Spark and exit python
    sc.stop()
    raise SystemExit
