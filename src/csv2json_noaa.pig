--Author: Ciaran Courtney
--Email: ciaran.courtney4@mail.dcu.ie
--Student #: 15211695

--MDSF,Measurement Flag,Quality Flag,Source Flag,Time of Observation,DASF,Measurement Flag,Quality Flag,Source Flag,Time of Observation,SNWD,Measurement Flag,Quality Flag,Source Flag,Time of Observation,SNOW,Measurement Flag,Quality Flag,Source Flag,Time of Observation
-- Load text input by regex'ing the variable spaces between charactors
myInput = LOAD 'data/2006_1sthalf.csv' USING PigStorage(',') AS (STATION:chararray,STATION_NAME:chararray,ELEVATION:float,lat:float,lon:float,date:chararray);

-- Concatenate the YYYYMMDD date into an ISO standard date format (yyyy-mm-dd)
myOutput = FOREACH myInput GENERATE STATION_NAME,
CONCAT(SUBSTRING(date, 0, 4), CONCAT('-',CONCAT(SUBSTRING(date, 4, 6),CONCAT('-',SUBSTRING(date, 6, 8))))) AS date, lon, lat, ELEVATION;

-- Limit output to 500 records for performance
limitSortedInput = LIMIT myOutput 500;

-- Group all results into an array 'myOutputGroup'
myOutputGroup = GROUP limitSortedInput ALL;

-- Store ouput as a JSON array
STORE myOutputGroup INTO 'www/output_json' USING JsonStorage();
