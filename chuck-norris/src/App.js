import React, { Component } from 'react';
import chuck from './chuck.png';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      jokes: []
    };
    this.getJoke = this.getJoke.bind(this);
  }

  getJoke() {
    let firstname = document.getElementById('firstname').value;
    let lastname = document.getElementById('lastname').value;
    let num = document.getElementById('num').value;
    console.log(`${firstname} ${lastname}`)
    let url = `http://api.icndb.com/jokes/random/${num}?firstName=${firstname}&amp;lastName=${lastname}`
    axios(url)
      .then(item => {
        this.setState({ jokes: item.data.value });
      }).catch(error => {
        console.log(error);
      });
  }

  formActive() {
    document.querySelector('form').style.display = 'grid';
  }
  formDeactive() {
    document.querySelector('form').style.display = 'none';
  }

  render() {
    return (
      <div className="section">
        <img src={chuck} className="chuck-img" alt="Chuck Norris"></img>
        <div id="formActive" onMouseOver={this.formActive} onMouseOut={this.formDeactive}>
          <h2>Turn Chuck Norris's jokes to yours</h2>
          <form>
            <div className="input">
              <p>Enter your firstname</p>
              <input id="firstname" type="text" placeholder="firstname" defaultValue="Chuck"></input>
            </div>
            <div className="input">
              <p>Enter your lastname</p>
              <input id="lastname" type="text" placeholder="lastname" defaultValue="Norris"></input>
            </div>
            <div className="input">
              <p>Enter number of result jokes</p>
              <input id="num" type="number" placeholder="number" defaultValue="3"></input>
            </div>
            <button type="button"
              className="btn btn-submit"
              onClick={this.getJoke}>
              Get Jokes!
            </button>
          </form>
        </div>
        <div className="res">
          <hr />
          {this.state.jokes.map((each) => {
            <h4 key={each.id}>{'"' + each.joke + '"'}</h4>
          })
          }
        </div>
      </div>
    );
  }
}

export default App;
