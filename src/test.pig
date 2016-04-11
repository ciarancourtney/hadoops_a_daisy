--Given the following Name Census data, represented in a CSV file below:
--
--Id, Name,    Year, Gender, State, Count
--12, Donald, 2000,  M,      AL,    155
--
--Write an appropriate Pig Script that will fulfil the requirements below:
--1. Count the number of distinct names between 2005 and 2010
--2. Give the percentage of each name for that state in that year for each year in the file
--3. Add the above column to the data, and write the data to a tab-separated file


myInput = LOAD '../data.csv' USING PigStorage(',') AS (Id:int,Name:chararray,Year:int,Gender:chararray,State:chararray,Count:int);

-- Filter to between 2005 & 2010 inclusive
filtered = FILTER myInput BY Year > 2004 AND Year < 2011;

dump filtered;

unique_users_group = GROUP filtered ALL;
uu_count = FOREACH unique_users_group {Name = filtered.Name; uniq = distinct Name; GENERATE COUNT(uniq);};
dump uu_count;

group by state






--names = FOREACH filtered GENERATE $1;
--uniq_names = DISTINCT $1;
--grouped_names = GROUP uniq_names ALL;
--uniq_name_count = FOREACH grouped_names GENERATE COUNT(uniq_names);
--DUMP uniq_name_count;
