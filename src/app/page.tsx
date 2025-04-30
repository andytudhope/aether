"use client";

import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useReadContract } from "wagmi";
import PDFViewer from "@/components/PDFViewer";

const NFT_CONTRACT = "0xb092a63840b1b319d40ee59096fb8b3dd708d1b6";
const TOKEN_ID = 1;

const erc1155Abi = [
  {
    constant: true,
    inputs: [
      { name: "account", type: "address" },
      { name: "id", type: "uint256" },
    ],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

export default function Home() {
  const { address, isConnected } = useAccount();

  const { data: balance, isLoading } = useReadContract({
    address: NFT_CONTRACT,
    abi: erc1155Abi,
    functionName: "balanceOf",
    args: [address ?? "0x", BigInt(TOKEN_ID)],
    chainId: 8453, // Base Mainnet
    query: {
      enabled: Boolean(address),
    },
  });

  const ownsNFT = isConnected && balance && Number(balance) > 0;

  return (
    <div className="min-h-screen pt-[80px] flex flex-col items-center justify-center px-4 pb-10 pt-10">
      <div className="max-w-full max-h-[calc(100vh-80px-64px)]">
        <Image
          src="/balance.jpg"
          alt="Balance"
          width={600}
          height={600}
          className="object-contain"
        />
      </div>

      <div className="text-2xl italic font-bold text-white text-center space-y-4 mt-20">
        <p>Written by Sister Tibebwa</p>
        <p>
          Cover illustration by{" "}
          <a
            href="https://x.com/Artoftas"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            artoftas
          </a>
        </p>
      </div>

      <div className="text-xl text-center text-white space-y-4 mt-8">
        <p className="max-w-[600px]">In order to read this unique work, you need to purchase an NFT. This costs $13. You'll need a <a href="https://www.alchemy.com/overviews/web3-wallets" target="_blank" className="underline font-bold">web3 wallet</a>.</p>
      </div>

      <div className="mt-10 flex flex-col items-center space-y-6 w-full max-w-7xl">
        <ConnectButton />

        {isConnected && (
          <>
            {isLoading ? (
              <p className="text-lg">Checking NFT ownership...</p>
            ) : ownsNFT ? (
              <div className="w-full mt-10 px-4">
                <PDFViewer fileUrl="/wisdom/hekima.pdf" />
              </div>
            ) : (
              <p className="text-lg">You do not own the required NFT yet.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
