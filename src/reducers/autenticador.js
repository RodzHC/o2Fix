export function autenticador(state = [], action) {
  if (action.type === "MUDA") {
    return "teste";
  }
  return state;
}
