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
    radioBtnValue: '',
    dropdownValue: ''
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

  dropdownHandler = e => {
    this.setState({
      dropdownValue: e.target.value
    })
    const pokemons = [...this.state.pokemons]
    if(e.target.value === 'speed'){
      const speedSort = pokemons.sort((a,b) => {
        let speedA = a.stats.find(stat => stat.name === 'speed')
        let speedB = b.stats.find(stat => stat.name === 'speed')
       return (speedA.value - speedB.value)
      })
      this.setState({
        pokemons: speedSort
      })
    }else if(e.target.value === 'defense'){
      const defenseSort = pokemons.sort((a,b) => {
        let defenseA = a.stats.find(stat => stat.name === 'defense')
        let defenseB = b.stats.find(stat => stat.name === 'defense')
       return (defenseA.value - defenseB.value)
      })
      this.setState({
        pokemons: defenseSort
      })
    }else if(e.target.value === 'special-attack'){
      const specialAttackSort = pokemons.sort((a,b) => {
        let specialAttackA = a.stats.find(stat => stat.name === 'special-attack')
        let specialAttackB = b.stats.find(stat => stat.name === 'special-attack')
       return (specialAttackA.value - specialAttackB.value)
      })
      this.setState({
        pokemons: specialAttackSort
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
          <br/>
          <label>HP</label> <input type="radio" value="hp" checked={this.state.radioBtnValue == "hp"} onChange={this.radioChangeHandler}/>
          <br/>
          <select onChange={this.dropdownHandler}>
            <option>Select a Filter</option>
            <option name='speed' value='speed'>Speed</option>
            <option name='defense' value='defense'>Defense</option>
            <option name='special-attack' value='special-attack'>Special Attack</option>
          </select>
        <br />
        <br />
        <PokemonCollection pokemons={this.renderSearchedPokemon()} onDoubleClick={this.renderPokemon} />
      </Container>
    )
  }
}

export default PokemonPage
