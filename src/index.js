import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'

class App extends Component {

  constructor() {
    super()
    this.state = { displayName: null, messages: [] }
    this.handleMessage = this.handleMessage.bind(this)
    this.handleDisplayName = this.handleDisplayName.bind(this)
  }

  componentDidMount() {
    this.socket = io('/')
    this.socket.on('user:message', (message) => {
      this.setState({ messages: [...this.state.messages, message] })
    })
  }

  componentWillUnmount() {
    this.socket.emit('user:disconnect')
  }

  handleDisplayName(e) {
    const displayName = e.target.value
    if (displayName) { this.setState({ displayName }) }
  }

  handleMessage(e) {
    const text = e.target.value
    const { displayName, messages } = this.state
    const message = { text, displayName }

    if (displayName && text && e.keyCode === 13) {
      this.setState({ messages: [...messages, message] })
      this.socket.emit('user:message', message)
      e.target.value = ''
    }
  }

  render() {
    const messages = this.state.messages.map(({ displayName, text }, index) => {
      return <li key={index}><b>{displayName}:</b> {text}</li>
    })

    return (
      <div>
        <input
          type="text"
          placeholder="Display name"
          onKeyUp={this.handleDisplayName}
        />
        <input
          type="text"
          placeholder="Enter a message..."
          onKeyUp={this.handleMessage}
        />
        <ul>{messages}</ul>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))