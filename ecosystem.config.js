module.exports = {
  apps: [{
    name: 'snowflake',
    script: '.',
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy: {
    production: {
      user: 'karolis',
      host: 'kn8.lt',
      ref : 'origin/master',
      repo: 'git@github.com:KidkArolis/snowflake.git',
      path: '/home/karolis/www/kn8.lt/public/snowflake',
      'post-deploy': 'npm install && npm run build && pm2 startOrRestart ecosystem.json --env production'
    }
  }
}
