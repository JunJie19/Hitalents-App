module.exports = {
    apps: [{
      name: "react-express-hyde",
      script: "./nodeApp.js",
      env: {
        NODE_ENV: "dev"
      },
      env_production: {
        NODE_ENV: "prod",
      }
    }]
  }
  