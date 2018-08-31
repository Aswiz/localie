function loadText() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/api', true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;

        if (xhr.status !== 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
            try {
                let root = document.getElementById("root");
                let data = JSON.parse(xhr.responseText);
                root.appendChild(createP(data.text));
            } catch (e) {
                alert("Error " + e.message);
            }
        }
    };
}

function createP(text) {
    let p = document.createElement('p');
    p.className = "button-p";
    p.innerHTML = text;
    return p;
}

document.getElementById("clickMe").addEventListener("click", function (event) {
    loadText();
}, false);

