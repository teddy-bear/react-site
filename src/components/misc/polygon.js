import React from "react";

export default function Polygon() {

    const arrayOfNumbers = [5, 3, 2, 1, 2, 3, 4, 7];
    const arrayOfNames = ["Alice", "Bob", "Tiff", "Bruce", "Alice"];

    /**
     * Get sum in array
     */
    function getSum() {
        const sum = arrayOfNumbers.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        });

        //console.log(sum);
    }

    /**
     * Get even numbers
     * @param arr
     * @returns {*}
     */
    function getEven(arr) {
        const arrEven = arr.filter((item) => item % 2 === 0);
        let e1 = arrEven[0];
    }

    /**
     * Counting instances of values in an object
     * @type {{}}
     */
    const countedNames = arrayOfNames.reduce((allNames, name) => {
        const currCount = allNames[name] ?? 0;
        return {
            ...allNames,
            [name]: currCount + 1,
        };
    }, {});
    // countedNames is:
    // { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }

    getSum(arrayOfNumbers)
    getEven(arrayOfNumbers);

    /**
     * High Order Function example
     * @param currencySymbol
     * @param decimalSeparator
     * @returns {function(*): string}
     */
    const formatCurrency =  (currencySymbol, decimalSeparator) => {
        return function (value) {
            const wholePart = Math.trunc(value / 100);
            let fractionalPart = value % 100;
            if (fractionalPart < 10) {
                fractionalPart = '0' + fractionalPart;
            }
            return `${currencySymbol}${wholePart}${decimalSeparator}${fractionalPart}`;
        }
    }

    const geLabel = formatCurrency('$', '.');
    geLabel(2000);

    return (
        <>
        </>
    )
}
