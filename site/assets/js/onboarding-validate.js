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
  if (value.indexOf("+47") > -1) {
    value = value.replace("+47", "");
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
  $("personalNumberEdit").val("");
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

function clearPnr(field, newVal) {
  //debugger;
  let obj = getJsonContent();
  if (obj == null) {
    return null;
  }
  let val = obj.firstName;
  if (field == "lastname") val = obj.lastName;

  if (obj.authMethod != "Vipps") {
    if (!val || !newVal || val.toLowerCase() != newVal.toLowerCase()) {
      document.querySelector("#personalNumberEdit").value = "";
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
  let obj = getJsonContent(); // sessionStorage.getItem('onboardingObj');
  if (obj == null) {
    return null;
  }

  var allValid = true;
  if (type == "step1") {
    let cell = document.querySelector("#onboarding_cell").value;
    cell = cleanCellNumber(cell);

    var validCell = false;
    if (cell.length == 8) validCell = true;

    //let email = document.querySelector("#onboarding_email").value;
    //var validEmail = validateEmail(email);

    if (validCell && validEmail) {
      OnboardingCell(cell, email);
      //gotoStep(2, 'search');
    }
  } else if (type == "step2") {
    //debugger;

    if (obj.authMethod != "Vipps") {
      var personalNumberEdit = document.querySelector(
        "#personalNumberEdit"
      ).value;
      var firstNameEdit = document.querySelector("#firstNameEdit").value;
      var lastNameEdit = document.querySelector("#lastNameEdit").value;

      if (obj.firstName != firstNameEdit || obj.lastNameEdit != lastNameEdit) {
        obj.firstName = firstNameEdit;
        obj.lastName = lastNameEdit;
        if (!personalNumberEdit || personalNumberEdit.length != 11) {
          addInvalid("#personalNumberEdit");
          allValid = false;
        } else if (!personalNumberEdit.startsWith("*")) {
          let pnrField = document.getElementById("personalNumberEdit");
          var validPnr = validateFnr(pnrField);
          if (validPnr) obj.personalNumber = validPnr;
          else allValid = false;
        }
        setJsonContent(obj);
      }
    }

    if (part == "overview") {
      //debugger;
      if (obj.deliveries && obj.deliveries.length > 0) {
        gotoStep(3);
      } else {
        gotoStep(2, "manual");
      }
    } else {
      if (!obj.cell) allValid = false;

      var validEmail = obj.email;
      if (!validEmail) {
        let emailField = document.getElementById("onboarding_email_edit");
        const validEmail = validateEmail(emailField);
        if (!validEmail) allValid = false;
        else {
          obj.email = validEmail;
          sessionStorage.setItem("onboardingObj", JSON.stringify(obj));
        }
      }

      $("#step2-edit .required").each(function () {
        //debugger;
        const el = $(this);
        const val = el.val();
        if (val) {
          removeInvalid(el);
        } else {
          addInvalid(el);
          allValid = false;
        }
      });

      //debugger;
      const zip = $("#onboardingZipEdit").val();
      let validZip = false;
      if (zip.length === 4) {
        var elementPlace = document.querySelector("#onboardingPlaceEdit").value;
        if (elementPlace != "Ugyldig postnummer") {
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
        } else {
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
    if (zip.length === 4) {
      return OnboardingPlaceFromZipV2(zip);
    } else if (zip.length > 4) {
      InvalidZip();
      return false;
    }
  }
  return false;
}

function OnboardingValidationSetup() {
  // Validate Email
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
      validateCell(cellField);
    });
  }
  //step1 cell lookip validation
  $("#cellvalidation").submit(function (event) {
    event.preventDefault();

    debugger;
    let cellField = document.getElementById("onboarding_cell");

    const validCell = validateCell(cellField);

      const valid = validCell;

      if (valid) {
          showNewSpinner(1);
          SmsVerification(validCell);
      }

    return false;
  });
  //step1 cell lookip validation
  $("#lookup").submit(function (event) {
    event.preventDefault();

    debugger;
    let cellField = document.getElementById("onboarding_cell");
    let emailField = document.getElementById("onboarding_email");
    let validationField = document.getElementById("cell_verification");
    let validationCode = validationField.value;

    const validCell = validateCell(cellField);
    const validEmail = validateEmail(emailField);
    const validCode = validationCode.length == 5;

    const valid = validCell && validEmail && validCode;
    if (valid) OnboardingCell(validCell, validEmail, validationCode);

    return false;
  });

  $("#firstNameEdit").on("blur", function () {
    clearPnr("firstname", document.querySelector("#firstNameEdit").value);
  });

  $("#lastNameEdit").on("blur", function () {
    clearPnr("lastname", document.querySelector("#lastNameEdit").value);
  });
}
