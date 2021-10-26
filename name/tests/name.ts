import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Name } from '../target/types/name';

describe('name', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.Name as Program<Name>;

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
});
