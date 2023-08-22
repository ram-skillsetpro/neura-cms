module.exports = {
  apps: [
    {
      name: 'simpleo-cms-app', // Change this to your app's name
      script: 'npm',
      args: 'start',
      instances: 1, // You can adjust this based on your server's resources
      autorestart: true,
      watch: false,
      max_memory_restart: '300M',
      env: {
        NODE_ENV: 'production', 
      },
      max_restarts: 5,
      restart_delay: 1000,
    },
  ],
};


