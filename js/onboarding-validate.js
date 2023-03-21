
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