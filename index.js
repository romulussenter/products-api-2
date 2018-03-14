const express = require('express');
const serverApp = express();

const PORT = process.env.PORT || 5000; // necessary for huroku deployment

serverApp.get('/', (req, res) => {
     res.send('hello i work!!');
});

serverApp.listen(PORT, () => {
    console.log(`now listening on port ${PORT}` );
});