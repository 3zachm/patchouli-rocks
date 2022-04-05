waitForElementToDisplay("#loadedPatchy", () => onLoad(), 1000, 9000);
// if not defined
if (typeof (patchySpawner) == "undefined") {
    let patchySpawner = [];
}

async function onLoad() {
    let aTags = document.getElementsByTagName("a");
    patchySpawner = [];
    for (var i = 0; i < aTags.length; i++) {
        if (aTags[i].innerHTML == "Patchouli?") {
            patchySpawner.push(aTags[i]);
        }
    }
    if (patchySpawner) {
        patchySpawner.forEach(element => {
            element.onclick = () => { spawn_patchy() };
            element.removeAttribute("href");
        });
    }
    document.onkeydown = function (e) {
        if (e.key == "p") {
            spawn_patchy();
        }
    }


    await startPatchy();
    // await check_patchy();
}

function waitForElementToDisplay(selector, callback, checkFrequencyInMs, timeoutInMs) {
    var startTimeInMs = Date.now();
    (function loopSearch() {
        if (document.querySelector(selector) != null) {
            callback();
            return;
        }
        else {
            setTimeout(function () {
                if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs)
                    return;
                loopSearch();
            }, checkFrequencyInMs);
        }
    })();
}

// async function check_patchy() {
//     await new Promise(r => setTimeout(r, 2000));
//     if (!patchyStart) {
//         await startPatchy();
//         setTimeout(() => { check_patchy() }, 2000);
//     }
//     return;
// }