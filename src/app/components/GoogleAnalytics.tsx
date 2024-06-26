import Script from 'next/script';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

const GoogleAnalytics = () => {
    if (!GA_TRACKING_ID) {
        return null; // Don't render if tracking ID is not available
    }

    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <Script id="gtag" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_TRACKING_ID}');
                `}
            </Script>
        </>

    );
};

export default GoogleAnalytics;
