/*
input example: 
const inputStr = 
`MOV R1, 5
ADD R1, 3
JMP 0`
;
//output example: 

const program = [
  { instruction: 'MOV', args: ['R1', '5'] },
  { instruction: 'ADD', args: ['R1', '3'] },
  { instruction: 'JMP', args: ['0'] }, 
];
*/

//program.length is how long the program is
//this should parse out the above array from strings
//we can split on "\n" :D
//doing it this way makes it easy to use the IP as an index for what instruction we are on
