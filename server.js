const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

mongoose.connect('mongodb://admin:pass@localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

const UserInfoSchema = new mongoose.Schema({
  name: String,
  email: String
});

const UserInfo = mongoose.model('UserInfo', UserInfoSchema);

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.post('/users', async (req, res) => {
  try {
    const userInfo = await UserInfo.create(req.body);
    res.json(userInfo);
  } catch (err) {
    console.error('Error creating user info:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log('Server is listening on port ' + PORT);
});
