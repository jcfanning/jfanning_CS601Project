window.onload = function () {
    // show JS elements
    document.getElementById("jsToggle1").classList.remove("hidden");
    document.getElementById("jsToggle1").classList.add("show");
    document.getElementById("jsToggle2").classList.remove("hidden");
    document.getElementById("jsToggle2").classList.add("show");

    // // hide JS off warning
    // document.getElementById("invJsToggle").classList.remove("show");
    // document.getElementById("invJsToggle").classList.add("hidden");

    let calculateFeeds = document.getElementById("starterSubmit");
    calculateFeeds.addEventListener("click", generateFeeds);

    let resetFeeds = document.getElementById("starterReset");
    resetFeeds.addEventListener("click", resetInputs);
};

function resetInputs() {
    /**
     * a function to reset the warnings
     */

    console.log("resetting");

    // collect raw data values
    let starterTarget = document.getElementById("starterAmount");
    let starterRemain = document.getElementById("starterRemain");
    let starterPercent = document.getElementById("starterPercent");

    // collect warning elements
    let warningTarget = document.getElementById("warningAmount");
    let warningRemain = document.getElementById("warningRemain");
    let warningPercent = document.getElementById("warningPercent");

    // clear fields
    testPass(starterTarget, warningTarget);
    testPass(starterRemain, warningRemain);
    testPass(starterPercent, warningPercent);

    //clear info
}

function generateFeeds() {
    console.log("Calculating");

    let data = collectValidate();

    if (data != false) {
        publishFeeding(data);
    }
}

class FeedingData {
    /**
     * an object to store deefing data in
     */

    constructor(feedings, starterTarget, starterRemain, starterPercent) {
        this.feedings = parseFloat(feedings);
        this.starterTarget = parseFloat(starterTarget);
        this.starterRemain = parseFloat(starterRemain);
        this.starterPercent = parseFloat(starterPercent);
    }
}

function collectValidate() {
    /**
     * a function to collect and validate the data
     * returns a feedingData object if data is valid
     * returns false if data is not valid
     */

    /**error array */
    errorArray = [];

    // collect raw data values
    let feedings = document.querySelector('input[name="feedingNum"]:checked');
    let starterTarget = document.getElementById("starterAmount");
    let starterRemain = document.getElementById("starterRemain");
    let starterPercent = document.getElementById("starterPercent");

    // collect warning elements
    let warningTarget = document.getElementById("warningAmount");
    let warningRemain = document.getElementById("warningRemain");
    let warningPercent = document.getElementById("warningPercent");

    /** warning array */
    let warning = [warningTarget, warningRemain, warningPercent];

    /** verify data */
    if (
        !/^\d+$/.test(starterTarget.value) ||
        starterTarget.value <= 0 ||
        starterTarget.value === ""
    ) {
        errorArray.push(false);
        testFail(starterTarget, warningTarget);
    } else {
        testPass(starterTarget, warningTarget);
    }

    if (
        !/^\d+$/.test(starterRemain.value) ||
        starterRemain.value < 0 ||
        starterRemain === ""
    ) {
        errorArray.push(false);

        testFail(starterRemain, warningRemain);
    } else {
        testPass(starterRemain, warningRemain);
    }

    if (
        !/^\d+$/.test(starterPercent.value) ||
        starterPercent.value < 0 ||
        starterPercent.value >= 100 ||
        starterPercent === ""
    ) {
        errorArray.push(false);

        testFail(starterPercent, warningPercent);
    } else {
        testPass(starterPercent, warningPercent);
    }

    /* return values */
    if (errorArray.includes(false)) {
        return false;
    } else {
        let data = new FeedingData(
            feedings.value,
            starterTarget.value,
            starterRemain.value,
            starterPercent.value / 100
        );
        return data;
    }
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

function publishFeeding(data) {
    /**
     * a function to compile and generate feeding instructions
     */

    console.log("Compiling Instructions");
    console.log("Data: ", data);

    let feedArray = [];

    let finalTotal = data.starterTarget + data.starterRemain;
    let finalStarter = round(finalTotal * data.starterPercent);
    let finalFlour = round((finalTotal - finalStarter) / 2);
    let finalWater = round((finalTotal - finalStarter) / 2);

    if (data.feedings === 2) {
        let initialTotal = finalStarter;
        let initialStarter = round(initialTotal * data.starterPercent);
        let initialFlour = round((initialTotal - initialStarter) / 2);
        let initialWater = round((initialTotal - initialStarter) / 2);
        feedArray.push([initialStarter, initialFlour, initialWater]);
    }

    feedArray.push([finalStarter, finalFlour, finalWater]);

    console.log(feedArray);

    document.getElementById("starterTable").innerHTML = "";

    // create table
    let insTable = document.createElement("table");
    insTable.className = "ingTable";

    // add table head
    let insElement = document.createElement("thead");
    insTable.appendChild(insElement);
    insElement.appendChild(
        tableRowGen(["Feeding", "Starter(g)", "Flour(g)", "Water(g)"])
    );

    // add table body
    insElement = document.createElement("tbody");
    insTable.appendChild(insElement);
    for (let i = 0; i < feedArray.length; i++) {
        let midArray = feedArray[i];
        midArray.unshift(i + 1);
        insElement.appendChild(tableRowGen(Object.values(midArray)));
    }

    // attach table to HTML
    document.getElementById("starterTable").appendChild(insTable);
    document.getElementById("starterTable").classList.add("show");
    document.getElementById("starterTable").classList.remove("hide");
    document
        .getElementById("starterTable")
        .parentElement.classList.add("tableOverflow");

    // display header
    document.getElementById(
        "starterHeader"
    ).innerHTML = `Instructions for ${data.starterTarget} grams of starter with ${data.starterRemain} gram(s) of excess`;
    document.getElementById("starterHeader").classList.add("show");
    document.getElementById("starterHeader").classList.remove("hide");

    // 1st feed info
    document.getElementById("starterOutput1").innerHTML =
        "Feeding 1: Combine previously saved starter with the flour and water. Mix until well incorporated. Let sit for 8-12 hours";
    document.getElementById("starterOutput1").classList.add("show");
    document.getElementById("starterOutput1").classList.remove("hide");

    // 1st feed info
    if (data.feedings === 2) {
        document.getElementById("starterOutput2").innerHTML =
            "Feeding 2: Combine the result of feeding 1 with the flour and water. Mix until well incorporated. Let sit for 8-12 hours";
        document.getElementById("starterOutput2").classList.add("show");
        document.getElementById("starterOutput2").classList.remove("hide");
    }

    document.getElementById("instructions").classList.remove("boxed");
    document.getElementById("instructions").classList.add("boxed");
    document.getElementById("instructions").classList.remove("paperBack");
    document.getElementById("instructions").classList.add("paperBack");
}

function tableRowGen(data) {
    /**
     * a method to generate a table row
     */

    let row = document.createElement("tr");
    for (let i = 0; i < data.length; ++i) {
        let insElement = document.createElement("td");
        let entry = document.createTextNode(data[i]);
        insElement.appendChild(entry);
        row.appendChild(insElement);
    }
    return row;
}

// make a rounding function!!

function round(num) {
    let aNum = num;
    aNum = aNum * 100;
    aNum = Math.round(aNum);
    aNum = aNum / 100;
    return aNum;
}
