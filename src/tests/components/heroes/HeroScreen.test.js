import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router-dom";
import HeroScreen from "../../../components/heroes/HeroScreen";
describe("Pruebas en <HeroScreen/>", () => {
  const historyMock = {
    length: 10,
    push: jest.fn(),
    goBack: jest.fn(),
  };

  test("debe de mostrar el componente redirect si no hay argumentos en ul URL", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero"]}>
        <HeroScreen history={historyMock} />
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("Redirect").exists()).toBe(true);
  });

  test("debe de mostrar un hero si el parametro existe y se encuentra", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
        <Route path="/hero/:heroeId" component={HeroScreen} />
      </MemoryRouter>
    );

    expect(wrapper.find(".row").exists()).toBe(true);
  });
  test("debe de regresar a la pantalla anterior con PUSH", () => {
    const historyMock = {
      length: 1,
      push: jest.fn(),
      goBack: jest.fn(),
    };

    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
        <Route
          path="/hero/:heroeId"
          component={() => <HeroScreen history={historyMock} />}
        />
      </MemoryRouter>
    );

    wrapper.find("button").simulate("click");
    expect(historyMock.push).toHaveBeenCalledWith("/");
    expect(historyMock.goBack).toHaveBeenCalledTimes(0);
  });

  test("debe de regresar a la pantalla anterior", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
        <Route
          path="/hero/:heroeId"
          component={() => <HeroScreen history={historyMock} />}
        />
      </MemoryRouter>
    );

    wrapper.find("button").simulate("click");
    expect(historyMock.goBack).toHaveBeenCalledTimes(1);
    expect(historyMock.push).toHaveBeenCalledTimes(0);
  });

  test("debde de llamar al redirect si el hero no existe", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider123"]}>
        <Route
          path="/hero/:heroeId"
          component={() => <HeroScreen history={historyMock} />}
        />
      </MemoryRouter>
    );
    expect(wrapper.text()).toBe("");
  });
});
