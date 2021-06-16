import { mount } from "enzyme";
import { AuthContext } from "../../../auth/AuthContext";
import LoginScreen from "../../../components/login/LoginScreen";
import { types } from "../../../types/types";

describe("Pruebas en <LoginScreen/>", () => {
  const historyMock = {
    replace: jest.fn(),
  };

  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: true,
      name: "Alberto",
    },
  };

  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <LoginScreen history={historyMock} />
    </AuthContext.Provider>
  );

  test("debe de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe de realizar el dispach y la navegacion", () => {
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <LoginScreen history={historyMock} />
      </AuthContext.Provider>
    );

    const handleClick = wrapper.find("button").prop("onClick");
    handleClick();
    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.login,
      payload: {
        name: "Alberto",
      },
    });
    expect(historyMock.replace).toHaveBeenCalledWith("/");

    localStorage.setItem("lastPath", "/dc");
    handleClick();
    expect(historyMock.replace).toHaveBeenCalledWith("/dc");
  });
});
