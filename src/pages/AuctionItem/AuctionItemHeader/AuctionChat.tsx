import { AuctionItemT } from "../../../api/auctionApi";

const AuctionChat = ({ auction }: { auction: AuctionItemT }) => {
  return <div>Chat TODO: {auction.id}</div>;
  // const chat = auction.chat;

  // if (!chat) return "Create chat TODO:";

  // const messages = chat.messages || [];
  // return (
  //   <div>
  //     {messages.map((message, index) => (
  //       <div key={index} className="flex justify-between">
  //         <Typography variant="h6">{message.userId}</Typography>
  //         <Typography variant="h6">{message.text}</Typography>
  //       </div>
  //     ))}

  //     <Input
  //       placeholder="Send message"
  //       variant="outlined"
  //       crossOrigin={undefined}
  //       className="w-full"
  //     />
  //   </div>
  // );
};

export default AuctionChat;
