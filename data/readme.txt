02/23/2007

Introduction:

The GHCND gridded dataset (HadGHCND) is produced through a joint effort between
the United States National Oceanic and Atmospheric Administration (National
Climatic Data Center) and the United Kingdom's Hadley Centre.

*******************************************************************************

Quick Start:

HadGHCND is output into annual maximum temperature anomaly and annual minimum
temperature anomaly files.  The anomalies were calculated with respect to the
following base period: 1961 to 1990.  The format for the output files consists
of 6 columns of data as follows:

1st column: Month
2nd column: Day
3rd column: Grid box ID (value range: 1 to 7002, grid spacing = 3.75 deg x 2.5 deg)
4th column: Longitude of lower left corner of grid box (degrees)
5th column: Latitude of lower left corner of grid box (degrees)
6th column: Temperature anomaly (whole degrees Celsius)

HadGHCND may be downloaded at:

ftp://ftp.ncdc.noaa.gov/pub/data/ghcn/daily/grid

and two options are available:

1) download the entire data set as a single file (ghcnd.grid.tar.gz), or

2) download by year/element (see the "years" sub-directory)

*******************************************************************************

Reference:

Caesar, J., L. Alexander, and R. Vose (2006), Large-scale changes in observed
daily maximum and minimum temperatures: Creation and analysis of a new gridded i
data set, J. Geophys. Res., 111, D05101, doi:10.1029/2005JD006280.