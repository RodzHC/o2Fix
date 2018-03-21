import React, { Component } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";

import "./public/css/login.css";

import FormCadastro from "./componentes/FormCadastro";
import Home from "./routes/Home";

// const apiBaseUrl =
//   process.env.NODE_ENV === "development" ? "http://localhost:3001/" : "/";

const apiBaseUrl = "/";

const Auth = {
  isAdmin: false,
  isAuthenticated: false,

  authenticate(callBack) {
    const req = {
      method: "POST",
      body: JSON.stringify({
        token: localStorage.getItem("auth-token")
      }),
      headers: new Headers({
        "Content-type": "application/json"
      })
    };

    fetch(`${apiBaseUrl}api/autentica/token`, req)
      .then(res => {
        return res.json();
      })
      .then(mid => {
        if (mid.success === false) {
          const err = mid.message;
          throw new Error(err);
        } else if (mid.success === true) {
          this.isAuthenticated = true;

          if (mid.content.admin === true) {
            this.isAdmin = true;
          }

          callBack();
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  signout(callBack) {
    localStorage.setItem("auth-token", "");
  }
};

class PrivateRoute extends React.Component {
  constructor() {
    super();
    this.state = { refresh: false };
  }

  render() {
    const { component: Component, ...rest } = this.props;

    const renderRoute = props => {
      if (Auth.isAuthenticated) {
        return <Component {...props} />;
      }

      const to = {
        pathname: "/",
        state: { from: props.location }
      };

      return <Redirect to={to} />;
    };
    return <Route {...rest} render={renderRoute} />;
  }
}

export default class App extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={FormLogin} />
          <Route path="/cadastro" component={FormCadastro} />
          <PrivateRoute path="/home" component={Home} />
        </Switch>
      </main>
    );
  }
}

class FormLogin extends Component {
  constructor() {
    super();
    this.state = { msg: "", redirectToReferrer: false };
  }

  componentWillMount() {
    Auth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  }

  envia(event) {
    event.preventDefault();

    const requestInfo = {
      method: "POST",
      body: JSON.stringify({
        email: this.email.value,
        senha: this.senha.value
      }),
      headers: new Headers({
        "Content-type": "application/json"
      })
    };

    fetch(`${apiBaseUrl}api/autentica`, requestInfo)
      .then(res => {
        return res.json();
      })
      .then(mid => {
        if (mid.success === false) {
          const temp = mid.message;
          throw new Error(temp);
        } else if (mid.success === true) {
          this.setState({
            msg: mid.message,
            nome: "",
            email: ""
          });
          localStorage.setItem("auth-token", mid.token);

          Auth.authenticate(() => {
            this.setState({ redirectToReferrer: true });
          });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ msg: error.message });
      });
  }

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: "/home" }
    };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div className="log-form">
        <div>
          <h2>Login</h2>
          <span>{this.state.msg}</span>
          <form onSubmit={this.envia.bind(this)} method="post">
            <label>E-mail</label>

            <input
              id="email"
              type="email"
              name="email"
              ref={input => (this.email = input)}
            />
            <label>Senha</label>
            <input
              id="senha"
              name="senha"
              type="password"
              ref={input => (this.senha = input)}
            />

            <button type="submit" className="btn">
              Login
            </button>
            <Link className="forgot" href="#" to="/cadastro">
              Criar nova conta
            </Link>
          </form>
        </div>
      </div>
    );
  }
}
