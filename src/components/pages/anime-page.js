import React, {Component} from 'react';


import { AnimeList, AnimeDetails } from '../sw-components';

import Row from '../row';

export default class AnimePage extends Component {
    
    state = {
        selectedAnime: 5
    }

    onItemSelected = (selectedAnime) => {
        console.log('sel: ' + selectedAnime);
        this.setState({ selectedAnime });
    }
 
    render () {

        return (
            <Row left={<AnimeList onItemSelected={this.onItemSelected} />} 
                 right={<AnimeDetails itemId={this.state.selectedAnime} />}
            />
        );
    }
}