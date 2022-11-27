import calcula from "./calculoMateriais.js";

let nextEl = document.querySelector("#down-arrow");
let botaoAddEl = document.querySelector("#add");
let wrapperEl = document.querySelector("#wrapper");
let formFileEl = document.querySelector("#formFile");
let formContainerEl = document.querySelector("#load");
let instrucaoEl = document.querySelector("#instrucao");
let testeBackboneEl = document.querySelector("#teste-backbone");

let formBackboneSimEl = document.querySelector("#sim");
let formBackboneSim2El = document.querySelector("#sim2");
let formAndarEl = document.querySelector("#andar");
let formCatEl = document.querySelector("#cat");
let formFibraEl = document.querySelector("#fibra");
let formNFibraEl = document.querySelector("#nfibra");

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
    "n_fibras": "8"
}

let predio = {
    total: {},
    andares : "",
    mh : [],
    pontos : [],
    alturas : [],
    cat : "",
    backbone: false,
    backbone_sec: false,
    fibra: "",
    n_fibras : ""
};

let instrucoes = [
    "",
    "Adicione um prédio para começar!",
    "Preencha os campos:",
    "Edite os andares:",
    "Resultado:"
]

function proxPagina(){
    if(pagina==2){
        if(formBackboneSimEl.checked == true){
            if(formAndarEl.value == "" || formCatEl.value == "" || formFibraEl.value == "" || formNFibraEl.value == ""){
                window.alert("Os valores devem ser preenchidos!");
                return;
            }
        }
        else{
            if(formAndarEl.value == "" || formCatEl.value == ""){
                window.alert("Os valores devem ser preenchidos!");
                return;
            }
        }
    }
    if(pagina==3){
        if(predio.alturas.length-1 != predio.andares){
            window.alert("Configure todos os Andares!");
            return;
        }
    }
    wrapperEl.style.transform = `translateY(-${100*pagina}vh)`;
    pagina++;
    instrucaoEl.innerText = instrucoes[pagina];
    if(pagina==2){
        nextEl.style.transform = "translateY(0vh)";
    }
    if(pagina==3){
        montaPredio();
    }
    if(pagina==4){
        nextEl.style.transform = "translateY(190vh)";
        console.log(predio);
        predio = calcula(predio);
    }
}

function novoPredio(){
    formContainerEl.style.display = "none";
    proxPagina();
}

function revela(){
    testeBackboneEl.classList.toggle("sumir");
}

function montaPredio(){
    predio.cat = formCatEl.value;
    predio.fibra = formFibraEl.value;
    predio.n_fibras = formNFibraEl.value;
    predio.andares = formAndarEl.value;
    predio.backbone = formBackboneSimEl.checked!=""?true:false;
    predio.backbone_sec = formBackboneSim2El.checked!=""?true:false;
    for(let i = 1; i <= predio.andares; i++){
        let newDiv = document.createElement("div");
        newDiv.classList.add("andarP")

        let newLabel = document.createElement("label");
        let newInput = document.createElement("input");
        newInput.setAttribute("type", "radio");
        newInput.setAttribute("name", "andar");
        newInput.setAttribute("id",`andar-${i}`);

        newLabel.innerText = `Andar ${i}`;
        newLabel.setAttribute("for", `andar-${i}`);

        newDiv.appendChild(newInput);
        newDiv.appendChild(newLabel);
        predioEl.appendChild(newDiv);
    }

    andares = document.querySelectorAll(".andarP");
    andares.forEach((e) => {
        e.firstElementChild.addEventListener('change', (el)=>{
            let idEl = el.target.id;
            id = idEl.split("-")[1];
        })
    })
}

let id = 0;

function salvaAndar(){
    if(id == 0){
        for(let i = 1; i < andares.length; i++){
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

botaoAddEl.addEventListener('click', novoPredio);
formBackboneSimEl.addEventListener('change', revela);
nextEl.addEventListener('click', proxPagina);
botaoSalvarEl.addEventListener("click", salvaAndar);