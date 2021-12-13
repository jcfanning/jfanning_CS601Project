window.onload = function () {
    // show JS elements
    document.getElementById("jsToggle").classList.remove("hidden");
    document.getElementById("jsToggle").classList.add("show");

    // // hide JS off warning
    // document.getElementById("invJsToggle").classList.remove("show");
    // document.getElementById("invJsToggle").classList.add("hidden");

    let subButton = document.getElementById("contactSubmit");
    subButton.addEventListener("click", submitContact);
};

function submitContact() {
    //inputs
    let fName = document.getElementById("fName");
    let lName = document.getElementById("lName");
    let eMail = document.getElementById("eMail");
    let messageContent = document.getElementById("theMessage")

    //warnings
    let fNameWarn = document.getElementById("fNameWarn");
    let lNameWarn = document.getElementById("lNameWarn");
    let eMailWarn = document.getElementById("emailWarn");
    let textWarn = document.getElementById("textWarn");

    //hide response
    document.getElementById("formMessage").innerHTML = "";
    document.getElementById("messageBox").classList.add("hidden");
    document.getElementById("messageBox").classList.remove("show");

    let passed = true;

    //first name check
    if (verifyName(fName.value)) {
        testPass(fName, fNameWarn);
    } else {
        testFail(fName, fNameWarn);
        passed = false;
    }

    //last name check
    if (verifyName(lName.value)) {
        testPass(lName, lNameWarn);
    } else {
        testFail(lName, lNameWarn);
        passed = false;
    }

    //email check
    if (verifyEmail(eMail.value)) {
        testPass(eMail, eMailWarn);
    } else {
        testFail(eMail, eMailWarn);
        passed = false;
    }

    // check message has content
    if (messageContent.value != '') {
        testPass(messageContent, textWarn);
    } else {
        testFail(messageContent, textWarn);
        passed = false;
    }

    if (passed === true) {
        document.getElementById(
            "formMessage"
        ).innerHTML = `Thanks for your message ${fName.value}, we'll get back to you as soon as we can.`;
        document.getElementById("messageBox").classList.remove("hidden");
        document.getElementById("messageBox").classList.add("show");

        clearForm();
    }
}

function verifyName(name) {
    let value = false;
    if (/^[a-zA-Z]{2,}$/.test(name)) {
        value = true;
    }
    return value;
}

function verifyEmail(email) {
    let value = false;
    if (/^[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}$/.test(email)) {
        value = true;
    }
    return value;
}

function testFail(target1, target2) {
    /**
     * a function to modify the data collection fields for a failed test
     */
    target1.classList.add("invalidData");
    target1.classList.remove("validData");
    target2.classList.add("warningShow");
    target2.classList.remove("warningHide");
}

function testPass(target1, target2) {
    /**
     * a function to modify the data collection fields for a passed test
     */
    target1.classList.add("validData");
    target1.classList.remove("invalidData");
    target2.classList.add("warningHide");
    target2.classList.remove("warningShow");
}

function clearForm() {
    document.getElementById("contactForm").reset();
}
