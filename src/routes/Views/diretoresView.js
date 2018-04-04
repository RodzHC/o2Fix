import React from "react";
const apiBaseUrl = "/";

const diretoresView = ({ match }) => {
  const requestInfo = {
    method: "POST",
    body: JSON.stringify({
      filme: match.params.nome
    }),
    headers: new Headers({
      "Content-type": "application/json"
    })
  };

  fetch(`${apiBaseUrl}api/filmes`, requestInfo).then(res => {
    if (!res) {
      return <div>Movie not found</div>;
    }

    return (
      <div>
        <h1>Teste</h1>
      </div>
    );
  });
};

export default diretoresView;
