function GetOnboardingState() {
    return sessionStorage.getItem("onboardingState");
}
function SetOnboardingState(state) {
    sessionStorage.setItem("onboardingState", state);
}

function ShowPopup(element) {
    if (element) showElement(element);
}

function HidePopup(element) {
    if (element) hideElement(element);
}

function getJsonContent() {
    let retrievedObject = sessionStorage.getItem("onboardingObj");
    return JSON.parse(retrievedObject);
}

function setJsonContent(obj) {
    sessionStorage.setItem("onboardingObj", JSON.stringify(obj));
}

function resetJsonContent() {
    let obj = getJsonContent();
    obj.firstName = null;
    obj.lastName = null;
    obj.personalNumber = null;
    obj.deliveries = [];
    setJsonContent(obj);
}

function addressChange() {
    document.getElementById("meterNumberAdd").value = "";
}

function gotoStep(step, sub, deliveryId = null) {
    let jsonContent = getJsonContent();

    const elementConfirm = $("#step3-confirm");
    removeAllSpinners();
    removeAllInvalid();
    removeAllPulse();

    if (step != 1) {
        showElement("#step1-sum");
        hideElement("#step1");
        hideElement("#step1-cell");
        hideElement("#step1-verification");
    }
    if (step != 2) {
        showElement("#step2-sum");
        hideElement("#step2");
        hideElement("#step2-edit");
    }
    if (step != 3) {
        if (elementConfirm.hasClass("showOrderDetails")) {
            elementConfirm.addClass("hideOrderDetails");
            elementConfirm.removeClass("showOrderDetails");
        }
        hideElement("#step2-editpen");
        hideElement("#step12-space");
        showElement("#step3-sum");
        hideElement("#step3-confirm");
    }

    //debugger;
    if (step == 1) {
        hideElement("#step1-sum");
        hideElement("#step2-edit");

        removeDisabled("#btnSubmitCellSearch");

        if (sub == "intro") {
            clearDeliveryFields(true);
            sessionStorage.removeItem("onboardingObj");
            if (getUrlParam("code")) {
                window.location.assign("/landingsside-v2#onboarding");
            }
            showElement("#step1");
            showElement("#step1-intro");
            hideElement("#step1-cell");
            hideElement("#step1-verification");
        } else if (sub == "cell") {
            hideElement("#step1-intro");
            hideElement("#step1-verification");
            showElement("#step1-cell");
        } else if (sub == "verification") {
            debugger;
            hideElement("#step1-intro");
            hideElement("#step1-cell");
            showElement("#step1-verification");
        }
    } else if (step == 2) {
        hideElement("#step2-sum");
        hideElement("#step2-edit");
        hideElement("#step2email");

        if (
            sub == "back" &&
            jsonContent.firstName == "" &&
            jsonContent.lastName == ""
        ) {
            gotoStep(1, "intro");
            return;
        }

        //debugger;
        if (!jsonContent.personalNumber) showElement("#sep1-pnr");
        //else
        //    hideElement("#sep1-pnr");

        if (sub == "manual" || sub == "reset") {
            //edit
            if (sub == "reset") {
                clearDeliveryFields(true);
                $("#deliveriesContainer").empty();
                resetJsonContent();
            }
            hideElement("#step2");
            showElement("#step2-edit");
            stepNameEdit(true);

            showElement("#step2EditButton");
            hideElement("#step2AddButton");
        } else if (sub == "edit") {
            hideElement("#step2");
            showElement("#step2-edit");
            showElement("#step2EditButton");
            hideElement("#step2AddButton");

            showElement("#sep1-pnr");
            if (jsonContent.authMethod == "Phone") {
                if (
                    jsonContent &&
                    jsonContent.deliveries &&
                    jsonContent.deliveries.length == 1
                ) {
                    stepNameEdit(true);
                } else {
                    stepNameEdit(false);
                }
            } else if (jsonContent.authMethod == "Vipps") {
                stepNameEdit(false);
                setReadonly("#personalNumberEdit");
            }
        } else if (sub == "add") {
            clearDeliveryFields();
            hideElement("#step2");
            showElement("#step2-edit");
            showElement("#step2AddButton");
            hideElement("#step2EditButton");
            showElement("#sep1-pnr");

            setFnrField(jsonContent);

            /*if (jsonContent.authMethod == "Phone") {*/
            if (
                jsonContent &&
                jsonContent.deliveries &&
                jsonContent.deliveries.length > 0
            ) {
                setReadonly("#firstNameEdit");
                setReadonly("#lastNameEdit");
                setReadonly("#personalNumberEdit");
                stepNameEdit(false);
            } else {
                stepNameEdit(true);
            }
            //}
            //else {
            //    stepNameEdit(false);
            //}
        } else {
            showElement("#step2");
        }

        if (jsonContent && !jsonContent.email) showElement("#step2email");
    } else if (step == 3) {
        showElement("#step3-confirm");
        showElement("#step12-space");
        if (sub == "orderdetails") {
            if (elementConfirm.hasClass("hideOrderDetails")) {
                elementConfirm.addClass("showOrderDetails");
                elementConfirm.removeClass("hideOrderDetails");
            } else {
                elementConfirm.addClass("hideOrderDetails");
                elementConfirm.removeClass("showOrderDetails");
            }
        } else {
            showElement("#step2-editpen");
            hideElement("#step3-sum");
        }
    } else if (step == 4) {
        showElement("#step-createorder");
        hideElement("#onboarding-container");
    }

    //debugger;
    if (/Android|iPhone/i.test(navigator.userAgent)) {
        if (step == 1) {
            scrollToElementOnboarding("#step1");
            //scrollToElement('#step1-scrollto');
        } else if (step == 2) {
            scrollToElementOnboarding("#step2");
            //scrollToElement('#step2-scrollto');
        } else if (step == 3) {
            //scrollToElement('#step3-scrollto');
            scrollToElementOnboarding("#step3-confirm");
        }
    }
}

