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
    const url = `https://cdn.jsdelivr.net/gh/Skandia-Smarthus/Skandia.Web.Components@main/site/${pageName}.html`
    fetch(url)
        .then((response) => response.text())
        .then((html) => {
            const parser = new DOMParser();
            const document = parser.parseFromString(html, 'text/html');

            targetElement.innerHTML = document.body.innerHTML;
            OnboardingSetup();
        })
        .catch((error) => {
            console.error('Could not fetch onboarding template with error: ', error);
        });
}