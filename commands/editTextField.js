exports.command = function editTextField(locator, value) {
    return this
        //Removing this wait since another one will happen inside clearValue2 (20th october) - .waitForElementVisible(locator)
        .clearValue2(locator)
        .setValue(locator, value)
  }