// SPDX-License-Identifier: MIT
pragma solidity 0.8.8; // The most recent one at the time of writing is 0.8.22

contract SimpleStorage {
    // 4 most basic data types are:
    // boolean, uint, int, address, bytes
    // boolean - defines T/F
    // uint - unsigned integer (a whole number that's positive)
    // int - integer (positive/negative whole number)
    // address - address

    // we use types to define what different variables are

    // variables are basically holders for different values

    // this gets initialized to zero
    uint256 favoriteNumber;

    mapping(string => uint256) public nameToFavoriteNumber;

    struct People{
        uint256 favoriteNumber;
        string name;
    }

    People[] public people;

    function store(uint256 _favoriteNumber) public virtual {
        favoriteNumber = _favoriteNumber;
    }

    function retrieve() public view returns(uint256) {
        return favoriteNumber;
    }

    function addPerson(string memory _name, uint256 _favoriteNumber) public {        
        people.push(People(_favoriteNumber, _name));
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }
}