import * as anchor from '@project-serum/anchor'
import * as fs from 'fs';
import { Keypair, PublicKey, SystemProgram } from '@solana/web3.js';
import { web3 } from '@project-serum/anchor';


const CANDY_MACHINE_PROGRAM_ID= "A5ePw9Qxwvb1sMjqLzV6XjJ8u96fxpbGgZXZLSFH2SNc"

const programId = new anchor.web3.PublicKey('A5ePw9Qxwvb1sMjqLzV6XjJ8u96fxpbGgZXZLSFH2SNc');

async function loadCandyProgram(walletKeyPair: Keypair, env: string) {
    // @ts-ignore
    const solConnection = new web3.Connection(web3.clusterApiUrl(env));
    const walletWrapper = new anchor.Wallet(walletKeyPair);
    const provider = new anchor.Provider(solConnection, walletWrapper, {
      preflightCommitment: 'recent',
    });
    console.log("CANDY_MACHINE_PROGRAM_ID: ", CANDY_MACHINE_PROGRAM_ID)
    const idl = await anchor.Program.fetchIdl(CANDY_MACHINE_PROGRAM_ID, provider);
  
    const program = new anchor.Program(idl, CANDY_MACHINE_PROGRAM_ID, provider);
    return program;
  }

  export function loadWalletKey(keypair): Keypair {
    if (!keypair || keypair == '') {
      throw new Error('Keypair is required!');
    }
    const loaded = Keypair.fromSecretKey(
      new Uint8Array(JSON.parse(fs.readFileSync(keypair).toString())),
    );
    return loaded;
  }

console.log(loadCandyProgram(loadWalletKey('/Users/vincentcummins/my-solana-wallet/my-keypair.json'), "devnet"))
