export default class SwapiService {
  
    _apiBase = 'https://api.jikan.moe/v3';
    
    async getResource (url) {
        const response = await fetch(`${this._apiBase}${url}`);
        return await response.json();
    }

    getAllPeople = async () => {
        const res = await this.getResource('/people/');
        return res.results.map(this._transformPerson);
    }
  
    getPerson = async (id) => {
        const person = await this.getResource(`/people/${id}`); 
        return this._transformPerson(person);
    }
  
    getTopRatedAnime = async () => {
        const id = Math.floor(Math.random()*50);
        const res = await this.getResource('/search/anime?order_by=score&sort=desc&limit=50');
        return this._transformAnimeData(res.results[id]);
    }
    
    getAllAnime = async () => {
        const res = await this.getResource('/search/anime?order_by=score&rated=rx');
        return res.results.map(this._transformAnimeData);
    }
  
    getAnime = async (id) => {
        const anime = await this.getResource(`/anime/${id}`);
        return this._transformAnimeData(anime);
    }
  
    getAllStarships = async () => {
        const res = await this.getResource('/starships/');
        return res.results.map(this._transformStarship);
    }
  
    getStarship = async (id) => {
      const starship = await this.getResource(`/starships/${id}`);
      return this._transformStarship(starship);
    }

    getPersonImage = (id) => {
        console.log(`${this._imgBase}/characters/${id}.jpg`);
        return `${this._imgBase}/characters/${id}.jpg`;
    }

    getPlanetImage = (id) => {
        console.log(`${this._imgBase}/planets/${id}.jpg`);
        return `${this._imgBase}/planets/${id}.jpg`;
    }

    getStarshipImage = (id) => {
        return `${this._imgBase}/starships/${id}.jpg`;
    }

    getId = (item) => {
        const regExp = /\/([0-9]*)\/$/;
        return item.url.match(regExp)[1];
    }

    _transformAnimeData = (anime) => {
        return {
            id: anime.mal_id,
            img: anime.image_url,
            title: anime.title,
            en: anime.title_english,
            genres: anime.genres?.map(genre => genre.name).join(',  '),
            score: anime.score,
            duration: anime.duration,
            episodes: anime.episodes,
            type: anime.type,
            rated: anime.rated,
            synopsis: anime.synopsis
        }
    }

    _transformPerson = (person) => {
        return {
            id: 1,
            img: this.getPersonImage(1),
            name: person.name,
            gender: person.gender,
            birthYear: person.birth_year,
            mass: person.mass,
            eyeColor: person.eye_color,
            
        }    
    }
    
    _transformStarship = (starship) => {
        return {
            id: 1,
            img: this.getStarshipImage(1),
            name: starship.name,
            model: starship.model,
            length: starship.length,
            passengers: starship.passengers,
            crew: starship.crew,
            costInCredits: starship.cost_in_credits,
            
        }    
    }    
}
