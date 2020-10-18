module.exports = {
    beforeEach: function (browser) {
        browser.resizeWindow(1920, 1080);
        '@tags:'['test']
    },

    "Edit Medications - Health Records Successfully": function (browser) {
        const medicationsPage = browser.page.patient.my_account.medicationsPage()

        //Open medications page
        medicationsPage.accessMedicationsPage(browser.globals.email, browser.globals.password)
        //Delete any item already in the list
        medicationsPage.cleanList()
        //Add one of the default item and one custom
        medicationsPage.addDefaultEntry()
        medicationsPage.addCustomEntry()
        //make sure the number of items in the list correspond to the amount added
        medicationsPage.count(2)
    },

    "Edit Conditions - Health Records Successfully": function (browser) {
        const conditionsPage = browser.page.patient.my_account.conditionsPage()

        //Open medications page
        conditionsPage.accessConditionsPage(browser.globals.email, browser.globals.password)
        //Delete any item already in the list
        conditionsPage.cleanList()
        //Add one of the default item and one custom
        conditionsPage.addDefaultEntry()
        conditionsPage.addCustomEntry()
        //make sure the number of items in the list correspond to the amount added
        conditionsPage.count(2)
    },

    "Edit Procedures - Health Records Successfully": function (browser) {
        const proceduresPage = browser.page.patient.my_account.proceduresPage()

        //Open procedures page
        proceduresPage.accessProceduresPage(browser.globals.email, browser.globals.password)
        //Delete any item already in the list
        proceduresPage.cleanList()
        //Add one of the default item and one custom
        proceduresPage.addDefaultEntry()
        proceduresPage.addCustomEntry()
        //make sure the number of items in the list correspond to the amount added
        proceduresPage.count(2)
    },

    "Edit Family History - Health Records Successfully": function (browser) {
        const familyHistoryPage = browser.page.patient.my_account.familyHistoryPage()

        //Open family history page
        familyHistoryPage.accessFamilyHistoryPage(browser.globals.email, browser.globals.password)
        //Delete any item already in the list
        familyHistoryPage.cleanList()
        //Add one of the default item and one custom
        familyHistoryPage.addDefaultEntry()
        familyHistoryPage.addCustomEntry()
        //make sure the number of items in the list correspond to the amount added
        familyHistoryPage.count(2)
    },

    "Edit Miscellaneous Questions - Health Records Successfully": function (browser) {
        const questionnairePage = browser.page.patient.my_account.questionnairePage()

        //Open medications page
        questionnairePage.accessQuestionnairePage(browser.globals.email, browser.globals.password)
        //Check toats message in case there is no questions answered yet
        questionnairePage.checkEventualToastMessage()
        //Change all answers to "YES"
        questionnairePage.setAnswersToYes()
        questionnairePage.verifyAnswersAreYes()
        //Change all answers to "NO"
        questionnairePage.setAnswersToNo()
        questionnairePage.verifyAnswersAreNo()
    },

    afterEach: function (browser) {
        browser.end();
    }
};