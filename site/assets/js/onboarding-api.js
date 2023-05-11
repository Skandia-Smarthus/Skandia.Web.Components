var customerData;

function SmsVerification(cell = null) {
  var base = window.window.saleApi.basePath;
  if (profile === "SkandiaEnergi") {
    base = window.saleApi.basePathSkandia;
  }

  let apiUrl = base + window.window.saleApi.smsverificationPath;

  let obj = {
    cell: cell,
  };

  let xhr = new XMLHttpRequest();
  xhr.open("POST", apiUrl, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify(obj));
  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        gotoStep(1, "verification");
        // OK
      } else {
        gotoStep(1, "intro");
        // Not OK
      }
    }
  };
}
//registrer mobil og epost
function CustomerSaleLead(cell = null, email = null) {
  var base = window.window.saleApi.basePath;
  if (profile === "SkandiaEnergi") {
    base = window.saleApi.basePathSkandia;
  }

  let apiUrl = base + window.window.saleApi.saleLeadPath;
  //debugger;
  let obj = {
    cell: cell,
    email: email,
  };

  let xhr = new XMLHttpRequest();
  xhr.open("POST", apiUrl, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify(obj));
  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        //debugger;
      }
    }
  };
}
function getLookupApiUrl(cell, authCode, state, redirectUrl, verificationCode) {
  var base = window.window.saleApi.basePath;
  if (profile === "SkandiaEnergi") {
    base = window.saleApi.basePathSkandia;
  }

  if (authCode) {
    return `${base}${window.saleApi.phoneLookupVippsPath}?state=${state}&code=${authCode}&redirectUrl=${redirectUrl}`;
  } else if (cell) {
    return `${base}${window.saleApi.phoneLookupPath}/${cell}/${verificationCode}`;
  }
}
function OnboardingLookupV2(
  cell = null,
  email = null,
  authCode = null,
  state = null,
  redirectUrl = null,
  trackingObj = null,
  verificationCode = null
) {
  debugger;
  showSpinner("#btnSubmitCellSearch");
  showPulse("#step1-cell");
  const apiUrl = getLookupApiUrl(
    cell,
    authCode,
    state,
    redirectUrl,
    verificationCode
  );

  let xhr = new XMLHttpRequest();
  xhr.email = email;
  xhr.cell = cell;
  xhr.open("GET", apiUrl, true);
  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200 || this.status === 204) {
        let jsonContent = JSON.parse(this.responseText);
        customerData = jsonContent;
        const email = this.email;
        if (email) jsonContent.email = email;

        if (jsonContent.firstName && jsonContent.lastName) {
          SetOnboardingState("happy");
          $("#firstNameEdit").val(jsonContent.firstName);
          $("#lastNameEdit").val(jsonContent.lastName);
        } else {
          SetOnboardingState("unhappy");
        }

        $("#deliveriesContainer").empty();
        if (!!jsonContent.deliveries) {
          let i = 0;
          jsonContent.deliveries.forEach((element) => {
            element.isSelected = true;
            AppendDeliveryV2(element, i);
            i = i + 1;
          });
        }

        jsonContent.campaignCode = window.campaignCode;

        if (trackingObj) {
          jsonContent.referralCode = trackingObj.invite;
          jsonContent.utmSource = trackingObj.utm_source;
          jsonContent.utmMedium = trackingObj.utm_medium;
          jsonContent.utmCampaign = trackingObj.utm_campaign;
          jsonContent.utmTerm = trackingObj.utm_term;
          jsonContent.utmContent = trackingObj.utm_content;
        }

        if (jsonContent.authMethod === "Vipps") {
          $("#onboarding_cell").val(jsonContent.cell);
        }
        if (!jsonContent.cell) jsonContent.cell = $("#onboarding_cell").val();

        sessionStorage.setItem("onboardingObj", JSON.stringify(jsonContent));

        if (jsonContent.email) {
          if (jsonContent.deliveries && jsonContent.deliveries.length > 0) {
            gotoStep(2, "deliveries");
          } else {
            gotoStep(2, "manual");
          }
        } else {
          if (jsonContent.deliveries && jsonContent.deliveries.length > 0) {
            EditDeliveryV2("#data-0", 0);
          } else {
            gotoStep(2, "edit");
          }
        }
      } else {
        gotoStep(1, "phone");
        removeSpinner("#btnSubmitCellSearch");
        removeAllPulse();
      }
    }
  };
  xhr.send();
}

