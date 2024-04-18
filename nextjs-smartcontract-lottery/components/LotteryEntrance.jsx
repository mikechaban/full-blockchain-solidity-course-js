// have a function to enter the lottery
import { useWeb3Contract } from "react-moralis"
import { contractAbi, contractAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect } from "react"

export default function LotteryEntrance() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()

    const chainId = parseInt(chainIdHex)
    const raffleAddress = chainIdHex in contractAddresses ? contractAddresses[chainId][0] : null

    // const { runContractFunction: enterRaffle } = useWeb3Contract({
    //     abi: abi,
    //     contractAddress: raffleAddress, // specify the networkId
    //     functionName: "enterRaffle",
    //     params: {},
    //     msgValue: null,
    // })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: contractAbi,
        contractAddresses: raffleAddress,
        functionName: "getEntranceFee",
        params: {},
    })

    useEffect(() => {
        if (isWeb3Enabled) {
            async function updateUi() {
                const something = await getEntranceFee()
                console.log(something)
            }
            updateUi()
        }
    }, [isWeb3Enabled])

    return <div>Hi from Lottery Entrance</div>
}
