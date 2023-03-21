var onboarding;
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 686:
/***/ (() => {


function validateEmail(field) {
    let regex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
    let value = field.value;
    if (regex.test(value)) {
        field.classList.remove("is-invalid");
        return value;
    } else {
        field.classList.add("is-invalid");
    }

    return null;
}
function validateCell(field) {

    let regex = /^((4|(?:9))\d{7})$/;
    let value = field.value;
    field.value = value.trim();
    if (value.indexOf('+47') > -1) {
        value = value.replace('+47', '');
        field.value = value;
    }
    if (regex.test(value)) {
        field.classList.remove("is-invalid");
        return value;
    } else {
        field.classList.add("is-invalid");
    }

    return null;
}
function clearFnr() {
    $("personalNumberEdit").val('');
}

function validateFnrChange(value) {
    let field = document.getElementById("personalNumberEdit");
    return validateFnr(field);
}

function validateFnr(field, value) {

    let regex = /^(\d{11})$/;

    if (!value) {
        value = field.value;
        value = value.trim();
    }

    if (regex.test(value)) {
        field.classList.remove("is-invalid");
        return value;
    } else {
        field.classList.add("is-invalid");
    }

    return null;
}

$(document).ready(function () {
    // Validate Email
    let lookup = document.forms.lookup;
    //lookup.addEventListener("focusin", () => lookup.classList.add('focused'));
    //lookup.addEventListener("blur", () => lookup.classList.remove('focused'), true);
    const emailField = document.getElementById("onboarding_email");
    if (emailField) {
        emailField.addEventListener("blur", () => {
            let email = emailField.value;
            validateEmail(emailField);
        });
    }

    const cellField = document.getElementById("onboarding_cell");
    if (cellField) {
        cellField.addEventListener("blur", () => {
            let cell = cellField.value;
            validateCell(cellField);
        });
    }

    //step1 cell lookip validation
    $("#lookup").submit(function (event) {
        event.preventDefault();

        //var test = token;
        let cellField = document.getElementById("onboarding_cell");
        let emailField = document.getElementById("onboarding_email");

        var validCell = validateCell(cellField);
        var validEmail = validateEmail(emailField);

        var valid = validCell && validEmail;
        if (valid)
            OnboardingCell(validCell, validEmail);

        return false;
    });





    //$("#firstNameEdit").blur(function () {
    $('#firstNameEdit').on('blur', function () {
        clearPnr('firstname', $("#firstNameEdit").val());
    });

    $("#lastNameEdit").blur(function () {
        clearPnr('lastname', $("#lastNameEdit").val());
    });
  
});

// function clearPnr(field, newVal) {
//     //debugger;
//     let obj = getJsonContent();
//     if (obj == null) {
//         return null;
//     }
//     let val = obj.firstName;
//     if (field == 'lastname')
//         val = obj.lastName;
//
//     if (obj.authMethod != "Vipps") {
//         if (val.toLowerCase() != newVal.toLowerCase()) {
//             $("#personalNumberEdit").val('');
//         }
//     }
// }
//
// function validateInitData(cell, email) {
//
//     var validCell = cell.length == 8;
//     var validEmail = validateEmail(email);
//
//     return validEmail && validCell;
// }
//
//
// //Steps
// function validate(type, part) {
//     let obj = getJsonContent();// sessionStorage.getItem('onboardingObj');
//     if (obj == null) {
//         return null;
//     }
//
//     var allValid = true;
//     if (type == "step1") {
//         let cell = $("#onboarding_cell").val();
//         cell = cleanCellNumber(cell);
//
//         var validCell = false;
//         if (cell.length == 8)
//             validCell = true;
//
//         //let email = $("#onboarding_email").val();
//         //var validEmail = validateEmail(email);
//
//         if (validCell && validEmail) {
//             OnboardingCell(cell, email);
//             //gotoStep(2, 'search');
//         }
//     }
//     else if (type == "step2") {
//         //debugger;
//
//         if (obj.authMethod != "Vipps") {
//             var personalNumberEdit = $("#personalNumberEdit").val();
//             var firstNameEdit = $("#firstNameEdit").val();
//             var lastNameEdit = $("#lastNameEdit").val();
//
//             if (obj.firstName != firstNameEdit || obj.lastNameEdit != lastNameEdit) {
//                 obj.firstName = firstNameEdit;
//                 obj.lastName = lastNameEdit;
//                 if (!personalNumberEdit || personalNumberEdit.length != 11) {
//                     addInvalid("#personalNumberEdit");
//                     allValid = false;
//                 }
//                 else if (!personalNumberEdit.startsWith('*')) {
//                     let pnrField = document.getElementById("personalNumberEdit");
//                     var validPnr = validateFnr(pnrField);
//                     if (validPnr)
//                         obj.personalNumber = validPnr;
//                     else
//                         allValid = false;
//                 }
//                 setJsonContent(obj);
//             }
//         }
//
//
//         if (part == "overview") {
//             //debugger;
//             if (obj.deliveries && obj.deliveries.length > 0) {
//                 gotoStep(3);
//             }
//             else {
//                 gotoStep(2, 'manual');
//             }
//         }
//         else {
//
//             if (!obj.cell)
//                 allValid = false;
//
//
//             var validEmail = obj.email;
//             if (!validEmail) {
//                 let emailField = document.getElementById("onboarding_email_edit");
//                 var validEmail = validateEmail(emailField);
//                 if (!validEmail)
//                     allValid = false;
//                 else {
//
//                     obj.email = validEmail;
//                     sessionStorage.setItem('onboardingObj', JSON.stringify(obj));
//                 }
//             }
//
//             $('#step2-edit .required').each(function () {
//                 //debugger;
//                 var el = $(this);
//                 var val = el.val();
//                 if (val) {
//                     removeInvalid(el);
//                 }
//                 else {
//                     addInvalid(el);
//                     allValid = false;
//                 }
//             });
//
//             //debugger;
//             var zip = $("#onboardingZipEdit").val();
//             var validZip = false;
//             if (zip.length == 4) {
//                 var elementPlace = $('#onboardingPlaceEdit').val();
//                 if (elementPlace != 'Ugyldig postnummer') {
//                     validZip = true;
//                 }
//             }
//
//             if (!validZip) {
//                 allValid = false;
//                 InvalidZip();
//             }
//
//             //debugger;
//             if (allValid) {
//                 removeAllInvalid();
//                 if (part == "add") {
//                     AddNewDeliveryV2();
//                 }
//                 else {
//                     CustomerSaleLead(obj.cell, validEmail);
//                     SaveEditDeliveryV2();
//                     gotoStep(2);
//                 }
//             }
//         }
//     }
// }
//
// function validateZip(zip) {
//     if (zip) {
//         if (zip.length == 4) {
//             return OnboardingPlaceFromZipV2(zip);
//         }
//         else if ((zip.length > 4)) {
//             InvalidZip();
//             return false;
//         }
//     }
//     return false;
// }


// Onboarding validate

// function validateEmail(field) {
//     let regex = /^([_-.0-9a-zA-Z]+)@([_-.0-9a-zA-Z]+).([a-zA-Z]){2,7}$/;
//     let value = field.value;
//     if (regex.test(value)) {
//         field.classList.remove("is-invalid");
//         return value;
//     } else {
//         field.classList.add("is-invalid");
//     }
//
//     return null;
// }
// function validateCell(field) {
//
//     let regex = /^((4|(?:9))d{7})$/;
//     let value = field.value;
//     field.value = value.trim();
//     if (value.indexOf('+47') > -1) {
//         value = value.replace('+47', '');
//         field.value = value;
//     }
//     if (regex.test(value)) {
//         field.classList.remove("is-invalid");
//         return value;
//     } else {
//         field.classList.add("is-invalid");
//     }
//
//     return null;
// }



// function validateFnr(field, value) {
//
//     let regex = /^(d{11})$/;
//
//     if (!value) {
//         value = field.value;
//         value = value.trim();
//     }
//
//     if (regex.test(value)) {
//         field.classList.remove("is-invalid");
//         return value;
//     } else {
//         field.classList.add("is-invalid");
//     }
//
//     return null;
// }

document.addEventListener('DOMContentLoaded', function () {
    // Validate Email
    let lookup = document.forms.lookup;
    //lookup.addEventListener("focusin", () => lookup.classList.add('focused'));
    //lookup.addEventListener("blur", () => lookup.classList.remove('focused'), true);
    const emailField = document.getElementById("onboarding_email");
    if (emailField) {
        emailField.addEventListener("blur", () => {
            let email = emailField.value;
            validateEmail(emailField);
        });
    }

    const cellField = document.getElementById("onboarding_cell");
    if (cellField) {
        cellField.addEventListener("blur", () => {
            let cell = cellField.value;
            validateCell(cellField);
        });
    }

    //step1 cell lookip validation
    document.querySelector("#lookup").submit(function (event) {
        event.preventDefault();

        //var test = token;
        let cellField = document.getElementById("onboarding_cell");
        let emailField = document.getElementById("onboarding_email");

        var validCell = validateCell(cellField);
        var validEmail = validateEmail(emailField);

        var valid = validCell && validEmail;
        if (valid)
            OnboardingCell(validCell, validEmail);

        return false;
    });





    //document.querySelector("#firstNameEdit").blur(function () {
    document.querySelector('#firstNameEdit').addEventListener('blur', function () {
        clearPnr('firstname', document.querySelector("#firstNameEdit").value);
    });

    document.querySelector("#lastNameEdit").blur(function () {
        clearPnr('lastname', document.querySelector("#lastNameEdit").value);
    });

});

function clearPnr(field, newVal) {
    //debugger;
    let obj = getJsonContent();
    if (obj == null) {
        return null;
    }
    let val = obj.firstName;
    if (field == 'lastname')
        val = obj.lastName;

    if (obj.authMethod != "Vipps") {
        if (val.toLowerCase() != newVal.toLowerCase()) {
            document.querySelector("#personalNumberEdit").val('');
        }
    }
}

function validateInitData(cell, email) {

    var validCell = cell.length == 8;
    var validEmail = validateEmail(email);

    return validEmail && validCell;
}


//Steps
function validate(type, part) {
    let obj = getJsonContent();// sessionStorage.getItem('onboardingObj');
    if (obj == null) {
        return null;
    }

    var allValid = true;
    if (type == "step1") {
        let cell = document.querySelector("#onboarding_cell").value;
        cell = cleanCellNumber(cell);

        var validCell = false;
        if (cell.length == 8)
            validCell = true;

        //let email = document.querySelector("#onboarding_email").value;
        //var validEmail = validateEmail(email);

        if (validCell && validEmail) {
            OnboardingCell(cell, email);
            //gotoStep(2, 'search');
        }
    }
    else if (type == "step2") {
        //debugger;

        if (obj.authMethod != "Vipps") {
            var personalNumberEdit = document.querySelector("#personalNumberEdit").value;
            var firstNameEdit = document.querySelector("#firstNameEdit").value;
            var lastNameEdit = document.querySelector("#lastNameEdit").value;

            if (obj.firstName != firstNameEdit || obj.lastNameEdit != lastNameEdit) {
                obj.firstName = firstNameEdit;
                obj.lastName = lastNameEdit;
                if (!personalNumberEdit || personalNumberEdit.length != 11) {
                    addInvalid("#personalNumberEdit");
                    allValid = false;
                }
                else if (!personalNumberEdit.startsWith('*')) {
                    let pnrField = document.getElementById("personalNumberEdit");
                    var validPnr = validateFnr(pnrField);
                    if (validPnr)
                        obj.personalNumber = validPnr;
                    else
                        allValid = false;
                }
                setJsonContent(obj);
            }
        }


        if (part == "overview") {
            //debugger;
            if (obj.deliveries && obj.deliveries.length > 0) {
                gotoStep(3);
            }
            else {
                gotoStep(2, 'manual');
            }
        }
        else {

            if (!obj.cell)
                allValid = false;


            var validEmail = obj.email;
            if (!validEmail) {
                let emailField = document.getElementById("onboarding_email_edit");
                var validEmail = validateEmail(emailField);
                if (!validEmail)
                    allValid = false;
                else {

                    obj.email = validEmail;
                    sessionStorage.setItem('onboardingObj', JSON.stringify(obj));
                }
            }

            document.querySelector('#step2-edit .required').each(function () {
                //debugger;
                var el = document.querySelector(this);
                var val = el.value;
                if (val) {
                    removeInvalid(el);
                }
                else {
                    addInvalid(el);
                    allValid = false;
                }
            });

            //debugger;
            var zip = document.querySelector("#onboardingZipEdit").value;
            var validZip = false;
            if (zip.length == 4) {
                var elementPlace = document.querySelector('#onboardingPlaceEdit').value;
                if (elementPlace != 'Ugyldig postnummer') {
                    validZip = true;
                }
            }

            if (!validZip) {
                allValid = false;
                InvalidZip();
            }

            //debugger;
            if (allValid) {
                removeAllInvalid();
                if (part == "add") {
                    AddNewDeliveryV2();
                }
                else {
                    CustomerSaleLead(obj.cell, validEmail);
                    SaveEditDeliveryV2();
                    gotoStep(2);
                }
            }
        }
    }
}

function validateZip(zip) {
    if (zip) {
        if (zip.length == 4) {
            return OnboardingPlaceFromZipV2(zip);
        }
        else if ((zip.length > 4)) {
            InvalidZip();
            return false;
        }
    }
    return false;
}

/***/ }),

