--Author: Ciaran Courtney
--Email: ciaran.courtney4@mail.dcu.ie
--Student #: 15211695


-- Load text input by regex'ing the variable spaces between charactors
myInput = LOAD 'data/2016.tmin'
            USING org.apache.pig.piggybank.storage.MyRegExLoader(
  '(\\S+)\\s+(\\S+)\\s+(\\S+)\\s+(\\S+)\\s+(\\S+)\\s+(\\S+)') AS (month:chararray,day:chararray,id:int,lon:float,lat:float,temp:float);

-- Concatenate the month and date into an ISO standard date format (yyyy-mm-dd)
myOutput = FOREACH myInput GENERATE CONCAT('2016-',CONCAT(month,CONCAT('-',day))),lon,lat,temp;

-- Store ouput in CSV format
STORE myOutput INTO 'output/2016.tmin/' USING PigStorage(',');
