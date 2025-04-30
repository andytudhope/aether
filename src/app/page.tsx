"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseEther } from "viem";

const ERC721A_ADDRESS = "0x76f9a1cec319c7123746efef068769588299e637";
const OPTIMISM_CHAIN_ID = 10;

const erc721aAbi = [
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "owner", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "mintToMultiple",
    type: "function",
    stateMutability: "payable",
    inputs: [
      { name: "_to", type: "address" },
      { name: "_amount", type: "uint256" },
    ],
    outputs: [],
  },
];

export default function Home() {
  const mintRef = useRef<HTMLDivElement>(null);
  const scrollToMint = () => mintRef.current?.scrollIntoView({ behavior: "smooth" });

  const { address, isConnected } = useAccount();
  const [amount, setAmount] = useState(1);
  const [txConfirmed, setTxConfirmed] = useState(false);

  const { data: balance } = useReadContract({
    address: ERC721A_ADDRESS,
    abi: erc721aAbi,
    functionName: "balanceOf",
    args: [address ?? "0x"],
    chainId: OPTIMISM_CHAIN_ID,
    query: { enabled: !!address },
  });

  const ownsToken = isConnected && (Number(balance) > 0 || txConfirmed);

  const {
    writeContract,
    data: hash,
    isPending,
  } = useWriteContract();

  const { isSuccess } = useWaitForTransactionReceipt({
    hash,
    confirmations: 1,
    query: {
      enabled: !!hash,
    },
  });
  
  useEffect(() => {
    if (isSuccess) setTxConfirmed(true);
  }, [isSuccess]);

  const handleMint = () => {
    if (!address || amount < 1) return;

    const total = 0.05 * amount + 0.000777;
    writeContract({
      address: ERC721A_ADDRESS,
      abi: erc721aAbi,
      functionName: "mintToMultiple",
      args: [address, BigInt(amount)],
      value: parseEther(total.toFixed(6)),
      chainId: OPTIMISM_CHAIN_ID,
    });
  };

  return (
    <div className="w-full">
      {/* Cover Section */}
      <div className="relative h-screen w-full">
        <Image
          src="/home.png"
          alt="Cover"
          fill
          className="object-cover z-0"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10">
          <h1 className="text-6xl font-bold text-white drop-shadow-lg">
            Aether, Earth, & Art
          </h1>
          <p className="text-xl text-gray-100 mt-4">
            Regenerative art that funds dune afforestation
          </p>
          <button
            onClick={scrollToMint}
            className="mt-10 px-8 py-3 bg-white text-black font-semibold rounded shadow hover:bg-gray-200 transition"
          >
            Mint
          </button>
        </div>
      </div>

      <div ref={mintRef} className="w-full px-6 py-20 bg-[#EEECDF] text-black">
        <h1 className="text-4xl font-bold text-center mb-16">Restoring Dunes with Tunes</h1>

        <div className="flex flex-col md:flex-row md:space-x-10 max-w-6xl mx-auto">
          <div className="md:w-1/2 w-full mb-10 md:mb-0">
            <Image
              src="/gen-dunes.png"
              alt="Gen Dunes"
              width={800}
              height={600}
              className="w-full h-auto rounded shadow"
            />
          </div>

          <div className="md:w-1/2 w-full text-lg space-y-6">
            <p><strong>Lamu Island, Kenya</strong></p>
            <p>We create regenerative art which funds reforestation.</p>
            <p>
              For our first project, our community gathered to plant trees, sing, dance, celebrate, and learn with Al Noor band in the exposed sand dunes of Shela Beach. The event inspired beautiful Taarab music, and we now offer this to you as an NFT.
            </p>
            <p>
              This limited edition NFT includes: a full, studio recording of this special, one-of-a-kind song, a custom video of the event which inspired it and where it was first performed, and a unique piece of visual art created by <a href="https://x.com/Artoftas" target="_blank" className="underline">@Artoftas</a>.
            </p>
            <p>
              The funds raised all go towards planting trees in those same dunes, which we do in close collaboration with the local communities and government.
            </p>
            <p>
              The NFT costs between $15 and $20 depending on the price of ETH.
            </p>
          </div>
        </div>

        <div className="w-full text-black px-6 py-20 text-center text-xl space-y-6">
          <h2 className="text-4xl font-bold">Our Objective</h2>
          <p>We seek to marry NFTs to regeneration, conservation, and climate change resilience.</p>
          <p>We seek to weave many worlds together in order to heal ourselves by healing our Earth.</p>
        </div>

        <div className="w-full text-black px-6 py-20 text-center">
          <h2 className="text-4xl font-bold mb-10">Regenerative Flows</h2>
          <div className="flex justify-center">
            <Image
              src="/process.png"
              alt="Regenerative Flows"
              width={900}
              height={600}
              className="w-full max-w-4xl h-auto"
            />
          </div>
        </div>

        {/* Mint and Listen Section */}
        <div className="w-full text-black px-6 py-20 text-center">
          <h2 className="text-4xl font-bold mb-6">Mint and Listen</h2>
          <p className="text-lg max-w-2xl mx-auto mb-10">
            Connect your wallet to mint the NFT and access the full studio
            recording and accompanying video from our regenerative art event.
          </p>

          <ConnectButton.Custom>
            {({ account, chain, openConnectModal, mounted }) => {
              const ready = mounted;
              const connected = ready && account && chain;

              return (
                <div
                  aria-hidden={!ready}
                  className={!ready ? "opacity-0 pointer-events-none" : ""}
                >
                  {connected ? (
                    <div className="text-lg font-semibold mb-4">
                      {account.displayName}
                    </div>
                  ) : (
                    <button
                      onClick={openConnectModal}
                      className="px-8 py-3 bg-black text-white font-semibold rounded hover:bg-gray-800 transition"
                    >
                      Connect Wallet
                    </button>
                  )}
                </div>
              );
            }}
          </ConnectButton.Custom>

          {isConnected && (
            <div className="mt-6 text-xl font-medium space-y-8">
              {ownsToken ? (
                <>
                  <p className="text-green-700">
                    Thank you for helping us restore dunes with tunes. Please
                    enjoy.
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-semibold mb-2">
                        Listen to the Song
                      </h3>
                      <audio controls className="w-full max-w-3xl mx-auto">
                        <source src="/al-noor.mp3" type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold mb-2">
                        Watch the Video
                      </h3>
                      <video
                        controls
                        className="w-full max-w-3xl mx-auto rounded shadow"
                      >
                        <source src="/aea.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-6 max-w-md mx-auto">
                  <p className="text-red-600">
                    You don’t own this NFT yet. Mint to access the work.
                  </p>

                  <div className="flex flex-col space-y-4 items-center">
                    <label
                      htmlFor="mintAmount"
                      className="text-lg font-semibold"
                    >
                      Number to mint
                    </label>
                    <input
                      id="mintAmount"
                      type="number"
                      min={1}
                      max={10}
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="px-4 py-2 border border-gray-300 rounded text-center w-24"
                    />
                    <button
                      onClick={handleMint}
                      disabled={isPending || amount < 1}
                      className="px-6 py-3 bg-black text-white font-semibold rounded hover:bg-gray-800 transition disabled:opacity-50"
                    >
                      {isPending
                        ? "Minting..."
                        : `Mint ${amount} NFT${
                            amount > 1 ? "s" : ""
                          } for ~${(0.05 * amount).toFixed(2)} ETH`}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="w-full max-w-7xl mx-auto text-black px-6 py-20 text-center text-xl space-y-6">
          <h2 className="text-4xl font-bold">Why This Matters</h2>
          <p>Lamu is vulnerable to climate change. There is little tree cover and the topsoil is very exposed to the elements. The water resources in the underground aquifers are also dwindling. Growing trees can increase local rainfall, and improve catchment and retention of precious water. Trees also decrease air and surface temperatures, which are all vital for the survival of the island&apos;s inhabitants. </p>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-10 max-w-6xl mx-auto">
          <div className="md:w-1/2 w-full mb-10 md:mb-0">
          <Image
            src="/alnoor.png"
            alt="Al Noor"
            width={600}
            height={500}
            className="w-full h-auto rounded shadow"
          />
          </div>
          <div className="md:w-1/2 w-full mb-10 md:mb-0">
          <Image
            src="/planting.png"
            alt="Our Work"
            width={600}
            height={500}
            className="w-full h-auto rounded shadow"
          />
          </div>
          </div>

          <h1 className="text-4xl font-bold text-center mt-16">Our People</h1>
          <div className="flex flex-col md:flex-row md:space-x-10 max-w-6xl mx-auto">
          <div className="md:w-1/2 w-full mb-10 md:mb-0 text-lg space-y-6">
          <p className="text-3xl font-bold mt-8">Collective Sovereignty</p>
          <p>Collective Sovereignty Community Based Organization (CSCBO) is registered in Lamu and works in the areas of youth, women, recycling/waste management, natural health, creative arts, food sovereignty, environmental conservation and regeneration, sport and wellness, community building, and addiction rehabilitation.</p>

          <p><b>Aether, Earth, and Art</b> is run by &apos;Roots, Shoots and Fruits&apos;, which is a passion guild of CSCBO members, who share a common love of plants, are interested in seed and food sovereignty, and the wise utilization, regeneration and conservation of all natural resources.</p>
          </div>

          <div className="md:w-1/2 w-full text-lg space-y-6">
          <p className="text-3xl font-bold mt-8">Earth Love</p>
          <p>Earth Love Ltd. is a local environmentally friendly company that works in regeneration, reforestation, waste management and recycling, the health and wellness industry, and also in community empowerment. </p>

          <p>Earth Love works as the technical implementation partner for nursing, growing, and planting the trees. In addition, they are the consultancy partner for the project, especially focused on capacity building, training people in ecosystem restoration techniques, food sovereignty, and climate change resilience. </p>
          </div>
          </div>

          <div className="w-full px-6 py-20 text-black text-center">
            <h2 className="text-4xl font-bold mb-6">Watch Our Journey</h2>
            <p className="text-lg max-w-2xl mx-auto mb-10">
              This video captures the spirit of our first regenerative art action — planting, singing, dancing, and co-creating with community.
            </p>
            <div className="relative w-full max-w-4xl mx-auto aspect-video">
              <iframe
              src="https://www.youtube.com/embed/LdmDzkD2U-0"
              title="Watch Our Journey"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded shadow-lg"
              ></iframe>
            </div>
          </div>
      </div>
    </div>
  );
}