/***/ 870:
/***/ (() => {


function GetOnboardingState() {
    return sessionStorage.getItem('onboardingState');
}
function SetOnboardingState(state) {
    sessionStorage.setItem('onboardingState', state);
}

function ShowPopup(element) {
    if (element)
        showElement(element);
}

function HidePopup(element) {
    if (element)
        hideElement(element);
}

Array.from(document.querySelectorAll(".form-popup-close"))
    .forEach(e => e.addEventListener("click", function (e) {
        e.preventDefault();
        e.closest(".form-popup").addClass("hidden");
}));

function getJsonContent() {
    let retrievedObject = sessionStorage.getItem('onboardingObj');
    return JSON.parse(retrievedObject);
}

function setJsonContent(obj) {
    sessionStorage.setItem('onboardingObj', JSON.stringify(obj));
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
    document.getElementById("meterNumberAdd").value = ''
}


function gotoStep(step, sub, deliveryId = null) {
    let jsonContent = getJsonContent();
    //debugger;

    const elementConfirm = document.getElementById("#step3-confirm")
    removeAllSpinners();
    removeAllInvalid();
    removeAllPulse();

    if (step != 1) {
        showElement("#step1-sum");
        hideElement("#step1");
        hideElement("#step1-cell");
    }
    if (step != 2) {
        showElement("#step2-sum");
        hideElement("#step2");
        hideElement("#step2-edit");
    }
    if (step != 3) {
        if (elementConfirm.hasClass('showOrderDetails')) {
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

        if (sub == 'intro') {
            clearDeliveryFields(true);
            sessionStorage.removeItem('onboardingObj');
            if (getUrlParam('code')) {
                window.location.assign('/landingsside-v2#onboarding');
            }
            showElement("#step1");
            showElement("#step1-intro");
            hideElement("#step1-cell");
        }
        else if (sub == 'cell') {
            hideElement("#step1-intro");
            showElement("#step1-cell");
        }
    }
    else if (step == 2) {
        hideElement("#step2-sum");
        hideElement("#step2-edit");
        hideElement("#step2email");
        
        if (sub == 'back' && jsonContent.firstName == '' && jsonContent.lastName == '') {
            gotoStep(1, 'intro');
            return;
        }

        //debugger;
        if (!jsonContent.personalNumber)
            showElement("#sep1-pnr");
        //else
        //    hideElement("#sep1-pnr");


        if (sub == 'manual' || sub == 'reset') { //edit
            if (sub == 'reset') {
                clearDeliveryFields(true);
                $("#deliveriesContainer").empty();
                resetJsonContent();
            }
            hideElement("#step2");
            showElement("#step2-edit");
            stepNameEdit(true);

            showElement("#step2EditButton");
            hideElement("#step2AddButton");

        } else if (sub == 'edit') {
            hideElement("#step2");
            showElement("#step2-edit");
            showElement("#step2EditButton");
            hideElement("#step2AddButton");

            showElement("#sep1-pnr");
            if (jsonContent.authMethod == "Phone") {
                if (jsonContent && jsonContent.deliveries && jsonContent.deliveries.length == 1) {
                    stepNameEdit(true);
                }
                else {
                    stepNameEdit(false);
                }
            }
            else if (jsonContent.authMethod == "Vipps") {
                stepNameEdit(false);
                setReadonly("#personalNumberEdit");
            }
        }
        else if (sub == 'add') {
            clearDeliveryFields();
            hideElement("#step2");
            showElement("#step2-edit");
            showElement("#step2AddButton");
            hideElement("#step2EditButton");
            showElement("#sep1-pnr");

            setFnrField(jsonContent);


            /*if (jsonContent.authMethod == "Phone") {*/
                if (jsonContent && jsonContent.deliveries && jsonContent.deliveries.length > 0) {
                    setReadonly("#firstNameEdit");
                    setReadonly("#lastNameEdit");
                    setReadonly("#personalNumberEdit");
                    stepNameEdit(false);
                }
                else {
                    stepNameEdit(true);
                }
            //}
            //else {
            //    stepNameEdit(false);
            //}
        }
        else {
            showElement("#step2");
        }




        if (jsonContent && !jsonContent.email)
            showElement("#step2email");

    }
    else if (step == 3) {
        showElement("#step3-confirm");
        showElement("#step12-space");
        if (sub == 'orderdetails') {
            if (elementConfirm.hasClass('hideOrderDetails')) {
                elementConfirm.addClass("showOrderDetails");
                elementConfirm.removeClass("hideOrderDetails");
            }
            else {
                elementConfirm.addClass("hideOrderDetails");
                elementConfirm.removeClass("showOrderDetails");
            }
        }
        else {
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
            scrollToElementOnboarding('#step1');
            //scrollToElement('#step1-scrollto');
        }
        else if (step == 2) {
            scrollToElementOnboarding('#step2');
            //scrollToElement('#step2-scrollto');
        }
        else if (step == 3) {
            //scrollToElement('#step3-scrollto');
            scrollToElementOnboarding('#step3-confirm');
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
    }
    else {
        setReadonly("#firstNameEdit");
        setReadonly("#lastNameEdit");
        showElement("#btnResetUser");
    }
}


function clearDeliveryFields(all = false) {
    $('#step2-edit input').each(function () {
        if ($(this).data('type') != "notclear" || all) {
            $(this).val(null);
        }
    })
}

function AppendDeliveryV2(obj, index) {
    var meterNumber = obj.meterNumber;
    if (!meterNumber) {
        meterNumber = "";
    }
    else if (meterNumber.length > 12) {
        var part = meterNumber.slice(8, 12);
        meterNumber = meterNumber.replace(part, "xxxx");
    }
    var isSelected = "";
    if (obj.isSelected) {
        isSelected = "checked=\"checked\"";
    }


    var temp = $.trim($('#deliveryNew').html());
    //debugger;
    var firstName = $("#firstNameEdit").val();
    var lastName = $("#lastNameEdit").val();

    var x = temp.replace(/{{Firstname}}/ig, firstName);
    x = x.replace(/{{Lastname}}/ig, lastName);
    x = x.replace(/{{Address}}/ig, obj.address);
    x = x.replace(/{{HouseNo}}/ig, obj.houseNumber);
    x = x.replace(/{{ZipCode}}/ig, obj.zipcode);
    x = x.replace(/{{Place}}/ig, obj.place);

    //x = x.replace(/{{meterNumber}}/ig, obj.meterNumber);
    if (meterNumber) {
        x = x.replace(/{{meterNumber}}/ig, meterNumber);
    } else {
        x = x.replace(/{{meterNumberClass}}/ig, "hidden");
    }
    x = x.replace(/{{index}}/ig, index);
    x = x.replace(/{{checked}}/ig, isSelected);
    $('#deliveriesContainer').append(x);
}



function EditDeliveryV2(el, index) {
    //debugger;
    $("#deliveryIdEdit").val(index);

    var datael = $(el);
    if (datael) {

        var address = $(datael).find('.address').html();
        if (address)
            $("#onboardingAddressEdit").val(address);

        var houseno = $(datael).find('.houseno').html();
        if (houseno)
            $("#onboardingHouseNoEdit").val(houseno);

        var zipcode = $(datael).find('.zipcode').html();
        if (zipcode)
            $("#onboardingZipEdit").val(zipcode);

        var place = $(datael).find('.place').html();
        if (place)
            $("#onboardingPlaceEdit").val(place);

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

    gotoStep(2, 'edit');

}

function setFnrField(obj) {
    let pnr = '';
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
    let retrievedObject = sessionStorage.getItem('onboardingObj');
    if (retrievedObject == null) {
        return null;
    }
    let jsonContent = JSON.parse(retrievedObject);
    let state = GetOnboardingState();
    if (state === 'unhappy') {
        jsonContent.firstName = $("#firstNameEdit").val();
        jsonContent.lastName = $("#lastNameEdit").val();
        var pnr = $("#personalNumberEdit").val();
        if (!pnr.startsWith('*'))
            jsonContent.personalNumber = pnr;
    }
    //debugger;
    let moveTakeover = $('#supply-takover').is(':checked');
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
        isSelected: true
    };
    let meternumber = $("#meterNumberAdd").val();
    if (meternumber) {
        delivery.meterNumber = meternumber;
    }
    jsonContent.deliveries.push(delivery);

    showDeliveries(jsonContent);

    sessionStorage.setItem('onboardingObj', JSON.stringify(jsonContent));
    gotoStep(2);
}

function showDeliveries(jsonContent) {
    $("#deliveriesContainer").empty();
    if (!!jsonContent.deliveries) {
        let i = 0;
        jsonContent.deliveries.forEach(element => {
            AppendDeliveryV2(element, i);
            i = i + 1;
        });
    }
}

function DeleteDelivery(index) {
    //debugger;
    let retrievedObject = sessionStorage.getItem('onboardingObj');
    if (retrievedObject == null) {
        return null;
    }
    let jsonContent = JSON.parse(retrievedObject);
    if (!!jsonContent.deliveries) {
        jsonContent.deliveries.splice(index, 1);
    }
    sessionStorage.setItem('onboardingObj', JSON.stringify(jsonContent));
    SyncUserDeliveries();
}

function SyncUserDeliveries() {
    //debugger;
    let retrievedObject = sessionStorage.getItem('onboardingObj');
    if (retrievedObject == null) {
        return null;
    }
    let jsonContent = JSON.parse(retrievedObject);


    if (!!jsonContent.deliveries) {
        let i = 0;
        jsonContent.deliveries.forEach(element => {
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
    let retrievedObject = sessionStorage.getItem('onboardingObj');
    if (retrievedObject == null) {
        return null;
    }
    let jsonContent = JSON.parse(retrievedObject);

    jsonContent.expeditedStartup = $('#confirm-faststartup').is(':checked');
    jsonContent.newsletter = $('#confirm-news').is(':checked');

    return jsonContent;
}

function SyncUserDataEditObject(index, mpid, meterNumber) {
    if (!index) {
        return null;
    }

    let retrievedObject = sessionStorage.getItem('onboardingObj');
    if (retrievedObject == null) {
        return null;
    }

    let jsonContent = JSON.parse(retrievedObject);
    jsonContent.deliveries[index].mpid = mpid;
    jsonContent.deliveries[index].meterNumber = meterNumber;
    sessionStorage.setItem('onboardingObj', JSON.stringify(jsonContent));
}

function getUrlParam(key) {
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has(key)) {
        return searchParams.get(key);
    }
    return "";
}

function getUtmCodes() {
    let retrievedObject = sessionStorage.getItem('trackingObj');
    if (!retrievedObject)
        return "";
    let trackingObj = JSON.parse(retrievedObject);
    if (!trackingObj)
        return "";

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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _onboarding_validate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(686);
/* harmony import */ var _onboarding_validate__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_onboarding_validate__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _onboarding__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(870);
/* harmony import */ var _onboarding__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_onboarding__WEBPACK_IMPORTED_MODULE_1__);




})();

onboarding = __webpack_exports__;
/******/ })()
;