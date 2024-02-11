import { getBearerToken, jsonOrThrow } from "../utils/apiUtils";
import config from "./config";

const baseURL = config.baseURL;

export type AuctionStakeT = {
  id: string;
  user: {
    id: string;
    avatar: string;
    username: string;
  };
  createdAt: string;
  price: number;
  // auctionItemId: string;
};

export type Messages = {
  id: string;
  text: string;
  userId: string;
  createdAt: string;
  chatId: string;
};

export type Chat = {
  auctionItemId: string;
  id: string;
  messages: Messages[];
};

export type AuctionItemT = {
  id: string;
  title: string;
  description: string;
  images: string[];
  startPrice: number;
  createdAt: string;
  startTime: string;
  endTime: string;
  minPriceStep: number;
  userId: string;
};

export type CreateAuctionDto = {
  title: string;
  description: string;
  startPrice: number;
  startTime: string;
  endTime: string;
  minPriceStep: number;
};

export const createAuctionItem = async (
  item: CreateAuctionDto,
  images: File[]
): Promise<AuctionItemT> => {
  const formData = new FormData();
  formData.append("title", item.title);
  formData.append("description", item.description);
  formData.append("startPrice", item.startPrice.toString());
  formData.append("startTime", item.startTime);
  formData.append("endTime", item.endTime);
  formData.append("minPriceStep", item.minPriceStep.toString());
  if (images) {
    images.forEach((image) => {
      formData.append(`photos`, image);
    });
  }

  const response = await fetch(`${baseURL}/auctionItems`, {
    method: "POST",
    headers: {
      Authorization: getBearerToken(),
    },
    body: formData,
  });

  return await jsonOrThrow(response);
};

export const updateAuctionItem = async (
  item: CreateAuctionDto,
  images: File[],
  auctionId: string
): Promise<AuctionItemT> => {
  const formData = new FormData();
  formData.append("title", item.title);
  formData.append("description", item.description);
  formData.append("startPrice", item.startPrice.toString());
  formData.append("startTime", item.startTime);
  formData.append("endTime", item.endTime);
  formData.append("minPriceStep", item.minPriceStep.toString());
  if (images) {
    images.forEach((image) => {
      formData.append(`photos`, image);
    });
  }

  const response = await fetch(`${baseURL}/auctionItems/${auctionId}`, {
    method: "PATCH",
    headers: {
      Authorization: getBearerToken(),
    },
    body: formData,
  });

  return await jsonOrThrow(response);
};

export const getAuctionItem = async (id?: string): Promise<AuctionItemT> => {
  if (!id) throw new Error("No auction id");
  const response = await fetch(`${baseURL}/auctionItems/${id}`);

  return await jsonOrThrow(response);
};

export const getAuctionStakes = async (
  auctionId: string
): Promise<AuctionStakeT[]> => {
  const response = await fetch(`${baseURL}/auctionItems/${auctionId}/stakes`);
  return await jsonOrThrow(response);
};

export const searchAuctionItems = async (
  title: string,
  pageSize: number = 10,
  page: number = 0,
  sort: keyof AuctionItemT = "createdAt",
  order: "asc" | "desc" = "desc"
): Promise<AuctionItemT[]> => {
  const response = await fetch(
    `${baseURL}/auctionItems?title=${title}&pageSize=${pageSize}&page=${page}&sort=${sort}&order=${order}`
  );

  return await jsonOrThrow(response);
};

export const getUserAuctionItems = async ({
  userId,
  pageSize = 10,
  page = 1,
  sort = "createdAt",
  order = "desc",
}: {
  userId: string;
  pageSize?: number;
  page?: number;
  sort?: keyof AuctionItemT;
  order?: "asc" | "desc";
}): Promise<AuctionItemT[]> => {
  const response = await fetch(
    `${baseURL}/auctionItems/user/${userId}?pageSize=${pageSize}&page=${
      page - 1
    }&sort=${sort}&order=${order}`
  );

  return await jsonOrThrow(response);
};

export const sendBidToAuction = async (
  auctionId: string,
  amount: number
): Promise<AuctionStakeT> => {
  const response = await fetch(`${baseURL}/auctionItems/${auctionId}/stakes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getBearerToken(),
    },
    body: JSON.stringify({ price: amount }),
  });

  return await jsonOrThrow(response);
};

export const getNewestAuctionItems = async (
  pageSize: number = 10,
  page: number = 0
): Promise<AuctionItemT[]> => {
  return await searchAuctionItems("", pageSize, page, "createdAt", "desc");
};
