import ImageKit from '@imagekit/nodejs';

// Trim surrounding quotes/whitespace that may come from .env formatting
const _trim = (v) => (typeof v === 'string' ? v.replace(/^\s*"|"\s*$/g, '').trim() : v);

const publicKey = _trim(process.env.IMAGEKIT_PUBLIC_KEY);
const privateKey = _trim(process.env.IMAGEKIT_PRIVATE_KEY);
const urlEndpoint = _trim(process.env.IMAGEKIT_URL_ENDPOINT);

if (!publicKey || !privateKey || !urlEndpoint) {
  console.warn('ImageKit: missing config. Check IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT in server/.env');
}

const imagekit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint,
});

export default imagekit;