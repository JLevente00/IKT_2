
window.addEventListener("scroll", function () {
    var navigacio = document.querySelector("nav");
    navigacio.classList.toggle("navsticky", window.scrollY > 0);
});


window.kosar = [];
window.aktualisMennyiseg = 1;

function etelMegnyit(etelNev, egysegAr) {

    window.aktualisMennyiseg = 1;

    var html = `
        <h2>${etelNev}</h2>
        <p>Egységár: ${egysegAr} Ft</p>

        <div style="margin:10px 0;">
            <button onclick="mennyisegValtoztat(-1)">-</button>
            <span id="mennyiseg">1</span>
            <button onclick="mennyisegValtoztat(1)">+</button>
        </div>

        <button onclick="kosarbaRak('${etelNev}', ${egysegAr})">
            Kosárba
        </button>
    `;

    document.getElementById("modalContent").innerHTML = html;
    document.getElementById("etelModal").style.display = "flex";
}


function mennyisegValtoztat(valtozas) {
    window.aktualisMennyiseg = Math.max(1, window.aktualisMennyiseg + valtozas);
    document.getElementById("mennyiseg").innerText = window.aktualisMennyiseg;
}


function kosarbaRak(etelNev, egysegAr) {

    var talalat = window.kosar.find(elem => elem.nev === etelNev);

    if (talalat) {
        talalat.db += window.aktualisMennyiseg;
    } else {
        window.kosar.push({
            nev: etelNev,
            ar: egysegAr,
            db: window.aktualisMennyiseg
        });
    }

    modalBezar();
}


function kosarVeglegesit() {

    if (window.kosar.length === 0) {
        alert("A kosár üres!");
        return;
    }

    var osszesen = 0;
    var szoveg = "Rendelés összegzés:\n\n";

    window.kosar.forEach(elem => {
        var reszosszeg = elem.ar * elem.db;
        osszesen += reszosszeg;
        szoveg += elem.db + " x " + elem.nev + " = " + reszosszeg + " Ft\n";
    });

    szoveg += "\nÖsszesen: " + osszesen + " Ft";

    alert(szoveg);
    window.kosar = [];
}


function modalBezar() {
    document.getElementById("etelModal").style.display = "none";
}

function feliratkozas(){
    alert(" Sikeres feliratkozás! Köszönjük ");
    return false;
}