function SaveEditDeliveryV2() {
  let index = $("#deliveryIdEdit").val();
  let jsonContent = getJsonContent();
  if (jsonContent == null) {
    return null;
  }

  let meternumber = $("#meterNumberAdd").val();

  let moveTakeover = $("#supply-takover").is(":checked");
  let changeOfSup = !moveTakeover ? "ChangeOfSupply" : "Move";
  let moveDate = null;

  if (
    !index ||
    jsonContent.deliveries == null ||
    jsonContent.deliveries[index].address !=
      $("#onboardingAddressEdit").val() ||
    jsonContent.deliveries[index].houseNumber !=
      $("#onboardingHouseNoEdit").val() ||
    jsonContent.deliveries[index].zipcode != $("#onboardingZipEdit").val()
  ) {
    if (!index || jsonContent.deliveries == null) {
      index = 0;

      if (!jsonContent.deliveries) {
        jsonContent.deliveries = [];
      }

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

      jsonContent.deliveries.push(delivery);
    }

    //change in address
    jsonContent.deliveries[index].mpid = null;

    if (
      meternumber &&
      jsonContent.deliveries[index].meterNumber != meternumber
    ) {
      //updated meternumber
      jsonContent.deliveries[index].meterNumber = meternumber;
    } else {
      jsonContent.deliveries[index].meterNumber = null;
    }

    // todo new customerlookup for mpid and meternumber
    let obj = {
      phone: null,
      personalNumber: jsonContent.personalNumber,
      firstName: null,
      lastName: null,
      streetName: $("#onboardingAddressEdit").val(),
      buildingNumber: $("#onboardingHouseNoEdit").val(),
      zipcode: $("#onboardingZipEdit").val(),
      meterNumber: jsonContent.deliveries[index].meterNumber,
      //"email": userData.email,
      email: null,
      orderId: 0,
      source: "Elhub",
      vippsAccessToken: null,
    };
    //debugger;
    CustomerLookupV2(obj, index);
  } else {
    if (meternumber) {
      jsonContent.deliveries[index].meterNumber = meternumber;
    }
  }

  if (moveTakeover) {
    moveDate = moveTakeover ? $("#takoverDate").val() : null;
    jsonContent.deliveries[index].moveDate = moveDate;
  }

  $("#meterNumberAdd").val(jsonContent.deliveries[index].meterNumber);

  jsonContent.deliveries[index].address = $("#onboardingAddressEdit").val();
  jsonContent.deliveries[index].houseNumber = $("#onboardingHouseNoEdit").val();
  jsonContent.deliveries[index].zipcode = $("#onboardingZipEdit").val();
  jsonContent.deliveries[index].place = $("#onboardingPlaceEdit").val();
  jsonContent.deliveries[index].isSelected = true;

  $("#deliveriesContainer").empty();
  if (!!jsonContent.deliveries) {
    let i = 0;
    jsonContent.deliveries.forEach((element) => {
      AppendDeliveryV2(element, i);
      i = i + 1;
    });
  }

  setJsonContent(jsonContent);
}

