import React, { PureComponent } from 'react'
import ReactDOM from '../src/reactDom/index'
import './index.less'

class App extends PureComponent {
  state = {
    list: []
  }

  render() {
    const { list } = this.state
    console.log("LIST", list)

    return <div className="todo">
      <input placeholder="添加代办事项" onKeyDown={this.keyDown} />
      <h3>代办事项</h3>
      {
        list.length ? list.map((d, index) => d.isDone ? null : <p>
          <input type="checkbox" />
          {d.value}
        </p>) : null
      }
      <h3>已办事项</h3>
      {
        list.length ? list.map((d, index) => !d.isDone ? null : <p>
          <input type="checkbox" />
          {d.value}
        </p>) : null
      }
    </div>
  }

  componentDidMount() {
    console.log("MOUNTED")
  }

  keyDown = e => {
    const { list } = this.state

    const value = e.target.value
    if (e.keyCode === 13 && value) {
      const newList = list.concat({
        value,
        isDone: false
      })
      this.setState({
        list: newList
      }, () => {
        // e.target.value = ''
      })
    }
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
)