export type AuctionItemT = {
  id: string;
  title: string;
  description: string;
  images: string[];
  startPrice: number;
  createdAt: string;
  startTime: string;
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
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Get auction item: Unauthorized");

  try {
    const response = await fetch(`http://localhost:3000/auctionItems/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export const sendBidToAuction = async (
  auctionId: string,
  amount: number
): Promise<boolean> => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const response = await fetch(`http://localhost:3000/auctionStakes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ auctionId, price: amount }),
    });
    const json = await response.json();
    if (json.statusCode === 401 || json.error) return false;
    console.log(json);
    return true;
  } catch (err) {
    console.log(err);
  }
  return false;
};
