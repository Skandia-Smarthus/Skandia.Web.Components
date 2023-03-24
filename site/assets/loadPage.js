window.addEventListener('DOMContentLoaded', async () => {
    const onboardingDiv = document.getElementById('onboarding');
    const stromprisDiv = document.getElementById('strompris');
    if (onboardingDiv) {
        loadDynamicDocument(onboardingDiv, onboardingDiv.dataset.form, "onboarding", OnboardingSetup);
    }
    if(stromprisDiv){
        loadDynamicDocument(stromprisDiv, stromprisDiv.dataset.price, "strompris", StromPrisSetup);
    }
});

function loadDynamicDocument(targetElement, dataTag, subFolder, setup){

    if(!dataTag){
        console.log("Could not find correct tag for dynamic content. Need data-<type>=<id>");
        return;
    }
    const url = getRequestUrl(dataTag, subFolder)
    fetch(url)
        .then((response) => response.text())
        .then((html) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const inlineScripts = doc.querySelector('script')
            if(inlineScripts){
                const script = document.createElement('script')
                script.innerHTML = inlineScripts.innerHTML
                document.body.appendChild(script)
            }
            targetElement.innerHTML = doc.body.innerHTML;
            setup();
        })
        .catch((error) => {
            console.error('Could not fetch onboarding template with error: ', error);
        });
}

function isRunningLocally(){
    const hostname = window.location.hostname;
    return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';
}

function getRequestUrl(pageName, subFolder) {
    if (isRunningLocally()) {
        const protocol = window.location.protocol;
        const hostname = window.location.hostname;
        const port = window.location.port;
        return `${protocol}//${hostname}:${port}/site/${subFolder}/${pageName}.html`;
    } else {
        return `https://elkompissquarespace.blob.core.windows.net/assets/site/${subFolder}/${pageName}.html`
    }
}
