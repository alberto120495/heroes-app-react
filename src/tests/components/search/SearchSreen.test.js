import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router-dom";
import SearchScreen from "../../../components/search/SearchScreen";

describe("Pruebas en <SearchScren/>", () => {
  const historyMock = {
    push: jest.fn(),
  };
  const wrapper = mount(
    <MemoryRouter initialEntries={["/search"]}>
      <Route path="/search" component={SearchScreen} />
    </MemoryRouter>
  );
  test("debe de mostrar el componente correctamente", () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".alert-info").text().trim()).toBe("Search a hero");
  });

  test("debe de mostrar a Batman y el input con el valor del query", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper.find("input").prop("value")).toBe("batman");
    expect(wrapper.find("HeroCard").exists()).toBe(true);
  });

  test("debede de mostrar un error si no se ecuentra el hero", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=batman1234"]}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper.find(".alert-danger").text()).toBe(
      "There is no a hero with: batman1234"
    );
  });
  test("debe de llamar el push del history", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <Route
          path="/search"
          component={() => <SearchScreen history={historyMock} />}
        />
      </MemoryRouter>
    );

    wrapper.find("form").simulate("submit");
    expect(historyMock.push).toHaveBeenCalledWith(`?q=batman`);
  });
});
