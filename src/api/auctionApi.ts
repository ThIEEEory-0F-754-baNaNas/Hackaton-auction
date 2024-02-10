import { getBearerToken, jsonOrThrow } from "../utils/apiUtils";
import config from "./config";

const baseURL = config.baseURL;

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
  page: number = 0
): Promise<AuctionItemT[]> => {
  const response = await fetch(
    `${baseURL}/auctionItems?title=${title}&pageSize=${pageSize}&page=${page}`
  );

  return await jsonOrThrow(response);
};

export const sendBidToAuction = async (
  auctionId: string,
  amount: number
): Promise<boolean> => {
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
