let nextEl = document.querySelector("#down-arrow");
let botaoAddEl = document.querySelector("#add");
let wrapperEl = document.querySelector("#wrapper");
let formFileEl = document.querySelector("#formFile");
let formContainerEl = document.querySelector("#load");
let instrucaoEl = document.querySelector("#instrucao");
let testeBackboneEl = document.querySelector("#teste-backbone");
let formBackboneSimEl = document.querySelector("#sim");
let formBackboneNaoEl = document.querySelector("#nao");
let formAndarEl = document.querySelector("#andar");
let formCatEl = document.querySelector("#cat");
let formFibraEl = document.querySelector("#fibra");
let formNFibraEl = document.querySelector("#nfibra");

let pagina = 1;

let predios = [];
function Predio (){
    rack = [
        {
            altura: "",
            componentes: {
            }
        }
    ],
    andares = "",
    mh = [],
    pontos = [],
    cat = "",
    backbone = false,
    backbone_sec = false,
    fibra = "",
    n_fibras = ""
};

let instrucoes = [
    "",
    "Adicione um prédio para começar!",
    "Preencha os campos:",
    "Edite os andares:"
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
    wrapperEl.style.transform = `translateY(-${100*pagina}vh)`;
    pagina++;
    instrucaoEl.innerText = instrucoes[pagina];
    if(pagina==2){
        nextEl.style.transform = "translateY(0vh)";
    }
}

function novoPredio(){
    predios.push(new Predio());
    formContainerEl.style.display = "none";
    proxPagina();
}

function revela(){
    testeBackboneEl.classList.toggle("sumir");
}

botaoAddEl.addEventListener('click', novoPredio);
formBackboneSimEl.addEventListener('change', revela);
formBackboneNaoEl.addEventListener('change', revela);
nextEl.addEventListener('click', proxPagina);