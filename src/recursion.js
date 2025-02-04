/* jshint esversion: 6 */

// Solve the following prompts using recursion.

// 1. Calculate the factorial of a number. The factorial of a non-negative integer n,
// denoted by n!, is the product of all positive integers less than or equal to n.
// Example: 5! = 5 x 4 x 3 x 2 x 1 = 120
// factorial(5); // 120
var factorial = function(n) {
  // error handling -> n < 0
  if ( n < 0 ) {
    return null;
  }
  // base case -> n = 0
  if ( n === 0 ) {
    return 1;
  }
  // recursive case -> n * n-1 * n-2 * ... * 1 * 1
  return n * factorial( n - 1 );
};

// 2. Compute the sum of an array of integers.
// sum([1,2,3,4,5,6]); // 21
var sum = function(array) {
  // base case -> length of array = 0
  if ( array.length === 0 ) {
    return 0;
  }
  // recursive case -> [a,b,c] -> a + [b,c] -> a + ( b + [c] ) -> a + ( b + ( c ) )
  return array[0] + sum( array.slice(1) );
};

// 3. Sum all numbers in an array containing nested arrays.
// arraySum([1,[2,3],[[4]],5]); // 15
var arraySum = function(array) {
  var sum = 0;

  // error handling -> array is undefined
  if ( array === undefined ) {
    return 0;
  }

  // base case -> non-array integer
  if ( typeof array === 'number' ) {
    return array;
  }
  // recursive case -> add each item in array
  //  [1,[2,3],[[4]],5] -> ( 1 + (2 + 3) + ((4)) + 5 )
  //  1 + [[2,3],[[4]],5] ->
  //  1 + (2, [3]),[[4]],5] ->
  //  1 + (2 + (3)),[[4]],5] ->
  //  1 + 2 + 3 + (4),[5] ->
  //  1 + 2 + 3 + 4 + (5) ->
  //  1 + 2 + 3 + 4 + 5
  for ( var i = 0; i < array.length; i++ ) {
    sum += arraySum(array[i]);
  }

  return sum;
};

// 4. Check if a number is even.
var isEven = function(n) {
  // edge case -> negative numbers
  if ( n < 0 ) {
    n *= -1;
  }
  // base case -> n less than 1 but not zero OR n is exactly zero
  if ( n <= 1 && n !== 0 ) {
    return false;
  } else if ( n === 0 ) {
    return true;
  }

  // recursive case -> n-2
  return isEven(n-2);
};

// 5. Sum all integers below a given integer.
// sumBelow(10); // 45
// sumBelow(7); // 21
var sumBelow = function(n) {
  // base case -> n equals 0
  if ( n === 0 ) {
    return 0;
  }

  // recursive case -> n - 1 (positive n's) OR n + 1 (negative n's)
  if ( n > 0 ) {
    n = n - 1;
  }
  if ( n < 0 ) {
    n = n + 1;
  }

  return n + sumBelow(n);
};

// 6. Get the integers within a range (x, y).
// range(2,9); // [3,4,5,6,7,8]
var range = function(x, y) {
  var aRange = [];
  if ( x < y ) {
    // base case -> difference between x and y is 1 or less
    if ( (y - x) <= 1 ) {
      return aRange;
    }

    // recursive case -> (x<y) -> array containing x+1...y-1
    //  (2,9) > [3] (3,9) > [3,4] (4,9) > [3,4,5] (5,9) >
    //  [3,4,5,6] (6,9) > [3,4,5,6,7] (7,9) > [3,4,5,6,7,8] (8,9) > done!
    aRange.push(x+1);
    aRange = aRange.concat(range(x+1,y));
  } else if ( x > y ) {
    // base case -> difference between x and y is 1 or less
    if ( (x - y) <= 1 ) {
      return aRange;
    }

    // recursive case -> (x>y) -> array containing x-1...y+1
    aRange.push(x-1);
    aRange = aRange.concat(range(x-1,y));
  }

  return aRange;
};

