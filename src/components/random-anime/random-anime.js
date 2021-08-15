import React, {Component} from 'react';

import './random-anime.css';
import SwapiService from '../../services/swapi-service.js';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import icon from './default-planet.png';

export default class RandomAnime extends Component {

    static defaultProps = {
        updateInterval: 5000,
    }

    state = {
        anime: {},
        loading: true,
        error: false 
    }

    swapiService = new SwapiService();

    componentDidMount() {
        const { updateInterval } = this.props;
        this.updateAnime();
        this.interval = setInterval(this.updateAnime, updateInterval);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onError = () => {
        this.setState({
            error:true,
            loading:false
        });
    }

    updateAnime = () => {
        this.swapiService
            .getTopRatedAnime()
            .then((anime) => {
                this.setState({anime, error: false, loading: false, });
            })
            .catch(this.onError);
    }

    render () {

        const { anime, loading, error } = this.state;

        const hasData = !(loading || error);
        
        const errorIndicator = error ? <ErrorIndicator/>: null;
        const spinner = loading && !error ? <Spinner/>: null;
        const content = hasData ? <AnimeView anime={anime}/>: null;  
         

        return (
            <div className = "random-anime jumbotron rounded">
                {errorIndicator}
                {spinner}
                {content}
            </div>
        );
    }
}

const AnimeView = ({anime}) => {

    const {img, title, score, genres, episodes, duration, type, rated, synopsis} = anime;

    return (
        <React.Fragment>
        <h6 id="blind-header">Top Anime</h6>
        <div className="img_wrapper"> 
            <img src ={img ? img : icon} alt={title}></img>
        </div>
        <div>
            <h4>{title}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <span className="term">Genres</span>
                    <span>{genres}</span>
                </li>
                <li className="list-group-item">
                    <span className="term">Score</span>
                    <span>{score}</span>
                </li>
                <li className="list-group-item">
                    <span className="term">Episodes</span>
                    <span>{episodes}</span>
                </li>
                <li className="list-group-item">
                    <span className="term">Duration</span>
                    <span>{duration}</span>
                </li>
                <li className="list-group-item">
                    <span className="term">Type</span>
                    <span>{type}</span>
                </li>
                <li className="list-group-item">
                    <small>{synopsis}</small>
                </li>
            </ul>
        </div>
        </React.Fragment>
    );
}