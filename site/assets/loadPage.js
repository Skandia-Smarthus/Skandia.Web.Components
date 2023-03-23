window.addEventListener('DOMContentLoaded', async () => {
    console.log("DOMCONTENTLoaded for onboarding monitoring")

    const onboardingDiv = document.getElementById('onboarding');

    if (onboardingDiv) {
        // const pageName = onboardingDiv.dataset.page;
        // const url = `https://cdn.jsdelivr.net/gh/Skandia-Smarthus/Skandia.Web.Components@main/site/${pageName}.html`
        // console.log(`Trying to load ${url}`)
        // const response = await fetch(url);
        // const pageContent = await response.text();
        //
        // const parser = new DOMParser();
        // const doc = parser.parseFromString(pageContent, 'text/html');
        // onboardingDiv.innerHTML = doc.body.innerHTML;
        loadOnboardingForm(onboardingDiv);
    }
});


function loadOnboardingForm(targetElement){
    const pageName = targetElement.dataset.page;
    if(!pageName){
        console.log("Could not find correct tag on onboarding div. Need data-page=<id>");
        return;
    }
    const url = getRequestUrl(pageName)
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
            OnboardingSetup();
        })
        .catch((error) => {
            console.error('Could not fetch onboarding template with error: ', error);
        });
}

function isRunningLocally(){
    const hostname = window.location.hostname;
    return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';
}

function getRequestUrl(pageName) {
    if (isRunningLocally()) {
        const protocol = window.location.protocol;
        const hostname = window.location.hostname;
        const port = window.location.port;
        return `${protocol}//${hostname}:${port}/site/${pageName}.html`;
    } else {
        return `https://cdn.jsdelivr.net/gh/Skandia-Smarthus/Skandia.Web.Components@main/site/${pageName}.html`
    }
}
