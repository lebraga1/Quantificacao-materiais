export default function calculaMateriais(predio){

    for(let i = 1; i < predio.pontos.length; i++){
        let itensAndar = {
            "rack": "",
            "femea": predio.pontos[i]*2,
            "espelhos": predio.pontos[i],
            "patch_cords": this.femea,
            "ppmh": Math.ceil(femea/24),
            "organizador" : this.ppmh*2,
            "patch_cable": this.femea,
            "bandeja": 1,
            "exaustor": 1,
            "switch": this.ppmh,
            "to": i==1?0:ceil(predio.n_fibras/8),
            "acoplador": i==1?0:ceil(predio.n_fibras/2),
            "pigtail": i==1?0:predio.n_fibras,
            "pigtail_longo": i==1?0:predio.n_fibras/2,
            "cordao_otico": predio.n_fibras/2 
        }
        predio.itensAndares[i] = itensAndar;
    }
    


    return predio;
}