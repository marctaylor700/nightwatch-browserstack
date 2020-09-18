const elements = {
    email: `[data-test-id='email']`,
    password: `[data-test-id='password']`,
    btnLogin: `[data-test-id='loginButton']`
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
    }

}];

module.exports = {
    elements: elements,
    commands: commands
}