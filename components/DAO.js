import { useState } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { Input, Button } from "web3uikit";
import { abi, contractAddresses } from "../constants";
export default function DAO() {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const daoAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  const [amountToTransfer, setAmountToTransfer] = useState("");
  const [addressToTransfer, setAddressToTransfer] = useState("");
  const [redeemAmount, setredeemAmount] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("");
  const [proposalName, setProposalName] = useState("");
  const [proposalAmount, setProposalAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [proposalAddress, setProposalAddress] = useState("");
  const [voteProposalId, setVoteProposalId] = useState("");
  const [executeProposalId, setExecuteProposalId] = useState("");
  const [payContribute, setPayContribute] = useState("");
  const { runContractFunction: contribute } = useWeb3Contract({
    abi: abi,
    contractAddress: daoAddress,
    functionName: "contribute",
    params: {},
    msgValue: payContribute,
  });
  const { runContractFunction: receive } = useWeb3Contract({
    abi: abi,
    contractAddress: daoAddress,
    functionName: "receive",
    params: {},
    msgValue: receiveAmount,
  });
  const { runContractFunction: redeemShare } = useWeb3Contract({
    abi: abi,
    contractAddress: daoAddress,
    functionName: "redeemShare",
    params: { amount: redeemAmount },
  });
  const { runContractFunction: vote } = useWeb3Contract({
    abi: abi,
    contractAddress: daoAddress,
    functionName: "vote",
    params: { proposalId: voteProposalId },
  });
  const { runContractFunction: executeProposal } = useWeb3Contract({
    abi: abi,
    contractAddress: daoAddress,
    functionName: "executeProposal",
    params: { proposalId: executeProposalId },
  });
  const { runContractFunction: transferShare } = useWeb3Contract({
    abi: abi,
    contractAddress: daoAddress,
    functionName: "transferShare",
    params: { amount: amountToTransfer, to: addressToTransfer },
  });
  const { runContractFunction: createProposal } = useWeb3Contract({
    abi: abi,
    contractAddress: daoAddress,
    functionName: "createProposal",
    params: {
      name: proposalName,
      amount: proposalAmount,
      recepient: proposalAddress,
    },
  });
  // console.log(payContribute);
  // async function balanceOfContract() {
  //   const b = await balanceOf();

  //   document.getElementById("balance").innerHTML = b;
  // }
  return (
    <div>
      <div className="border-b-2">
        <h3 className="ml-10 font-semibold ">Investor's Area :</h3>
        <div className="flex justify-center  pt-3 space-x-3">
          <Input
            label="Enter amount in WEI"
            name="contribute amount"
            onBlur={function noRefCheck() {}}
            value={payContribute}
            onChange={({ target }) => setPayContribute(target?.value)}
            type="number"
          />
          <Button
            labelBgColor=""
            color="red"
            onClick={async function () {
              console.log("clicked button");
              await contribute();
            }}
            text="Contribute ETH"
            theme="colored"
          />
        </div>

        <div>
          <div className="flex justify-center pt-3 space-x-3">
            <Input
              label="Enter Proposal Name"
              name="create proposal"
              onBlur={function noRefCheck() {}}
              value={proposalName}
              onChange={({ target }) => setProposalName(target?.value)}
              type="text"
            />
            <Input
              label="Enter amount in WEI"
              name="proposed amount "
              onBlur={function noRefCheck() {}}
              value={proposalAmount}
              onChange={({ target }) => setProposalAmount(target?.value)}
              type="number"
            />
            <Input
              label="Enter recepient address"
              name="address of recepient"
              onBlur={function noRefCheck() {}}
              value={proposalAddress}
              onChange={({ target }) => setProposalAddress(target?.value)}
              type="text"
            />
          </div>
          <div className="flex justify-center pt-3 space-x-3">
            <Button
              color="blue"
              onClick={async function () {
                console.log("clicked button");
                await createProposal();
              }}
              text="Create Proposal"
              theme="colored"
            />
          </div>
        </div>
        <div className="flex justify-center pt-5 space-x-10">
          <Input
            label="Enter proposal id to Vote"
            name="vote"
            onBlur={function noRefCheck() {}}
            value={voteProposalId}
            onChange={({ target }) => setVoteProposalId(target?.value)}
            type="text"
          />
          <Button
            color="green"
            onClick={async function () {
              console.log("clicked button");
              await vote();
            }}
            text="Vote"
            theme="colored"
          />
        </div>
        <div className="flex justify-center space-x-40">
          <div className="flex justify-center pt-10 space-x-5">
            <div>
              <Input
                label="Enter amount redeem in WEI"
                name="redeem amount"
                onBlur={function noRefCheck() {}}
                value={redeemAmount}
                onChange={({ target }) => setredeemAmount(target?.value)}
                type="number"
              />
            </div>
            <div>
              <Button
                color="blue"
                onClick={async function () {
                  console.log("clicked button");
                  await redeemShare();
                }}
                text="Redeem"
                theme="colored"
              />
              <span id="balance" className="pt-1 ml-2"></span>
            </div>
          </div>

          <div className="pt-5">
            <div>
              <Input
                label="Enter amount in WEI"
                name=" amount will receive"
                onBlur={function noRefCheck() {}}
                value={addressToTransfer}
                onChange={({ target }) => setAddressToTransfer(target?.value)}
                type="number"
              />
              <Input
                label="Enter address"
                name="receiver address"
                onBlur={function noRefCheck() {}}
                value={amountToTransfer}
                onChange={({ target }) => setAmountToTransfer(target?.value)}
                type="number"
              />
            </div>
            <div className="pt-3 pb-1">
              <Button
                color="blue"
                onClick={async function () {
                  console.log("clicked button");
                  await transferShare();
                }}
                text="Transfer Share"
                theme="colored"
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" flex pt-3 space-x-10 border-b-2">
        <h3 className="ml-5"> Admin Area :</h3>
        <div>
          <div>
            <Input
              label="Enter proposal id to Execute"
              name="execute"
              onBlur={function noRefCheck() {}}
              value={executeProposalId}
              onChange={({ target }) => setExecuteProposalId(target?.value)}
              type="text"
            />
          </div>
          <div className="ml-12 pt-3">
            <Button
              color="red"
              onClick={async function () {
                console.log("clicked button");
                await executeProposal();
              }}
              text="Execute Proposal"
              theme="colored"
            />
          </div>
        </div>
        <div className="flex space-x-10">
          <div>
            <Input
              label="Enter amount in WEI"
              name="withdraw amount "
              onBlur={function noRefCheck() {}}
              value={withdrawAmount}
              onChange={({ target }) => setWithdrawAmount(target?.value)}
              type="number"
            />
            <Input
              label="Enter recepient address"
              name="address of recepient"
              onBlur={function noRefCheck() {}}
              value={withdrawAddress}
              onChange={({ target }) => setWithdrawAddress(target?.value)}
              type="text"
            />
          </div>
          <div className="pt-5">
            <Button
              color="blue"
              onClick={async function () {
                console.log("clicked button");
                await withdrawEther();
              }}
              text="Withdraw Amount"
              theme="colored"
            />
          </div>
        </div>
      </div>
      <div>
        <div className="flex pt-8 justify-center">
          <Input
            label="Enter amount to send back"
            name="amount to send back"
            onBlur={function noRefCheck() {}}
            value={receiveAmount}
            onChange={({ target }) => setReceiveAmount(target?.value)}
            type="text"
          />
        </div>
        <div className="flex pt-2 justify-center">
          <Button
            color="blue"
            onClick={async function () {
              console.log("clicked button");
              await receive();
            }}
            text="SendBack Amount"
            theme="colored"
          />
        </div>
      </div>
    </div>
  );
}
