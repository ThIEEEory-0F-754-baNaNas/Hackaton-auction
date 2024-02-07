import { Button, Carousel, ThemeProvider } from "@material-tailwind/react";
import theme from "./theme";
import MainLayout from "./layout/MainLayout";
import AuctionCard from "./components/AuctionCard";

function App() {
  return (
    <>
      <ThemeProvider value={theme}>
        <MainLayout>
          <AuctionCard />
          <AuctionCard />
          <AuctionCard />
        </MainLayout>
      </ThemeProvider>
    </>
  );
}

export default App;