// 7. Compute the exponent of a number.
// The exponent of a number says how many times the base number is used as a factor.
// 8^2 = 8 x 8 = 64. Here, 8 is the base and 2 is the exponent.
// exponent(4,3); // 64
// https://www.khanacademy.org/computing/computer-science/algorithms/recursive-algorithms/a/computing-powers-of-a-number
var exponent = function(base, exp) {

  // base case -> exp = 0
  if ( exp === 0 ) {
    return 1;
  }

  // recursive case -> base * base n times (positive) OR base / base n times (negative)
  if ( exp > 0 ) {
    return base * exponent(base, exp - 1);
  }

  // handling for negative exp and JS decimal math errors
  if ( exp < 0 ) {
    exp *= -1;
    return 1 / ( base * exponent(base, exp - 1) );
  }
};

// 8. Determine if a number is a power of two.
// powerOfTwo(1); // true
// powerOfTwo(16); // true
// powerOfTwo(10); // false
var powerOfTwo = function(n) {
  // base case (true) -> n equals 1
  if ( n === 1 ) {
    return true;
  }
  // base case (false) -> n doesn't divide by 2 evenly OR is zero
  if ( n === 0 || n % 2 !== 0 ) {
    return false;
  }
  // recursive case -> n/2
  return powerOfTwo( n / 2 );
};

// 9. Write a function that reverses a string.
var reverse = function(string) {
  // base case -> string empty
  if ( string.length === 0 ) {
    return '';
  }
  // recursive case -> take first letter and put it at the end of the word
  return reverse(string.slice(1)) + string[0];
};

// 10. Write a function that determines if a string is a palindrome.
var palindrome = function(string) {
  string = string.toLowerCase().trim();
  // base case (true) -> string is empty or only contains 1 letter
  if ( string.length === 1 || string.length === 0 ) {
    return true
  }
  // base case (false) -> first letter of string doesn't match the last letter
  if ( string[0] !== string[string.length - 1] ) {
    return false;
  }
  // recursive case -> remove the first and last letter
  //  to check the next innermost letters
  return palindrome(string.slice(string[0], string[string.length - 1]));
};

// 11. Write a function that returns the remainder of x divided by y without using the
// modulo (%) operator.
// modulo(5,2) // 1
// modulo(17,5) // 2
// modulo(22,6) // 4
    // edge case -> y equals 0 (thou shall not divide by zero)
    // base case (factors) -> absolute-x equals absolute-y
    // base case (remainders) -> absolute-x < absolute-y
    // recursive case -> x-y
var modulo = function(x, y) {
  if ( y === 0 ) {
    return NaN;

  }
  if ( x - y === 0  || x + y === 0 ) {
    return 0;
  }

  var absX = x.toString();
  if ( absX[0] === '-' ) {
    absX = absX.slice(1);
  }
  var absY = y.toString();
  if ( absY[0] === '-' ) {
    absY = absY.slice(1);
  }

  if ( parseInt(absX) < parseInt(absY) ) {
    return x;
  }

  if ( (x > 0 && y > 0) || (x < 0 && y < 0) ) {
    return modulo(x-y, y);
  }

  return modulo(x+y, y);
};

// 12. Write a function that multiplies two numbers without using the * operator or
// Math methods.
    // base case -> y equals 0
    // recursive case -> y-1
var multiply = function(x, y) {
  if ( y === 0 ) {
    return 0;
  }

  if ( y > 0 ) {
    return x + multiply(x, y-1);
  }

  if ( x > 0 ) {
    return y + multiply(x-1, y);
  }

  return -x + multiply(x, y+1);
};

// 13. Write a function that divides two numbers without using the / operator or
// Math methods to arrive at an approximate quotient (ignore decimal endings).
    // base case -> x is less than or equal to y
    // recursive case -> x-y
var divide = function(x, y) {
  if ( y === 0 ) {
    return NaN;
  }

  var absX = x.toString();
  if ( absX[0] === '-' ) {
    absX = absX.slice(1);
  }
  absX = parseInt(absX);

  var absY = y.toString();
  if ( absY[0] === '-' ) {
    absY = absY.slice(1);
  }
  absY = parseInt(absY);

  if ( absX === absY ) {
    if ( x > 0 && y > 0 || x < 0 && y < 0 ) {
      return 1;
    }
    return -1;
  }

  if ( x === 0 || absX < absY ) {
    return 0;
  }

  return 1 + divide( x-y, y );
};

