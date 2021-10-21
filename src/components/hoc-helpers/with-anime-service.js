import React from 'react';
import { AnimeConsumer } from '../anime-service-context';

const withAnimeService = (mapMethodsToProps) => (Wrapped) => {
    return (props) => { 
        return (
            <AnimeConsumer>
                {
                    (AnimeService) => {
                        const serviceProps = mapMethodsToProps(AnimeService);

                        return (
                            <Wrapped {...props} {...serviceProps} />
                        );
                    }
                }
            </AnimeConsumer>
        )
    }
}

export default withAnimeService;
