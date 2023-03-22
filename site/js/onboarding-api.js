

var customerData;
let apiUrlSaleV2 = "https://app-elkompis-service-dev.azurewebsites.net/sale/";
//let apiUrlSaleV2 = "/api/sale/";

//registrer mobil og epost
function CustomerSaleLead(cell = null, email = null) {
    let apiUrl = apiUrlSaleV2 + "saleLead";
    //debugger;
    let obj = {
        cell: cell,
        email: email
    };

    let xhr = new XMLHttpRequest();
    xhr.open('POST', apiUrl, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(obj));
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                //debugger;
            }
        }
    }
}

function OnboardingLookupV2(cell = null, email = null, authCode = null, state = null, redirectUrl = null, trackingObj = null) {
    //debugger;
    showSpinner("#btnSubmitCellSearch");
    showPulse("#step1-cell");
    let apiUrl = apiUrlSaleV2;

    if (cell != null) {
        apiUrl = apiUrl + "lookup/" + cell;
    }
    else {
        apiUrl = apiUrl + "lookupvipps?state=" + state + "&code=" + authCode + "&redirectUrl=" + redirectUrl;

        if (!authCode) {
            return
        }
    }
    //showLoader();
    let xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl, true);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200 || this.status == 204) {
                let jsonContent = JSON.parse(this.responseText);

                //debugger;

                customerData = jsonContent;
                var unhappy = false;
                if (email)
                    jsonContent.email = email;

                if (jsonContent.firstName && jsonContent.lastName) {
                    SetOnboardingState("happy");
                    $("#firstNameEdit").val(jsonContent.firstName);
                    $("#lastNameEdit").val(jsonContent.lastName);
                }
                else {
                    SetOnboardingState("unhappy");
                    unhappy = true;
                }
                //if (!jsonContent.personalNumber)
                //    showElement("#sep1-pnr");


                $("#deliveriesContainer").empty();
                if (!!jsonContent.deliveries) {
                    let i = 0;
                    jsonContent.deliveries.forEach(element => {
                        element.isSelected = true;
                        AppendDeliveryV2(element, i);
                        i = i + 1;
                    });
                }

                if (trackingObj) {
                    jsonContent.referralCode = trackingObj.invite;
                    jsonContent.campaignCode = trackingObj.campaignCode;
                    jsonContent.utmSource = trackingObj.utm_source;
                    jsonContent.utmMedium = trackingObj.utm_medium;
                    jsonContent.utmCampaign = trackingObj.utm_campaign;
                    jsonContent.utmTerm = trackingObj.utm_term;
                    jsonContent.utmContent = trackingObj.utm_content;
                }
                sessionStorage.setItem('onboardingObj', JSON.stringify(jsonContent));

                //debugger;

                if (jsonContent.authMethod == "Vipps") {
                    $("#onboarding_cell").val(jsonContent.cell)
                }


                if (jsonContent.email) {
                    // $("#emailInputStep3").val(jsonContent.email);

                    if (jsonContent.deliveries.length > 0) {
                        //$("#step1-customername").html(jsonContent.firstName + ' ' + jsonContent.lastName);
                        gotoStep(2, 'deliveries');
                    }

                    else {
                        gotoStep(2, 'manual');
                    }
                }
                else {
                    if (jsonContent.deliveries.length > 0) {
                        EditDeliveryV2('#data-0', 0);
                    }
                    else {
                        gotoStep(2, 'edit');
                    }
                }
                //hideLoader();
                //debugger;
                //scrollToElement('#step2');
                //scrollToElement('#step1-sum');
            }
            else {
                gotoStep(1, 'phone');
                //hideLoader();
                removeSpinner("#btnSubmitCellSearch");
                removeAllPulse();
                //hideElement("#city-loader");
            }
        }
    }
    xhr.send();
}


