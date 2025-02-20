const script = document.createElement('script');
script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback';
script.type = 'text/javascript';
script.defer = true;
script.onload = function () {
    let widgetSelector = 'turnstile-container';
    let siteKey = '0x4AAAAAAA6nqL4FLWDyoJ1o';
    let triggerWhenVisibleSelector = 'form-send-success';

    window.onloadTurnstileCallback = function () {
        turnstile.render(widgetSelector, {
            sitekey: siteKey,
            callback: turnstileCallback
        });
    };

    window.turnstileCallback = function (id) {
        // console.log("Turnstile token:", id);
    }

    function resetTurnstile() {
        try {
            console.log("Trying to reset Turnstile with widgetSelector =", widgetSelector);
            if (widgetSelector && turnstile && typeof turnstile.reset === "function") {
                turnstile.reset(widgetSelector);
                console.log("Turnstile reset");
            } else {
                console.log("Turnstile or reset function is undefined");
            }
        } catch (e) {
            console.error("Error resetting Turnstile:", e);
        }
    }

    $(document).ready(function () {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                const target = mutation.target;
                if ($(target).is(':visible')) {
                    console.log("Resetting Turnstile");
                    resetTurnstile();
                }
            });
        });

        observer.observe($(triggerWhenVisibleSelector)[0], { attributes: true });
    });
};

document.head.appendChild(script);