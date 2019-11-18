nightwatch_config = {
    src_folders : [ "tests/scheduling" ],
  
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
          'browserstack.debug': true,
          'os': 'OS X',
          'build' : '1.0',
          'name' : 'Scheduling tab test',
          'os_version': 'Mojave',
          'browser': 'Chrome',
          'browser_version': '78.0',
          'browserstack.console' : 'warnings',
          'project' : 'Provider Scheduling Tests',
          'resolution': '1920x1080',
          'elementScrollBehavior': '1'
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
  