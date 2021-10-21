export default class AnimeService {
  
    _apiBase = 'https://api.jikan.moe/v3';
    
    async getResource (url) {
        const response = await fetch(`${this._apiBase}${url}`);
        return await response.json();
    }
  
    getTopRatedAnime = async () => {
        const id = Math.floor(Math.random()*50);
        const res = await this.getResource('/search/anime?order_by=score&sort=desc&limit=50');
        return this._transformAnimeData(res.results[id]);
    }
    
    getAllAnime = async () => {
        const res = await this.getResource('/search/anime?order_by=score');
        return res.results.map(this._transformAnimeData);
    }
  
    getAnime = async (id) => {
        const anime = await this.getResource(`/anime/${id}`);
        return this._transformAnimeData(anime);
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
}