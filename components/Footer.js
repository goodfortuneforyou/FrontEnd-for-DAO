export default function Footer() {
  return (
    <footer className="flex  bottom-0 w-full h-9 border-t-2 bg-gray-400">
      <a
        href="https://goerli.etherscan.io/address/0xB739b6B346Cd050ef63668F4b58D5689ec500d64#code"
        className="border-b-2 mt-2 border-blue-500"
      >
        Click to View on Goerli Etherscan
      </a>
      <div className="ml-auto py-34 px-40">© Developed By:</div>
      <a className=" mr-auto py-34 px-40">Md Sumon</a>
    </footer>
  );
}
