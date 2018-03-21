import React, { Component } from "react";

export default class TabelaUsuarios extends Component {
  constructor() {
    super();
    this.state = { lista: [] };
  }

  componentWillMount() {
    fetch("/api/users")
      .then(mid => {
        return mid.json();
      })
      .then(res => {
        console.log(res);
        this.setState({ lista: res });
      });
  }

  render() {
    var myObject = this.state.lista;

    function Varredor(obj) {
      var ar = [];

      for (var key in obj) {
        var temp = "Yes";
        if (obj[key].admin == false) {
          var temp = "No";
        }

        ar.push(
          <tr key={obj[key]._id}>
            <td>{obj[key].nome}</td>
            <td>{obj[key].email}</td>
            <td>{temp}</td>
            <td />
          </tr>
        );
      }
      return ar;
    }

    var usuarios = Varredor(myObject);

    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Admin</th>
              <th>Button</th>
            </tr>
            {usuarios}
          </thead>
        </table>
      </div>
    );
  }
}
