--Author: Ciaran Courtney
--Email: ciaran.courtney4@mail.dcu.ie
--Student #: 15211695

--MDSF,Measurement Flag,Quality Flag,Source Flag,Time of Observation,DASF,Measurement Flag,Quality Flag,Source Flag,Time of Observation,SNWD,Measurement Flag,Quality Flag,Source Flag,Time of Observation,SNOW,Measurement Flag,Quality Flag,Source Flag,Time of Observation
-- Load text input by regex'ing the variable spaces between charactors
myInput = LOAD 'data/*.csv' USING PigStorage(',') AS (STATION:chararray,STATION_NAME:chararray,ELEVATION:float,lat:float,lon:float,date:chararray,
MDSF:int,MDSF_Measurement_Flag:chararray,MDSF_Quality_Flag:chararray,MDSF_Source_Flag:chararray,MDSF_Time_of_Observation:chararray,
DASF:int,DASF_Measurement_Flag:chararray,DASF_Quality_Flag:chararray,DASF_Source_Flag:chararray,DASF_Time_of_Observation:chararray,
SNWD:int,SNWD_Measurement_Flag:chararray,SNWD_Quality_Flag:chararray,SNWD_Source_Flag:chararray,SNWD_Time_of_Observation:chararray,
SNOW:int,SNOW_Measurement_Flag:chararray,SNOW_Quality_Flag:chararray,SNOW_Source_Flag:chararray,SNOW_Time_of_Observation:chararray);

-- Concatenate the YYYYMMDD date into an ISO standard date format (yyyy-mm-dd)
myOutput = FOREACH myInput GENERATE STATION, STATION_NAME,
CONCAT(SUBSTRING(date, 0, 4), CONCAT('-',CONCAT(SUBSTRING(date, 4, 6),CONCAT('-',SUBSTRING(date, 6, 8))))) AS date, lon, lat, ELEVATION, $21, $25;

limitSortedInput = FILTER myOutput BY SNOW != 9999 AND SNOW != -9999 AND SNOW != 0 AND SNOW > 100 AND ELEVATION > 1800;
--limitSortedInput = LIMIT filtered 1000;
dump limitSortedInput;

---- Limit output to 500 records for performance
--limitSortedInput = LIMIT myOutput 500;
--
---- Group all results into an array 'myOutputGroup'
myOutputGroup = GROUP limitSortedInput ALL;
--
---- Store ouput as a JSON array
STORE myOutputGroup INTO 'www/output_json' USING JsonStorage();