// 14. Find the greatest common divisor (gcd) of two positive numbers. The GCD of two
// integers is the greatest integer that divides both x and y with no remainder.
// gcd(4,36); // 4
// http://www.cse.wustl.edu/~kjg/cse131/Notes/Recursion/recursion.html
// https://www.khanacademy.org/computing/computer-science/cryptography/modarithmetic/a/the-euclidean-algorithm
var gcd = function(x, y) {
  // edge case -> x or y is negative
  if ( x < 0 || y < 0  || x === 0 && y === 0) {
    return null;
  }
  // base case -> x or y equals 0
  if ( x === 0 || x === y ) {
    return y;
  }

  if ( y === 0 ) {
    return x;
  }
  // recursive case -> start with x or y - whichever is smaller - then
  //  subtract 1 until a common divisor is returned
  var higher, lower;
  if ( x > y ) {
    higher = x;
    lower = y;
  } else {
    higher = y;
    lower = x;
  }

  return gcd(lower, higher % lower);
};

// 15. Write a function that compares each character of two strings and returns true if
// both are identical.
// compareStr('house', 'houses') // false
// compareStr('tomato', 'tomato') // true
var compareStr = function(str1, str2) {
  // base case (true) -> both strings are empty
  if ( str1 === '' && str2 === '' ) {
    return true;
  }
  // base case (false) -> the first letter of each string does NOT match
  if ( str1[0] !== str2[0] ) {
    return false;
  }
  // recursive case -> remove first letter of each string to compare them
  return compareStr(str1.slice(1), str2.slice(1));
};

// 16. Write a function that accepts a string and creates an array where each letter
// occupies an index of the array.
var createArray = function(str) {
  // base case -> empty string
  if ( str === '' ) {
    return [];
  }
  // recursive case -> add each character from the string to a concatenated array
  return [str[0]].concat(createArray(str.slice(1)));
};

// 17. Reverse the order of an array
var reverseArr = function(array) {
  // base case -> empty array
  if ( array.length === 0 ) {
    return [];
  }
  // recursive case -> remove last array item, add it to the beginning
  return [array[array.length - 1]].concat(reverseArr(array.slice(0, array.length - 1)));
};

// 18. Create a new array with a given value and length.
// buildList(0,5) // [0,0,0,0,0]
// buildList(7,3) // [7,7,7]
var buildList = function(value, length) {
  // base case -> given length is zero
  if ( length === 0 ) {
    return [];
  }
  // recursive case -> attach an array with one instance of value
  return [value].concat(buildList(value, length - 1));
};

// 19. Implement FizzBuzz. Given integer n, return an array of the string representations of 1 to n.
// For multiples of three, output 'Fizz' instead of the number.
// For multiples of five, output 'Buzz' instead of the number.
// For numbers which are multiples of both three and five, output “FizzBuzz” instead of the number.
// fizzBuzz(5) // ['1','2','Fizz','4','Buzz']
var fizzBuzz = function(n) {
  // base case -> n equals 0
  if ( n === 0 ) {
    return [];
  }
  // recursive case (fizzbuzz) -> n is a multiple of 3 and 5
  if ( n % 5 === 0 && n % 3 === 0 ) {
    return fizzBuzz( n-1 ).concat(['FizzBuzz']);
  }
  // recursive case (fizz) -> n is a multiple of 3
  if ( n % 3 === 0 ) {
    return fizzBuzz( n-1 ).concat(['Fizz']);
  }
  // recursive case (buzz) -> n is a multiple of 5
  if ( n % 5 === 0 ) {
    return fizzBuzz( n-1 ).concat(['Buzz']);
  }
  // recursive case -> n is any other number
  return fizzBuzz( n-1 ).concat([n.toString()]);
};

