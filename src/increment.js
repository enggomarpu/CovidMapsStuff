import React, { Component } from 'react';

export default class Counter extends Component {
    constructor(props) {
      super(props)
      this.state = {num: 0}
      this.element = React.createRef()
    }
    render() {
      return (
        <div ref={this.element}>
          <button className='increase'>+</button>
          <label>{this.state.num}</label>
          <button className="decrease">-</button>
        </div>
      )
    }
    componentDidMount() {
      this.element.current.addEventListener('click', this)
    }
    handleEvent(e) {
      e.target.className === 'increase' && this.updateCounter(+1)
      e.target.className === 'decrease' && this.updateCounter(-1)
    }
    updateCounter(value) {
      this.setState(prevState => {
        prevState.num += value
        return prevState
      })
    }
  }  