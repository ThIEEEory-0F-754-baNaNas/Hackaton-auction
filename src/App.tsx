import { ThemeProvider } from "@material-tailwind/react";
import theme from "./theme";
import Navigation from "./Navigation";

function App() {
  return (
    <>
      <ThemeProvider value={theme}>
        <Navigation />
      </ThemeProvider>
    </>
  );
}

export default App;
