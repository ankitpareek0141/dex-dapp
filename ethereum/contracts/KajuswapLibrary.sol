//SPDX-License-Identifier: MIT
pragma solidity >=0.8.10;

import "../interfaces/IKajuswapPair.sol";
import "../interfaces/IKajuswapFactory.sol";

library KajuswapLibrary {
    // error InsufficientAmount(string error1);
    // error InsufficientLiquidity(string error2);
    // error InvalidPath(string error3);

    function getReserves(
        address factoryAddress,
        address tokenA,
        address tokenB
    ) public returns (uint256 reserveA, uint256 reserveB) {
        (address token0, address token1) = sortTokens(tokenA, tokenB); //we sort token addresses–this is important to avoid duplicates
        (uint256 reserve0, uint256 reserve1, ) = IKajuswapPair(
            pairFor(factoryAddress, token0, token1)
        ).getReserves();
        (reserveA, reserveB) = tokenA == token0
            ? (reserve0, reserve1)
            : (reserve1, reserve0);
    }

    function quote(
        uint256 amountIn,
        uint256 reserveIn,
        uint256 reserveOut
    ) public pure returns (uint256 amountOut) {
        // if (amountIn == 0) revert InsufficientAmount("InsufficientAmount");
        // if (reserveIn == 0 || reserveOut == 0) revert InsufficientLiquidity("InsufficientLiquidity");
        require(amountIn > 0, "KajuswapLibrary: INSUFFICIENT_AMOUNT");
        require(
            reserveIn > 0 && reserveOut > 0,
            "KajuswapLibrary: INSUFFICIENT_LIQUIDITY"
        );

        return (amountIn * reserveOut) / reserveIn;
    }

    //used to find pair address by factory and token addresses.
    function pairFor(
        address factoryAddress,
        address tokenA,
        address tokenB
    ) internal pure returns (address pairAddress) {
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        //Here we get a benefit from the deterministic address generation of CREATE2 opcode. The following piece of code generates an address in the same way CREATE2 does.
        pairAddress = address(
            uint160(
                uint256(
                    keccak256(
                        abi.encodePacked(
                            hex"ff",
                            factoryAddress,
                            keccak256(abi.encodePacked(token0, token1)),
                            hex"00b94bc5bff565db42203d34114a58e1896436dae13b989f9ff92fe211b10630" //init code hash
                        )
                    )
                )
            )
        );
    }

    function sortTokens(address tokenA, address tokenB)
        internal
        pure
        returns (address token0, address token1)
    {
        return tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
    }

    function getAmountOut(
        uint256 amountIn,
        uint256 reserveIn,
        uint256 reserveOut
    ) public pure returns (uint256) {
        // if (amountIn == 0) revert InsufficientAmount("InsufficientAmount");
        // if (reserveIn == 0 || reserveOut == 0) revert InsufficientLiquidity("InsufficientLiquidity");
        require(amountIn > 0, "KajuswapLibrary: INSUFFICIENT_AMOUNT");
        require(
            reserveIn > 0 && reserveOut > 0,
            "KajuswapLibrary: INSUFFICIENT_LIQUIDITY"
        );

        uint256 amountInWithFee = amountIn * 997;
        uint256 numerator = amountInWithFee * reserveOut;
        uint256 denominator = (reserveIn * 1000) + amountInWithFee;

        return numerator / denominator;
    }

    function getAmountsOut(
        address factory,
        uint256 amountIn,
        address[] memory path
    ) public returns (uint256[] memory) {
        // if (path.length < 2) revert InvalidPath("InvalidPath");
        require(path.length >= 2, "KajuswapLibrary: INVALID_PATH");
        uint256[] memory amounts = new uint256[](path.length);
        amounts[0] = amountIn;

        for (uint256 i = 0; i < path.length - 1; i++) {
            (uint256 reserve0, uint256 reserve1) = getReserves(
                factory,
                path[i],
                path[i + 1]
            );
            amounts[i + 1] = getAmountOut(amounts[i], reserve0, reserve1);
        }

        return amounts;
    }

    function getAmountIn(
        uint256 amountOut,
        uint256 reserveIn,
        uint256 reserveOut
    ) public pure returns (uint256) {
        // if (amountOut == 0) revert InsufficientAmount("InsufficientAmount");
        // if (reserveIn == 0 || reserveOut == 0) revert InsufficientLiquidity("InsufficientLiquidity");
        require(amountOut > 0, "KajuswapLibrary: INSUFFICIENT_AMOUNT");
        require(
            reserveIn > 0 && reserveOut > 0,
            "KajuswapLibrary: INSUFFICIENT_LIQUIDITY"
        );

        uint256 numerator = reserveIn * amountOut * 1000;
        uint256 denominator = (reserveOut - amountOut) * 997;

        return (numerator / denominator) + 1;
    }

    function getAmountsIn(
        address factory,
        uint256 amountOut,
        address[] memory path
    ) public returns (uint256[] memory) {
        // if (path.length < 2) revert InvalidPath("InvalidPath");
        require(path.length >= 2, "KajuswapLibrary: INVALID_PATH");
        uint256[] memory amounts = new uint256[](path.length);
        amounts[amounts.length - 1] = amountOut;

        for (uint256 i = path.length - 1; i > 0; i--) {
            (uint256 reserve0, uint256 reserve1) = getReserves(
                factory,
                path[i - 1],
                path[i]
            );
            amounts[i - 1] = getAmountIn(amounts[i], reserve0, reserve1);
        }

        return amounts;
    }
}
