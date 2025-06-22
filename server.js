const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

const TOKEN = '7659527251:AAGtq42L13HhF8Qe-qhf7D1r-1Dn1UPyzKg';
const CHAT_ID = '2007196280';

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/send', async (req, res) => {
  const { name, phone, message } = req.body;

  const text = `📬 <b>Нове повідомлення з сайту</b>\n👤 <b>Ім’я:</b> ${name}\n📞 <b>Телефон:</b> ${phone}\n📝 <b>Повідомлення:</b> ${message}`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: 'HTML'
      })
    });
    const data = await response.json();
    if (data.ok) {
      res.json({ success: true });
    } else {
      res.json({ success: false, error: data.description });
    }
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => console.log(`Сервер запущено на порті ${PORT}`));