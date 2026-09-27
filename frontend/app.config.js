const apiUrl = process.env.EXPO_PUBLIC_API_URL || '';
const allowHttp = process.env.ALLOW_HTTP_API === 'true';
if (process.env.EAS_BUILD === 'true') {
  if (!apiUrl) throw new Error('Defina EXPO_PUBLIC_API_URL no ambiente EAS antes de gerar o APK.');
  const url = new URL(apiUrl);
  if (['localhost', '127.0.0.1', '10.0.2.2'].includes(url.hostname))
    throw new Error('Use uma API acessível pelo celular, em vez de localhost ou endereço de emulador.');
  if (url.protocol !== 'https:' && !(allowHttp && url.protocol === 'http:'))
    throw new Error('Use HTTPS para a API. HTTP somente no perfil preview-local para teste em Wi-Fi.');
}
module.exports = ({ config }) => ({
  ...config,
  plugins: [
    'expo-secure-store',
    'expo-font',
    ['expo-splash-screen', {
      image: './assets/icon.png',
      imageWidth: 200,
      resizeMode: 'contain',
      backgroundColor: '#082A54'
    }],
    ['expo-build-properties', { android: { usesCleartextTraffic: allowHttp } }]
  ]
});
