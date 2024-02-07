import { Button, ThemeProvider } from "@material-tailwind/react";
import theme from "./theme";

function App() {
  return (
    <>
      <ThemeProvider value={theme}>
        <Button>Button</Button>
      </ThemeProvider>
    </>
  );
}

export default App;
