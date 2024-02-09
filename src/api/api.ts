export type User = {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
};

export const getUser = async (token: string): Promise<User | null> => {
  try {
    const response = await fetch("http://localhost:3000/auth/whoami", {
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

type SignUpData = {
  avatar: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
};

export const signUp = async (data: SignUpData): Promise<User | null> => {
  try {
    const response = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if (json.statusCode === 401 || json.error) return null;
    console.log(json);
    return json;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const signIn = async (
  email: string | undefined,
  password: string | undefined
): Promise<{ token: string } | null> => {
  if (!email || !password) return null;

  try {
    const response = await fetch("http://localhost:3000/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    if (json.statusCode === 401 || json.error) return null;
    return json;
  } catch (error) {
    console.error(error);
  }

  return null;
};

export type AuctionItem = {
  id: string;
  title: string;
  description: string;
  images: string[];
  startPrice: number;
  createdAt: string;
  endTime: string;
  userId: string;
};

export const fakeAuction: AuctionItem = {
  id: "1",
  title: "Auction Title",
  description:
    "Auction Description very long text to test the layout of the card. It should be able to handle long text. And another sentence.",
  images: [
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
  ],
  startPrice: 100,
  createdAt: new Date().toISOString(),
  endTime: new Date().toISOString(),
  userId: "1",
};

export const createAuctionItem = async (
  item: Omit<AuctionItem, "id" | "userId">
): Promise<AuctionItem | null> => {
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

export const getAuction = async (id: string): Promise<AuctionItem | null> => {
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

export const searchAuction = async (
  title: string,
  pageSize: number = 10,
  page: number = 0
): Promise<AuctionItem[] | null> => {
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
