// pm2 start ecosystem.config.cjs   (after `npm run build`)
module.exports = {
  apps: [{
    name: 'mastermechanics',
    cwd: './server',
    script: 'src/index.js',
    instances: 1,
    env: {
      NODE_ENV: 'production',
      PORT: 4000,
      SITE_URL: 'https://mastermechanics.ae',
      MEDIA_FALLBACK_BASE: 'https://mastermechanics.ae',
      GEO_LAT: '24.9685316',
      GEO_LNG: '55.1922678',
    },
    max_memory_restart: '400M',
  }],
};