function SaveEditDeliveryV2() {
    let index = $("#deliveryIdEdit").val();
    let jsonContent = getJsonContent();
    if (jsonContent == null) {
        return null;
    }

    let meternumber = $("#meterNumberAdd").val();

    let moveTakeover = $('#supply-takover').is(':checked');
    let changeOfSup = !moveTakeover ? "ChangeOfSupply" : "Move";
    let moveDate = null;


    if (!index || jsonContent.deliveries == null
        || jsonContent.deliveries[index].address != $("#onboardingAddressEdit").val()
        || jsonContent.deliveries[index].houseNumber != $("#onboardingHouseNoEdit").val()
        || jsonContent.deliveries[index].zipcode != $("#onboardingZipEdit").val()
    ) {

        if (!index || jsonContent.deliveries == null) {
            index = 0;

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

            jsonContent.deliveries.push(delivery);
        }

        //change in address
        jsonContent.deliveries[index].mpid = null;

        if (meternumber
            && jsonContent.deliveries[index].meterNumber != meternumber) {
            //updated meternumber 
            jsonContent.deliveries[index].meterNumber = meternumber;
        }
        else {
            jsonContent.deliveries[index].meterNumber = null;
        }

        //do new customerlookup for mpid and meternumber
        let obj = {
            phone: null,
            "personalNumber": jsonContent.personalNumber,
            "firstName": null,
            //"firstName": userData.firstName,
            //"lastName": userData.lastName,
            "lastName": null,
            "streetName": $("#onboardingAddressEdit").val(),
            "buildingNumber": $("#onboardingHouseNoEdit").val(),
            "zipcode": $("#onboardingZipEdit").val(),
            "meterNumber": jsonContent.deliveries[index].meterNumber,
            //"email": userData.email,
            "email": null,
            "orderId": 0,
            "source": "Elhub",
            "vippsAccessToken": null,
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
        jsonContent.deliveries.forEach(element => {
            AppendDeliveryV2(element, i);
            i = i + 1;
        });
    }

    //debugger;
    setJsonContent(jsonContent);
    //sessionStorage.setItem('onboardingObj', JSON.stringify(jsonContent));
}



function OnboardingSaleV2(profile) {
    //debugger;
    $("#onboardingSaleClick").prop("disabled", true);
    let obj = SyncUserDataV2();

    if (obj == null) {
        showOnboardingError("Invalid zipcode");
        $("#onboardingSaleClick").prop("disabled", false);
        removeSpinner("#onboardingSaleClick");
        return;
    }

    obj.profile = profile;

    let xhr = new XMLHttpRequest();
    xhr.open('POST', apiUrlSaleV2, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(obj));


    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            //debugger;
            if (this.status == 200 || this.status == 204) {
                //let jsonContent = JSON.parse(this.responseText);
                //var deliveryId = String(jsonContent.deliveryId);
                var welcomeUrl = null;
                var urlTemp = "";
                //debugger;

                if (obj.moveDate) {
                    //til flyttevelkomst om finnes
                    var urlTemp = $("#linkWelcome1").val();
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
                    var urlTemp = $("#linkWelcome3").val();
                    if (urlTemp && urlTemp.length > 0) {
                        welcomeUrl = getUrlParamsV2(urlTemp);
                    }
                }
                if (!welcomeUrl) {
                    welcomeUrl = getUrlParamsV2('/velkommen');
                }

                removeAllPulse();

                //send til velkomstside
                window.location.href = welcomeUrl;
            }
            else {
                //hideSpinner("#onboardingSaleButton");
                removeSpinner("#onboardingSaleClick");
                removeAllPulse();
            }
        }
    }
}


function getUrlParamsV2(path) {
    var mainurl = location.protocol + "//" + location.host + path;
    let utmCodes = getUtmCodes();
    return mainurl + utmCodes;
}



function OnboardingPlaceFromZipV2(zip = null) {
    showElement("#city-loader");

    let apiUrl = apiUrlSaleV2 + "place/" + zip;;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl, true);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                let jsonContent = JSON.parse(this.responseText);
                let zipPlace = jsonContent.postalArea;

                var elementPlace = $('#onboardingPlaceEdit');
                elementPlace.val('Ugyldig postnummer');
                removeInvalid(elementPlace);

                elementPlace.val(zipPlace);

                removeInvalid($("#onboardingZipEdit"));
                hideElement("#city-loader");
                return true;
            }
            else {
                //showOnboardingError("Invalid zipcode");
                InvalidZip();
                return false;
            }
        }
    }
    xhr.send();
}

function InvalidZip() {
    var elementPlace = $('#onboardingPlaceEdit');
    elementPlace.val('Ugyldig postnr');
    addInvalid(elementPlace);

    addInvalid($("#onboardingZipEdit"));

    hideElement("#city-loader");
}



function CustomerLookupV2(obj = null, index = null) {
    //debugger;
    let apiUrl = apiUrlSaleV2 + "customerLookup";
    //showLoader();
    let xhr = new XMLHttpRequest();
    xhr.open('POST', apiUrl, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(obj));
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
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
                //hideLoader();
            }
            else {
                //hideLoader();
            }
        }
    }
}