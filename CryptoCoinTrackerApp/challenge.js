/* Create a new function that, given in input a list of non-negative integers, arranges them such that they form the largest possible number.
For example, given [50, 2, 1, 9], the largest formed number is 95021.*/

function formLargestNumber(nonNegativeIntegersArray) {
  const convertedArrayToString = nonNegativeIntegersArray.map((number) =>
    number.toString(),
  );
  //   BECAUSE JAVASCRIPT WILL SORT THEM BASED ON THEIR NUMBERICAL VALUE BUT WE WANT TO SORT THEM BASED ON THE SMALL GROUPS
  console.log("convertedArrayToString", convertedArrayToString);

  const sortedConvertedArray = convertedArrayToString.sort((a, b) => {
    const joinSmallGroup = a + b;
    const joinSmallGroup2 = b + a;
    if (joinSmallGroup > joinSmallGroup2) return -1;
    else if (joinSmallGroup < joinSmallGroup2) return 1;
    else return 0;
  });

  console.log("sortedConvertedArray", sortedConvertedArray);

  const biggestNum = sortedConvertedArray.join("");

  return biggestNum;
}

const nonNegativeIntegersArray = [11, 500, 2, 3, 999];
const largestNumber = formLargestNumber(nonNegativeIntegersArray);
console.log("largest", largestNumber);

//https://accountable.notion.site/Mobile-technical-challenge-d05e18ff22f549b6a8390b08cc2187b4
