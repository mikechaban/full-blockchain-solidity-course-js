import { useWeb3Contract, useMoralis } from "react-moralis"
import { useState, useEffect } from "react"
import { contractAbi, contractAddresses } from "../constants"
import { ethers } from "ethers"

const LotteryButton = () => {
    const [entranceFee, setEntranceFee] = useState("0")
    const [numPlayer, setnumPlayer] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")
    const { chainId: chainIdhex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdhex)
    // console.log(chainId)
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    // console.log(`Raffle contract address : ${raffleAddress}`)

    const { runContractFunction: enterRaffle } = useWeb3Contract({
        abi: contractAbi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        msgValue: entranceFee,
        params: {},
    })
    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: contractAbi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {},
    })
    const { runContractFunction: getPlayersNumber } = useWeb3Contract({
        abi: contractAbi,
        contractAddress: raffleAddress,
        functionName: "getNumPlayers",
        params: {},
    })
    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: contractAbi,
        contractAddress: raffleAddress,
        functionName: "getRecentWinner",
        params: {},
    })

    async function updateUIValues() {
        // Another way we could make a contract call:
        // const options = { abi, contractAddress: raffleAddress }
        // const fee = await Moralis.executeFunction({
        //     functionName: "getEntranceFee",
        //     ...options,
        // })
        const entranceFeeFromCall = String(await getEntranceFee())
        const numPlayersFromCall = String(await getPlayersNumber())
        const recentWinnerFromCall = await getRecentWinner()
        setEntranceFee(entranceFeeFromCall)
        setnumPlayer(numPlayersFromCall)
        setRecentWinner(recentWinnerFromCall)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues()
        }
    }, [isWeb3Enabled])

    return (
        <span
            type="button"
            onClick={async () => {
                await enterRaffle()
                console.log("clicked")
            }}
            className="badge badge-pill fs-5 p-2 w-100 badge-success text-white"
        >
            Connect Wallet
            <div>Entrance Fee: {ethers.utils.formatUnits(entranceFee, "ether")} ETH</div>
            <div>The current number of players is: {numPlayer}</div>
            <div>The previous winner was: {recentWinner}</div>
        </span>
    )
}

export default LotteryButton
