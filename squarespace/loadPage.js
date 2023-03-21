window.addEventListener('DOMContentLoaded', async () => {
    const onboardingDiv = document.getElementById('onboarding');

    if (onboardingDiv) {
        const pageName = onboardingDiv.dataset.page;

        const response = await fetch(pageName);
        const pageContent = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(pageContent, 'text/html');
        onboardingDiv.innerHTML = doc.body.innerHTML;
    }
});