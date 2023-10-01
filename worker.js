function peaceOut() {
    log = (msg, fatal = false) => {
        console.log(`[peaceout] ${msg}`);

        if (fatal) {
            alert(msg);
        }
    };

    createClickEvent = () => {
        return new MouseEvent("click", {
            "view": window,
            "bubbles": true,
            "cancelable": false
        });
    };

    endCall = () => {
        log("Looking for the 'Leave call' button.");

        var found = false;
        var buttons = document.getElementsByTagName("button");
        for (var i = 0; i < buttons.length; i++) {
            var label = buttons[i].attributes["aria-label"];
            if (label && label.value == "Leave call") {
                log("Leaving.");
                buttons[i].dispatchEvent(createClickEvent());
                found = true;
                break;
            }
        }

        if (!found) {
            log("Cannot find the 'Leave call' button.", true);
        }
    };

    justLeave = () => {
        log("Looking for the 'Just leave the call' button.");

        var found = false;
        var spans = document.getElementsByTagName("span");
        for (var i = 0; i < spans.length; i++) {
            if (spans[i].innerHTML == "Just leave the call") {
                log("Goodbye.");
                spans[i].dispatchEvent(createClickEvent());
                found = true;
                break;
            }
        }

        if (!found) {
            log("Cannot find the 'Just leave the call' button.", true);
        }
    };

    endCall();
    setTimeout(justLeave, 750);
}

chrome.action.onClicked.addListener((tab) => {
    console.log("[peaceout] Got the click.");

    if (tab && tab.url && tab.url.startsWith("https://meet.google.com/")) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: peaceOut
        });
    } else {
        log("This extension only works on Google Meet pages.");
    }
});

