var ar:Date[] = [];
var d:Date;

d = new Date();
ar.push(new Date(d.valueOf()));

d.setMonth(0);
ar.push(d);

console.log(ar);
