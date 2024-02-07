import { Button, ThemeProvider } from "@material-tailwind/react";
import theme from "./theme";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <>
      <ThemeProvider value={theme}>
        <MainLayout>
          <Button color="red">Button</Button>
        </MainLayout>
      </ThemeProvider>
    </>
  );
}

export default App;
