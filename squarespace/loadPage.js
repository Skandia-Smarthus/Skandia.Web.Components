window.addEventListener('DOMContentLoaded', async () => {
    const onboardingDiv = document.getElementById('onboarding');

    if (onboardingDiv) {
        const pageName = onboardingDiv.dataset.page;
        const url = 'https://raw.githubusercontent.com/Skandia-Smarthus/Skandia.Web.Components/main/site/'
        const response = await fetch(`${url}${pageName}`);
        const pageContent = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(pageContent, 'text/html');
        onboardingDiv.innerHTML = doc.body.innerHTML;
    }
});