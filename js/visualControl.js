import calcula from "./calculoMateriais.js";

let nextEl = document.querySelector("#down-arrow");
let botaoAddEl = document.querySelector("#add");
let wrapperEl = document.querySelector("#wrapper");
let formFileEl = document.querySelector("#formFile");
let formContainerEl = document.querySelector("#load");
let instrucaoEl = document.querySelector("#instrucao");
let testeBackboneEl = document.querySelector("#teste-backbone");
let testeBackbone2El = document.querySelector("#teste-backbone2")

let formBackboneSimEl = document.querySelector("#sim");
let formBackboneSim2El = document.querySelector("#sim2");
let formBackboneNaoEl = document.querySelector("#nao");
let formBackboneNao2El = document.querySelector("#nao2");
let formAndarEl = document.querySelector("#andar");
let formCatEl = document.querySelector("#cat");
let formFibraEl = document.querySelector("#fibra");
let formNFibraEl = document.querySelector("#nfibra");
let formFibra2El = document.querySelector("#fibra2");
let formNFibra2El = document.querySelector("#nfibra2");

let predioEl = document.querySelector("#predio");
let formAlturaEl = document.querySelector("#altura");
let formPontosEl = document.querySelector("#pontos");
let formMhEL = document.querySelector("#m-h");
let botaoSalvarEl = document.querySelector("#salvar");
let andares;

let pagina = 1;

let predioTeste = {
    "itensAndares": [

    ],
    "andares": "5",
    "mh": [
        null,
        "30",
        "30",
        "30",
        "30",
        "30"
    ],
    "pontos": [
        null,
        "90",
        "90",
        "90",
        "90",
        "90"
    ],
    "alturas": [
        null,
        "5",
        "5",
        "5",
        "5",
        "5"
    ],
    "cat": "Cat5e",
    "backbone": true,
    "backbone_sec": true,
    "fibra": "MM - 50 x 125µm",
    "n_fibras": "8",
    "fibra_principal": "FOSMIG",
    "n_fibras_principal": "8"
}
calcula(predioTeste);
console.log(predioTeste);

let predio = {
    totalAndares: {},
    andares: "",
    mh: [],
    pontos: [],
    alturas: [],
    cat: "",
    backbone: false,
    backbone_sec: false,
    fibra: "",
    n_fibras: "",
    fibra_principal: "",
    n_fibras_principal: ""
};

let instrucoes = [
    "",
    "Adicione um prédio para começar!",
    "Preencha os campos:",
    "Edite os andares:",
    "Resultado:"
]

function proxPagina() {
    if (pagina == 2) {
        if (formBackboneSim2El.checked == true) {
            if (formAndarEl.value == "" || formCatEl.value == ""
                || formFibraEl.value == "" || formNFibraEl.value == ""
                || formFibra2El.value == "" || formNFibra2El.value == "") {
                window.alert("Os valores devem ser preenchidos!");
                return;
            }
            if (formAndarEl.value == "1") {
                window.alert("Não é possível ter mais de um backbone em apenas um andar.");
                return;
            }
        }
        if (formBackboneSimEl.checked == true) {
            if (formAndarEl.value == "" || formCatEl.value == "" || formFibraEl.value == "" || formNFibraEl.value == "") {
                window.alert("Os valores devem ser preenchidos!");
                return;
            }
            if (formAndarEl.value == "1") {
                formBackboneSim2El.checked = true;
                formBackboneSimEl.checked = false;
                formFibra2El.value = formFibraEl.value;
                formNFibra2El.value = formNFibraEl.value;
            }
        }
        else {
            if (formAndarEl.value == "" || formCatEl.value == "") {
                window.alert("Os valores devem ser preenchidos!");
                return;
            }
            if (formAndarEl.value != "1" && formBackboneSimEl.checked == false) {
                window.alert("Para mais de um Andar é necessário um backbone.");
                return;
            }
        }
    }
    if (pagina == 3) {
        if (predio.alturas.length - 1 != predio.andares) {
            window.alert("Configure todos os Andares!");
            return;
        }
    }
    wrapperEl.style.transform = `translateY(-${100 * pagina}vh)`;
    pagina++;
    instrucaoEl.innerText = instrucoes[pagina];
    if (pagina == 2) {
        nextEl.style.transform = "translateY(0vh)";
    }
    if (pagina == 3) {
        montaPredio();
    }
    if (pagina == 4) {
        nextEl.style.transform = "translateY(190vh)";
        console.log(predio);
        predio = calcula(predio);
        povoaTabela(predio);
    }
}

