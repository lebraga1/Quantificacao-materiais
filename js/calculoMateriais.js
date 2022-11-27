export default function calculaMateriais(predio){

    let total = {
        "rack": [],//calcular depois
        "femea": 0,    
        "espelhos": 0,
        "patch_cords": 0,
        "ppmh": 0,
        "organizador" : 0,
        "patch_cable": 0,
        "bandeja": 0,
        "exaustor": 0,
        "switch": 0,
        "to": 0,
        "acoplador_longo": 0,
        "pigtail": 0,
        "pigtail_longo": 0,
        "cordao_otico": 0,
        "filtro": 0,
    };

    for(let i = 1; i < predio.pontos.length; i++){
        let itensAndar = {
            "rack": 0,//calcular depois
            "femea": predio.pontos[i]*2,    
            "espelhos": predio.pontos[i],
            "patch_cords": predio.pontos[i]*2, 
            "ppmh": Math.ceil(predio.pontos[i]/12),
            "organizador" : Math.ceil(predio.pontos[i]/12)*2,
            "patch_cable": predio.pontos[i]*2,
            "bandeja": 1,
            "exaustor": 1,
            "switch": Math.ceil(predio.pontos[i]/12),
            "to": i==1?0:Math.ceil(predio.n_fibras/8),
            "acoplador_longo": i==1?0:Math.ceil(predio.n_fibras/2),
            "pigtail": i==1?0:predio.n_fibras,
            "pigtail_longo": i==1?0:predio.n_fibras/2,
            "cordao_otico": predio.n_fibras/2,
            "filtro": Math.ceil(predio.pontos[i]/72),
        }
        total.rack.push(itensAndar.rack);
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
        total.acoplador_longo += itensAndar.acoplador_longo;
        total.pigtail += itensAndar.pigtail;
        total.pigtail_longo += itensAndar.pigtail_longo;
        total.cordao_otico += itensAndar.cordao_otico;
        total.filtro += itensAndar.filtro;
    }
    
    predio.total = total;
    
    return predio;
}