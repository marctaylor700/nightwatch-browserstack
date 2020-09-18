module.exports = {
    before: function (browser) {
        browser.resizeWindow(1920, 1080);
        '@tags:'['test']
    },
    //This test edit all fiedls of Personal Info considering the happy path
    "Edit Medication Records Successfully": function (browser) {
         const medicationsPage = browser.page.patient.my_account.medicationsPage()

        //Open page
        medicationsPage.accessMedicationsPage()

        //Delete any item already in the list
        medicationsPage.cleanList()

        //Add one of the default item and one custom
        medicationsPage.addDefaultEntry()
        medicationsPage.addCustomEntry()

        //make sure the number of items in the list correspond to the amount added
        medicationsPage.count(2)
    },

    after: function (browser) {
        browser.end();
    }
};