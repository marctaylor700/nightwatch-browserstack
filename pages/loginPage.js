// Used during email registration
const today = new Date()

const elements = {
    // Login items
    email: `[data-test-id='email']`,
    password: `[data-test-id='password']`,
    btnLogin: `[data-test-id='loginButton']`,
    btnForgotPassword: `[data-test-id="forgotPassword"]`,
    btnRegistration: `[data-test-id="dontHaveAccount"]`,

    // Forgot password items
    textForgotPassword: `.eVisitAppLoginPageMessageContainer`,
    textEmailNotFound: `.eVisitAppLoginPageErrorMessageContainer`,
    emailForgotPassword: `[name="email"]`,
    btnSendForgotPassword: `[data-test-id="resetPassword"]`,
    btnCancelForgotPassword: `[data-test-id="cancelReset"]`,
    btnDoneForgotPassword: `[data-test-id="cancelReset"]`,

    // Registration items
    errorMessage: `.eVisitAppLoginPageErrorMessageContainer`,
    confirmPassword: `[data-test-id="confirmPassword"]`,
    termsCheckbox: `[data-test-id="tos0"]`,
    btnRegister: `[data-test-id="register"]`,
    btnAlreadyRegistered: `[data-test-id="alreadyRegistered"]`

};

const commands = [{

    /*
    *   Open the eVisit portal in the environment and practice configured as global environment directly in the conf file
    *   Input: None
    */
    goToPracticeLoginPage() {
        this.api.url(`https://${this.api.globals.env}.evisit.com/r/${this.api.globals.handle}/auth/LoginPage`)
            .pause(3000)
        return this
    },

    /*
    *   Will log in a provider or patient account
    *   Input: Valid email and password 
    */
    userLogin(user_email, user_password) {
        console.log("Starting Login")
        this
            // Set email
            .waitForElementVisible('@email')
            .setValue('@email', user_email)
            // Set password
            .waitForElementVisible('@password')
            .setValue('@password', user_password)
            // Click login button
            .waitForElementVisible('@btnLogin')
            .click('@btnLogin')

        return this
    },

    /*
    *   Will send a recovery email to a selected email account and validate successful instructions message
    *   Input: The email address that should receive the recovery email
    */
    forgotPasswordKnownEmail(user_email) {
        this
            .waitForElementVisible('@email')
            .click('@btnForgotPassword')
            .waitForElementVisible('@emailForgotPassword')
            .setValue('@emailForgotPassword', user_email)
            .click('@btnSendForgotPassword')
            .expect.element(`@textForgotPassword`).text.to.contain("Your Email Has Been Sent.\nPlease follow the instructions provided to reset your password. Don't forget to check your spam folder.")
        this.click('@btnDoneForgotPassword')
        return this
    },

    /*
    *   Will send a recovery email to a invalid email account and validate fail message
    *   Input: None
    */
    forgotPasswordUnknownEmail() {
        this
            .waitForElementVisible('@email')
            .click('@btnForgotPassword')
            .waitForElementVisible('@emailForgotPassword')
            .setValue('@emailForgotPassword', "wrong_password@evisit.com")
            .click('@btnSendForgotPassword')
            .expect.element(`@textEmailNotFound`).text.to.contain("Email not found")
        this.click('@btnCancelForgotPassword')
        return this
    },

    /*
    *   Try to register a new account without the needed information
    *   Input: None
    */
    registrationFailureAllMissing() {
        this
            .waitForElementVisible('@btnRegistration')
            .click('@btnRegistration')
            .waitForElementVisible('@btnRegister')
            .click('@btnRegister')
            .expect.element(`@errorMessage`).text.to.contain("There is more than one field that is required")

        this.click('@btnAlreadyRegistered') // Return to login interface
            .waitForElementVisible('@btnRegistration')

        return this
    },

    /*
    *   Try to register a new account using an already used email
    *   Input: Email and password of a existing account
    */
    registrationFailureEmailAlreadyUsed(usedEmail, password) {
        this
            .waitForElementVisible('@btnRegistration')
            .click('@btnRegistration')
            .waitForElementVisible('@btnRegister')
            .editTextField('@email', usedEmail)
            .editTextField('@password', password)
            .editTextField('@confirmPassword', password)
            .click('@termsCheckbox')
            .click('@btnRegister')
            .expect.element(`@errorMessage`).text.to.contain("Email has already been taken")

        this.click('@btnAlreadyRegistered') // Return to login interface
            .waitForElementVisible('@btnRegistration')

        return this
    },

    /*
    *   Generate new user email with today's date and random number as part of the text
    *   Input: None
    */
    createNewPatientEmail() {
        var rando = Math.floor((Math.random() * 100000) + 1); // Random number generator for email
        var email = `registration+${today.getMonth() + 1}+${today.getDate()}+${rando}@evisit.com`; // Email string
        return email;
    },

    /*
    *   Try to register a new account with different password in the 'confirm password' field
    *   Input: Password to use in the first field
    */
    registrationFailureDifferentPasswords(password) {
        this
            .waitForElementVisible('@btnRegistration')
            .click('@btnRegistration')
            .waitForElementVisible('@btnRegister')
            .editTextField('@email', this.createNewPatientEmail())
            .editTextField('@password', password)
            .editTextField('@confirmPassword', (password + "123"))
            .click('@termsCheckbox')
            .click('@btnRegister')
            .expect.element(`@errorMessage`).text.to.contain("Passwords must match")

        this.click('@btnAlreadyRegistered') // Return to login interface
            .waitForElementVisible('@btnRegistration')

        return this
    },

    /*
    *   Try to register a new account without a correct password format and verify error message
    *   Input: A invalid password and the expected message that should follow it
    */
    checkInvalidPasswordMessage(invalidPassword, message) {
        this
            .editTextField('@password', invalidPassword)
            .editTextField('@confirmPassword', invalidPassword)
            .click('@btnRegister')
            .waitForElementNotVisible('.eVisitAppLoadingSpinner', 10000)
            .expect.element(`@errorMessage`).text.to.contain(message)
        return this
    },

    /*
    *   This function will check several wrong password messages
    *   Input: None
    */
    registrationFailureInvalidPassword() {
        this
            .waitForElementVisible('@btnRegistration')
            .click('@btnRegistration')
            .waitForElementVisible('@btnRegister')
            .click('@termsCheckbox')
            .editTextField('@email', this.createNewPatientEmail())

        // Password too short
        this.checkInvalidPasswordMessage("Pp12!", "Your password is missing 8 characters minimum")

        // Only lowercase letters
        this.checkInvalidPasswordMessage("password", "Your password is missing 1 uppercase, 1 digit, 1 special character")

        // Only numbers
        this.checkInvalidPasswordMessage("123456789", "Your password is missing 1 uppercase, 1 lowercase, 1 special character")

        // Only lowercase letters and numbers
        this.checkInvalidPasswordMessage("patient123", "Your password is missing 1 uppercase, 1 special character")

        // Only missing uppercase
        this.checkInvalidPasswordMessage("patient123!", "Your password is missing 1 uppercase")

        // Only missing special chars
        this.checkInvalidPasswordMessage("Patient123", "Your password is missing 1 special character")

        // Only missing numbers
        this.checkInvalidPasswordMessage("Patient!@#", "Your password is missing 1 digit")

        this.click('@btnAlreadyRegistered') // Return to login interface
            .waitForElementVisible('@btnRegistration')

        return this
    },

    /*
    *   Try to register a new account without checking the agreement checkbox
    *   Input: A valid password
    */
    registrationFailureAgreementNotAccepted(password) {
        this
            .waitForElementVisible('@btnRegistration')
            .click('@btnRegistration')
            .waitForElementVisible('@btnRegister')
            .editTextField('@email', this.createNewPatientEmail())
            .editTextField('@password', password)
            .editTextField('@confirmPassword', password)
            .click('@btnRegister')
            .expect.element(`@errorMessage`).text.to.contain("You must accept the eVisit Terms & Conditions.")

        this.click('@btnAlreadyRegistered') // Return to login interface
            .waitForElementVisible('@btnRegistration')

        return this
    },

    /*
    *   Register successfully a new patient account
    *   Input: A valid password
    */
    registrationSuccess(password) {
        this
            .waitForElementVisible('@btnRegistration')
            .click('@btnRegistration')
            .waitForElementVisible('@btnRegister')
            .editTextField('@email', this.createNewPatientEmail())
            .editTextField('@password', password)
            .editTextField('@confirmPassword', password)
            .click('@termsCheckbox')
            .click('@btnRegister')

        return this
    },
}];

module.exports = {
    elements: elements,
    commands: commands
}