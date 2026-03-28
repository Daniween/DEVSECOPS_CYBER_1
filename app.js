const express = require('express');
const app = express();
const userRoutes = require('./routes/user');

app.use(express.json());
app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.send('TEST SVJ');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening ${PORT}`));
