import React, {Component} from 'react'
import Rebase from 're-base';

const base = Rebase.createClass({
    apiKey: "AIzaSyB5n-eyFjG7ci0p1bGJpIMKQCPxDY5vS14",
    authDomain: "login-app-2c048.firebaseapp.com",
    databaseURL: "https://login-app-2c048.firebaseio.com",
    storageBucket: "login-app-2c048.appspot.com",
  });

  class Signup extends Component {
    constructor(props){
      super(props);
      this.state = {
        names: [],
        loading: true
      }
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    //get names out of firebase once the component mounts
    //synchronize the state of firebase's names collection with this component's name state
    //treat the names as an array, otherwise it would think it was an object
    componentDidMount() {
      this.rebaseRef = base.syncState('names', {
        context: this,
        state: 'names',
        asArray: true,
        then(){
          this.setState({loading:false})
        }
      })
    }
    //no longer pay attention to rebaseRef
    //rebaseRef is allowing my component to hold onto a reference that it is synchronized to firebase so that it knows when it disappears
    componentWillUnmount() {
      base.removeBinding(this.rebaseRef)
    }

    //username is always going to be different so you use let
    //could also use refs in the let username
    handleSubmit (event) {
      event.preventDefault();
      let input = event.target.elements[0];
      let username = input.value;
      let names = this.state.names;
      this.setState({
        names: names.concat([username])
      })
      input.value = ''
    }

    render(){
      return (
        <div>
          <ul>
          {this.state.names.map((name, index) => <li key={index}>{name}</li>)}
          </ul>
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="sign here"/>
          </form>
        </div>
      )
    }
  }

  export default Signup
