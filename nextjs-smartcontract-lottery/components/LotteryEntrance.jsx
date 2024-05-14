import { useWeb3Contract, useMoralis } from "react-moralis"
import { useState, useEffect } from "react"
import { contractAbi, contractAddresses } from "../constants"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"

const LotteryButton = () => {
    const [entranceFee, setEntranceFee] = useState("0")
    const [numPlayer, setnumPlayer] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")
    const { chainId: chainIdhex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdhex)
    // console.log(chainId)
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    // console.log(`Raffle contract address : ${raffleAddress}`)

    const dispatch = useNotification()

    const {
        runContractFunction: enterRaffle,
        isLoading,
        isFetching,
    } = useWeb3Contract({
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

    const handleSuccess = async function (tx) {
        await tx.wait(1)

        handleNewNotification(tx)

        updateUIValues()
    }

    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Tx Notification",
            position: "topR",
        })
    }

    return (
        <div className="text-xl	text-sky-900 p-5">
            {raffleAddress ? (
                <div>
                    <div>
                        <button
                            className="text-white font-semibold py-2 px-4 rounded ml-auto transition bg-cyan-900 hover:bg-cyan-600 duration-150"
                            onClick={async function () {
                                await enterRaffle({
                                    onSuccess: handleSuccess,
                                    // This is helpful to do ⬇️
                                    onError: (error) => console.log(error),
                                })
                            }}
                            disabled={isLoading || isFetching}
                        >
                            {isLoading || isFetching ? (
                                <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                            ) : (
                                <div>Enter Raffle</div>
                            )}
                        </button>
                    </div>
                    Entrance Fee:{" "}
                    <span className="font-bold">
                        {ethers.utils.formatUnits(entranceFee, "ether")} ETH
                    </span>
                </div>
            ) : (
                <div>No Raffle Address Detected</div>
            )}

            <div>
                The current number of players is: <span className="font-bold">{numPlayer}</span>
            </div>
            <div>
                The previous winner was: <span className="font-bold">{recentWinner}</span>
            </div>
        </div>
    )
}

export default LotteryButton