function novoPredio() {
    formContainerEl.style.display = "none";
    proxPagina();
}

function revela(e) {
    e.classList.toggle("sumir");
}

function montaPredio() {
    predio.cat = formCatEl.value;
    predio.fibra = formFibraEl.value;
    predio.n_fibras = formNFibraEl.value;
    predio.fibra_principal = formFibra2El.value;
    predio.n_fibras_principal = formNFibra2El.value;
    predio.andares = formAndarEl.value;
    predio.backbone = formBackboneSimEl.checked != "" ? true : false;
    predio.backbone_sec = formBackboneSim2El.checked != "" ? true : false;
    for (let i = 1; i <= predio.andares; i++) {
        let newDiv = document.createElement("div");
        newDiv.classList.add("andarP")

        let newLabel = document.createElement("label");
        let newInput = document.createElement("input");
        newInput.setAttribute("type", "radio");
        newInput.setAttribute("name", "andar");
        newInput.setAttribute("id", `andar-${i}`);

        newLabel.innerText = `Andar ${i}`;
        newLabel.setAttribute("for", `andar-${i}`);

        newDiv.appendChild(newInput);
        newDiv.appendChild(newLabel);
        predioEl.appendChild(newDiv);
    }

    andares = document.querySelectorAll(".andarP");
    andares.forEach((e) => {
        e.firstElementChild.addEventListener('change', (el) => {
            let idEl = el.target.id;
            id = idEl.split("-")[1];
        })
    })
}

let id = 0;

function salvaAndar() {
    if (id == 0) {
        for (let i = 1; i < andares.length; i++) {
            predio.mh[i] = formMhEL.value;
            predio.pontos[i] = formPontosEl.value;
            predio.alturas[i] = formAlturaEl.value;
        }
        window.alert("Modificado com sucesso!");
        return;
    }
    predio.mh[id] = formMhEL.value;
    predio.pontos[id] = formPontosEl.value;
    predio.alturas[id] = formAlturaEl.value;
    window.alert("Modificado com sucesso!");
}

let itens = document.querySelectorAll(".resultado");
let valores = document.querySelectorAll(".alterar");
let materiaisEl = document.querySelector(".materiais");

