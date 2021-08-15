import React from 'react';

import ItemDetails, { Record } from '../item-details';
import { withSwapiService } from '../hoc-helpers';

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

const mapMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAnime,
    }
}

export default withSwapiService(mapMethodsToProps)(AnimeDetails);