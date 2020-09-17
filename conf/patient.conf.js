
nightwatch_config = {
    src_folders : [ "tests/patient" ],
  
    selenium : {
      "start_process" : false,
      "host" : "hub-cloud.browserstack.com",
      "port" : 80
    },
  
    test_settings: {
      default: {
        desiredCapabilities: {
          'browserstack.user': 'nick34',
          'browserstack.key': 'SBukT13jtljJiBWoBpHw',
          'os': 'OS X',
          'os_version': 'Mojave',
          'build' : 'Patient Tests',
          'project' : 'eVisit Nightwatch',
          'browser': 'Chrome',
          'browser_version': '78.0 beta',
          'resolution': '1920x1080',
          'goog:chromeOptions': {
            'args': ["--use-fake-device-for-media-stream", "--use-fake-ui-for-media-stream"]
          }
      },
      globals: {
          env: "release",
          handle: "omega",
          email:"taylor+o13@evisit.com",
          password:"patient123"
        },
    }
  },
  custom_commands_path: ["./commands"],
  page_objects_path: ["pages"]
};
  
  // Code to copy seleniumhost/port into test settings
  for(var i in nightwatch_config.test_settings){
    var config = nightwatch_config.test_settings[i];
    config['selenium_host'] = nightwatch_config.selenium.host;
    config['selenium_port'] = nightwatch_config.selenium.port;
  }
  
  module.exports = nightwatch_config;
