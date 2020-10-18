const elements = {
    pharmacySection: `[data-test-id='pharmacySection']`,
    pharmacySectionSelected: `[data-test-id="pharmacySection"][class*='Active']`,

    //Search pharmacy field that does research by address or zip code
    searchField: `[data-test-id="addressLine1"]`,

    /* Item of Popup list with matching addresses
    This considers the second option of the list (second occurence of locator)
    To change the option you can change the index
    */
    addressOption: {
        selector: `[class*="RAView eVisitAppPopupMenuItem"] > .RAText`,
        index: 0
    },

    // Second option of pharmacy returned by the list (to check the action of selecting a new one)
    secondPharmacyOption: `[data-test-id="pharmacyRow1"]`,
    secondPharmacyOptionName: `[data-test-id="pharmacyRow1"] [class="RAText"]:nth-child(1)`,
    // First pharmacy of list
    firstPharmacyOptionIcon: `[data-test-id="pharmacyRow0"] div[class*="RAView eVisitAppIcon eVisitAppIconContainer"]`,
    firstPharmacyOptionName: `[data-test-id="pharmacyRow0"] [class="RAText"]:nth-child(1)`,

    updateButton: `[data-test-id="updateEditPharmacy"]`,

    newPhamacyOfMap: `[title="PHILLIPS DRUGS WEST"]`

};

const commands = [{

    //Access Pharmacy Section considering that My Account page is opened
    accessPharmacySection() {
        this
            .waitForElementVisible('@pharmacySection')
            .pause(3000)
            .click('@pharmacySection')
            .waitForElementVisible('@pharmacySectionSelected')
        return this
    },
    checkAddressInputByPatient(address) {
        this
            .accessPharmacySection()
            .waitForElementVisible('@searchField')
            //check if search field has the address input by the patient 
            .verify.attributeEquals('@searchField', 'value', address)
        return this
    },
    searchBy(value) {
        this
            .editTextField('@searchField', value)
            //wait for popup with address options appears
            .waitForElementVisible('@addressOption', 10000)
            //select the first address option
            .click('@addressOption')
        return this
    },
    selectByList() {
        this
            .waitForElementVisible('@secondPharmacyOption')
            //get new pharmacy name to compare after
            .getText('@secondPharmacyOptionName', (result) => {
                //new pharmacy name
                const selectedPharmacy = result.value;
                const settingsPage = this.api.page.patient.my_account.settingsPage();
                //select new pharmacy on the list
                this.click('@secondPharmacyOption')
                    //update pharmacy
                    .click('@updateButton')
                //switch section in order to check the change to new pharmacy
                settingsPage.accessSettingsSection()
                this.accessPharmacySection()
                    //check if selected pharmacy changed the icon color to 'selected' color
                    .verify.cssProperty('@firstPharmacyOptionIcon', 'background-color', 'rgba(42, 178, 188, 1)')
                    //check if the first position matches the selected pharmacy name
                    .expect.element('@firstPharmacyOptionName').text.to.equal(selectedPharmacy)
            })
        return this
    },
    selectByMap() {
        this
            .waitForElementVisible('@newPhamacyOfMap')
            //get new pharmacy name to compare after
            .getAttribute('@newPhamacyOfMap', 'title', (newPhamacyOfMapText) => {
                //new pharmacy name
                const selectedPharmacy = newPhamacyOfMapText.value;
                const settingsPage = this.api.page.patient.my_account.settingsPage();
                //select new pharmacy on Map
                this.click('@newPhamacyOfMap')
                    //update pharmacy
                    .click('@updateButton')
                //switch section in order to check the change to new pharmacy
                settingsPage.accessSettingsSection()
                this.accessPharmacySection()
                    //check if selected pharmacy is centralized on Map
                    .verify.cssProperty('@newPhamacyOfMap', 'left', '-10px')
                    .verify.cssProperty('@newPhamacyOfMap', 'top', '-8px')
                    //check if selected pharmacy changed the icon color to 'selected' color
                    .verify.cssProperty('@firstPharmacyOptionIcon', 'background-color', 'rgba(42, 178, 188, 1)')
                    //check if the first position matches the selected pharmacy name
                    .getText('@firstPharmacyOptionName', (firstPharmacyOptionNameText) =>{
                        this.verify.equal((firstPharmacyOptionNameText.value).toUpperCase(), selectedPharmacy.toUpperCase() )
                    })
            })
        return this

    }
}];

module.exports = {
    elements: elements,
    commands: commands
}