// 20. Count the occurrence of a value in a list.
// countOccurrence([2,7,4,4,1,4], 4) // 3
// countOccurrence([2,'banana',4,4,1,'banana'], 'banana') // 2
var countOccurrence = function(array, value) {
  // base case -> array is empty
  if ( array.length === 0 ) {
    return 0;
  }
  // recursive case -> check first value in array
  if ( array[0] === value ) {
    return 1 + countOccurrence(array.slice(1), value);
  }

  return countOccurrence(array.slice(1), value);
};

// 21. Write a recursive version of map.
// rMap([1,2,3], timesTwo); // [2,4,6]
var rMap = function(array, callback) {
  // base case -> array is empty
  if ( array.length === 0 ) {
    return [];
  }
  // recursive case -> apply callback to first element in array
  return [callback(array[0])].concat(rMap(array.slice(1), callback));
};

// 22. Write a function that counts the number of times a key occurs in an object.
// var obj = {
  //  'e':{
    //  'x':'y'
    //},
  //  't':{
    //  'r':{
      //  'e':'r'
      //},
    //  'p':{
      //  'y':'r'
      //}
    //},
  //  'y':'e'
  //};
// countKeysInObj(obj, 'r') // 1
// countKeysInObj(obj, 'e') // 2
var countKeysInObj = function(obj, key) {
  // base case -> obj is not an Object
  if (typeof obj !== 'object' ) {
    return 0;
  }
  // recursive case -> check all keys for additional keys
  var keys = Object.keys(obj);
  var keyCount = 0;
  for ( var i = 0; i < keys.length; i++ ) {
    if ( keys[i] === key ) {
      keyCount++;
    }

    keyCount += countKeysInObj(obj[keys[i]], key);
  }

  return keyCount;
};

// 23. Write a function that counts the number of times a value occurs in an object.
// var obj = {'e':{'x':'y'},'t':{'r':{'e':'r'},'p':{'y':'r'}},'y':'e'};
// countValuesInObj(obj, 'r') // 2
// countValuesInObj(obj, 'e') // 1
var countValuesInObj = function(obj, value) {
  // base case -> obj is not an Object
  if (typeof obj !== 'object' ) {
    if ( obj === value ) {
      return 1;
    }
    return 0;
  }
  // recursive case -> check all keys for additional keys while checking values
  var keys = Object.keys(obj);
  var valueCount = 0;
  for ( var i = 0; i < keys.length; i++ ) {
    valueCount += countValuesInObj(obj[keys[i]], value);
  }

  return valueCount;
};

// 24. Find all keys in an object (and nested objects) by a provided name and rename
// them to a provided new name while preserving the value stored at that key.
var replaceKeysInObj = function(obj, oldKey, newKey) {
  // base case -> obj is not an object
  if (typeof obj !== 'object' ) {
    return obj;
  }
  // recursive case -> check each key for Object values
  var keys = Object.keys(obj);
  for ( var i = 0; i < keys.length; i++ ) {
    obj[keys[i]] = replaceKeysInObj(obj[keys[i]], oldKey, newKey);
    // create k/v pair for new key whenever key matches old key -> delete old key
    if ( keys[i] === oldKey ) {
      obj[newKey] = obj[oldKey];
      delete obj[oldKey];
    }
  }

  return obj;
};

// 25. Get the first n Fibonacci numbers. In the Fibonacci sequence, each subsequent
// number is the sum of the previous two.
// Example: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34.....
// fibonacci(5); // [0,1,1,2,3,5]
// Note: The 0 is not counted.
var fibonacci = function(n) {
  // edge case -> 0 or negative
  if ( n <= 0 ) {
    return null;
  }
  // base case -> n equals 1
  if ( n === 1 ) {
    return [0, 1];
  }
  // recursive case -> collect sum array of previous length and compute sum last 2 numbers
  var fib = fibonacci( n - 1 );
  fib.push(fib[n-2] + fib[n-1]);

  return fib;
};

