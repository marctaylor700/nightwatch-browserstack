nightwatch_config = {
    src_folders : [ "tests/core_regression_asr" ],
  
    selenium : {
      "start_process" : false,
      "host" : "hub-cloud.browserstack.com",
      "port" : 443 //SSL
    },
  
    test_settings: {
      default: {
        desiredCapabilities: {
          'browserstack.user': 'nick34',
          'browserstack.key': 'SBukT13jtljJiBWoBpHw',
          'browserstack.debug': true,
          'browserstack.networkLogs': true,
          'os': 'OS X',
          'os_version': 'Mojave',
          'build' : 'Core Regression on Release',
          'project' : 'eVisit Nightwatch Core Regression',
          'browser': 'Chrome',
          'browser_version': '78.0 beta',
          'resolution': '1920x1080'
        }
      }
    }
  };

  
  // Code to copy seleniumhost/port into test settings
  for(var i in nightwatch_config.test_settings){
    var config = nightwatch_config.test_settings[i];
    config['selenium_host'] = nightwatch_config.selenium.host;
    config['selenium_port'] = nightwatch_config.selenium.port;
  }
  
  module.exports = nightwatch_config;
  