function scrollToElementOnboarding(el2) {
    // This checks if the current device is in fact mobile
    var el = document.querySelector(el2);
    var viewportOffset = el.getBoundingClientRect();
    // these are relative to the viewport, i.e. the window
    var top = viewportOffset.top;
    var sc = top - 92;
    window.scrollBy(0, sc);
}

function stepNameEdit(edit) {
    if (edit) {
        removeReadonly("#firstNameEdit");
        removeReadonly("#lastNameEdit");
        hideElement("#btnResetUser");
    } else {
        setReadonly("#firstNameEdit");
        setReadonly("#lastNameEdit");
        showElement("#btnResetUser");
    }
}

function clearDeliveryFields(all = false) {
    $("#step2-edit input").each(function () {
        if ($(this).data("type") != "notclear" || all) {
            $(this).val(null);
        }
    });
}

function AppendDeliveryV2(obj, index) {
    var meterNumber = obj.meterNumber;
    if (!meterNumber) {
        meterNumber = "";
    } else if (meterNumber.length > 12) {
        var part = meterNumber.slice(8, 12);
        meterNumber = meterNumber.replace(part, "xxxx");
    }
    var isSelected = "";
    if (obj.isSelected) {
        isSelected = 'checked="checked"';
    }

    var temp = $.trim($("#deliveryNew").html());
    //debugger;
    var firstName = $("#firstNameEdit").val();
    var lastName = $("#lastNameEdit").val();

    var x = temp.replace(/{{Firstname}}/gi, firstName);
    x = x.replace(/{{Lastname}}/gi, lastName);
    x = x.replace(/{{Address}}/gi, obj.address);
    x = x.replace(/{{HouseNo}}/gi, obj.houseNumber);
    x = x.replace(/{{ZipCode}}/gi, obj.zipcode);
    x = x.replace(/{{Place}}/gi, obj.place);

    //x = x.replace(/{{meterNumber}}/ig, obj.meterNumber);
    if (meterNumber) {
        x = x.replace(/{{meterNumber}}/gi, meterNumber);
    } else {
        x = x.replace(/{{meterNumberClass}}/gi, "hidden");
    }
    x = x.replace(/{{index}}/gi, index);
    x = x.replace(/{{checked}}/gi, isSelected);
    $("#deliveriesContainer").append(x);
}

