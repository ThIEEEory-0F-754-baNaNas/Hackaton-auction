import { Button, Carousel, ThemeProvider } from "@material-tailwind/react";
import theme from "./theme";
import MainLayout from "./layout/MainLayout";
import AuctionCard from "./components/AuctionCard";
import CarouselLayout from "./components/CarouselLayout";

function App() {
  return (
    <>
      <ThemeProvider value={theme}>
        <MainLayout>
          <CarouselLayout>
            <AuctionCard />
            <AuctionCard />
            <AuctionCard />
            <AuctionCard />
            <AuctionCard />
            <AuctionCard />
            <AuctionCard />
            <AuctionCard />
          </CarouselLayout>
        </MainLayout>
      </ThemeProvider>
    </>
  );
}

export default App;
