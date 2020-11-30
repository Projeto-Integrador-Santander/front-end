const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/frontend'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://educanjos-v1.herokuapp.com')
    res.setHeader('Access-Control-Allow-Methods', 'GET')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', 'https://educanjos-v1.herokuapp.com/*')
    next()
})

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/frontend/index.html'));
});


app.listen(process.env.PORT || 8080);