import { Component } from 'react';

export class Basic extends Component {
  state = {
    clicks: 0,
  };

  handleClick = () => {
    this.setState(prevState => ({
        clicks: prevState.clicks + 1,
    }));
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>count: {this.state.clicks} </button>
      </div>
    );
  }
}
