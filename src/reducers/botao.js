export function botao(state = "", action) {
  if (action.type === "CHANGE") {
    if (state === "") {
      console.log("entrei aqui");
      return (state = "active");
    } else {
      return (state = "");
    }

    return "teste";
  }
  return state;
}
