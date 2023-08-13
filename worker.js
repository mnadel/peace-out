function peaceOut() {
    console.log("[peaceout] Sayonara.");

    endCall = () => {
        console.log("[peaceout] Looking for the 'Leave call' button.");

        var buttons = document.getElementsByTagName("button");
        for (var i = 0; i < buttons.length; i++) {
            var label = buttons[i].attributes["aria-label"];
            if (label && label.value == "Leave call") {
                var clickEvent = new MouseEvent("click", {
                    "view": window,
                    "bubbles": true,
                    "cancelable": false
                });

                console.log("[peaceout] Leaving.");

                buttons[i].dispatchEvent(clickEvent);

                break;
            }
        }
    };

    justLeave = () => {
        console.log("[peaceout] Looking for the 'Just leave the call' button.");

        var spans = document.getElementsByTagName("span");
        for (var i = 0; i < spans.length; i++) {
            if (spans[i].innerHTML == "Just leave the call") {
                var clickEvent = new MouseEvent("click", {
                    "view": window,
                    "bubbles": true,
                    "cancelable": false
                });

                console.log("[peaceout] Goodbye.");

                spans[i].dispatchEvent(clickEvent);

                break;
            }
        }
    };

    endCall();
    setTimeout(justLeave, 1000);
}

chrome.action.onClicked.addListener((tab) => {
    console.log("[peaceout] Got the click.");

    if (tab && tab.url && tab.url.startsWith("https://meet.google.com/")) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: peaceOut
        });
    }
});