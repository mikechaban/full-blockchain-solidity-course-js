// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/vrf/VRFCoordinatorV2.sol";

error Raffle__NotEnoughETHEntered();

contract Raffle is VRFConsumerBaseV2 {
    /* State Variables */
    uint256 private immutable i_entranceFee;
    address payable[] private s_players;
    VRFCoordinatorV2Interface private immutable i_VRFCoordinator;
    bytes32 private immutable i_gasLane;
    uint64 private immutable i_subscriptionId;
    uint32 private immutable i_callBackGasLimit;
    uint16 private constant REQUEST_CONFIRMATIONS = 3;
    uint32 private constant NUM_WORDS = 1;

    /* Events */
    event RaffleEntered(address indexed player);
    event RequestedRaffleWinner(uint256 indexed requestId);

    constructor(
        address VRFCoordinatorV2,
        uint256 entranceFee,
        bytes32 gasLane,
        uint64 subscriptionId,
        uint32 callbackGasLimit
    ) VRFConsumerBaseV2(VRFCoordinatorV2) {
        i_entranceFee = entranceFee;
        i_VRFCoordinator = VRFCoordinatorV2Interface(VRFCoordinatorV2);
        i_gasLane = gasLane;
        i_subscriptionId = subscriptionId;
        i_callBackGasLimit = callbackGasLimit;
    }

    function enterRaffle() public payable {
        // we could do:
        // require(msg.value > i_entranceFee, "Not enough ETH!")

        // but instead we'll do a custom error cause it's more gas efficient

        if (msg.value < i_entranceFee) {
            revert Raffle__NotEnoughETHEntered();
        }

        s_players.push(payable(msg.sender));

        // Events
        emit RaffleEntered(msg.sender);
    }

    function requestRandomWinner() external {
        uint256 requestId = i_VRFCoordinator.requestRandomWords(
            i_gasLane, // gasLane
            i_subscriptionId,
            REQUEST_CONFIRMATIONS,
            i_callBackGasLimit,
            NUM_WORDS
        );
        emit RequestedRaffleWinner(requestId);
    }

    function fulfillRandomWords(
        uint256 requestId,
        uint256[] memory randomWords
    ) internal override {}

    /* View / Pure Functions */

    function getEntranceFee() public view returns (uint256) {
        return i_entranceFee;
    }

    function getPlayer(uint256 index) public view returns (address) {
        return s_players[index];
    }
}
