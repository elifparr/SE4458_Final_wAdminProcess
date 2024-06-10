const express = require('express');
const router = express.Router();
const Room = require('../models/Room'); // Room modelini ekliyoruz

// Rezervasyon yapma endpoint'i
router.post('/', async (req, res) => {
    const { hotelId, roomId, startDate, endDate, guests } = req.body;

    if (!hotelId || !roomId || !startDate || !endDate || !guests) {
        return res.status(400).send('Tüm alanlar gereklidir');
    }

    try {
        // Oda bilgilerini bul
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).send('Oda bulunamadı');
        }

        // Oda dolu olarak işaretleniyor
        room.status = 'Dolu';
        await room.save();

        res.status(200).send({ message: 'Rezervasyon başarılı', room });
    } catch (error) {
        console.error('Rezervasyon hatası:', error);
        res.status(500).send('Rezervasyon yapılamadı');
    }
});

module.exports = router;
