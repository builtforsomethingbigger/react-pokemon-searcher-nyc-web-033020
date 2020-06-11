import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import Search from './Search'
import { Container } from 'semantic-ui-react'

const API = 'http://localhost:3000/pokemon'

class PokemonPage extends React.Component {

  state = {
    pokemons: [],
    searchInput: '',
    radioBtnValue: ''
  }

  componentDidMount(){
    this.renderPokemon()
  }
  
  renderPokemon = () => {
    fetch(API)
    .then(res => res.json())
    .then(pokemons => this.setState({ pokemons }))
  }

  searchPokemon = e => {
    this.setState({
      searchInput: e.target.value
    })
    this.renderSearchedPokemon()
  }

  renderSearchedPokemon = () => {
    const pokemons = [...this.state.pokemons] /* copy of the pokemon state prop */
    const searchInput = this.state.searchInput
    return pokemons.filter(pokemon => pokemon.name.includes(searchInput))
    
  }

  radioChangeHandler = e => {
    this.setState({
      radioBtnValue: e.target.value
    })
    const pokemons = [...this.state.pokemons]
    if(e.target.value === "A-Z"){
      const sorted = pokemons.sort((a,b) => ('' + a.name).localeCompare(b.name))
      this.setState({
        pokemons: sorted
      })
    }else if (e.target.value === "hp"){
      const hpSort = pokemons.sort((a,b) => {
        let hpA = a.stats.find(stat => stat.name === 'hp')
        let hpB = b.stats.find(stat => stat.name === 'hp')
       return (hpA.value - hpB.value)
      })
      this.setState({
        pokemons: hpSort
      })

    }
  }

  render() {
  
    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm submit={this.renderPokemon} />
        <br />
        <Search onChange={this.searchPokemon} value={this.state.searchInput} />
          <label>Name A-Z</label> <input type="radio" value="A-Z" checked={this.state.radioBtnValue == "A-Z"} onChange={this.radioChangeHandler}/>
          
          <label>HP</label> <input type="radio" value="hp" checked={this.state.radioBtnValue == "hp"} onChange={this.radioChangeHandler}/>
        <br />
        <PokemonCollection pokemons={this.renderSearchedPokemon()} onDoubleClick={this.renderPokemon} />
      </Container>
    )
  }
}

export default PokemonPage
