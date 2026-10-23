import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const PROJECT_NAME = 'seer-electric-foundation';

async function uploadFile(filePath, relPath) {
  const fileBuffer = fs.readFileSync(filePath);
  const sha = crypto.createHash('sha1').update(fileBuffer).digest('hex');
  const size = fileBuffer.length;

  const res = await fetch('https://api.vercel.com/v2/files', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${VERCEL_TOKEN}`,
      'Content-Length': size.toString(),
      'x-vercel-digest': sha
    },
    body: fileBuffer
  });

  if (!res.ok && res.status !== 409) {
    // 409 means file already uploaded on Vercel
    const text = await res.text();
    console.error(`Upload error for ${relPath}:`, res.status, text);
    throw new Error(`Failed to upload ${relPath}`);
  }

  return { file: relPath.replace(/\\/g, '/'), sha, size };
}

function getAllFiles(dir, base = '') {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const fullPath = path.join(dir, item);
    const rel = base ? `${base}/${item}` : item;
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, rel));
    } else {
      results.push({ fullPath, rel });
    }
  }
  return results;
}

async function deploy() {
  console.log('1. Gathering files from dist/ and config...');
  const distFiles = getAllFiles(path.resolve('dist'));
  const deployedFiles = [];

  for (const f of distFiles) {
    console.log(`Uploading ${f.rel} (${fs.statSync(f.fullPath).size} bytes)...`);
    const fileObj = await uploadFile(f.fullPath, f.rel);
    deployedFiles.push(fileObj);
  }

  // Also include vercel.json in deployment root
  const vercelJsonPath = path.resolve('vercel.json');
  if (fs.existsSync(vercelJsonPath)) {
    console.log('Uploading vercel.json...');
    const fileObj = await uploadFile(vercelJsonPath, 'vercel.json');
    deployedFiles.push(fileObj);
  }

  console.log(`2. Triggering Vercel deployment with ${deployedFiles.length} files...`);
  const deployRes = await fetch('https://api.vercel.com/v13/deployments', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${VERCEL_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: PROJECT_NAME,
      project: PROJECT_NAME,
      files: deployedFiles,
      target: 'production',
      projectSettings: {
        framework: null,
        buildCommand: null,
        outputDirectory: null
      }
    })
  });

  const deployData = await deployRes.json();
  if (!deployRes.ok) {
    console.error('Deployment error:', deployData);
    throw new Error('Deployment failed');
  }

  console.log('✓ Deployment triggered successfully!');
  console.log('Deployment URL:', `https://${deployData.url}`);
  console.log('Deployment ID:', deployData.id);
  console.log('Status:', deployData.readyState || deployData.status);

  // Poll until READY
  console.log('3. Polling deployment status...');
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 2000));
    const checkRes = await fetch(`https://api.vercel.com/v13/deployments/${deployData.id}`, {
      headers: { 'Authorization': `Bearer ${VERCEL_TOKEN}` }
    });
    const checkData = await checkRes.json();
    console.log(`Status: ${checkData.readyState || checkData.status}...`);
    if (checkData.readyState === 'READY' || checkData.status === 'READY') {
      console.log('✓ Production Deployment is READY!');
      console.log('Live Production URL:', `https://${checkData.url}`);
      return checkData;
    }
  }
}

deploy().catch(err => {
  console.error(err);
  process.exit(1);
});
