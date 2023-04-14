window.addEventListener('DOMContentLoaded', async () => {
    const onboardingTag = document.getElementsByTagName('onboarding');
    const stromprisTag = document.getElementsByTagName('strompris');

    const closestParentOnboardingTag = onboardingTag.closest('.sqs-block-content');
    if (closestParentOnboardingTag) {
        closestParentOnboardingTag.className = 'sqs-block-content-updated'; // set the class of the closest parent element to 'new-class'
    }

    if(onboardingTag){
        for(element of onboardingTag){
            loadDynamicDocument(element, element.dataset.name, "onboarding", OnboardingSetup);
        }
    }
    if(stromprisTag){
        for(element of stromprisTag){
            loadDynamicDocument(element, element.dataset.name, "strompris", StromPrisSetup);
        }
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
