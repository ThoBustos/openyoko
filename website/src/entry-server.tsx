import { renderToString } from "react-dom/server";
import Home from "./pages/Home";

export function render() {
  return renderToString(<Home />);
}
