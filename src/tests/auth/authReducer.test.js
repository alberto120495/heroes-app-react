import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";

describe("Pruebas en authReducer", () => {
  const initialState = {
    name: "",
    logged: false,
  };
  test("debe de retornar el estado por defecto", () => {
    const state = authReducer(initialState, {});
    expect(state).toEqual({
      name: "",
      logged: false,
    });
  });
  test("debe de autenticar y colocar el name del usuario", () => {
    const action = {
      type: types.login,
      payload: {
        name: "alberto",
      },
    };

    const state = authReducer(initialState, action);
    expect(state).toEqual({
      logged: true,
      name: "alberto",
    });
  });

  test("debe de borrar e name del usuario y logged en false", () => {
    const action = {
      type: types.logout,
    };
    const state = authReducer(initialState, action);
    expect(state).toEqual({
      logged: false,
    });
  });
});
