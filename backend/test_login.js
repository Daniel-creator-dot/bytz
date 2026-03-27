async function testLogin() {
  try {
    const response = await fetch('https://bytzapi.onrender.com/api/admins/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@bytz.com', password: 'admin123' })
    });
    const result = await response.json();
    console.log('LOGIN_RESULT:' + JSON.stringify(result));
    process.exit(result.success ? 0 : 1);
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
}
testLogin();
