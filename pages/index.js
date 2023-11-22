import styles from "../styles/Home.module.css";
import { useMemo, useState } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { MetaplexProvider } from "./MetaplexProvider";
import { MintNFTs } from "./MintNFTs";
import "@solana/wallet-adapter-react-ui/styles.css";
import dynamic from 'next/dynamic';
import keyStrokes from '../public/images/Key Strokes.jpeg'
import yT from '../public/images/yt.png'
import Image from 'next/image';

export default function Home() {
  const [network, setNetwork] = useState(WalletAdapterNetwork.Devnet);

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ],
    [network]
  );

  const handleChange = (event) => {
    switch (event.target.value) {
      case "devnet":
        setNetwork(WalletAdapterNetwork.Devnet);
        break;
      case "mainnet":
        setNetwork(WalletAdapterNetwork.Mainnet);
        break;
      case "testnet":
        setNetwork(WalletAdapterNetwork.Testnet);
        break;
      default:
        setNetwork(WalletAdapterNetwork.Devnet);
        break;
    }
  };

  const ButtonWrapper = dynamic(() =>
    import('@solana/wallet-adapter-react-ui', { ssr: false }).then((mod) => mod.WalletMultiButton)
  );

  return (
    <div>
      <div className={styles.keystrokesContainer}>
        <div className={styles.inlineContainer}>
          <div className={styles.imageContainer}>
            <Image src={keyStrokes} alt="KeyStrokes"/>
          </div>
          <div className={styles.simpleContainer}>
            <div className={styles.inlineContainer}>
              <div className={styles.largerTitle}>Metaplex CandyMachine V3 UI</div>
            </div>
            <div className={styles.inlineContainer}>
              <div className={styles.largerTitle}>Modified by <b><i>KeyStrokes</i></b></div>
            </div>
            <div className={`${styles.inlineContainer} ${styles.divAsLink}`} onClick={()=> window.open("https://www.youtube.com/@Key_Strokes?sub_confirmation=1", "_blank")}>
              <div className={[styles.smallImageContainer]}>
                <Image src={yT} alt="KeyStrokes YouTube"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <MetaplexProvider>
              <div className={styles.App}>
                <ButtonWrapper />
                <MintNFTs onClusterChange={handleChange} />
              </div>
            </MetaplexProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}
