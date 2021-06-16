import React from "react";
import HeroList from "../heroes/HeroList";

function DcScreen() {
  return (
    <div>
      <h1>DC Screen</h1>
      <hr />
      <HeroList publisher={"DC Comics"} />
    </div>
  );
}

export default DcScreen;