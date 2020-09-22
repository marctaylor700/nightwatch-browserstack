exports.command = function editTextField(locator, value) {
    return this
        .waitForElementVisible(locator)
        .clearValue2(locator)
        .setValue(locator, value)
  }