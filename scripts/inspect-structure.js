import https from 'https';

https.get('https://seer-henna.vercel.app/assets/index-DQUf3hN_.js', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Search for headings, navigation items, sections
    const navItems = data.match(/label:\s*"[^"]+"/g) || [];
    console.log('Nav items / labels:', [...new Set(navItems)].slice(0, 20));

    // Look for tab names or titles
    const titles = data.match(/title:\s*"[^"]+"/g) || [];
    console.log('Titles:', [...new Set(titles)].slice(0, 20));

    // Look for theme switcher
    const themeSwitches = data.match(/theme[^"]*:[^,]+/g) || [];
    console.log('Theme snippets:', themeSwitches.slice(0, 10));
  });
});
