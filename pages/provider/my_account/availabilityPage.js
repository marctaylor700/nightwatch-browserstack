var assert = require('assert');
const elements = {

    availabilitySection: `[data-test-id="availabilitySection"]`,
    availabilitySectionSelected: `[data-test-id="availabilitySection"][class*='Active']`,

    providerFilterField: `[data-field="provider_filter"] [data-field="provider_filter"]`,
    providerFilterText: `[data-field="provider_filter"] [data-field="provider_filter"] [type= "text"]`,

    //first option of Provider Filter list
    providerFilterFirstOption: `[data-test-id="rowClick0"]`,

    //Second availability block of first day displayed
    day1Block2: `[data-test-id="day1Block2"]`,
    //Second availability block of second day displayed
    day2Block2: `[data-test-id="day2Block2"]`,
    //Second availability block of third day displayed
    day3Block2: `[data-test-id="day3Block2"]`,
    //Second availability block of fourth day displayed
    day4Block2: `[data-test-id="day4Block2"]`,


    //Availability container
    availabilityContainer: `[class="RAView eVisitAppPopupContainer"]`,
    putMeOnCallCheckbox: `[data-test-id="onCallCheckbox"] [class="RAView"]`,
    allowScheduledVisitsCheckbox: `[data-test-id="allowSchedulingCheckbox"] [class="RAView"]`,
    repeatWeeklyCheckbox: `[data-test-id="repeatWeeklyCheckbox"] [class="RAView"]`,
    checkedRepeatWeeklyCheckbox: `[data-test-id="repeatWeeklyCheckbox"] [class^="RAText eVisitAppIcon eVisitAppIconIcon"]`,
    saveAvailabilityButton: `[data-test-id="eventWindowSave"]`,

    //delete Section
    deleteBlockButton: `[data-test-id="eventWindowDelete"]`,
    confirmDeleteButton: `[data-test-id="confirmModalConfirm"]`,
    deleteAllFutureButton: `[data-test-id="confirmModalDeny"]`,

    //each occurrence of this locator represents an availability block
    availabilityBlock: '[class="raTouchable RAView eVisitAppTimeBlockTimeBlock"]',

    //Spinner icon of search field
    saveChangesSpinner: `[class="applicationActivityIndicator"]`,

    //Spinner Icon of Availability modal
    saveAvailabilitySpinner: `[class*="RAView eVisitAppLoadingSpinner eVisitAppLoadingSpinnerContrast"]`,

    closeAvailabilityModalButton: `[class="RAView eVisitAppIconButtonContainer"]`,

    nextWeekButton: `[class*="RAView eVisitAppIcon eVisitAppIconContainer eVisitAppButtonRightIcon"]`,
    previousWeekButton: `[class="RAView eVisitAppAvailabilityCalendarDateNavigationControlsContainer"] [class*="eVisitAppButtonLeftIcon"]`
};

