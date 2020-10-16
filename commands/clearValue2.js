exports.command = function clearValue2(selector) {
  this.waitForElementVisible(selector);
  this.getAttribute('css selector', selector, 'value', (result) => {
    let backspace = new Array(result.value.length + 1).join('\u0008');
    this.setValue(selector, backspace)
  });

  return this
}
