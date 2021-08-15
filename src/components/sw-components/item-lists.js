import React from 'react';

import ItemList from '../item-list';

import { withData, withSwapiService, 
    withChildFunction, Compose} from '../hoc-helpers';

//render functions 
const renderName = ({title}) => <span>{title}</span>;

//mapping 
const mapPersonMethodsToProps = (service) => {
    return {
        getData: service.getAllPeople
    }
}

const mapAnimeMethodsToProps = (service) => {
    return {
        getData: service.getAllAnime
    }
}

const mapStarshipMethodsToProps = (service) => {
    return {
        getData: service.getAllStarships
    }
}

const PeopleList = Compose(
                        withSwapiService(mapPersonMethodsToProps),
                        withData,
                        withChildFunction(renderName)
                    )(ItemList);

const AnimeList = Compose(
                        withSwapiService(mapAnimeMethodsToProps),
                        withData,
                        withChildFunction(renderName)
                    )(ItemList);

const StarshipList = Compose(
                        withSwapiService(mapStarshipMethodsToProps),
                        withData,
                        withChildFunction(renderName)
                    )(ItemList);

export {
    PeopleList, 
    AnimeList, 
    StarshipList, 
};