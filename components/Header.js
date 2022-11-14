import { ConnectButton } from "web3uikit";
export default function Header() {
  return (
    <div className="  flex flex-row border-b-2 bg-blue-100 ">
      <h1 className="py-4 px-4 font-bold">DAO</h1>
      <div className="ml-auto py-2 px-4">
        <ConnectButton moralisAuth={false} />
      </div>
    </div>
  );
}