// 26. Return the Fibonacci number located at index n of the Fibonacci sequence.
// [0,1,1,2,3,5,8,13,21]
// nthFibo(5); // 5
// nthFibo(7); // 13
// nthFibo(3); // 2
var nthFibo = function(n) {
  // edge case -> n is negative
  if ( n < 0 ) {
    return null;
  }
  // edge case -> n equals zero or 1
  if ( n <= 1 ) {
    return n;
  }
  // recursive case -> same as fib array above, but collecting just the nth index value
  var fib = [ nthFibo( n - 2 ), nthFibo( n - 1 ) ];
  return fib[0] + fib[1];
};

// 27. Given an array of words, return a new array containing each word capitalized.
// var words = ['i', 'am', 'learning', 'recursion'];
// capitalizedWords(words); // ['I', 'AM', 'LEARNING', 'RECURSION']
var capitalizeWords = function(array) {
  var newArr = [];
  // base case -> array is empty
  if ( array.length === 0 ) {
    return [];
  }
  newArr.push(array[0].toUpperCase());
  // recursive case -> uppercase first word in array, add it to new array
  return newArr.concat(capitalizeWords(array.slice(1)));
};

// 28. Given an array of strings, capitalize the first letter of each index.
// capitalizeFirst(['car','poop','banana']); // ['Car','Poop','Banana']
var capitalizeFirst = function(array) {
  var newArr = [];
  // base case -> array is empty
  if ( array.length === 0 ) {
    return [];
  }
  newArr.push( array[0][0].toUpperCase() + array[0].slice(1));
  // recursive case -> uppercase 1st letter of 1st word in array, add it to new array
  return newArr.concat(capitalizeFirst(array.slice(1)));
};

// 29. Return the sum of all even numbers in an object containing nested objects.
// var obj1 = {
//   a: 2,
//   b: {b: 2, bb: {b: 3, bb: {b: 2}}},
//   c: {c: {c: 2}, cc: 'ball', ccc: 5},
//   d: 1,
//   e: {e: {e: 2}, ee: 'car'}
// };
// nestedEvenSum(obj1); // 10
var nestedEvenSum = function(obj) {
  if ( typeof obj !== 'object' ) {
    // base case (even) -> obj is an even number
    if ( obj % 2 === 0 ) {
      return obj;
    }
    return 0;
  }
  // recursive case -> check all keys in obj for even values
  var keys = Object.keys(obj);
  var sum = 0
  for ( var i = 0; i < keys.length; i++ ) {
    sum += nestedEvenSum(obj[keys[i]]);
  }

  return sum;
};

// 30. Flatten an array containing nested arrays.
// flatten([1,[2],[3,[[4]]],5]); // [1,2,3,4,5]
// flatten([[1],[2,3],[[4]],5]); // [1,2,3,4,5]
// flat[][0]: [1]
// flat[].slice(1): [[2,3],[[4]],5]
// flat[].slice(1)[0]: [2,3]
// flat[].slice:
var flatten = function(array) {
  // base case -> array is undefined or empty
  if ( array === undefined || array.length === 0 ) {
    return [];
  }
  // base case -> array is a number
  if ( typeof array === 'number' ) {
    return [array];
  }
  // recursive case -> flatten first item in array
  return flatten(array[0]).concat(flatten(array.slice(1)));
};

// 31. Given a string, return an object containing tallies of each letter.
// letterTally('potato'); // {p:1, o:2, t:2, a:1}
var letterTally = function(str, obj) {
  // edge case -> obj not initialized or defined
  if ( obj === undefined ) {
    obj = {};
  }
  // base case -> str is empty string
  if ( str === '' ) {
    return;
  }

  if ( obj[str[0]] === undefined ) {
    obj[str[0]] = 0;
  }
  obj[str[0]] += 1;

  // recursive case -> add first letter of str to obj
  nextLetter = letterTally(str.slice(1), obj);

  return obj;
};

