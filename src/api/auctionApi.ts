export type AuctionItemT = {
  id: string;
  title: string;
  description: string;
  images: string[];
  startPrice: number;
  createdAt: string;
  endTime: string;
  userId: string;
};

export const createAuctionItem = async (
  item: Omit<AuctionItemT, "id" | "userId">
): Promise<AuctionItemT | null> => {
  try {
    const response = await fetch("http://localhost:3000/auctionItems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    const json = await response.json();
    if (json.statusCode === 401) return null;
    return json;
  } catch (error) {
    console.error(error);
  }

  return null;
};

export const getAuctionItem = async (
  id: string
): Promise<AuctionItemT | null> => {
  try {
    const response = await fetch(`http://localhost:3000/auctionItems/${id}`, {
      method: "GET",
    });
    const json = await response.json();
    if (json.statusCode === 401) return null;
    return json;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const searchAuctionItems = async (
  title: string,
  pageSize: number = 10,
  page: number = 0
): Promise<AuctionItemT[] | null> => {
  try {
    const response = await fetch(
      `http://localhost:3000/auctionItems?title=${title}&pageSize=${pageSize}&page=${page}`,
      {
        method: "GET",
      }
    );

    const json = await response.json();
    if (json.statusCode === 401 || json.error) return null;
    return json;
  } catch (err) {
    console.log(err);
  }
  return null;
};
