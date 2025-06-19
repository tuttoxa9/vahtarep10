const https = require('http');

const data = JSON.stringify({
  vacancyId: "test-vacancy-123",
  applicantName: "Тест Тестов",
  applicantPhone: "+7 900 123-45-67",
  applicantEmail: "test@example.com",
  message: "Хочу работать у вас"
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/submit-application',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = https.request(options, (res) => {
  let responseData = '';
  
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    console.log('Response Status:', res.statusCode);
    console.log('Response Data:', responseData);
    try {
      const parsed = JSON.parse(responseData);
      console.log('Parsed Response:', JSON.stringify(parsed, null, 2));
    } catch (e) {
      console.log('Could not parse JSON response');
    }
  });
});

req.on('error', (error) => {
  console.error('Request error:', error);
});

req.write(data);
req.end();

console.log('Sending request to submit application API...');