import { mount } from "enzyme";
import DashboardRouter from "../../routers/DashboardRouter";
import { AuthContext } from "../../auth/AuthContext";
import { MemoryRouter } from "react-router-dom";

describe("Pruebas en <DasboardRouter/>", () => {
  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: true,
      name: "alberto",
    },
  };
  test("debe mostrarse correctamente", () => {
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <DashboardRouter />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".text-info").text().trim()).toBe("alberto");
  });
});
