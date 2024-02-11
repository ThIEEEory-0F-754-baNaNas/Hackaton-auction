import { getBearerToken, jsonOrThrow } from "../utils/apiUtils";
import config from "./config";

const baseURL = config.baseURL;

export type AuctionStakeT = {
  id: string;
  userId: string;
  createdAt: string;
  auctionItemId: string;
  price: number;
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
  auctionStakes: AuctionStakeT[];
  chat?: Chat;
};

export type CreateAuctionDto = {
  title: string;
  description: string;
  startPrice: number;
  startTime: string;
  endTime: string;
  minPriceStep: number;
  images: string[];
};

export const createAuctionItem = async (
  item: CreateAuctionDto
): Promise<AuctionItemT> => {
  const response = await fetch(`${baseURL}/auctionItems`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getBearerToken(),
    },
    body: JSON.stringify(item),
  });

  return await jsonOrThrow(response);
};

export const getAuctionItem = async (id: string): Promise<AuctionItemT> => {
  const response = await fetch(`${baseURL}/auctionItems/${id}`, {
    headers: { Authorization: getBearerToken() },
  });

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

export const sendBidToAuction = async (
  auctionId: string,
  amount: number
): Promise<AuctionStakeT> => {
  const response = await fetch(`${baseURL}/auctionStakes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getBearerToken(),
    },
    body: JSON.stringify({ auctionId, price: amount }),
  });

  return await jsonOrThrow(response);
};
