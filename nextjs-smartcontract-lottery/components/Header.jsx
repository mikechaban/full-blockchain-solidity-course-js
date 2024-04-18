import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        <div>
            Decentralized Lottery
            <ConnectButton /* moralisAuth={false} -> shows it that we're not trying to connect to a server*/
            />
        </div>
    )
}
