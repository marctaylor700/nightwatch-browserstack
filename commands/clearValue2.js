exports.command = function clearValue2(selector) {
  let self = this;
  let backspace = []

  this.getAttribute('css selector', selector, 'value', function (result) {
      for (i = 0; i < result.value.length; i++) {
          backspace.push('\u0008');
      }
      self.setValue(selector, backspace)
  });

  return this
}