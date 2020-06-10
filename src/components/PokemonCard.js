import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {

  state = {
    clicked: false
  }

  flipSprite = e => {
    this.setState(prevState => {
      return {clicked: !prevState.clicked}
    })
  }

  render(){
      let hp = {}
      hp = this.props.stats.find(stat => stat.name === 'hp')
      // props.stats.forEach(stat => {
      //   if(stat.name === 'hp'){
      //     hp = stat
      //   }
      // })
      return (
        <Card>
          <div onClick={this.flipSprite}>
            <div className="image">
              {this.state.clicked ? <img src={this.props.sprites.back} alt="oh no!" /> : <img src={this.props.sprites.front} alt="oh no!" />}
            </div>
            <div className="content">
              <div className="header">{this.props.name}</div>
            </div>
            <div className="extra content">
              <span>
                <i className="icon heartbeat red" />
                {hp.name} {hp.value}
              </span>
            </div>
          </div>
        </Card>
      )
  }
}

export default PokemonCard