function povoaTabela(predioFinal) {
    valores[0].innerText = `${valores[0].innerText} - ${predioFinal.cat}`;
    itens[0].innerText = `${predioFinal.totalAndares.par_trancado} caixa(s)`;

    valores[1].innerText = `${valores[1].innerText} - ${predioFinal.cat}`;
    itens[1].innerText = `${predioFinal.totalAndares.femea} unidade(s)`;

    itens[2].innerText = `${predioFinal.totalAndares.espelhos} unidade(s)`;

    valores[2].innerText = `${valores[2].innerText} - ${predioFinal.cat}`;
    itens[3].innerText = `${predioFinal.totalAndares.patch_cords} unidade(s)`;

    valores[3].innerText = `${valores[3].innerText} - ${predioFinal.cat}`;
    itens[4].innerText = `${predioFinal.totalAndares.ppmh} unidade(s)`;

    itens[5].innerText = `${predioFinal.totalAndares.organizador} unidade(s)`;

    valores[4].innerText = `${valores[4].innerText} - ${predioFinal.cat}`;
    itens[6].innerText = `${predioFinal.totalAndares.ppmh} unidade(s)`;

    itens[7].innerText = `${predioFinal.totalAndares.bandeja} unidade(s)`;

    itens[8].innerText = `${predioFinal.totalAndares.exaustor} unidade(s)`;

    valores[5].innerText = `${valores[5].innerText} - ${predioFinal.cat}`;
    itens[9].innerText = `${predioFinal.totalAndares.switch} unidade(s)`;

    valores[6].innerText = `${valores[6].innerText} - ${predioFinal.fibra}`;
    itens[10].innerText = `${predioFinal.totalAndares.FO} m`;

    itens[11].innerText = `${predioFinal.totalAndares.dio} unidade(s)`;

    itens[12].innerText = `${predioFinal.totalAndares.acoplhador} unidade(s)`;

    itens[13].innerText = `${predioFinal.totalAndares.caixa_emenda} unidade(s)`;

    itens[14].innerText = `${predioFinal.totalAndares.to} unidade(s)`;

    valores[7].innerText = `${valores[7].innerText} - ${predioFinal.fibra}`;
    itens[15].innerText = `${predioFinal.totalAndares.pigtail} unidade(s)`;

    valores[8].innerText = `${valores[8].innerText} - ${predioFinal.fibra_principal}`;
    itens[16].innerText = `${predioFinal.totalAndares.pigtail_principal} unidade(s)`;

    valores[9].innerText = `${valores[9].innerText} - ${predioFinal.fibra}`;
    itens[17].innerText = `${predioFinal.totalAndares.pigtail_longo} unidade(s)`;

    valores[10].innerText = `${valores[10].innerText} - ${predioFinal.fibra}`;
    itens[18].innerText = `${predioFinal.totalAndares.cordao} unidade(s)`;

    valores[11].innerText = `${valores[11].innerText} - ${predioFinal.fibra_principal}`;
    itens[19].innerText = `${predioFinal.totalAndares.cordao_principal} unidade(s)`;

    valores[12].innerText = `${valores[12].innerText} - ${predioFinal.fibra}`;
    itens[20].innerText = `${predioFinal.totalAndares.cordao_longo} unidade(s)`;

    itens[21].innerText = `${predioFinal.totalAndares.switch_core} unidade(s)`;

    itens[22].innerText = `${predioFinal.totalAndares.etq_por_ppmh} unidade(s)`;

    itens[23].innerText = `${predioFinal.totalAndares.etq_ppmh} unidade(s)`;

    itens[24].innerText = `${predioFinal.totalAndares.etq_espelho} unidade(s)`;

    itens[25].innerText = `${predioFinal.totalAndares.etq_utp} unidade(s)`;

    itens[26].innerText = `${predioFinal.totalAndares.etq_dio} unidade(s)`;

    itens[27].innerText = `${predioFinal.totalAndares.abracadeira} pacote(s)`;

    itens[28].innerText = `${predioFinal.totalAndares.porca} pacote(s)`;

    itens[29].innerText = `${predioFinal.totalAndares.filtro} unidade(s)`;

    let racks = Object.entries(predioFinal.totalAndares.rack_final);
    racks.forEach((e) => {
        let newItem = document.createElement("div");
        let newSpan1 = document.createElement("span");
        let newSpan2 = document.createElement("span");

        newItem.appendChild(newSpan1);
        newItem.appendChild(newSpan2);
        newSpan2.setAttribute("class", "resultado");
        newSpan1.innerText = `Rack Fechado 19" - ${e[0]}U`;
        newSpan2.innerText = `${e[1]} unidade(s)`
        materiaisEl.appendChild(newItem);
    })

    itens.forEach(element => {
        if (element.innerText[0] == "0") {
            let parent = element.parentNode;
            let grandparent = parent.parentNode;
            grandparent.removeChild(parent);
        }
    });
}

botaoAddEl.addEventListener('click', novoPredio);
formBackboneSimEl.addEventListener('change', e => { revela(testeBackboneEl) });
formBackboneSim2El.addEventListener('change', e => { revela(testeBackbone2El) });
formBackboneNaoEl.addEventListener('change', e => { revela(testeBackboneEl) });
formBackboneNao2El.addEventListener('change', e => { revela(testeBackbone2El) });
nextEl.addEventListener('click', proxPagina);
botaoSalvarEl.addEventListener("click", salvaAndar);