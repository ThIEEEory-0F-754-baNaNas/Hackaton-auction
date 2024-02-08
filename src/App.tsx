import { ThemeProvider } from "@material-tailwind/react";
import { Home } from "./pages/Home";

const theme = {};

function App() {
  return (
    <>
      <ThemeProvider value={theme}>
        <Home />
      </ThemeProvider>
    </>
  );
}

export default App;
