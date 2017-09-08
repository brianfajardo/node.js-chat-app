import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {

  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = { messages: [] }
  }

  handleSubmit(e) {
    const text = e.target.value
    const message = { text, from: 'Me' }

    if (message && e.keyCode === 13) {
      this.setState({ messages: [...this.state.messages, message] })
      e.target.value = ''
    }
  }

  render() {
    const messages = this.state.messages.map(({ text, from }, index) => {
      return <li key={index}>{from}: {text}</li>
    })

    return (
      <div>
        <input
          type="text"
          placeholder="Enter a message..."
          onKeyUp={this.handleSubmit}
        />
        <ul>{messages}</ul>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)