const moment= require ('moment');


const sec= new Date().getTime()
const date= moment(1234);
console.log(date.format('MMMM Do YYYY, h:mm:ss a'));
