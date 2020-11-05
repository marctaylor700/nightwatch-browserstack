exports.command = function editTextField(locator, value) {
    return this
        //Removing this wait since another one will happen inside clearValue2 (20th october) - .waitForElementVisible(locator)
        .clearValue2(locator)
        //.pause(1000) //It might be necessary to run locally to make sure the setvalue waits the cleaning
        .setValue(locator, value)
  }