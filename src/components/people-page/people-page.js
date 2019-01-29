import React, {Component} from 'react'
import ItemList from '../item-list';
import ItemDetails from '../item-details';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service'
import Row from '../row'
import ErrorBoundtry from '../error-boundtry'
import './people-page.css'



export default class PeoplePage extends Component {
  swapiService = new SwapiService
  state = {
    selectedItem: 15
  };


  onItemSelected = (selectedItem) => {
    this.setState({
      selectedItem: selectedItem
    });
  };

  render () {
    if (this.state.hasError) {
      return  <ErrorIndicator />
    }
    const itemList = (
      <ItemList 
        onItemSelected={this.onItemSelected}
        getData={ this.swapiService.getAllPeople }>
        {(item) => (`${item.name} (${item.birthYear})`)}
      </ItemList>
    );

    const itemDetails= (
      <ErrorBoundtry>
      <ItemDetails itemId={this.state.selectedItem} />
      </ErrorBoundtry>
    );

    return (
      
        <Row left={itemList} right={itemDetails}/>
      
    )
  }
}