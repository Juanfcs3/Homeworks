let arr1 = [10, 20, 30];
console.log(arr1.at(1)); // 20

// 2. concat()
let arr2 = [1, 2];
let arr2b = [3, 4];
console.log(arr2.concat(arr2b)); // [1, 2, 3, 4]

// 3. copyWithin()
let arr3 = [1, 2, 3, 4, 5];
console.log(arr3.copyWithin(0, 3)); // [4, 5, 3, 4, 5]

// 4. entries()
let arr4 = ["a", "b"];
for (let [index, value] of arr4.entries()) {
console.log(index, value);
}

// 5. every()
let arr5 = [2, 4, 6];
console.log(arr5.every(n => n % 2 === 0)); // true

// 6. fill()
let arr6 = [1, 2, 3];
console.log(arr6.fill(0)); // [0, 0, 0]

// 7. filter()
let arr7 = [1, 2, 3, 4];
console.log(arr7.filter(n => n > 2)); // [3, 4]

// 8. find()
let arr8 = [1, 2, 3, 4];
console.log(arr8.find(n => n > 2)); // 3

// 9. findIndex()
let arr9 = [1, 2, 3];
console.log(arr9.findIndex(n => n > 2)); // 2

// 10. findLast()
let arr10 = [1, 2, 3, 4];
console.log(arr10.findLast(n => n % 2 === 0)); // 4

// 11. findLastIndex()
let arr11 = [1, 2, 3, 4];
console.log(arr11.findLastIndex(n => n % 2 === 0)); // 3

// 12. flat()
let arr12 = [1, [2, 3], [4, [5]]];
console.log(arr12.flat(2)); // [1, 2, 3, 4, 5]

// 13. flatMap()
let arr13 = [1, 2, 3];
console.log(arr13.flatMap(n => [n, n * 2])); // [1, 2, 2, 4, 3, 6]

// 14. forEach()
let arr14 = [1, 2, 3];
arr14.forEach(n => console.log(n));

// 15. includes()
let arr15 = [1, 2, 3];
console.log(arr15.includes(2)); // true

// 16. indexOf()
let arr16 = [1, 2, 3];
console.log(arr16.indexOf(2)); // 1

// 17. join()
let arr17 = ["a", "b", "c"];
console.log(arr17.join("-")); // "a-b-c"

// 18. keys()
let arr18 = ["a", "b"];
for (let key of arr18.keys()) {
console.log(key);
}

// 19. lastIndexOf()
let arr19 = [1, 2, 3, 2];
console.log(arr19.lastIndexOf(2)); // 3

// 20. map()
let arr20 = [1, 2, 3];
console.log(arr20.map(n => n * 2)); // [2, 4, 6]

// 21. pop()
let arr21 = [1, 2, 3];
console.log(arr21.pop()); // 3
console.log(arr21); // [1, 2]

// 22. push()
let arr22 = [1, 2];
arr22.push(3);
console.log(arr22); // [1, 2, 3]

// 23. reduce()
let arr23 = [1, 2, 3];
console.log(arr23.reduce((a, b) => a + b, 0)); // 6

// 24. reduceRight()
let arr24 = ["a", "b", "c"];
console.log(arr24.reduceRight((a, b) => a + b)); // "cba"

// 25. reverse()
let arr25 = [1, 2, 3];
console.log(arr25.reverse()); // [3, 2, 1]

// 26. shift()
let arr26 = [1, 2, 3];
console.log(arr26.shift()); // 1
console.log(arr26); // [2, 3]

// 27. slice()
let arr27 = [1, 2, 3, 4];
console.log(arr27.slice(1, 3)); // [2, 3]

// 28. some()
let arr28 = [1, 2, 3];
console.log(arr28.some(n => n > 2)); // true

// 29. sort()
let arr29 = [3, 1, 2];
console.log(arr29.sort()); // [1, 2, 3]

// 30. splice()
let arr30 = [1, 2, 3];
arr30.splice(1, 1, 99);
console.log(arr30); // [1, 99, 3]

// 31. toLocaleString()
let arr31 = [1000, 2000];
console.log(arr31.toLocaleString()); // "1,000,2,000" (depende de la configuración regional)

// 32. toString()
let arr32 = [1, 2, 3];
console.log(arr32.toString()); // "1,2,3"

// 33. unshift()
let arr33 = [2, 3];
arr33.unshift(1);
console.log(arr33); // [1, 2, 3]

// 34. values()
let arr34 = ["a", "b"];
for (let val of arr34.values()) {
console.log(val);
}