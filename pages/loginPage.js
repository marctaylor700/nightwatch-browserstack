const elements = {
    email: `[data-test-id='email']`,
    password: `[data-test-id='password']`,
    btnLogin: `[data-test-id='loginButton']`,
    btnForgotPassword: `[data-test-id="forgotPassword"]`,
    btnRegistration: `[data-test-id="dontHaveAccount"]`,

    textForgotPassword: `.eVisitAppLoginPageMessageContainer`,
    textEmailNotFound: `.eVisitAppLoginPageErrorMessageContainer`,
    emailForgotPassword: `[name="email"]`,
    btnSendForgotPassword: `[data-test-id="resetPassword"]`,
    btnCancelForgotPassword: `[data-test-id="cancelReset"]`,
    btnDoneForgotPassword: `[data-test-id="cancelReset"]`,

    confirmPassword: `[data-test-id="confirmPassword"]`,
    termsCheckbox: `[data-test-id="tos0"]`,
    btnRegister: `[data-test-id="register"]`,
    btnAlreadyRegistered: `[data-test-id="alreadyRegistered"]`

};

const commands = [{

    goToPracticeLoginPage() {
        this.api.url(`https://${this.api.globals.env}.evisit.com/r/${this.api.globals.handle}/auth/LoginPage`)
            .pause(3000)
        return this
    },

    patientLogin(user_email, user_password) {
        console.log("Starting Patient Login")
        this
            //check and set email
            .waitForElementVisible('@email')
            .setValue('@email', user_email)
            //check and set password
            .waitForElementVisible('@password')
            .setValue('@password', user_password)
            //expect and click login button
            .waitForElementVisible('@btnLogin')
            .click('@btnLogin')

        return this
    },

    providerLogin(user_email, user_password) {
        console.log("Starting Provider Login")
        this
            //check and set email
            .waitForElementVisible('@email')
            .setValue('@email', user_email)
            //check and set password
            .waitForElementVisible('@password')
            .setValue('@password', user_password)
            //expect and click login button
            .waitForElementVisible('@btnLogin')
            .click('@btnLogin')

        return this
    },

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



}];

module.exports = {
    elements: elements,
    commands: commands
}