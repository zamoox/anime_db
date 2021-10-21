import React from 'react';

import ItemDetails, { Record } from '../item-details';
import { withAnimeService } from '../hoc-helpers';

const AnimeDetails = (props) => {
    return (
        <ItemDetails {...props}>
            <Record field="genres" label="Genres" />
            <Record field="score" label="Score" />
            <Record field="episodes" label="Episodes" />
            <Record field="duration" label="Duration" />
        </ItemDetails>
    );
};

const mapMethodsToProps = (animeService) => {
    return {
        getData: animeService.getAnime,
    }
}

export default withAnimeService(mapMethodsToProps)(AnimeDetails);