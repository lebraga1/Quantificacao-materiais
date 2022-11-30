export default function calculaMateriais(predio) {

    let total = {
        "rack_final": {},
        "par_trancado": 0,
        "FO": 0,
        "rack": [],//calcular depois
        "femea": 0,
        "espelhos": 0,
        "patch_cords": 0,
        "ppmh": 0,
        "organizador": 0,
        "patch_cable": 0,
        "bandeja": 0,
        "exaustor": 0,
        "switch": 0,
        "to": 0,
        "pigtail_longo": 0,
        "filtro": 0,
        "dio": 0,
        "pigtail": 0,
        "acoplhador": 0,
        "cordao": 0,
        "switch_core": 0,
        "pigtail_principal": 0,
        "cordao_principal": 0,
        "cordao_longo": 0,
        "caixa_emenda": 0,
        "etq_por_ppmh": 0,
        "etq_ppmh": 0,
        "etq_espelho": 0,
        "etq_utp": 0,
        "etq_dio": 0,
        "abracadeira": 0,
        "porca": 0
    };

    for (let i = 1; i < predio.pontos.length; i++) {
        let itensAndar = {
            "femea": predio.pontos[i] * 2,
            "espelhos": Number(predio.pontos[i]),
            "patch_cords": predio.pontos[i] * 2,
            "ppmh": Math.ceil(predio.pontos[i] / 12),
            "organizador": Math.ceil(predio.pontos[i] / 12) * 2,
            "patch_cable": predio.pontos[i] * 2,
            "bandeja": 1,
            "exaustor": 1,
            "switch": Math.ceil(predio.pontos[i] / 12),
            "to": i == 1 ? 0 : 1,
            "pigtail_longo": i == 1 ? 0 : Number(predio.n_fibras),
            "filtro": Math.ceil(predio.pontos[i] / 72),
            "dio": 0,
            "pigtail": 0,
            "acoplhador": 0,
            "cordao": 0,
            "caixa_emenda": 0
        }
        if (predio.n_fibras > 8) {
            itensAndar.to = 0;
            itensAndar.pigtail_longo = 0;
            itensAndar.dio = Math.ceil(predio.n_fibras / 24);
            itensAndar.pigtail = Number(predio.n_fibras);
            itensAndar.acoplhador = Number(predio.n_fibras);
            itensAndar.cordao = Number(predio.n_fibras);
            itensAndar.caixa_emenda = Math.ceil(Number(predio.n_fibras) / 12);
        }

        let altura_rack = (itensAndar.ppmh + itensAndar.organizador + 4 * itensAndar.bandeja +
            2 * itensAndar.exaustor + itensAndar.switch + itensAndar.filtro + itensAndar.dio) * 1.2;
        let tamanhos = [8, 9, 10, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48];
        let done = false;
        let rack = 0;
        let l = 0;
        while (!done) {
            if (l == tamanhos.length) {
                total.rack[48]++;
                altura_rack = ((altura_rack % 48) + 2 + 4) * 1.2;
                itensAndar.exaustor++;
                itensAndar.bandeja++;
                l = 0;
            }
            if (tamanhos[l] >= altura_rack) {
                rack = tamanhos[l];
                done = true;
            }
            l++;
        }
        if(total.rack[rack]==null){
            total.rack[rack]=1;
        }
        else{
            total.rack[rack]++;
        }
        total.femea += itensAndar.femea;
        total.espelhos += itensAndar.espelhos;
        total.patch_cords += itensAndar.patch_cords;
        total.ppmh += itensAndar.ppmh;
        total.organizador += itensAndar.organizador;
        total.patch_cable += itensAndar.patch_cable;
        total.bandeja += itensAndar.bandeja;
        total.exaustor += itensAndar.exaustor;
        total.switch += itensAndar.switch;
        total.to += itensAndar.to;
        total.pigtail_longo += itensAndar.pigtail_longo;
        total.filtro += itensAndar.filtro;
        total.dio += itensAndar.dio;
        total.pigtail += itensAndar.pigtail;
        total.acoplhador += itensAndar.acoplhador;
        total.cordao += itensAndar.cordao;
        total.caixa_emenda += itensAndar.caixa_emenda;

    }
    let acumulador = 0;
    for (let i = 1; i < predio.mh.length; i++) {
        acumulador += Number(predio.mh[i]) * Number(predio.pontos[i]) * 2;
    }
    total.par_trancado = Math.ceil(acumulador / 305);

    if (predio.backbone) {
        acumulador = 0;
        let altura = Number(predio.alturas[1]);
        for (let i = 2; i < predio.alturas.length; i++) {
            acumulador += altura + Number(predio.alturas[i]) * 2;
            altura += Number(predio.alturas[i]);
        }
        total.FO = acumulador * 1.2;

        let fibrasSEQ = predio.n_fibras * (Number(predio.andares) - 1);
        total.cordao_longo += Number(predio.n_fibras); //ligacao 1 andar
        total.dio += Math.ceil(fibrasSEQ / 24);
        total.acoplhador += fibrasSEQ;
        total.cordao += fibrasSEQ;
        total.pigtail += fibrasSEQ;
        total.caixa_emenda += Math.ceil(fibrasSEQ / 12);
        total.switch_core += Math.ceil((fibrasSEQ + Number(predio.n_fibras)) / 48);
        total.filtro += Math.ceil(total.switch_core / 6);

        total.organizador += Math.ceil(fibrasSEQ / 24) +
            Math.ceil(Number(predio.n_fibras_principal) / 24) + total.switch_core;
        total.bandeja++;
        total.exaustor++;

        let altura_rack = (total.switch_core * 2 + Math.ceil(total.switch_core / 6) +
            2 + 4 + Math.ceil(fibrasSEQ / 24) + total.switch_core +
            Math.ceil(Number(predio.n_fibras_principal) / 24)) * 1.2;
        let tamanhos = [8, 9, 10, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48];
        let done = false;
        let rack = 0;
        let k = 0;
        while (!done) {
            if (k == tamanhos.length) {
                total.rack[48]++;
                altura_rack = ((altura_rack % 48) + 2 + 4) * 1.2;
                total.exaustor++;
                total.bandeja++;
                k = 0;
            }
            if (tamanhos[k] >= altura_rack) {
                rack = tamanhos[k];
                done = true;
            }
            k++;
        }
        if(total.rack[rack]==null){
            total.rack[rack]=1;
        }
        else{
            total.rack[rack]++;
        }
        let pregados = total.ppmh + total.organizador + total.switch + total.switch_core +
            total.dio + total.bandeja;
        total.porca = Math.ceil(pregados / 10);
    }
    if (predio.backbone_sec) {
        total.pigtail_principal += Number(predio.n_fibras_principal);
        total.cordao_principal += Number(predio.n_fibras_principal);
        total.acoplhador += Number(predio.n_fibras_principal);
        total.dio += Math.ceil(Number(predio.n_fibras_principal) / 24);
        total.caixa_emenda += Math.ceil(Number(predio.n_fibras_principal) / 12);
    }

    total.etq_por_ppmh = total.femea;
    total.etq_espelho = total.espelhos;
    total.etq_dio = total.acoplhador;
    total.etq_ppmh = total.ppmh;
    total.etq_utp = total.femea;
    total.abracadeira = Math.ceil(total.femea / 100);

    let rackFinal = {};
    for (let j = 0; j < total.rack.length; j++) {
        if (total.rack[j] != null && total.rack[j] != 0) {
            rackFinal[j] = total.rack[j];
        }
    }
    total.rack_final=rackFinal;

    predio.totalAndares = total;



    return predio;
}