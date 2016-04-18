#!/opt/spark-1.6.1-bin-hadoop2.6/bin/pyspark

import os
import sys

pwd = os.getcwd()

# Path for spark source folder
os.environ['SPARK_HOME'] = "/opt/spark-1.6.1-bin-hadoop2.6"

# Append pyspark to Python Path
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

    if len(sys.argv) < 2:
        path = "file://" + os.path.join(pwd, "../data/2006_1sthalf.csv")
        #path = "file://home/ubuntu/hadoops_a_daisy/data/2006_1sthalf.csv"
    else:
        path = sys.argv[1]

    # Create a DataFrame from the file(s) pointed to by path
    payload = sqlContext.jsonFile(path)

    payload.printSchema()

    # Register this DataFrame as a table.
    payload.registerAsTable("snow")

    # SQL statements can be run by using the sql methods provided by sqlContext
    much_snow = sqlContext.sql("SELECT * FROM limitSortedInput WHERE SNOW >= 100")

    for each in much_snow.collect():
        print(each[0])

    sc.stop()
