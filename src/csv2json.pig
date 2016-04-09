--Author: Ciaran Courtney
--Email: ciaran.courtney4@mail.dcu.ie
--Student #: 15211695


-- Load text input by regex'ing the variable spaces between charactors
myInput = LOAD 'data/2016.tmin'
            USING org.apache.pig.piggybank.storage.MyRegExLoader(
  '(\\S+)\\s+(\\S+)\\s+(\\S+)\\s+(\\S+)\\s+(\\S+)\\s+(\\S+)') AS (month:chararray,day:chararray,id:int,lon:float,lat:float,temp:float);

-- Concatenate the month and date into an ISO standard date format (yyyy-mm-dd)
myOutput = FOREACH myInput GENERATE id, CONCAT('2016-',CONCAT(month,CONCAT('-',day))) AS date,lon,lat,temp AS z;

-- Sort output by desc z
sortedOutput = ORDER myOutput BY z DESC;

-- Limit output to 5000 records for performance
limitSortedInput = LIMIT sortedOutput 500;

-- Group all results into an array 'myOutputGroup'
myOutputGroup = GROUP limitSortedInput ALL;

-- Store ouput as a JSON array
STORE myOutputGroup INTO 'www/output_json' USING JsonStorage();
