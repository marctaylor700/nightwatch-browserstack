exports.command = function checkToastMessage(message) {
    const toast = `[data-test-id='toast']`
    return this
        .waitForElementVisible(toast)
        .verify.containsText(toast, message)
  }