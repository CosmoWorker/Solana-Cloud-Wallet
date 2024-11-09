import { Connection } from 'mongoose'
import './App.css'
import { Transaction, SystemProgram, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js"

const connection=new Connection(process.env.SOLANA_RPC_URL_DEVNET);
const fromPubkey= new PublicKey("")
function App(){
  async function sendSOl(){
    const ix=SystemProgram.transfer({
      fromPubkey: fromPubkey,
      toPubkey: new PublicKey(""),
      lamports: 0.001*LAMPORTS_PER_SOL
    })
    const txn=new Transaction().add(ix)

    const {blockhash}=await connection.getLatestBlockhash();
    txn.recentBlockhash=blockhash
    txn.feePayer=fromPubkey

    const serializeTx=txn.serialize(
      requireAllSignatures= false,
      verifySignatures= false
    );

    await axios.post("http://localhost:3000/api/v1/txn/sign", {
      message: serializeTx,
      retry: false
    })
  }

  return (
    <>
      <input type="text" placeholder='Amount'/>
      <input type='text' placeholder='Address'/>
      <button onclick={sendSOl}>Submit</button>
    </>
  )
}

export default App
