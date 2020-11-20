import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './AuthPage.css';

class AuthPage extends Component {
  constructor(props) {
    super(props);
    this.onInputchange = this.onInputchange.bind(this);
  }

  state = {
    email: '',
    password: '',
    loginForm: true,
    regForm: false,
    errorMsgs: [],
  };

  showLoginForm() {
    this.setState({ loginForm: true, regForm: false });
  };

  showRegForm() {
    this.setState({ regForm: true, loginForm: false })
  };

  simpleValid() {
    const { email, password } = this.state;
    const errorMsgs = [];
    const emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!emailRegexp.test(email)) errorMsgs.push('Invalid email');
    if (password.trim().length < 5 
      || password.trim().length > 10) {
      errorMsgs.push('Password from 5 to 10 char');
    }
    this.setState({errorMsgs});
  };

  onInputchange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmitHandler() {
    this.simpleValid();
  };

  renderLoginForm() {
    const { email, password } = this.state;
    return (
      <Form>
        <h5>Login</h5>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="email" value={email} onChange={this.onInputchange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" value={password} onChange={this.onInputchange} />
        </Form.Group>
        <Button variant="primary" onClick={() => this.onSubmitHandler()}>
          Submit
        </Button>
        <Button
          variant="warning"
          className="m-4"
          onClick={() => this.showRegForm()}
        >Or Reg</Button>
      </Form>
    );
  };

  renderRegForm() {
    const { email, password } = this.state;
    return (
      <Form>
        <h5>Register</h5>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="email" value={email} onChange={this.onInputchange}/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" value={password} onChange={this.onInputchange}/>
        </Form.Group>

        <Button variant="primary" onClick={() => this.onSubmitHandler()}>
          Submit
        </Button>
        <Button
          variant="warning"
          className="m-4"
          onClick={() => this.showLoginForm()}
        >Or Login</Button>
      </Form>
    );
  };

  render() {
    const { loginForm, errorMsgs } = this.state;
    return (
      <div className="AuthPage-container">
        <h3>Auth to play the game</h3>
        {loginForm ? this.renderLoginForm() : this.renderRegForm()}
        {errorMsgs.map( (msg, index) => (<p key={index}>{msg}</p>))}
      </div>
    )
  }
};

export default AuthPage;

