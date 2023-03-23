
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
    $(el).prop("disabled", true);
    $(el).addClass('spinner');
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
