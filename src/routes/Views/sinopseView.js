import React from "react";

const sinopseView = ({ match, history }) => {
  const back = e => {
    e.stopPropagation();
    history.goBack();
  };
  return (
    <div
      className="d-modal"
      onClick={back}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: "rgba(0, 0, 0, 0.15)"
      }}
    >
      <div
        className="modal-content"
        style={{
          position: "absolute",
          margin: "auto",
          background: "#fff",
          width: "80%",
          top: 25,
          left: "10%",
          right: "10%",
          padding: 15,
          border: "2px solid #444"
        }}
      >
        <h1>Sinopse</h1>
        <p>{match.params.sinopse}</p>
        <button type="button" onClick={back}>
          Close
        </button>
      </div>
    </div>
  );
};

export default sinopseView;
