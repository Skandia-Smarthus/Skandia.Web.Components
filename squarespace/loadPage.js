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
            const scripts = document.getElementsByTagName('script');
            const target = document.getElementById('onboarding');
            document.querySelectorAll('script').forEach((script) => script.remove());
            target.innerHTML = document.body.innerHTML;

            for(let i = 0; i < scripts.length; i++){
                const script = document.createElement('script');
                if(scripts[i].src){
                    script.src = scripts[i].src;
                } else {
                    script.textContent = scripts[i].textContent;
                }
                document.body.appendChild(script);
            }
        })
        .catch((error) => {
            console.error('Could not fetch onboarding template with error: ', error);
        });
}