//express webpack默认带了一个express框架
let express = require('express');
let app = express();
app.get('/api/user', (req, res) => {
    res.json({ name: 'winney' });
});

app.listen(9999);