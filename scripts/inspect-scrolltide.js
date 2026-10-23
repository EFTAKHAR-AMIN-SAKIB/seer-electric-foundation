import https from 'https';

https.get('https://www.scrolltide.co/', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Scrolltide length:', data.length);
    const globeIdx = data.indexOf('c-particle-globe');
    if (globeIdx !== -1) {
      console.log('Found c-particle-globe snippet:');
      console.log(data.substring(Math.max(0, globeIdx - 200), Math.min(data.length, globeIdx + 800)));
    } else {
      console.log('Not directly in HTML, searching for globe or particle...');
      const matches = data.match(/(globe|particle|three|canvas)[^"']*/gi) || [];
      console.log('Keywords:', [...new Set(matches)].slice(0, 15));
    }
  });
}).on('error', err => console.error(err));
