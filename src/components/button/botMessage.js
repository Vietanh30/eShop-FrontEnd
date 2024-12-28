"use client";

import Image from "next/image";
import chatAvatar1 from "../../../src/image/chatbot/chatAvatar1.png";
import { useEffect, useState } from "react";
import { getProductById } from "@/app/api/productApi";
import { useRouter } from "next/navigation";

const handleMessage = (text) => {
  const split_text = text.split("`");
  if (split_text.length < 2) return { message: text, id: null };
  else
    return {
      message: text.replace(
        `\`${split_text[split_text.length - 2]}\``,
        "tại đây"
      ),
      id: split_text[split_text.length - 2],
    };
};

const BotMessage = ({ message }) => {
  const [productObj, setProductObj] = useState(null);
  const [messageObj, setMessageObj] = useState(null);
  const router = useRouter();
  
  useEffect(() => {
    (async () => {
      const messages = handleMessage(message?.content);
      setMessageObj(messages);

      if (messages?.id) {
        const product = await getProductById(messages?.id);
        setProductObj(product);
      }
    })();
  }, []);

  return (
    <>
      <div className="min-w-[10%] mr-2.5">
        <Image src={chatAvatar1} alt="" width={24} height={24} className="" />
      </div>
      <div className="max-w-[90%] bg-white py-1.5 px-3 rounded-xl border border-[#f0f0f0]">
        <p className="text-xs text-[#667085] whitespace-pre-line">
          {messageObj?.message}
        </p>
        {messageObj?.id && productObj?.image?.[0] ? (
          <>
            <Image
              src={productObj?.image?.[0]}
              alt=""
              width={80}
              height={80}
              className="border border-blue-200 rounded cursor-pointer mt-2 hover:scale-110"
              onClick={() => router.push(`/product/${productObj?.slug}`)}
            />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default BotMessage;
