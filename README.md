# HW#2 Comments and Code Separation
## Pathes to the files should be specified into configuration using "config" module
## Input file containing TS code and comments
### Assumed only comments of //
#### examples:
##### line with no comments - const abcd = 5;
##### line with comment only - //abcd is a variable of type number
##### line with code and comment const abcd = 5; //abcd is the variable with constant value 5
## Write application reading the input file and creating two output files
### Pathes of these files should be specified into configuration using "config" module
### First file should contain only code from the input file
### Second file should contain only comments from the input file
#### example 
##### input file contains the following
   //abcd is a varible of type number <br>
   let abcd: number; <br>
   const lmn = 5 //constant lmn contains value 5
##### output file with code
   let abcd: number;<br>
   const lmn = 5
##### output file with comments
   //abcd is a varible of type number <br>
   //constant lmn contains value 5



