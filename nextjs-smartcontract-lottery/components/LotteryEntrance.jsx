// have a function to enter the lottery
import { useWeb3Contract } from "react-moralis"
import { contractAbi, contractAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"

export default function LotteryEntrance() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()

    const chainId = parseInt(chainIdHex)
    const raffleAddress = chainIdHex in contractAddresses ? contractAddresses[chainId][0] : null

    const [entranceFee, setEntranceFee] = useState("100000000000000000")

    const { runContractFunction: enterRaffle } = useWeb3Contract({
        abi: contractAbi,
        contractAddress: raffleAddress, // specify the networkId
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

    useEffect(() => {
        if (isWeb3Enabled) {
            async function updateUi() {
                const something = ethers.utils.formatUnits(entranceFee, "ether")
                console.log(something)
            }
            updateUi()
        }
    }, [isWeb3Enabled])

    return <div>Hi from Lottery Entrance</div>
}
