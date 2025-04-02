import ReactGA from "react-ga4";

export const GOOGLE_ANALYTICS_KEY = 'G-H7Q3553EDM';

export function initializeAnalytics() {
    ReactGA.initialize(GOOGLE_ANALYTICS_KEY);
}

export function trackPageView(page) {
    ReactGA.send({
        hitType: "pageview",
        page: page,
    });
}