// 32. Eliminate consecutive duplicates in a list. If the list contains repeated
// elements they should be replaced with a single copy of the element. The order of the
// elements should not be changed.
// compress([1,2,2,3,4,4,5,5,5]) // [1,2,3,4,5]
// compress([1,2,2,3,4,4,2,5,5,5,4,4]) // [1,2,3,4,2,5,4]
var compress = function(list) {
  // base case -> list is empty
  if ( list.length === 0 ) {
    return [];
  }
  // check first item of list against second item, pull out into new array if not matching
  var newArr = [];
  if ( list[0] !== list[1] ) {
    newArr.push(list[0]);
  }
  // recursive case -> check remaining items in list
  return newArr.concat(compress(list.slice(1)));
};

// 33. Augment every element in a list with a new value where each element is an array
// itself.
// augmentElements([[],[3],[7]], 5); // [[5],[3,5],[7,5]]
var augmentElements = function(array, aug) {
  // base case -> array is empty
  if ( array.length === 1 ) {
    array[0].push(aug);
    return array;
  }
  // recursive case -> push aug to first nested array
  var newArr = [];
  array[0].push(aug);
  newArr.push(array[0]);
  var remaining = augmentElements(array.slice(1), aug);
  newArr = newArr.concat(remaining);

  return newArr;
};

// 34. Reduce a series of zeroes to a single 0.
// minimizeZeroes([2,0,0,0,1,4]) // [2,0,1,4]
// minimizeZeroes([2,0,0,0,1,0,0,4]) // [2,0,1,0,4]
var minimizeZeroes = function(array) {
  // base case -> array has only 1 element
  if ( array.length === 1 ) {
    return array;
  }
  // recursive case -> check is first and 2nd are both 0, check the remaining array
  if ( array[0] === 0 && array[1] === 0 ) {
    return minimizeZeroes(array.slice(1));
  }
  return [array[0]].concat(minimizeZeroes(array.slice(1)));
};

// 35. Alternate the numbers in an array between positive and negative regardless of
// their original sign. The first number in the index always needs to be positive.
// alternateSign([2,7,8,3,1,4]) // [2,-7,8,-3,1,-4]
// alternateSign([-2,-7,8,3,-1,4]) // [2,-7,8,-3,1,-4]
var alternateSign = function(array) {
  // base case -> array only contains 1 boolean
  if ( array.length === 1 ) {
    return [];
  }
  // base (setup) case -> 1st in array is not a booloen
  if ( typeof array[0] !== 'boolean' ) {
    return alternateSign([true].concat(array));
  }
  // recursive case -> bool is false & 1st is positive... or true & negative
  if ( array[0] === false && array[1] > 0 || array[0] === true && array[1] < 0 ) {
      return [(array[1] * -1)].concat(alternateSign([!array[0]].concat(array.slice(2))));
  }
  // recursive case -> bool matches positive/negative
  return [array[1]].concat(alternateSign([!array[0]].concat(array.slice(2))));
};

// 36. Given a string, return a string with digits converted to their word equivalent.
// Assume all numbers are single digits (less than 10).
// numToText("I have 5 dogs and 6 ponies"); // "I have five dogs and six ponies"
var numToText = function(str) {
  // base case -> empty string
  if ( str === '' ) {
    return str;
  }

  var nums = {
    '0': 'zero',
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
    '6': 'six',
    '7': 'seven',
    '8': 'eight',
    '9': 'nine'
  };
  // recursive case -> split string into array of words, then
  //  check if first word can be turned into a number
  var strArray = str.split(' ');

  if ( nums[strArray[0]] ) {
    return (nums[strArray[0]] + ' ' + numToText(strArray.slice(1).join(' '))).trim();
  }
  return (strArray[0] + ' ' + numToText(strArray.slice(1).join(' '))).trim();
};


// *** EXTRA CREDIT ***

// 37. Return the number of times a tag occurs in the DOM.
var tagCount = function(tag, node) {
  // setup case -> node is empty
  if ( node === undefined ) {
    node = document.childNodes;
  }
  // base case -> element has no children (.children.length equals 0)
  if ( node.length === 0 ) {
    return 0;
  }
  var tags = 0;
  // recursive case -> check if any children of current node match tag
  for ( var i = 0; i < node.length; i++ ) {
    if ( node[i].localName === tag ) {
      tags++;
    }
    tags += tagCount(tag, node[i].childNodes);
  }
  return tags;
};

