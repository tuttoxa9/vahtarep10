import dotenv from 'dotenv';

// Загружаем переменные из .env.local
dotenv.config({ path: '.env.local' });

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function testTelegramAPI() {
  try {
    console.log('📱 Тестируем Telegram API...');
    console.log('Bot Token:', TELEGRAM_BOT_TOKEN ? 'Настроен' : 'Не настроен');
    console.log('Chat ID:', TELEGRAM_CHAT_ID);
    
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('❌ Telegram credentials не настроены');
      return;
    }
    
    const testMessage = `🧪 *Тест подключения VahtaRep9*\n\nДата: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}\n\n✅ Система готова к приему заявок!`;
    
    // Отправляем тестовое сообщение
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: testMessage,
        parse_mode: 'Markdown',
      }),
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Тестовое сообщение отправлено в Telegram!');
      console.log('Message ID:', result.result.message_id);
    } else {
      console.error('❌ Ошибка отправки в Telegram:', result);
    }
  } catch (error) {
    console.error('❌ Ошибка при тестировании Telegram API:', error);
  }
}

testTelegramAPI();