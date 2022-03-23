



const fetchPokemon = (pokeName) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName.toLowerCase()}`;
    fetch(url).then(res => {
        if (res.status !== 200) {
            pokeImgChange('./pikachusad.png');
            alert('Ese pokemón no existe! :(')
        }
        return res.json();
    }).then(data => {
        console.log(data);
        this.fetchSpecie(data.species.url)
        this.fetchStats(data.stats[0],0)
        this.fetchStats(data.stats[1],1)
        this.fetchStats(data.stats[2],2)

        let pokeImg = data.sprites.front_default;
        pokeImgChange(pokeImg)
        let pokeName = document.getElementById('namePokemon')
        pokeName.innerHTML = String(data.name)
        let pokeExperience = document.getElementById('experiencePokemon');
        pokeExperience.innerHTML = `EXP ${data.base_experience}`;
        let pokeType = document.getElementById('typePokemon');
        pokeType.innerHTML = data.types[0].type.name;
        let pokeHeight = document.getElementById('height');
        pokeHeight.innerHTML = data.height;
        let pokeWeight = document.getElementById('weight');
        pokeWeight.innerHTML = data.weight;
        let idPokemon = document.getElementById('idPokemon');
        idPokemon.innerHTML = data.id;
      
    })

}

fetchSpecie = (specie)=>{
    fetch(specie).then(res => {
        if (res.status !== 200) {
            alert('¡No se encontró data sobre esa especie! :(')
        }
        return res.json();
    }).then(data => {
        data.names.forEach(name=>{
            if (name.language.name === 'en'){
                let pokeName = document.getElementById('namePokemon')
                pokeName.innerHTML = String(name.name);
            }
        })
        const elementFacts = document.getElementById('facts');
        elementFacts.innerHTML = []
        data.flavor_text_entries.slice(0,5).forEach(fact=>{
            if(fact.language.name==='en'){
                const liElement = document.createElement('li');
                liElement.innerHTML =fact.flavor_text;
                elementFacts.appendChild(liElement)
            }
        })
    
        
          
    })
}

fetchStats= (stats,i)=>{
    let classProgressBar = document.getElementsByClassName('progress-bar');
    let barStat = document.getElementById(`${stats.stat.name}Bar`);
    barStat.style.width=`${stats.base_stat}%`;
    classProgressBar[i].style.backgroundColor = this.getColor(stats.base_stat);
}

getColor = (baseStat) =>{
    if(baseStat>0 && baseStat<25){
        return '#fefecb';
    }else if(baseStat>25 && baseStat<50){
        return '#fecb65';

    }else if(baseStat>50 && baseStat<75){
        return '#beff5c';
    }
    else if(baseStat>75 && baseStat<90){
        return '#a3ccfa';
    }else if(baseStat>90){
        return '#fe0000';
    }
}

const imprimir = () => {
    const pokeInput = document.getElementById('pokeName');
    let pokeName = pokeInput.value;
    pokeName = pokeName ? pokeName : 'Pikachu';
    fetchPokemon(pokeName);

}

const pokeImgChange = (url) => {
    const pokemonImage = document.getElementById('pokeImg');
    pokemonImage.src = url;
}

const titleCase = (namePokemon) =>{

}

fetchPokemon('bulbasaur')