function EditDeliveryV2(el, index) {
    //debugger;
    $("#deliveryIdEdit").val(index);

    var datael = $(el);
    if (datael) {
        var address = $(datael).find(".address").html();
        if (address) $("#onboardingAddressEdit").val(address);

        var houseno = $(datael).find(".houseno").html();
        if (houseno) $("#onboardingHouseNoEdit").val(houseno);

        var zipcode = $(datael).find(".zipcode").html();
        if (zipcode) $("#onboardingZipEdit").val(zipcode);

        var place = $(datael).find(".place").html();
        if (place) $("#onboardingPlaceEdit").val(place);

        let obj = getJsonContent();
        if (obj == null) {
            return null;
        }

        $("#firstNameEdit").val(obj.firstName);
        $("#lastNameEdit").val(obj.lastName);

        setFnrField(obj);

        let mnum = obj.deliveries[index].meterNumber;
        if (mnum) {
            $("#meterNumberAdd").val(mnum);
        }
    }

    gotoStep(2, "edit");
}

function setFnrField(obj) {
    let pnr = "";
    if (obj.personalNumber) {
        if (obj.personalNumber.length > 11) {
            pnr = "***********";
        } else {
            pnr = obj.personalNumber;
        }
    }
    $("#personalNumberEdit").val(pnr);
}

function AddNewDeliveryV2(e) {
    //debugger;
    let retrievedObject = sessionStorage.getItem("onboardingObj");
    if (retrievedObject == null) {
        return null;
    }
    let jsonContent = JSON.parse(retrievedObject);
    let state = GetOnboardingState();
    if (state === "unhappy") {
        jsonContent.firstName = $("#firstNameEdit").val();
        jsonContent.lastName = $("#lastNameEdit").val();
        var pnr = $("#personalNumberEdit").val();
        if (!pnr.startsWith("*")) jsonContent.personalNumber = pnr;
    }
    //debugger;
    let moveTakeover = $("#supply-takover").is(":checked");
    let changeOfSup = !moveTakeover ? "ChangeOfSupply" : "Move";
    let moveDate = moveTakeover ? $("#takoverDate").val() : null;

    const delivery = {
        address: $("#onboardingAddressEdit").val(),
        houseNumber: $("#onboardingHouseNoEdit").val(),
        zipcode: $("#onboardingZipEdit").val(),
        place: $("#onboardingPlaceEdit").val(),
        country: null,
        mpid: null,
        meterNumber: null,
        changeOfSupplyType: changeOfSup,
        moveDate: moveDate,
        isSelected: true,
    };
    let meternumber = $("#meterNumberAdd").val();
    if (meternumber) {
        delivery.meterNumber = meternumber;
    }
    jsonContent.deliveries.push(delivery);

    showDeliveries(jsonContent);

    sessionStorage.setItem("onboardingObj", JSON.stringify(jsonContent));
    gotoStep(2);
}

function showDeliveries(jsonContent) {
    $("#deliveriesContainer").empty();
    if (!!jsonContent.deliveries) {
        let i = 0;
        jsonContent.deliveries.forEach((element) => {
            AppendDeliveryV2(element, i);
            i = i + 1;
        });
    }
}

function DeleteDelivery(index) {
    //debugger;
    let retrievedObject = sessionStorage.getItem("onboardingObj");
    if (retrievedObject == null) {
        return null;
    }
    let jsonContent = JSON.parse(retrievedObject);
    if (!!jsonContent.deliveries) {
        jsonContent.deliveries.splice(index, 1);
    }
    sessionStorage.setItem("onboardingObj", JSON.stringify(jsonContent));
    SyncUserDeliveries();
}

