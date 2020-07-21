
async function clickFilm(){
  await getFilms();    
}
  
 async function getFilms(){
    let characterResponse = await fetch('http://swapi.dev/api/films/')
    let characterResponseJson = await characterResponse.json();
    let films = await Promise.all(
        characterResponseJson.results.map(data => data)
    )
     films.map(async d => {
         
         let urls = d.planets;
         let people =  d.characters;
         let startships = d.starships;

         let planetInfo = await getPlanets(urls);
         let peopleInfo = await getPeople(people);
         let startshipinfo = await getStarships(startships);

         let objFilmInfo ={
            nombre_pelicula: d.title,
            planetas:planetInfo,
            actores:peopleInfo,
            nave_estelar:startshipinfo
         } 
         console.log(objFilmInfo);
     })
  }

 async function getPlanets(arrPlanets) {
     
    let objPlanets;
    let arrBuildPlanets = [];
    
    let dataPlanet = Promise.all(arrPlanets.map(url => 
      fetch(url).then(response => response.json())    
    )).then(data => {
        data.map(d =>{
          objPlanets = {
             nombre: d.name,
             terreno:d.terrain,
             gravedad:d.gravity,
             diametro:d.diameter,
             poblacion:d.population 
           };
           arrBuildPlanets.push(objPlanets);
        })
        return arrBuildPlanets;
    })

    return await dataPlanet;
  }

  async function getPeople(arrayPeople){

    let objPeople;
    let arrBuildPeople = [];
    
    let dataPeople = Promise.all(arrayPeople.map(url => 
      fetch(url).then(response => response.json())    
    )).then(data => {
        data.map( d =>{
            objPeople = {
             nombre: d.name,
             genero:d.gender,
             color_cabello:d.hair_color,
             color_piel:d.skin_color,
             color_ojos:d.eye_color, 
             estatura:d.height,
             planeta_proveniente:d.homeworld,
             especie: d.species 
           };
           arrBuildPeople.push(objPeople);
        })
        return arrBuildPeople;
    })

    return await dataPeople;
  }

  async function getStarships(arrayStarships){

    let objStartShip;
    let arrBuildStartship = [];
    
    let dataStartship = Promise.all(arrayStarships.map(url => 
      fetch(url).then(response => response.json())    
    )).then(data => {
        data.map(d =>{
            objStartShip = {
             nombre: d.name,
             modelo:d.model,
             fabricante:d.manufacturer,
             numero_pasajeros:d.passengers
           };
           arrBuildStartship.push(objStartShip);
        })
        return arrBuildStartship;
    })

    return await dataStartship;
  }

  async function getSpecies(arraySpecies){
    let objSpecies;
    let arrBuildSpecies = [];
    
    let dataSpecies = Promise.all(arraySpecies.map(url => 
      fetch(url).then(response => response.json())    
    )).then(data => {
        data.map(d =>{
            objSpecies = {
             nombre: d.name,
             idioma:d.language,
             estarura_promedio:d.average_height,
           };
           arrBuildSpecies.push(objSpecies);
        })
        return data;
    })

    return await dataSpecies;
  }





