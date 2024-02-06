import { Button, ThemeProvider } from "@material-tailwind/react";

const theme = {};

function App() {
  console.log(document.documentElement.style);
  console.log(document.documentElement.classList);
  return (
    <>
      <ThemeProvider value={theme}>
        <Button className="bg-primary">Button</Button>
      </ThemeProvider>
    </>
  );
}

export default App;