function SyncUserDeliveries() {
    //debugger;
    let retrievedObject = sessionStorage.getItem("onboardingObj");
    if (retrievedObject == null) {
        return null;
    }
    let jsonContent = JSON.parse(retrievedObject);

    if (!!jsonContent.deliveries) {
        let i = 0;
        jsonContent.deliveries.forEach((element) => {
            //element.isSelected = true;
            AppendDeliveryV2(element, i);
            i = i + 1;
        });
    }
    showDeliveries(jsonContent);
    return jsonContent;
}

function SyncUserDataV2() {
    //debugger;
    let retrievedObject = sessionStorage.getItem("onboardingObj");
    if (retrievedObject == null) {
        return null;
    }
    let jsonContent = JSON.parse(retrievedObject);

    jsonContent.expeditedStartup = $("#confirm-faststartup").is(":checked");
    jsonContent.newsletter = $("#confirm-news").is(":checked");

    return jsonContent;
}

function SyncUserDataEditObject(index, mpid, meterNumber) {
    if (!index) {
        return null;
    }

    let retrievedObject = sessionStorage.getItem("onboardingObj");
    if (retrievedObject == null) {
        return null;
    }

    let jsonContent = JSON.parse(retrievedObject);
    jsonContent.deliveries[index].mpid = mpid;
    jsonContent.deliveries[index].meterNumber = meterNumber;
    sessionStorage.setItem("onboardingObj", JSON.stringify(jsonContent));
}

function getUrlParam(key) {
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has(key)) {
        return searchParams.get(key);
    }
    return "";
}

function getUtmCodes() {
    let retrievedObject = sessionStorage.getItem("trackingObj");
    if (!retrievedObject) return "";
    let trackingObj = JSON.parse(retrievedObject);
    if (!trackingObj) return "";

    let result = "?";
    if (trackingObj.utm_source) {
        if (result != "?") {
            result += "&";
        }
        result += "utm_source=" + trackingObj.utm_source;
    }
    if (trackingObj.utm_medium) {
        if (result != "?") {
            result += "&";
        }
        result += "utm_medium=" + trackingObj.utm_medium;
    }
    if (trackingObj.utm_campaign) {
        if (result != "?") {
            result += "&";
        }
        result += "utm_campaign=" + trackingObj.utm_campaign;
    }
    if (trackingObj.utm_term) {
        if (result != "?") {
            result += "&";
        }
        result += "utm_term=" + trackingObj.utm_term;
    }
    if (trackingObj.utm_content) {
        if (result != "?") {
            result += "&";
        }
        result += "utm_content=" + trackingObj.utm_content;
    }

    if (result == "?") {
        return "";
    }
    return result;
}

function OnboardingCell(cell, email, verificationCode) {
    //debugger;
    //if (isLoading()) {
    //    return;
    //}

    //console.log('onboarding_cell ' + cell);

    let retrievedObject = sessionStorage.getItem("trackingObj");
    let trackingObj = JSON.parse(retrievedObject);

    //CustomerSaleLead(cell, email);

    OnboardingLookupV2(
        cell,
        email,
        null,
        null,
        null,
        trackingObj,
        verificationCode
    );
}

function showOrderDetails() {
    //debugger;
    let obj = getJsonContent();
    if (obj == null) {
        return null;
    }

    var customerHtml = $.trim($("#orderDetailsCustomer").html());
    var x = customerHtml.replace(/{{Firstname}}/gi, obj.firstName);
    x = x.replace(/{{Lastname}}/gi, obj.lastName);
    x = x.replace(/{{Cell}}/gi, obj.cell);
    x = x.replace(/{{Email}}/gi, obj.email);
    $("#step3CustomerDataContainer").html(x);

    var deliveriesHtmlTemplate = $.trim($("#orderDetailsDeliveries").html());
    var counter = 0;
    var deliveriesHtml = "";

    var deliveries = obj.deliveries;

    var showStep3CustomerText = false;

    deliveries.forEach((del, index) => {
        var x = deliveriesHtmlTemplate.replace(/{{Address}}/gi, del.address);
        x = x.replace(/{{HouseNumber}}/gi, del.houseNumber);
        x = x.replace(/{{ZipCode}}/gi, del.zipcode);
        x = x.replace(/{{Place}}/gi, del.place);

        if (index > 0) {
            x = x.replace(/{{andClass}}/gi, "");
        } else {
            x = x.replace(/{{andClass}}/gi, "hidden");
        }
        deliveriesHtml = deliveriesHtml + x;

        if (!del.meterNumber) {
            showStep3CustomerText = true;
        }
    });

    $("#step3CustomerDeliveriesContainer").html(deliveriesHtml);

    if (showStep3CustomerText) {
        showElement("#step3CustomerText");
    }

    gotoStep(3, "orderdetails");
}