function OnboardingSaleV2(profile) {
  $("#onboardingSaleClick").prop("disabled", true);
  let obj = SyncUserDataV2();

  if (obj == null) {
    showOnboardingError("Invalid zipcode");
    $("#onboardingSaleClick").prop("disabled", false);
    removeSpinner("#onboardingSaleClick");
    return;
  }

  obj.profile = profile;

  let apiUrl = window.saleApi.basePath + window.saleApi.saleRegisterPath;

  // #####
  // #####
  // #####
  // TODO switch baseURL
  if (profile === "SkandiaEnergi") {
    apiUrl = window.saleApi.basePath + window.saleApi.saleRegisterSkandiaPath;
  }
  // #####
  // #####
  // #####
  // #####
  let xhr = new XMLHttpRequest();
  xhr.open("POST", apiUrl, true);

  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify(obj));

  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200 || this.status == 204) {
        var welcomeUrl = null;
        var urlTemp = "";

        if (obj.deliveries && obj.deliveries[0] && obj.deliveries[0].moveDate) {
          //til flyttevelkomst om finnes
          var urlTemp = $("#linkWelcome3").val();
          if (urlTemp && urlTemp.length > 0) {
            welcomeUrl = getUrlParamsV2(urlTemp);
          }
        }

        if (!welcomeUrl && obj.expeditedStartup) {
          //til rask oppstartvelkomst om finnes
          var urlTemp = $("#linkWelcome2").val();
          if (urlTemp && urlTemp.length > 0) {
            welcomeUrl = getUrlParamsV2(urlTemp);
          }
        }

        if (!welcomeUrl) {
          //til rask generell velkomst om finnes
          var urlTemp = $("#linkWelcome1").val();
          if (urlTemp && urlTemp.length > 0) {
            welcomeUrl = getUrlParamsV2(urlTemp);
          }
        }
        if (!welcomeUrl) {
          welcomeUrl = getUrlParamsV2("/velkommen");
        }

        removeAllPulse();

        //send til velkomstside
        window.location.href = welcomeUrl;
      } else {
        removeSpinner("#onboardingSaleClick");
        removeAllPulse();
      }
    }
  };
}

function getUrlParamsV2(path) {
  var mainurl = location.protocol + "//" + location.host + path;
  let utmCodes = getUtmCodes();
  return mainurl + utmCodes;
}

function OnboardingPlaceFromZipV2(zip = null) {
  showElement("#city-loader");

  const apiUrl = `${window.saleApi.basePath}${window.saleApi.placeLookupPath}/${zip}`;
  let xhr = new XMLHttpRequest();
  xhr.open("GET", apiUrl, true);
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        const jsonContent = JSON.parse(this.responseText);
        const zipPlace = jsonContent.postalArea;

        const elementPlace = $("#onboardingPlaceEdit");
        elementPlace.val("Ugyldig postnummer");
        removeInvalid(elementPlace);

        elementPlace.val(zipPlace);

        removeInvalid($("#onboardingZipEdit"));
        hideElement("#city-loader");
        return true;
      } else {
        //showOnboardingError("Invalid zipcode");
        InvalidZip();
        return false;
      }
    }
  };
  xhr.send();
}

function InvalidZip() {
  var elementPlace = $("#onboardingPlaceEdit");
  elementPlace.val("Ugyldig postnr");
  addInvalid(elementPlace);

  addInvalid($("#onboardingZipEdit"));

  hideElement("#city-loader");
}

function CustomerLookupV2(obj = null, index = null) {
  let apiUrl = window.saleApi.basePath + window.saleApi.customerLookupPath;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", apiUrl, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify(obj));
  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        let jsonContent = JSON.parse(this.responseText);
        //debugger;
        if (jsonContent) {
          if (jsonContent.deliveries && jsonContent.deliveries.length > 0) {
            $("#meterNumberAdd").val(meterNumber);
            if (index) {
              var mpid = jsonContent.deliveries[0].mpid;
              var meterNumber = jsonContent.deliveries[0].meterNumber;
              SyncUserDataEditObject(index, mpid, meterNumber);
            }
            SaveEditDelivery();
          }
        }
      }
    }
  };
}

async function getVippsUrl() {
  const vippsState = generateUUID();
  const redirectUrl = getRedirectURL(); // Assuming you've already implemented this function
  const urlEncoded = encodeURIComponent(redirectUrl);
  const vippsUrlLookupPath = saleApi.basePath + saleApi.vippsUrlLookupPath; // Replace this with your actual Vipps URL lookup path

  const response = await fetch(
    `${vippsUrlLookupPath}?state=${vippsState}&redirectUrl=${urlEncoded}`
  );
  const url = await response.text();
  return url;
}

function getRedirectURL() {
  const currentUrl = window.vippsRedirectUrl
    ? window.vippsRedirectUrl
    : window.location.href;

  if (!currentUrl) {
    return "";
  }

  let redirectUrl = currentUrl;
  const queryStringIndex = redirectUrl.indexOf("?");

  if (queryStringIndex !== -1) {
    redirectUrl = redirectUrl.substring(0, queryStringIndex);
  }

  return redirectUrl;
}
