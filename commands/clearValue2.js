exports.command = function clearValue2(selector) {
  let self = this;

  this.getAttribute('css selector', selector, 'value', function (result) {
    var backspace = new Array(result.value.length + 1).join('\u0008');
    self.setValue(selector, backspace)
  });

  return this
}
