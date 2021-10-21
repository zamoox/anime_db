import React, {Component} from 'react';

import './item-details.css';
import Spinner from '../spinner';

const Record = ({ item, field, label }) => {
    return (
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{ item[field] }</span>            
        </li>
    ); 
};

export {
    Record
};

export default class ItemDetails extends Component {
    
    state = {
        item: null,
        loading: true,
    }

    componentDidMount(){
        this.updateItem();
    }

    componentDidUpdate(prevProps){
        if (this.props.itemId !== prevProps.itemId || 
            this.props.getData !== prevProps.getData) {
            this.setState({loading: true});
            this.updateItem();
        }
    }

    updateItem = () => {
        const {itemId, getData} = this.props;

        if (!itemId) {
            return;
        }

        getData(itemId)
        .then(item => this.setState({item, loading: false}));
    }

    render () {

        if (!this.state.item) {
            return <span>Select an item please!</span>;
        }


        const { item, loading } = this.state;

        const { en, title, img, synopsis } = item;

        if (loading) {
            return <Spinner/>;
        }

        return (
            <div className="card" style={{ "background": "#191922"}}>
            <div className = "item-details card">
                <img src={img} alt={title}></img>
                <div className="card-body">
                    <h4 id="right-card">{title}</h4>  
                    <small style={{'color': 'grey'}}>{en}</small>
                    <ul className="list-group list-group-flush">
                        {
                            React.Children.map(this.props.children, (child) => {
                                return React.cloneElement(child, { item });
                            })
                        }
                    </ul>
                </div>
            </div>
            <p id="card-synopsis">{synopsis}</p>
            </div>
        );
    }
}