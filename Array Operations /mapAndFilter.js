// Combine map and filter to first filter odd numbers and then square them

// const mapAndFilter = (nums) => {
//   let nums1 = nums.filter((c) => c % 2 === 1);
//   let nums2 = nums1.map((m) => m * m);
//   return nums2;
// };

// console.log(mapAndFilter([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));

//one line approach
const mapFilter = (nums) => nums.filter((c) => c % 2 === 1).map((m) => m * m);
console.log(mapFilter([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
