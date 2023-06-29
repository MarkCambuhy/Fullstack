import Rotas from "./routes";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

function App() {
  return (
    <div>
      <Rotas history={history} />
    </div>
  );
}

export default App;