const commands = [{
    //Access Availability Page from Provider login
    accessAvailabilityPage(email, password) {
        this
        const loginPage = this.api.page.loginPage()
        const waitingRoomPage = this.api.page.provider.waitingRoomPage()

        loginPage
            .goToPracticeLoginPage()
            .userLogin(email, password)
        waitingRoomPage.selectMyAccount();
        this.accessAvailabilitySection()
        return this
    },
    //Access Availability Section considering the current page is My Account
    accessAvailabilitySection() {
        this
            .waitForElementVisible('@availabilitySection')
            .pause(3000)
            .click('@availabilitySection')
            .waitForElementVisible('@availabilitySectionSelected')
        return this
    },

    searchProvider(provider) {
        this.waitForElementVisible('@providerFilterText')
            .editTextField('@providerFilterText', provider)
            .pause(3000)
            .waitForElementVisible('@providerFilterFirstOption')
            .click('@providerFilterFirstOption')
        this.assert.attributeEquals('@providerFilterText', 'value', provider)
        
        return this
    },

    /*
    block: the locator of the availability block
    type == 1: "Schedulable & Available"
    type == 2: "Schedulable Only"
    type == 3: "Available Only"
    repeat == false: no repeat
    repeat == true: set to repeat
    */
    createAvailabilityBlock(block, type, repeat) {
        console.log("Creating a new availability block")
        this.click(block)
        if (type == 1) {
            this.waitForElementVisible('@putMeOnCallCheckbox')
                .click('@putMeOnCallCheckbox')
                .click('@allowScheduledVisitsCheckbox')
        }
        else if (type == 2) {
            this.waitForElementVisible('@allowScheduledVisitsCheckbox')
                .click('@allowScheduledVisitsCheckbox')
        }
        else if (type == 3) {
            this.waitForElementVisible('@putMeOnCallCheckbox')
                .click('@putMeOnCallCheckbox')
        }
        if (repeat) {
            this.click('@repeatWeeklyCheckbox')
        }

        this.perform(() => {
            //Save changes
            this
                .click('@saveAvailabilityButton')
                .waitForElementNotPresent('@saveAvailabilitySpinner')
                .pause(2000)
        })

        return this
    },

    checkBlockPersistence(block, type, repeat) {
        console.log("Checking the persistence of created block")
        this.click(block)
        if (type == 1) {
            this.waitForElementVisible('@putMeOnCallCheckbox')
                .verify.cssProperty('@putMeOnCallCheckbox', 'border-color', 'rgb(42, 178, 188)')
                .verify.cssProperty('@allowScheduledVisitsCheckbox', 'border-color', 'rgb(42, 178, 188)')
        }
        else if (type == 2) {
            this.waitForElementVisible('@allowScheduledVisitsCheckbox')
                .verify.cssProperty('@putMeOnCallCheckbox', 'border-color', 'rgb(173, 177, 179)')
                .verify.cssProperty('@allowScheduledVisitsCheckbox', 'border-color', 'rgb(42, 178, 188)')
        }
        else if (type == 3) {
            this.waitForElementVisible('@putMeOnCallCheckbox')
                .verify.cssProperty('@putMeOnCallCheckbox', 'border-color', 'rgb(42, 178, 188)')
                .verify.cssProperty('@allowScheduledVisitsCheckbox', 'border-color', 'rgb(173, 177, 179)')
        }

        if (repeat) {
            //verify if check icon is present on Repeat Weekly checkbox
            this.expect.element('@checkedRepeatWeeklyCheckbox').to.be.present;
        } else {
            //verify if check icon is NOT present on Repeat Weekly checkbox
            this.expect.element('@checkedRepeatWeeklyCheckbox').to.not.be.present;
        }

        this.perform(() => {
            this
                .click('@closeAvailabilityModalButton') //close the availability modal
                .pause(2000)
        })
    },

    removeBlock(block) {
        console.log("Removing block")
        this.click(block)
            .waitForElementVisible('@deleteBlockButton')
            //
            .api.element('@checkedRepeatWeeklyCheckbox', result => {
                this
                    .click('@deleteBlockButton')
                    .click('@confirmDeleteButton')
                //check if Repeat Weekly Checkbox was selected
                if (result.status != -1) {
                    //If is selected, then one more button is needed to confirm Delete All action
                    this.waitForElementVisible('@deleteAllFutureButton')
                        .click('@deleteAllFutureButton')
                }
            })

        return this
    },

    createCheckAndDeleteBlock(block, type, repeat) {
        this.perform(() => {
            //create new block
            this.createAvailabilityBlock(block, type, repeat)
        })
            .perform(() => {
                //check the persistence of created block
                if (repeat) { //if repeated weekly, also checks the persistence on next week
                    this.click('@nextWeekButton')
                        .pause(2000)
                        .checkBlockPersistence('@availabilityBlock', type, repeat)
                    this.click('@previousWeekButton')
                        .pause(2000)
                }
                this.checkBlockPersistence('@availabilityBlock', type, repeat)
            })
            .perform(() => {
                //remove created block
                this.removeBlock('@availabilityBlock')
                    .waitForElementNotPresent('@availabilityBlock')
            })
        return this
    }

}];

module.exports = {
    elements: elements,
    commands: commands
}