window.addEventListener('DOMContentLoaded', async () => {
    const onboardingDiv = document.getElementById('onboarding');

    if (onboardingDiv) {
        const pageName = onboardingDiv.dataset.page;
        const url = `https://cdn.jsdelivr.net/gh/Skandia-Smarthus/Skandia.Web.Components@main/site/${pageName}.html`
        console.log(`Trying to load ${url}`)
        const response = await fetch(url);
        const pageContent = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(pageContent, 'text/html');
        onboardingDiv.innerHTML = doc.body.innerHTML;
    }
});