// 38. Write a function for binary search.
// var array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
// binarySearch(array, 5) // 5
// https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search
var binarySearch = function(array, target, min, max) {
  // edge case -> target outside of array
  if ( target < array[0] || target > array[array.length - 1]) {
    return null;
  }
  // setup -> set min and max to input array, if not defined
  if ( min === undefined ) {
    min = 0;
  }
  if ( max === undefined ) {
    max = array.length;
  }
  var middleIdx = Math.floor( (max - min) / 2 ) + min;
  var middleNum = array[middleIdx];
  // base case -> middle number in array is the target
  if ( middleNum === target ) {
    return middleIdx;
  }
  // base case -> array is empty or only has 1 element that is not the target
  if ( max - min < 1 ) {
    return null;
  }
  // recursive case -> check middle number in array against target
    // if target is higher, check the second half of the list & vice versa
  if ( target < middleNum ) {
    return binarySearch(array, target, min, middleIdx-1);
  }
  return binarySearch(array, target, middleIdx+1, max);
};

// 39. Write a merge sort function.
// mergeSort([34,7,23,32,5,62]) // [5,7,23,32,34,62]
// https://www.khanacademy.org/computing/computer-science/algorithms/merge-sort/a/divide-and-conquer-algorithms
var mergeSort = function(array) {
  // base case -> array has 1 number
  if ( array.length <= 1 ) {
    return array;
  }
  // recursive case -> split array in half, then mergesort each
  var middleIdx = Math.floor( array.length / 2 );
  var arr1 = mergeSort(array.slice(0,middleIdx));
  var arr2 = mergeSort(array.slice(middleIdx, array.length));
  // return case -> populate new array that sorts the two sorted arrays together
  var newArr = arr2.slice();
  var newArrSortPoint = 0;
  for ( var i = 0; i < arr1.length; i++ ) {
    for ( var j = newArrSortPoint; j < newArr.length; j++ ) {
      if ( arr1[i] < newArr[j] ) {
        newArr.splice(j, 0, arr1[i]);
        newArrSortPoint = j;
        break;
      }
      if ( j === newArr.length - 1 ) {
        newArr.push( arr1[i] );
        newArrSortPoint = j + 1;
        break;
      }
    }
  }
  return newArr;
  //       [34,7,23,32,5,62]
  //     [34,7,23] | [32,5,62]
  //   [34] [7,23] | [32] [5,62]
  // [34] [7] [23] | [32] [5] [62]
  //   [34] [7,23] | [32] [5,62]
  //     [7,23,34] | [5,32,62]
  //        [5,7,23,32,34,62]
  // "How Sauron Got Merge-Sorted Array Back"
};

// 40. Deeply clone objects and arrays.
// var obj1 = {a:1,b:{bb:{bbb:2}},c:3};
// var obj2 = clone(obj1);
// console.log(obj2); // {a:1,b:{bb:{bbb:2}},c:3}
// obj1 === obj2 // false
var clone = function(input) {
  // base case -> input isn't an object
  if ( typeof input !== 'object' ) {
    return input;
  }

  // recursive case -> input is an array -> clone each item in array to new array
  if ( Array.isArray(input) ) {
    var newArr = [];

    for ( var i = 0; i < input.length; i++ ) {
      newArr.push(clone(input[i]));
    }

    return newArr;
  }

  // recursive case -> input is object -> clone each object to new object
  var newObj = {};
  var keys = Object.keys(input);

  for ( var i = 0; i < keys.length; i++ ) {
    newObj[keys[i]] = clone(input[keys[i]]);
  }

  return newObj;

  // object1 = {a:1,b:{bb:{bbb:2}},c:3};
  // object2 = {a:1,b:['bb',{bbb:[2]}],c:{cc:[3,{ccc:4},5]}};
  // array1 = [1,[2,[]],3,[[[4]],5]];
  // array2 = [1,[2,{a:[{},2,3]}],{3:[4]},5];
};
