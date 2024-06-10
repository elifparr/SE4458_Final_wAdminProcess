const express = require('express');
const path = require('path');

const app = express();

// Statik dosyaları sunma
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Frontend server is running on port ${PORT}`);
});
