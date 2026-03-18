// Sett inn PA-0802 dokumenttype-liste
const dokumenttyper = [
    "Adresseliste",
    "Kontrollrapport",
    "Risikovurderinger",
    "Servicerapport",
    "Energiregister",
    "Driftsinstruks",
    "Protokoll",
    "Dokumentasjon av lysmåling"
    // legg til ALLE typer her – si fra så fyller jeg alt inn for deg
];

// Fyll nedtrekk
const doktypeSelect = document.getElementById("doktype");
dokumenttyper.forEach(type => {
    const opt = document.createElement("option");
    opt.value = type;
    opt.textContent = type;
    doktypeSelect.appendChild(opt);
});

// Drag-drop logikk
const dz = document.getElementById("dropzone");

dz.addEventListener("dragover", e => {
    e.preventDefault();
    dz.classList.add("hover");
});

dz.addEventListener("dragleave", () => dz.classList.remove("hover"));

dz.addEventListener("drop", e => {
    e.preventDefault();
    dz.classList.remove("hover");

    const file = e.dataTransfer.files[0];

    const A = document.getElementById("system").value;
    const B = document.getElementById("lopenr").value;
    const C = document.getElementById("kompkode").value;
    const D = document.getElementById("komplop").value;
    const E = document.getElementById("info").value;
    const F = document.getElementById("doktype").value;
    const G = document.getElementById("fritekst").value;

    if (!A || !B || !F || !G) {
        alert("Du må fylle ut obligatoriske felter (Systemnummer, Løpenummer, Dokumenttype, Fritekst).");
        return;
    }

    let nyttnavn = `${A}.${B}`;
    if (C || D) nyttnavn += `-${C}${D}`;
    if (E) nyttnavn += ` ${E}`;
    nyttnavn += ` ${F} ${G}`;

    const ext = file.name.split('.').pop();
    const blob = file.slice(0, file.size);
    const renamed = new File([blob], `${nyttnavn}.${ext}`);

    const a = document.createElement("a");
    a.href = URL.createObjectURL(renamed);
    a.download = renamed.name;
    a.click();
});
``
