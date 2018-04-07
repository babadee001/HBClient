module.exports = {
  apps: [{
    name: 'HelloBooks',
    script: 'app.js',
    exec_interpreter: 'babel-node',
    env: {
      NODE_ENV: 'production',
      dialect: 'postgres',
      DATABASE_URL: 'postgres://postgres:devops@45.2.2.196:5432/posgres'
    }
  },
  ],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-18-188-78-243.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/HelloBooksKey.pem',
      ref: 'origin/master',
      repo: 'https://github.com/babadee001/DevOps-AWS-Intro',
      path: '/home/ubuntu/HelloBooks',
      'post-deploy': 'npm install; npm run build && pm2 start ecosystem.config.js --env production'
    }
  }
};

