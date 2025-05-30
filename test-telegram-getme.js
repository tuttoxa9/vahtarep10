import dotenv from 'dotenv';

// Загружаем переменные из .env.local
dotenv.config({ path: '.env.local' });

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

async function testTelegramBot() {
  try {
    console.log('📱 Проверяем информацию о боте...');
    
    // Получаем информацию о боте
    const getMeResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`);
    const getMeResult = await getMeResponse.json();
    
    if (getMeResponse.ok) {
      console.log('✅ Бот найден:');
      console.log('- Username:', getMeResult.result.username);
      console.log('- First Name:', getMeResult.result.first_name);
      console.log('- ID:', getMeResult.result.id);
    } else {
      console.error('❌ Ошибка получения информации о боте:', getMeResult);
      return;
    }
    
    // Получаем обновления (последние сообщения)
    console.log('\n📝 Получаем последние обновления...');
    const getUpdatesResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`);
    const getUpdatesResult = await getUpdatesResponse.json();
    
    if (getUpdatesResponse.ok && getUpdatesResult.result.length > 0) {
      console.log('✅ Найдены чаты:');
      const chats = new Set();
      getUpdatesResult.result.forEach(update => {
        if (update.message && update.message.chat) {
          const chat = update.message.chat;
          chats.add(JSON.stringify({
            id: chat.id,
            type: chat.type,
            title: chat.title,
            username: chat.username,
            first_name: chat.first_name
          }));
        }
      });
      
      Array.from(chats).forEach(chatStr => {
        const chat = JSON.parse(chatStr);
        console.log(`- Chat ID: ${chat.id}, Type: ${chat.type}, Name: ${chat.title || chat.first_name || chat.username}`);
      });
    } else {
      console.log('ℹ️ Нет обновлений или бот не получал сообщений');
      console.log('💡 Отправьте команду /start боту, чтобы получить Chat ID');
    }
    
  } catch (error) {
    console.error('❌ Ошибка при тестировании бота:', error);
  }
}

testTelegramBot();