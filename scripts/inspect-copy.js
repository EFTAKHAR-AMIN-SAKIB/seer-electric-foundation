import https from 'https';

https.get('https://seer-henna.vercel.app/assets/index-DQUf3hN_.js', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Print lines containing descriptive text
    const paragraphs = data.match(/description:\s*"[^"]+"/g) || [];
    console.log('Descriptions:', paragraphs.slice(0, 15));

    // Print headers or hero text
    const headings = data.match(/(headline|subtitle|hero)[^:]*:\s*"[^"]+"/gi) || [];
    console.log('Headings/hero:', headings.slice(0, 15));
  });
});
