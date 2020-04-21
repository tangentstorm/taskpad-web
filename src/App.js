import React from 'react';
import logo from './logo.svg';
import './App.css';
// import * as firebase from 'firebase/app'
// import 'firebase/firestore'

class App extends React.Component {
  constructor (props) {
    super(props);
    this.stopListening = null;
    this.state = {
      startup: true,
      tasks: []
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-undef
    let tasks = firebase.firestore().collection('tasks');
    this.stopListening = tasks.orderBy('ix').onSnapshot(x => this.onSnapshot(x));
  }

  onSnapshot(docs) {
    let tasks = [];
    docs.forEach(doc => {
      let task = doc.data();
      task.task = task.name;
      task.id = doc.id;
      tasks.push(task)
    });
    this.setState((_old, _props) => { return {tasks}});
  }

  componentWillUnmount() {
    if (this.stopListening) this.stopListening();
  }

  render() {
    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
        {this.state.tasks.map(t => (
            <li key={t.id}>{t.name}</li>
        ))}
        </ul>
      </header>
    </div>)
  }
}

export default App;
