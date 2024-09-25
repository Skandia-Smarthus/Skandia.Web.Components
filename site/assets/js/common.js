
function hideElement(el) {
    $(el).addClass('hidden');
}

function showElement(el) {
    $(el).removeClass('hidden');
}

function addPulse(el) { $(el).addClass('animate-pulse'); }
function removePulse(el) { $(el).removeClass('animate-pulse'); }

function addInvalid(el) {
    $(el).addClass('is-invalid');
}

function removeInvalid(el) {
    $(el).removeClass('is-invalid');
}

function removeAllInvalid() {
    $('.is-invalid').each(function (i, el) {
        $(el).removeClass('is-invalid');
    });
}


function removeDisabled(el) {
    $(el).prop("disabled", false);
}

function showSpinner(el) {
    debugger;
    $(el).prop("disabled", true);
    $(el).addClass('spinner');
}

function showNewSpinner() {
    let stylesheet = document.styleSheets[0];

    for (let i = 0; i < stylesheet.cssRules.length; i++) {
        let rule = stylesheet.cssRules[i];

        if (rule.selectorText === '.animate-spin') {
            rule.style.display = "";
        }
    }
}

function removeNewSpinner() {
    let stylesheet = document.styleSheets[0];

    for (let i = 0; i < stylesheet.cssRules.length; i++) {
        let rule = stylesheet.cssRules[i];

        if (rule.selectorText === '.animate-spin') {
            rule.style.display = "none";
        }
    }
}


function removeSpinner(el) {
    $(el).prop("disabled", false);
    $(el).removeClass('spinner');
}

function removeAllSpinners() {
    $('.spinner').each(function (i, el) {
        $(el).removeClass('spinner');
    });
}

function showPulse(el) {
    $(el).addClass('animate-pulse');
}



function removeAllPulse() {
    $('.animate-pulse').each(function (i, el) {
        $(el).removeClass('animate-pulse');
    });
}


function setReadonly(el) {
    $(el).prop("readonly", true);
}

function removeReadonly(el) {
    $(el).prop("readonly", false);
}

function getQueryParamValue(paramName) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (urlParams.has(paramName)) {
        return urlParams.get(paramName);
    }

    return null;
}

function generateUUID() {
    const randomValues = new Uint8Array(16);
    crypto.getRandomValues(randomValues);
    randomValues[6] = (randomValues[6] & 0x0f) | 0x40;
    randomValues[8] = (randomValues[8] & 0x3f) | 0x80;

    const byteToHex = [];
    for (let i = 0; i < 256; ++i) {
        byteToHex[i] = (i + 0x100).toString(16).substr(1);
    }

    const bytes = randomValues;
    return byteToHex[bytes[0]] + byteToHex[bytes[1]] +
        byteToHex[bytes[2]] + byteToHex[bytes[3]] + '-' +
        byteToHex[bytes[4]] + byteToHex[bytes[5]] + '-' +
        byteToHex[bytes[6]] + byteToHex[bytes[7]] + '-' +
        byteToHex[bytes[8]] + byteToHex[bytes[9]] + '-' +
        byteToHex[bytes[10]] + byteToHex[bytes[11]] +
        byteToHex[bytes[12]] + byteToHex[bytes[13]] +
        byteToHex[bytes[14]] + byteToHex[bytes[15]];
}


