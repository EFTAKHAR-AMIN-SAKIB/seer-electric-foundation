import https from 'https';

https.get('https://seer-henna.vercel.app/assets/index-DQUf3hN_.js', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('JS length:', data.length);
    // Find strings
    const strMatches = data.match(/"\/[a-zA-Z0-9_\-\/]+"/g) || [];
    const uniquePaths = [...new Set(strMatches)].filter(p => p.length < 25 && !p.includes('.'));
    console.log('Paths:', uniquePaths);

    // Look for theme names
    const themeMatches = data.match(/seer-[a-z0-9\-]+/g) || [];
    console.log('Themes:', [...new Set(themeMatches)]);

    // Look for sections or features
    const keywords = ['futarchy', 'deep', 'opportunity', 'risk', 'rationale', 'terminal', 'prediction', 'market', 'kleros', 'reality'];
    keywords.forEach(k => {
      const reg = new RegExp(k, 'gi');
      const count = (data.match(reg) || []).length;
      console.log(`Keyword "${k}": ${count} matches`);
    });
  });
}).on('error', err => console.error(err));