function OnboardingSetup() {
    $('[name="takover"]').click(function () {
        var checked = $(this).is(":checked");
        if (checked) {
            $("#takeover-date").removeClass("hidden");
        } else {
            $("#takeover-date").addClass("hidden");
            document.getElementById('takoverDate').value = "";
            hideElement("#step2moveregret");
        }
    });

    $("#vipps-button").on("click", function () {
        getVippsUrl().then((url) => {
            window.location.href = url;
        });
    });

    //OnChange -----------------
    $("#onboardingZipEdit").change(function () {
        //debugger;
        let zip = $(this).val();
        $("#onboardingPlaceEdit").val("");
        validateZip(zip);
    });

    $("#onboardingZipEdit").on("keyup change", function (e) {
        //debugger;
        let zip = $(this).val();
        $("#onboardingPlaceEdit").val("");
        validateZip(zip);
    });

    $("#acceptedTerms").change(function () {
        if (this.checked) {
            $("#onboardingSaleButton").prop("disabled", false);
        } else {
            $("#onboardingSaleButton").prop("disabled", true);
        }
    });

    document.getElementById('takoverDate').addEventListener('change', checkDate);

    $("#onboardingSaleButton").click(function () {
        // if (isLoading()) {
        //     return;
        // }
        //debugger;
        showPulse("#step3-confirm");
        showSpinner("#onboardingSaleButton");
        showNewSpinner(4);

        OnboardingSaleV2(window.profile);
    });

    Array.from(document.querySelectorAll(".form-popup-close")).forEach((e) =>
        e.addEventListener("click", function (e) {
            e.preventDefault();
            e.closest(".form-popup").addClass("hidden");
        })
    );

    if (
        window.location.href.indexOf("#onboarding") > -1 ||
        window.location.href.indexOf("#error_description") > -1
    ) {
        //$('html, body').animate({
        //    scrollTop: $("#onboardingformV2").offset().top - 200
        //}, 500);
        scrollToElementOnboarding("#onboardingformV2");
    }

    vippsAuthCode = getVippsAuthCode();

    var obj = getJsonContent();
    let sessionVippsAuthCode = vippsAuthCode;
    const redirectUrl = getRedirectURL();

    if (vippsAuthCode) {
        if (!obj) {
            obj = {};
        }
        obj.authMethod = "Vipps";
        obj.vippsAuthCode = vippsAuthCode;
        obj.vippsState = getVippsState();
        setJsonContent(obj);
        window.history.pushState(null, null, redirectUrl);
    }

    if (obj && obj.vippsAuthCode) sessionVippsAuthCode = obj.vippsAuthCode;

    if (obj && obj.authMethod == "Vipps" && sessionVippsAuthCode) {
        showPulse("#step1-intro");

        let retrievedObject = sessionStorage.getItem("trackingObj");
        let trackingObj = JSON.parse(retrievedObject);
        //debugger;
        const targetElement = $("#onboardingformV2");
        const offsetTop =
            targetElement.length && targetElement.offset()
                ? targetElement.offset().top
                : 0;

        OnboardingLookupV2(
            null,
            null,
            sessionVippsAuthCode,
            obj.vippsState,
            redirectUrl,
            trackingObj
        );
        $("html, body").animate(
            {
                scrollTop: offsetTop - 250,
            },
            1
        );
        removePulse("#step1-intro");
    }

    OnboardingValidationSetup();
}

function getVippsState() {
    return getQueryParamValue("state");
}

function getVippsAuthCode() {
    return getQueryParamValue("code");
}



