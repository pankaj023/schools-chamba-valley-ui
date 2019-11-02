const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist/schools-chamba-valley'));
app.listen(3000);

//PATH LOCATION STARTEGY

app.get('/*', function(req,res){
  const fullPath = path.join(__dirname + '/dist/schools-chamba-valley/index.html');
  console.log(" Fetching from.." + fullPath);
	res.sendFile(fullPath);
})

console.log('Server started running on..' + 3000);

//Changed to run on Heroku