const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/login', async (req, res) => {
    console.log('Giriş isteği alındı:', req.body);

    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        console.log('Kullanıcı bulunamadı:', username);
        return res.status(400).send('Geçersiz kullanıcı adı veya şifre');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        console.log('Şifre eşleşmiyor:', username);
        return res.status(400).send('Geçersiz kullanıcı adı veya şifre');
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, 'secretkey', { expiresIn: '1h' });
    console.log('Giriş başarılı, token oluşturuldu:', token);

    res.send({ token, role: user.role });
});

module.exports = router;
