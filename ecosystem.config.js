module.exports = {
  apps : [
      {
        name: "Requirement-portal",
        script: "./start.js",
        env: {
            "HOST": "{{ ip }}",
            "PORT": 5060,
            "NODE_ENV": "production",
        }
      }
  ]
}