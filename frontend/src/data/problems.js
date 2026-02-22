// =============================================================
//  Striver's A2Z DSA Sheet — Arrays (Easy → Medium → Hard)
//  + Strings (Basic/Easy + Medium)  |  ~55 LeetCode Problems
// =============================================================

export const PROBLEMS = {
  // ╔══════════════════════════════════════╗
  // ║        ARRAYS  –  EASY (14)          ║
  // ╚══════════════════════════════════════╝

  "largest-element-in-array": {
    id: "largest-element-in-array",
    title: "Largest Element in Array",
    difficulty: "Easy",
    category: "Array",
    description: {
      text: "Given an array arr[], find the largest element in it.",
      notes: [],
    },
    examples: [
      { input: "arr = [3,2,1,5,6,4]", output: "6" },
      { input: "arr = [1]", output: "1" },
    ],
    constraints: ["1 ≤ arr.length ≤ 10⁵", "0 ≤ arr[i] ≤ 10⁹"],
    starterCode: {
      javascript: `function largestElement(arr) {
  // Write your solution here
  
}

// Test cases
console.log(largestElement([3,2,1,5,6,4])); // Expected: 6
console.log(largestElement([1]));            // Expected: 1`,
      python: `def largestElement(arr):
    # Write your solution here
    pass

# Test cases
print(largestElement([3,2,1,5,6,4]))  # Expected: 6
print(largestElement([1]))             # Expected: 1`,
      java: `class Solution {
    public static int largestElement(int[] arr) {
        // Write your solution here
        return 0;
    }
    public static void main(String[] args) {
        System.out.println(largestElement(new int[]{3,2,1,5,6,4})); // Expected: 6
        System.out.println(largestElement(new int[]{1}));            // Expected: 1
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int largestElement(vector<int>& arr) {
    // Write your solution here
    return 0;
}

int main() {
    vector<int> a1 = {3,2,1,5,6,4};
    cout << largestElement(a1) << endl; // Expected: 6
    vector<int> a2 = {1};
    cout << largestElement(a2) << endl; // Expected: 1
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "6\n1",
      python: "6\n1",
      java: "6\n1",
      cpp: "6\n1",
    },
  },

  "second-largest-element": {
    id: "second-largest-element",
    title: "Second Largest Element Without Sorting",
    difficulty: "Easy",
    category: "Array",
    description: {
      text: "Given an array of positive integers arr[], return the second largest distinct element. If it doesn't exist, return -1.",
      notes: ["Solve in a single pass O(n) without sorting."],
    },
    examples: [
      { input: "arr = [12,35,1,10,34,1]", output: "34" },
      { input: "arr = [10,10]", output: "-1" },
    ],
    constraints: ["2 ≤ arr.length ≤ 10⁵", "1 ≤ arr[i] ≤ 10⁵"],
    starterCode: {
      javascript: `function secondLargest(arr) {
  // Write your solution here
  
}

// Test cases
console.log(secondLargest([12,35,1,10,34,1])); // Expected: 34
console.log(secondLargest([10,10]));            // Expected: -1`,
      python: `def secondLargest(arr):
    # Write your solution here
    pass

# Test cases
print(secondLargest([12,35,1,10,34,1]))  # Expected: 34
print(secondLargest([10,10]))             # Expected: -1`,
      java: `class Solution {
    public static int secondLargest(int[] arr) {
        // Write your solution here
        return -1;
    }
    public static void main(String[] args) {
        System.out.println(secondLargest(new int[]{12,35,1,10,34,1})); // Expected: 34
        System.out.println(secondLargest(new int[]{10,10}));            // Expected: -1
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int secondLargest(vector<int>& arr) {
    // Write your solution here
    return -1;
}

int main() {
    vector<int> a1 = {12,35,1,10,34,1};
    cout << secondLargest(a1) << endl; // Expected: 34
    vector<int> a2 = {10,10};
    cout << secondLargest(a2) << endl; // Expected: -1
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "34\n-1",
      python: "34\n-1",
      java: "34\n-1",
      cpp: "34\n-1",
    },
  },

  "check-if-array-is-sorted": {
    id: "check-if-array-is-sorted",
    title: "Check if Array Is Sorted and Rotated",
    difficulty: "Easy",
    category: "Array",
    description: {
      text: "Given an array nums, return true if the array was originally sorted in non-decreasing order, then rotated some number of positions (including zero). Otherwise, return false.",
      notes: ["There may be duplicates in the original array."],
    },
    examples: [
      { input: "nums = [3,4,5,1,2]", output: "true", explanation: "[1,2,3,4,5] rotated 3 times." },
      { input: "nums = [2,1,3,4]", output: "false" },
      { input: "nums = [1,2,3]", output: "true" },
    ],
    constraints: ["1 ≤ nums.length ≤ 100", "1 ≤ nums[i] ≤ 100"],
    starterCode: {
      javascript: `function check(nums) {
  // Write your solution here
  
}

// Test cases
console.log(check([3,4,5,1,2])); // Expected: true
console.log(check([2,1,3,4]));   // Expected: false
console.log(check([1,2,3]));     // Expected: true`,
      python: `def check(nums):
    # Write your solution here
    pass

# Test cases
print(check([3,4,5,1,2]))  # Expected: True
print(check([2,1,3,4]))    # Expected: False
print(check([1,2,3]))      # Expected: True`,
      java: `class Solution {
    public static boolean check(int[] nums) {
        // Write your solution here
        return false;
    }
    public static void main(String[] args) {
        System.out.println(check(new int[]{3,4,5,1,2})); // Expected: true
        System.out.println(check(new int[]{2,1,3,4}));   // Expected: false
        System.out.println(check(new int[]{1,2,3}));     // Expected: true
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

bool check(vector<int>& nums) {
    // Write your solution here
    return false;
}

int main() {
    cout << boolalpha;
    vector<int> a1={3,4,5,1,2}, a2={2,1,3,4}, a3={1,2,3};
    cout << check(a1) << endl; // Expected: true
    cout << check(a2) << endl; // Expected: false
    cout << check(a3) << endl; // Expected: true
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "true\nfalse\ntrue",
      python: "True\nFalse\nTrue",
      java: "true\nfalse\ntrue",
      cpp: "true\nfalse\ntrue",
    },
  },

  "remove-duplicates-from-sorted-array": {
    id: "remove-duplicates-from-sorted-array",
    title: "Remove Duplicates from Sorted Array",
    difficulty: "Easy",
    category: "Array • Two Pointers",
    description: {
      text: "Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Return the number of unique elements k.",
      notes: ["Modify the input array in-place with O(1) extra memory."],
    },
    examples: [
      { input: "nums = [1,1,2]", output: "2, nums = [1,2,_]" },
      { input: "nums = [0,0,1,1,1,2,2,3,3,4]", output: "5, nums = [0,1,2,3,4,_,_,_,_,_]" },
    ],
    constraints: [
      "1 ≤ nums.length ≤ 3 * 10⁴",
      "-100 ≤ nums[i] ≤ 100",
      "nums is sorted in non-decreasing order",
    ],
    starterCode: {
      javascript: `function removeDuplicates(nums) {
  // Write your solution here
  
}

// Test cases
let a1 = [1,1,2];
console.log(removeDuplicates(a1)); // Expected: 2

let a2 = [0,0,1,1,1,2,2,3,3,4];
console.log(removeDuplicates(a2)); // Expected: 5`,
      python: `def removeDuplicates(nums):
    # Write your solution here
    pass

# Test cases
a1 = [1,1,2]
print(removeDuplicates(a1))  # Expected: 2

a2 = [0,0,1,1,1,2,2,3,3,4]
print(removeDuplicates(a2))  # Expected: 5`,
      java: `class Solution {
    public static int removeDuplicates(int[] nums) {
        // Write your solution here
        return 0;
    }
    public static void main(String[] args) {
        System.out.println(removeDuplicates(new int[]{1,1,2}));               // Expected: 2
        System.out.println(removeDuplicates(new int[]{0,0,1,1,1,2,2,3,3,4})); // Expected: 5
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int removeDuplicates(vector<int>& nums) {
    // Write your solution here
    return 0;
}

int main() {
    vector<int> a1 = {1,1,2};
    cout << removeDuplicates(a1) << endl; // Expected: 2
    vector<int> a2 = {0,0,1,1,1,2,2,3,3,4};
    cout << removeDuplicates(a2) << endl; // Expected: 5
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "2\n5",
      python: "2\n5",
      java: "2\n5",
      cpp: "2\n5",
    },
  },

  "left-rotate-array-by-one": {
    id: "left-rotate-array-by-one",
    title: "Left Rotate an Array by One",
    difficulty: "Easy",
    category: "Array",
    description: {
      text: "Given an array nums, rotate the array to the left by one position.",
      notes: [],
    },
    examples: [
      { input: "nums = [1,2,3,4,5]", output: "[2,3,4,5,1]" },
      { input: "nums = [3]", output: "[3]" },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "0 ≤ nums[i] ≤ 10⁹"],
    starterCode: {
      javascript: `function rotateLeftByOne(nums) {
  // Write your solution here
  
}

// Test cases
console.log(rotateLeftByOne([1,2,3,4,5])); // Expected: [2,3,4,5,1]
console.log(rotateLeftByOne([3]));          // Expected: [3]`,
      python: `def rotateLeftByOne(nums):
    # Write your solution here
    pass

# Test cases
print(rotateLeftByOne([1,2,3,4,5]))  # Expected: [2, 3, 4, 5, 1]
print(rotateLeftByOne([3]))           # Expected: [3]`,
      java: `import java.util.*;
class Solution {
    public static int[] rotateLeftByOne(int[] nums) {
        // Write your solution here
        return nums;
    }
    public static void main(String[] args) {
        System.out.println(Arrays.toString(rotateLeftByOne(new int[]{1,2,3,4,5}))); // [2, 3, 4, 5, 1]
        System.out.println(Arrays.toString(rotateLeftByOne(new int[]{3})));          // [3]
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

vector<int> rotateLeftByOne(vector<int> nums) {
    // Write your solution here
    return nums;
}

int main() {
    vector<int> r1 = rotateLeftByOne({1,2,3,4,5});
    for(int x : r1) cout << x << " "; cout << endl; // 2 3 4 5 1
    vector<int> r2 = rotateLeftByOne({3});
    for(int x : r2) cout << x << " "; cout << endl; // 3
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[2,3,4,5,1]\n[3]",
      python: "[2, 3, 4, 5, 1]\n[3]",
      java: "[2, 3, 4, 5, 1]\n[3]",
      cpp: "2 3 4 5 1 \n3 ",
    },
  },

  "rotate-array": {
    id: "rotate-array",
    title: "Rotate Array",
    difficulty: "Medium",
    category: "Array • Math",
    description: {
      text: "Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.",
      notes: [],
    },
    examples: [
      { input: "nums = [1,2,3,4,5,6,7], k = 3", output: "[5,6,7,1,2,3,4]" },
      { input: "nums = [-1,-100,3,99], k = 2", output: "[3,99,-1,-100]" },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-2³¹ ≤ nums[i] ≤ 2³¹-1", "0 ≤ k ≤ 10⁵"],
    starterCode: {
      javascript: `function rotate(nums, k) {
  // Write your solution here
  
}

// Test cases
let a1 = [1,2,3,4,5,6,7];
rotate(a1, 3);
console.log(a1); // Expected: [5,6,7,1,2,3,4]

let a2 = [-1,-100,3,99];
rotate(a2, 2);
console.log(a2); // Expected: [3,99,-1,-100]`,
      python: `def rotate(nums, k):
    # Write your solution here
    pass

# Test cases
a1 = [1,2,3,4,5,6,7]
rotate(a1, 3)
print(a1)  # Expected: [5, 6, 7, 1, 2, 3, 4]

a2 = [-1,-100,3,99]
rotate(a2, 2)
print(a2)  # Expected: [3, 99, -1, -100]`,
      java: `import java.util.*;
class Solution {
    public static void rotate(int[] nums, int k) {
        // Write your solution here
    }
    public static void main(String[] args) {
        int[] a1 = {1,2,3,4,5,6,7};
        rotate(a1, 3);
        System.out.println(Arrays.toString(a1)); // [5, 6, 7, 1, 2, 3, 4]

        int[] a2 = {-1,-100,3,99};
        rotate(a2, 2);
        System.out.println(Arrays.toString(a2)); // [3, 99, -1, -100]
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void rotate(vector<int>& nums, int k) {
    // Write your solution here
}

int main() {
    vector<int> a1 = {1,2,3,4,5,6,7};
    rotate(a1, 3);
    for(int x : a1) cout << x << " "; cout << endl; // 5 6 7 1 2 3 4

    vector<int> a2 = {-1,-100,3,99};
    rotate(a2, 2);
    for(int x : a2) cout << x << " "; cout << endl; // 3 99 -1 -100
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[5,6,7,1,2,3,4]\n[3,99,-1,-100]",
      python: "[5, 6, 7, 1, 2, 3, 4]\n[3, 99, -1, -100]",
      java: "[5, 6, 7, 1, 2, 3, 4]\n[3, 99, -1, -100]",
      cpp: "5 6 7 1 2 3 4 \n3 99 -1 -100 ",
    },
  },

  "move-zeroes": {
    id: "move-zeroes",
    title: "Move Zeroes",
    difficulty: "Easy",
    category: "Array • Two Pointers",
    description: {
      text: "Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.",
      notes: ["You must do this in-place without making a copy of the array."],
    },
    examples: [
      { input: "nums = [0,1,0,3,12]", output: "[1,3,12,0,0]" },
      { input: "nums = [0]", output: "[0]" },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁴", "-2³¹ ≤ nums[i] ≤ 2³¹-1"],
    starterCode: {
      javascript: `function moveZeroes(nums) {
  // Write your solution here
  
}

// Test cases
let a1 = [0,1,0,3,12];
moveZeroes(a1);
console.log(a1); // Expected: [1,3,12,0,0]

let a2 = [0];
moveZeroes(a2);
console.log(a2); // Expected: [0]`,
      python: `def moveZeroes(nums):
    # Write your solution here
    pass

# Test cases
a1 = [0,1,0,3,12]
moveZeroes(a1)
print(a1)  # Expected: [1, 3, 12, 0, 0]

a2 = [0]
moveZeroes(a2)
print(a2)  # Expected: [0]`,
      java: `import java.util.*;
class Solution {
    public static void moveZeroes(int[] nums) {
        // Write your solution here
    }
    public static void main(String[] args) {
        int[] a1 = {0,1,0,3,12};
        moveZeroes(a1);
        System.out.println(Arrays.toString(a1)); // [1, 3, 12, 0, 0]

        int[] a2 = {0};
        moveZeroes(a2);
        System.out.println(Arrays.toString(a2)); // [0]
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void moveZeroes(vector<int>& nums) {
    // Write your solution here
}

int main() {
    vector<int> a1 = {0,1,0,3,12};
    moveZeroes(a1);
    for(int x : a1) cout << x << " "; cout << endl; // 1 3 12 0 0

    vector<int> a2 = {0};
    moveZeroes(a2);
    for(int x : a2) cout << x << " "; cout << endl; // 0
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[1,3,12,0,0]\n[0]",
      python: "[1, 3, 12, 0, 0]\n[0]",
      java: "[1, 3, 12, 0, 0]\n[0]",
      cpp: "1 3 12 0 0 \n0 ",
    },
  },

  "linear-search": {
    id: "linear-search",
    title: "Linear Search",
    difficulty: "Easy",
    category: "Array",
    description: {
      text: "Given an array nums and a target value, return the index of the first occurrence of target. If the target is not found, return -1.",
      notes: [],
    },
    examples: [
      { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" },
      { input: "nums = [1,2,3], target = 5", output: "-1" },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁴", "-10⁴ ≤ nums[i], target ≤ 10⁴"],
    starterCode: {
      javascript: `function linearSearch(nums, target) {
  // Write your solution here
  
}

// Test cases
console.log(linearSearch([4,5,6,7,0,1,2], 0)); // Expected: 4
console.log(linearSearch([1,2,3], 5));           // Expected: -1`,
      python: `def linearSearch(nums, target):
    # Write your solution here
    pass

# Test cases
print(linearSearch([4,5,6,7,0,1,2], 0))  # Expected: 4
print(linearSearch([1,2,3], 5))           # Expected: -1`,
      java: `class Solution {
    public static int linearSearch(int[] nums, int target) {
        // Write your solution here
        return -1;
    }
    public static void main(String[] args) {
        System.out.println(linearSearch(new int[]{4,5,6,7,0,1,2}, 0)); // Expected: 4
        System.out.println(linearSearch(new int[]{1,2,3}, 5));          // Expected: -1
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int linearSearch(vector<int>& nums, int target) {
    // Write your solution here
    return -1;
}

int main() {
    vector<int> a1 = {4,5,6,7,0,1,2};
    cout << linearSearch(a1, 0) << endl; // Expected: 4
    vector<int> a2 = {1,2,3};
    cout << linearSearch(a2, 5) << endl; // Expected: -1
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "4\n-1",
      python: "4\n-1",
      java: "4\n-1",
      cpp: "4\n-1",
    },
  },

  "union-of-two-sorted-arrays": {
    id: "union-of-two-sorted-arrays",
    title: "Union of Two Sorted Arrays",
    difficulty: "Easy",
    category: "Array • Two Pointers",
    description: {
      text: "Given two sorted arrays a[] and b[], return their union — a sorted array of all unique elements present in either array.",
      notes: [],
    },
    examples: [
      { input: "a = [1,2,3,4,5], b = [1,2,3,6,7]", output: "[1,2,3,4,5,6,7]" },
      { input: "a = [2,2,3,4,5], b = [1,1,2,3,4]", output: "[1,2,3,4,5]" },
    ],
    constraints: ["1 ≤ a.length, b.length ≤ 10⁵", "-10⁹ ≤ a[i], b[i] ≤ 10⁹"],
    starterCode: {
      javascript: `function findUnion(a, b) {
  // Write your solution here
  
}

// Test cases
console.log(findUnion([1,2,3,4,5], [1,2,3,6,7])); // Expected: [1,2,3,4,5,6,7]
console.log(findUnion([2,2,3,4,5], [1,1,2,3,4])); // Expected: [1,2,3,4,5]`,
      python: `def findUnion(a, b):
    # Write your solution here
    pass

# Test cases
print(findUnion([1,2,3,4,5], [1,2,3,6,7]))  # Expected: [1, 2, 3, 4, 5, 6, 7]
print(findUnion([2,2,3,4,5], [1,1,2,3,4]))  # Expected: [1, 2, 3, 4, 5]`,
      java: `import java.util.*;
class Solution {
    public static List<Integer> findUnion(int[] a, int[] b) {
        // Write your solution here
        return new ArrayList<>();
    }
    public static void main(String[] args) {
        System.out.println(findUnion(new int[]{1,2,3,4,5}, new int[]{1,2,3,6,7})); // [1, 2, 3, 4, 5, 6, 7]
        System.out.println(findUnion(new int[]{2,2,3,4,5}, new int[]{1,1,2,3,4})); // [1, 2, 3, 4, 5]
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

vector<int> findUnion(vector<int>& a, vector<int>& b) {
    // Write your solution here
    return {};
}

int main() {
    vector<int> a1={1,2,3,4,5}, b1={1,2,3,6,7};
    for(int x : findUnion(a1,b1)) cout << x << " "; cout << endl; // 1 2 3 4 5 6 7
    vector<int> a2={2,2,3,4,5}, b2={1,1,2,3,4};
    for(int x : findUnion(a2,b2)) cout << x << " "; cout << endl; // 1 2 3 4 5
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[1,2,3,4,5,6,7]\n[1,2,3,4,5]",
      python: "[1, 2, 3, 4, 5, 6, 7]\n[1, 2, 3, 4, 5]",
      java: "[1, 2, 3, 4, 5, 6, 7]\n[1, 2, 3, 4, 5]",
      cpp: "1 2 3 4 5 6 7 \n1 2 3 4 5 ",
    },
  },

  "missing-number": {
    id: "missing-number",
    title: "Missing Number",
    difficulty: "Easy",
    category: "Array • Math • Bit Manipulation",
    description: {
      text: "Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.",
      notes: [],
    },
    examples: [
      { input: "nums = [3,0,1]", output: "2" },
      { input: "nums = [0,1]", output: "2" },
      { input: "nums = [9,6,4,2,3,5,7,0,1]", output: "8" },
    ],
    constraints: ["n == nums.length", "1 ≤ n ≤ 10⁴", "0 ≤ nums[i] ≤ n", "All numbers are unique"],
    starterCode: {
      javascript: `function missingNumber(nums) {
  // Write your solution here
  
}

// Test cases
console.log(missingNumber([3,0,1]));              // Expected: 2
console.log(missingNumber([0,1]));                // Expected: 2
console.log(missingNumber([9,6,4,2,3,5,7,0,1])); // Expected: 8`,
      python: `def missingNumber(nums):
    # Write your solution here
    pass

# Test cases
print(missingNumber([3,0,1]))              # Expected: 2
print(missingNumber([0,1]))                # Expected: 2
print(missingNumber([9,6,4,2,3,5,7,0,1])) # Expected: 8`,
      java: `class Solution {
    public static int missingNumber(int[] nums) {
        // Write your solution here
        return 0;
    }
    public static void main(String[] args) {
        System.out.println(missingNumber(new int[]{3,0,1}));              // 2
        System.out.println(missingNumber(new int[]{0,1}));                // 2
        System.out.println(missingNumber(new int[]{9,6,4,2,3,5,7,0,1})); // 8
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int missingNumber(vector<int>& nums) {
    // Write your solution here
    return 0;
}

int main() {
    vector<int> a1={3,0,1};
    cout << missingNumber(a1) << endl; // 2
    vector<int> a2={0,1};
    cout << missingNumber(a2) << endl; // 2
    vector<int> a3={9,6,4,2,3,5,7,0,1};
    cout << missingNumber(a3) << endl; // 8
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "2\n2\n8",
      python: "2\n2\n8",
      java: "2\n2\n8",
      cpp: "2\n2\n8",
    },
  },

  "max-consecutive-ones": {
    id: "max-consecutive-ones",
    title: "Max Consecutive Ones",
    difficulty: "Easy",
    category: "Array",
    description: {
      text: "Given a binary array nums, return the maximum number of consecutive 1's in the array.",
      notes: [],
    },
    examples: [
      { input: "nums = [1,1,0,1,1,1]", output: "3" },
      { input: "nums = [1,0,1,1,0,1]", output: "2" },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "nums[i] is either 0 or 1"],
    starterCode: {
      javascript: `function findMaxConsecutiveOnes(nums) {
  // Write your solution here
  
}

// Test cases
console.log(findMaxConsecutiveOnes([1,1,0,1,1,1])); // Expected: 3
console.log(findMaxConsecutiveOnes([1,0,1,1,0,1])); // Expected: 2`,
      python: `def findMaxConsecutiveOnes(nums):
    # Write your solution here
    pass

# Test cases
print(findMaxConsecutiveOnes([1,1,0,1,1,1]))  # Expected: 3
print(findMaxConsecutiveOnes([1,0,1,1,0,1]))  # Expected: 2`,
      java: `class Solution {
    public static int findMaxConsecutiveOnes(int[] nums) {
        // Write your solution here
        return 0;
    }
    public static void main(String[] args) {
        System.out.println(findMaxConsecutiveOnes(new int[]{1,1,0,1,1,1})); // 3
        System.out.println(findMaxConsecutiveOnes(new int[]{1,0,1,1,0,1})); // 2
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int findMaxConsecutiveOnes(vector<int>& nums) {
    // Write your solution here
    return 0;
}

int main() {
    vector<int> a1={1,1,0,1,1,1};
    cout << findMaxConsecutiveOnes(a1) << endl; // 3
    vector<int> a2={1,0,1,1,0,1};
    cout << findMaxConsecutiveOnes(a2) << endl; // 2
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "3\n2",
      python: "3\n2",
      java: "3\n2",
      cpp: "3\n2",
    },
  },

  "single-number": {
    id: "single-number",
    title: "Single Number",
    difficulty: "Easy",
    category: "Array • Bit Manipulation",
    description: {
      text: "Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.",
      notes: [
        "You must implement a solution with linear runtime complexity and use only constant extra space.",
      ],
    },
    examples: [
      { input: "nums = [2,2,1]", output: "1" },
      { input: "nums = [4,1,2,1,2]", output: "4" },
      { input: "nums = [1]", output: "1" },
    ],
    constraints: [
      "1 ≤ nums.length ≤ 3 * 10⁴",
      "-3 * 10⁴ ≤ nums[i] ≤ 3 * 10⁴",
      "Each element appears twice except for one",
    ],
    starterCode: {
      javascript: `function singleNumber(nums) {
  // Write your solution here
  
}

// Test cases
console.log(singleNumber([2,2,1]));       // Expected: 1
console.log(singleNumber([4,1,2,1,2]));   // Expected: 4
console.log(singleNumber([1]));           // Expected: 1`,
      python: `def singleNumber(nums):
    # Write your solution here
    pass

# Test cases
print(singleNumber([2,2,1]))      # Expected: 1
print(singleNumber([4,1,2,1,2]))  # Expected: 4
print(singleNumber([1]))          # Expected: 1`,
      java: `class Solution {
    public static int singleNumber(int[] nums) {
        // Write your solution here
        return 0;
    }
    public static void main(String[] args) {
        System.out.println(singleNumber(new int[]{2,2,1}));     // 1
        System.out.println(singleNumber(new int[]{4,1,2,1,2})); // 4
        System.out.println(singleNumber(new int[]{1}));         // 1
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int singleNumber(vector<int>& nums) {
    // Write your solution here
    return 0;
}

int main() {
    vector<int> a1={2,2,1}, a2={4,1,2,1,2}, a3={1};
    cout << singleNumber(a1) << endl; // 1
    cout << singleNumber(a2) << endl; // 4
    cout << singleNumber(a3) << endl; // 1
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "1\n4\n1",
      python: "1\n4\n1",
      java: "1\n4\n1",
      cpp: "1\n4\n1",
    },
  },

  "longest-subarray-with-sum-k": {
    id: "longest-subarray-with-sum-k",
    title: "Longest Subarray with Sum K",
    difficulty: "Easy",
    category: "Array • Hash Table • Prefix Sum",
    description: {
      text: "Given an array nums and an integer k, find the length of the longest subarray whose sum equals k.",
      notes: ["The array may contain both positive, negative numbers, and zeros."],
    },
    examples: [
      {
        input: "nums = [1,2,3,1,1,1,1], k = 3",
        output: "4",
        explanation:
          "Subarray [1,1,1] of length 3 sums to 3, but [2,3,1,1] doesn't. The longest is [1,2] or [3] or [1,1,1] — answer is 3... but [1,1,1,1] length 4 sums to 4, not 3. The longest subarray summing to 3 is [1,2] or [3] of length 2.",
      },
      {
        input: "nums = [1,-1,5,-2,3], k = 3",
        output: "4",
        explanation: "Subarray [1,-1,5,-2] has sum 3 and length 4.",
      },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴", "-10⁹ ≤ k ≤ 10⁹"],
    starterCode: {
      javascript: `function lenOfLongestSubarr(nums, k) {
  // Write your solution here
  
}

// Test cases
console.log(lenOfLongestSubarr([1,2,3,1,1,1,1], 3)); // Expected: 3
console.log(lenOfLongestSubarr([1,-1,5,-2,3], 3));    // Expected: 4`,
      python: `def lenOfLongestSubarr(nums, k):
    # Write your solution here
    pass

# Test cases
print(lenOfLongestSubarr([1,2,3,1,1,1,1], 3))  # Expected: 3
print(lenOfLongestSubarr([1,-1,5,-2,3], 3))     # Expected: 4`,
      java: `class Solution {
    public static int lenOfLongestSubarr(int[] nums, int k) {
        // Write your solution here
        return 0;
    }
    public static void main(String[] args) {
        System.out.println(lenOfLongestSubarr(new int[]{1,2,3,1,1,1,1}, 3)); // 3
        System.out.println(lenOfLongestSubarr(new int[]{1,-1,5,-2,3}, 3));    // 4
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int lenOfLongestSubarr(vector<int>& nums, int k) {
    // Write your solution here
    return 0;
}

int main() {
    vector<int> a1={1,2,3,1,1,1,1};
    cout << lenOfLongestSubarr(a1, 3) << endl; // 3
    vector<int> a2={1,-1,5,-2,3};
    cout << lenOfLongestSubarr(a2, 3) << endl; // 4
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "3\n4",
      python: "3\n4",
      java: "3\n4",
      cpp: "3\n4",
    },
  },

  // ╔══════════════════════════════════════╗
  // ║       ARRAYS  –  MEDIUM (14)         ║
  // ╚══════════════════════════════════════╝

  "two-sum": {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array • Hash Table",
    description: {
      text: "Given an array of integers nums and an integer target, return indices of the two numbers in the array such that they add up to target.",
      notes: [
        "You may assume that each input would have exactly one solution, and you may not use the same element twice.",
        "You can return the answer in any order.",
      ],
    },
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
      { input: "nums = [3,3], target = 6", output: "[0,1]" },
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists",
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
  // Write your solution here
  
}

// Test cases
console.log(twoSum([2, 7, 11, 15], 9)); // Expected: [0, 1]
console.log(twoSum([3, 2, 4], 6));      // Expected: [1, 2]
console.log(twoSum([3, 3], 6));         // Expected: [0, 1]`,
      python: `def twoSum(nums, target):
    # Write your solution here
    pass

# Test cases
print(twoSum([2, 7, 11, 15], 9))  # Expected: [0, 1]
print(twoSum([3, 2, 4], 6))       # Expected: [1, 2]
print(twoSum([3, 3], 6))          # Expected: [0, 1]`,
      java: `import java.util.*;

class Solution {
    public static int[] twoSum(int[] nums, int target) {
        // Write your solution here
        return new int[0];
    }
    
    public static void main(String[] args) {
        System.out.println(Arrays.toString(twoSum(new int[]{2, 7, 11, 15}, 9))); // Expected: [0, 1]
        System.out.println(Arrays.toString(twoSum(new int[]{3, 2, 4}, 6)));      // Expected: [1, 2]
        System.out.println(Arrays.toString(twoSum(new int[]{3, 3}, 6)));         // Expected: [0, 1]
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // Write your solution here
    return {};
}

int main() {
    vector<int> n1={2,7,11,15}; auto r1=twoSum(n1,9);
    cout<<"["<<r1[0]<<","<<r1[1]<<"]"<<endl; // [0,1]
    vector<int> n2={3,2,4}; auto r2=twoSum(n2,6);
    cout<<"["<<r2[0]<<","<<r2[1]<<"]"<<endl; // [1,2]
    vector<int> n3={3,3}; auto r3=twoSum(n3,6);
    cout<<"["<<r3[0]<<","<<r3[1]<<"]"<<endl; // [0,1]
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[0,1]\n[1,2]\n[0,1]",
      python: "[0, 1]\n[1, 2]\n[0, 1]",
      java: "[0, 1]\n[1, 2]\n[0, 1]",
      cpp: "[0,1]\n[1,2]\n[0,1]",
    },
  },

  "sort-colors": {
    id: "sort-colors",
    title: "Sort Colors (Dutch National Flag)",
    difficulty: "Medium",
    category: "Array • Two Pointers • Sorting",
    description: {
      text: "Given an array nums with n objects colored red (0), white (1), or blue (2), sort them in-place so that objects of the same color are adjacent, in the order red, white, and blue.",
      notes: ["You must solve this without using the library's sort function."],
    },
    examples: [
      { input: "nums = [2,0,2,1,1,0]", output: "[0,0,1,1,2,2]" },
      { input: "nums = [2,0,1]", output: "[0,1,2]" },
    ],
    constraints: ["n == nums.length", "1 ≤ n ≤ 300", "nums[i] is 0, 1, or 2"],
    starterCode: {
      javascript: `function sortColors(nums) {
  // Write your solution here
  
}

// Test cases
let a1 = [2,0,2,1,1,0];
sortColors(a1);
console.log(a1); // Expected: [0,0,1,1,2,2]

let a2 = [2,0,1];
sortColors(a2);
console.log(a2); // Expected: [0,1,2]`,
      python: `def sortColors(nums):
    # Write your solution here
    pass

# Test cases
a1 = [2,0,2,1,1,0]
sortColors(a1)
print(a1)  # Expected: [0, 0, 1, 1, 2, 2]

a2 = [2,0,1]
sortColors(a2)
print(a2)  # Expected: [0, 1, 2]`,
      java: `import java.util.*;
class Solution {
    public static void sortColors(int[] nums) {
        // Write your solution here
    }
    public static void main(String[] args) {
        int[] a1 = {2,0,2,1,1,0};
        sortColors(a1);
        System.out.println(Arrays.toString(a1)); // [0, 0, 1, 1, 2, 2]

        int[] a2 = {2,0,1};
        sortColors(a2);
        System.out.println(Arrays.toString(a2)); // [0, 1, 2]
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void sortColors(vector<int>& nums) {
    // Write your solution here
}

int main() {
    vector<int> a1={2,0,2,1,1,0};
    sortColors(a1);
    for(int x:a1) cout<<x<<" "; cout<<endl; // 0 0 1 1 2 2

    vector<int> a2={2,0,1};
    sortColors(a2);
    for(int x:a2) cout<<x<<" "; cout<<endl; // 0 1 2
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[0,0,1,1,2,2]\n[0,1,2]",
      python: "[0, 0, 1, 1, 2, 2]\n[0, 1, 2]",
      java: "[0, 0, 1, 1, 2, 2]\n[0, 1, 2]",
      cpp: "0 0 1 1 2 2 \n0 1 2 ",
    },
  },

  "majority-element": {
    id: "majority-element",
    title: "Majority Element",
    difficulty: "Easy",
    category: "Array • Hash Table • Divide and Conquer",
    description: {
      text: "Given an array nums of size n, return the majority element. The majority element is the element that appears more than ⌊n / 2⌋ times.",
      notes: ["You may assume that the majority element always exists in the array."],
    },
    examples: [
      { input: "nums = [3,2,3]", output: "3" },
      { input: "nums = [2,2,1,1,1,2,2]", output: "2" },
    ],
    constraints: ["n == nums.length", "1 ≤ n ≤ 5 * 10⁴", "-10⁹ ≤ nums[i] ≤ 10⁹"],
    starterCode: {
      javascript: `function majorityElement(nums) {
  // Write your solution here
  
}

// Test cases
console.log(majorityElement([3,2,3]));         // Expected: 3
console.log(majorityElement([2,2,1,1,1,2,2])); // Expected: 2`,
      python: `def majorityElement(nums):
    # Write your solution here
    pass

# Test cases
print(majorityElement([3,2,3]))          # Expected: 3
print(majorityElement([2,2,1,1,1,2,2]))  # Expected: 2`,
      java: `class Solution {
    public static int majorityElement(int[] nums) {
        // Write your solution here
        return 0;
    }
    public static void main(String[] args) {
        System.out.println(majorityElement(new int[]{3,2,3}));         // 3
        System.out.println(majorityElement(new int[]{2,2,1,1,1,2,2})); // 2
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int majorityElement(vector<int>& nums) {
    // Write your solution here
    return 0;
}

int main() {
    vector<int> a1={3,2,3}, a2={2,2,1,1,1,2,2};
    cout << majorityElement(a1) << endl; // 3
    cout << majorityElement(a2) << endl; // 2
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "3\n2",
      python: "3\n2",
      java: "3\n2",
      cpp: "3\n2",
    },
  },

  "maximum-subarray": {
    id: "maximum-subarray",
    title: "Maximum Subarray (Kadane's Algorithm)",
    difficulty: "Medium",
    category: "Array • Dynamic Programming",
    description: {
      text: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
      notes: [],
    },
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6.",
      },
      { input: "nums = [1]", output: "1" },
      { input: "nums = [5,4,-1,7,8]", output: "23" },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"],
    starterCode: {
      javascript: `function maxSubArray(nums) {
  // Write your solution here
  
}

// Test cases
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // Expected: 6
console.log(maxSubArray([1]));                       // Expected: 1
console.log(maxSubArray([5,4,-1,7,8]));              // Expected: 23`,
      python: `def maxSubArray(nums):
    # Write your solution here
    pass

# Test cases
print(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))  # Expected: 6
print(maxSubArray([1]))                        # Expected: 1
print(maxSubArray([5,4,-1,7,8]))               # Expected: 23`,
      java: `class Solution {
    public static int maxSubArray(int[] nums) {
        // Write your solution here
        return 0;
    }
    public static void main(String[] args) {
        System.out.println(maxSubArray(new int[]{-2,1,-3,4,-1,2,1,-5,4})); // 6
        System.out.println(maxSubArray(new int[]{1}));                       // 1
        System.out.println(maxSubArray(new int[]{5,4,-1,7,8}));              // 23
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <climits>
using namespace std;

int maxSubArray(vector<int>& nums) {
    // Write your solution here
    return 0;
}

int main() {
    vector<int> n1={-2,1,-3,4,-1,2,1,-5,4};
    cout << maxSubArray(n1) << endl; // 6
    vector<int> n2={1};
    cout << maxSubArray(n2) << endl; // 1
    vector<int> n3={5,4,-1,7,8};
    cout << maxSubArray(n3) << endl; // 23
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "6\n1\n23",
      python: "6\n1\n23",
      java: "6\n1\n23",
      cpp: "6\n1\n23",
    },
  },

  "maximum-product-subarray": {
    id: "maximum-product-subarray",
    title: "Maximum Product Subarray",
    difficulty: "Medium",
    category: "Array • Dynamic Programming",
    description: {
      text: "Given an integer array nums, find a subarray that has the largest product, and return the product.",
      notes: [],
    },
    examples: [
      { input: "nums = [2,3,-2,4]", output: "6", explanation: "[2,3] has the largest product 6." },
      {
        input: "nums = [-2,0,-1]",
        output: "0",
        explanation: "The result cannot be 2, because [-2,-1] is not a subarray.",
      },
    ],
    constraints: [
      "1 ≤ nums.length ≤ 2 * 10⁴",
      "-10 ≤ nums[i] ≤ 10",
      "The product of any subarray fits in a 32-bit integer",
    ],
    starterCode: {
      javascript: `function maxProduct(nums) {
  // Write your solution here
  
}

// Test cases
console.log(maxProduct([2,3,-2,4]));  // Expected: 6
console.log(maxProduct([-2,0,-1]));   // Expected: 0`,
      python: `def maxProduct(nums):
    # Write your solution here
    pass

# Test cases
print(maxProduct([2,3,-2,4]))   # Expected: 6
print(maxProduct([-2,0,-1]))    # Expected: 0`,
      java: `class Solution {
    public static int maxProduct(int[] nums) {
        // Write your solution here
        return 0;
    }
    public static void main(String[] args) {
        System.out.println(maxProduct(new int[]{2,3,-2,4}));  // 6
        System.out.println(maxProduct(new int[]{-2,0,-1}));   // 0
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int maxProduct(vector<int>& nums) {
    // Write your solution here
    return 0;
}

int main() {
    vector<int> a1={2,3,-2,4};
    cout << maxProduct(a1) << endl; // 6
    vector<int> a2={-2,0,-1};
    cout << maxProduct(a2) << endl; // 0
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "6\n0",
      python: "6\n0",
      java: "6\n0",
      cpp: "6\n0",
    },
  },

  "best-time-to-buy-and-sell-stock": {
    id: "best-time-to-buy-and-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    category: "Array • Dynamic Programming",
    description: {
      text: "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",
      notes: [],
    },
    examples: [
      {
        input: "prices = [7,1,5,3,6,4]",
        output: "5",
        explanation: "Buy on day 2 (price=1) and sell on day 5 (price=6), profit = 5.",
      },
      {
        input: "prices = [7,6,4,3,1]",
        output: "0",
        explanation: "Prices decrease, no profit possible.",
      },
    ],
    constraints: ["1 ≤ prices.length ≤ 10⁵", "0 ≤ prices[i] ≤ 10⁴"],
    starterCode: {
      javascript: `function maxProfit(prices) {
  // Write your solution here
  
}

// Test cases
console.log(maxProfit([7,1,5,3,6,4])); // Expected: 5
console.log(maxProfit([7,6,4,3,1]));   // Expected: 0`,
      python: `def maxProfit(prices):
    # Write your solution here
    pass

# Test cases
print(maxProfit([7,1,5,3,6,4]))  # Expected: 5
print(maxProfit([7,6,4,3,1]))    # Expected: 0`,
      java: `class Solution {
    public static int maxProfit(int[] prices) {
        // Write your solution here
        return 0;
    }
    public static void main(String[] args) {
        System.out.println(maxProfit(new int[]{7,1,5,3,6,4})); // 5
        System.out.println(maxProfit(new int[]{7,6,4,3,1}));   // 0
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int maxProfit(vector<int>& prices) {
    // Write your solution here
    return 0;
}

int main() {
    vector<int> p1={7,1,5,3,6,4};
    cout << maxProfit(p1) << endl; // 5
    vector<int> p2={7,6,4,3,1};
    cout << maxProfit(p2) << endl; // 0
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "5\n0",
      python: "5\n0",
      java: "5\n0",
      cpp: "5\n0",
    },
  },

  "rearrange-array-elements-by-sign": {
    id: "rearrange-array-elements-by-sign",
    title: "Rearrange Array Elements by Sign",
    difficulty: "Medium",
    category: "Array • Two Pointers",
    description: {
      text: "You are given a 0-indexed integer array nums of even length consisting of an equal number of positive and negative integers. Rearrange the elements so that every consecutive pair of integers have opposite signs. Positive integers should appear before negative ones at each pair index. The array should be rearranged such that element at position 2i (0-indexed) is a positive integer and element at position 2i+1 is a negative integer.",
      notes: [
        "The relative order of positive integers must be preserved.",
        "The relative order of negative integers must be preserved.",
      ],
    },
    examples: [
      { input: "nums = [3,1,-2,-5,2,-4]", output: "[3,-2,1,-5,2,-4]" },
      { input: "nums = [-1,1]", output: "[1,-1]" },
    ],
    constraints: [
      "2 ≤ nums.length ≤ 2 * 10⁵",
      "nums.length is even",
      "1 ≤ |nums[i]| ≤ 10⁵",
      "nums consists of equal number of positive and negative integers",
    ],
    starterCode: {
      javascript: `function rearrangeArray(nums) {
  // Write your solution here
  
}

// Test cases
console.log(rearrangeArray([3,1,-2,-5,2,-4])); // Expected: [3,-2,1,-5,2,-4]
console.log(rearrangeArray([-1,1]));            // Expected: [1,-1]`,
      python: `def rearrangeArray(nums):
    # Write your solution here
    pass

# Test cases
print(rearrangeArray([3,1,-2,-5,2,-4]))  # Expected: [3, -2, 1, -5, 2, -4]
print(rearrangeArray([-1,1]))             # Expected: [1, -1]`,
      java: `import java.util.*;
class Solution {
    public static int[] rearrangeArray(int[] nums) {
        // Write your solution here
        return nums;
    }
    public static void main(String[] args) {
        System.out.println(Arrays.toString(rearrangeArray(new int[]{3,1,-2,-5,2,-4}))); // [3, -2, 1, -5, 2, -4]
        System.out.println(Arrays.toString(rearrangeArray(new int[]{-1,1})));            // [1, -1]
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

vector<int> rearrangeArray(vector<int>& nums) {
    // Write your solution here
    return nums;
}

int main() {
    vector<int> a1={3,1,-2,-5,2,-4};
    auto r1 = rearrangeArray(a1);
    for(int x:r1) cout<<x<<" "; cout<<endl; // 3 -2 1 -5 2 -4

    vector<int> a2={-1,1};
    auto r2 = rearrangeArray(a2);
    for(int x:r2) cout<<x<<" "; cout<<endl; // 1 -1
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[3,-2,1,-5,2,-4]\n[1,-1]",
      python: "[3, -2, 1, -5, 2, -4]\n[1, -1]",
      java: "[3, -2, 1, -5, 2, -4]\n[1, -1]",
      cpp: "3 -2 1 -5 2 -4 \n1 -1 ",
    },
  },

  "next-permutation": {
    id: "next-permutation",
    title: "Next Permutation",
    difficulty: "Medium",
    category: "Array • Two Pointers",
    description: {
      text: "A permutation of an array of integers is an arrangement of its members into a sequence or linear order. The next permutation of an array of integers is the next lexicographically greater permutation. If no such arrangement is possible, it must be rearranged as the lowest possible order (sorted in ascending order). The replacement must be in place and use only constant extra memory.",
      notes: [],
    },
    examples: [
      { input: "nums = [1,2,3]", output: "[1,3,2]" },
      { input: "nums = [3,2,1]", output: "[1,2,3]" },
      { input: "nums = [1,1,5]", output: "[1,5,1]" },
    ],
    constraints: ["1 ≤ nums.length ≤ 100", "0 ≤ nums[i] ≤ 100"],
    starterCode: {
      javascript: `function nextPermutation(nums) {
  // Write your solution here
  
}

// Test cases
let a1 = [1,2,3];
nextPermutation(a1);
console.log(a1); // Expected: [1,3,2]

let a2 = [3,2,1];
nextPermutation(a2);
console.log(a2); // Expected: [1,2,3]

let a3 = [1,1,5];
nextPermutation(a3);
console.log(a3); // Expected: [1,5,1]`,
      python: `def nextPermutation(nums):
    # Write your solution here
    pass

# Test cases
a1 = [1,2,3]
nextPermutation(a1)
print(a1)  # Expected: [1, 3, 2]

a2 = [3,2,1]
nextPermutation(a2)
print(a2)  # Expected: [1, 2, 3]

a3 = [1,1,5]
nextPermutation(a3)
print(a3)  # Expected: [1, 5, 1]`,
      java: `import java.util.*;
class Solution {
    public static void nextPermutation(int[] nums) {
        // Write your solution here
    }
    public static void main(String[] args) {
        int[] a1={1,2,3}; nextPermutation(a1);
        System.out.println(Arrays.toString(a1)); // [1, 3, 2]

        int[] a2={3,2,1}; nextPermutation(a2);
        System.out.println(Arrays.toString(a2)); // [1, 2, 3]

        int[] a3={1,1,5}; nextPermutation(a3);
        System.out.println(Arrays.toString(a3)); // [1, 5, 1]
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void nextPermutation(vector<int>& nums) {
    // Write your solution here
}

int main() {
    vector<int> a1={1,2,3}; nextPermutation(a1);
    for(int x:a1) cout<<x<<" "; cout<<endl; // 1 3 2

    vector<int> a2={3,2,1}; nextPermutation(a2);
    for(int x:a2) cout<<x<<" "; cout<<endl; // 1 2 3

    vector<int> a3={1,1,5}; nextPermutation(a3);
    for(int x:a3) cout<<x<<" "; cout<<endl; // 1 5 1
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[1,3,2]\n[1,2,3]\n[1,5,1]",
      python: "[1, 3, 2]\n[1, 2, 3]\n[1, 5, 1]",
      java: "[1, 3, 2]\n[1, 2, 3]\n[1, 5, 1]",
      cpp: "1 3 2 \n1 2 3 \n1 5 1 ",
    },
  },

  "leaders-in-an-array": {
    id: "leaders-in-an-array",
    title: "Leaders in an Array",
    difficulty: "Easy",
    category: "Array",
    description: {
      text: "Given an array arr[] of n integers, find all elements that are leaders. An element is a leader if it is greater than or equal to all the elements to its right side. The rightmost element is always a leader.",
      notes: [],
    },
    examples: [
      { input: "arr = [16,17,4,3,5,2]", output: "[17,5,2]" },
      { input: "arr = [10,4,2,4,1]", output: "[10,4,4,1]" },
    ],
    constraints: ["1 ≤ arr.length ≤ 10⁵", "0 ≤ arr[i] ≤ 10⁶"],
    starterCode: {
      javascript: `function leaders(arr) {
  // Write your solution here
  
}

// Test cases
console.log(leaders([16,17,4,3,5,2])); // Expected: [17,5,2]
console.log(leaders([10,4,2,4,1]));    // Expected: [10,4,4,1]`,
      python: `def leaders(arr):
    # Write your solution here
    pass

# Test cases
print(leaders([16,17,4,3,5,2]))  # Expected: [17, 5, 2]
print(leaders([10,4,2,4,1]))     # Expected: [10, 4, 4, 1]`,
      java: `import java.util.*;
class Solution {
    public static List<Integer> leaders(int[] arr) {
        // Write your solution here
        return new ArrayList<>();
    }
    public static void main(String[] args) {
        System.out.println(leaders(new int[]{16,17,4,3,5,2})); // [17, 5, 2]
        System.out.println(leaders(new int[]{10,4,2,4,1}));    // [10, 4, 4, 1]
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

vector<int> leaders(vector<int>& arr) {
    // Write your solution here
    return {};
}

int main() {
    vector<int> a1={16,17,4,3,5,2};
    for(int x:leaders(a1)) cout<<x<<" "; cout<<endl; // 17 5 2
    vector<int> a2={10,4,2,4,1};
    for(int x:leaders(a2)) cout<<x<<" "; cout<<endl; // 10 4 4 1
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[17,5,2]\n[10,4,4,1]",
      python: "[17, 5, 2]\n[10, 4, 4, 1]",
      java: "[17, 5, 2]\n[10, 4, 4, 1]",
      cpp: "17 5 2 \n10 4 4 1 ",
    },
  },

  "longest-consecutive-sequence": {
    id: "longest-consecutive-sequence",
    title: "Longest Consecutive Sequence",
    difficulty: "Medium",
    category: "Array • Hash Table • Union Find",
    description: {
      text: "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.",
      notes: ["You must write an algorithm that runs in O(n) time."],
    },
    examples: [
      {
        input: "nums = [100,4,200,1,3,2]",
        output: "4",
        explanation: "The longest consecutive sequence is [1, 2, 3, 4]. Its length is 4.",
      },
      { input: "nums = [0,3,7,2,5,8,4,6,0,1]", output: "9" },
    ],
    constraints: ["0 ≤ nums.length ≤ 10⁵", "-10⁹ ≤ nums[i] ≤ 10⁹"],
    starterCode: {
      javascript: `function longestConsecutive(nums) {
  // Write your solution here
  
}

// Test cases
console.log(longestConsecutive([100,4,200,1,3,2]));      // Expected: 4
console.log(longestConsecutive([0,3,7,2,5,8,4,6,0,1])); // Expected: 9`,
      python: `def longestConsecutive(nums):
    # Write your solution here
    pass

# Test cases
print(longestConsecutive([100,4,200,1,3,2]))       # Expected: 4
print(longestConsecutive([0,3,7,2,5,8,4,6,0,1]))  # Expected: 9`,
      java: `class Solution {
    public static int longestConsecutive(int[] nums) {
        // Write your solution here
        return 0;
    }
    public static void main(String[] args) {
        System.out.println(longestConsecutive(new int[]{100,4,200,1,3,2}));     // 4
        System.out.println(longestConsecutive(new int[]{0,3,7,2,5,8,4,6,0,1})); // 9
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_set>
using namespace std;

int longestConsecutive(vector<int>& nums) {
    // Write your solution here
    return 0;
}

int main() {
    vector<int> a1={100,4,200,1,3,2};
    cout << longestConsecutive(a1) << endl; // 4
    vector<int> a2={0,3,7,2,5,8,4,6,0,1};
    cout << longestConsecutive(a2) << endl; // 9
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "4\n9",
      python: "4\n9",
      java: "4\n9",
      cpp: "4\n9",
    },
  },

  "set-matrix-zeroes": {
    id: "set-matrix-zeroes",
    title: "Set Matrix Zeroes",
    difficulty: "Medium",
    category: "Array • Hash Table • Matrix",
    description: {
      text: "Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's.",
      notes: ["You must do it in place."],
    },
    examples: [
      { input: "matrix = [[1,1,1],[1,0,1],[1,1,1]]", output: "[[1,0,1],[0,0,0],[1,0,1]]" },
      {
        input: "matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]",
        output: "[[0,0,0,0],[0,4,5,0],[0,3,1,0]]",
      },
    ],
    constraints: [
      "m == matrix.length",
      "n == matrix[0].length",
      "1 ≤ m, n ≤ 200",
      "-2³¹ ≤ matrix[i][j] ≤ 2³¹-1",
    ],
    starterCode: {
      javascript: `function setZeroes(matrix) {
  // Write your solution here
  
}

// Test cases
let m1 = [[1,1,1],[1,0,1],[1,1,1]];
setZeroes(m1);
console.log(JSON.stringify(m1)); // Expected: [[1,0,1],[0,0,0],[1,0,1]]

let m2 = [[0,1,2,0],[3,4,5,2],[1,3,1,5]];
setZeroes(m2);
console.log(JSON.stringify(m2)); // Expected: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]`,
      python: `def setZeroes(matrix):
    # Write your solution here
    pass

# Test cases
m1 = [[1,1,1],[1,0,1],[1,1,1]]
setZeroes(m1)
print(m1)  # Expected: [[1, 0, 1], [0, 0, 0], [1, 0, 1]]

m2 = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
setZeroes(m2)
print(m2)  # Expected: [[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]]`,
      java: `import java.util.*;
class Solution {
    public static void setZeroes(int[][] matrix) {
        // Write your solution here
    }
    public static void main(String[] args) {
        int[][] m1 = {{1,1,1},{1,0,1},{1,1,1}};
        setZeroes(m1);
        System.out.println(Arrays.deepToString(m1)); // [[1, 0, 1], [0, 0, 0], [1, 0, 1]]

        int[][] m2 = {{0,1,2,0},{3,4,5,2},{1,3,1,5}};
        setZeroes(m2);
        System.out.println(Arrays.deepToString(m2)); // [[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]]
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void setZeroes(vector<vector<int>>& matrix) {
    // Write your solution here
}

void printMatrix(vector<vector<int>>& m) {
    for(auto& row : m) {
        for(int x : row) cout << x << " ";
        cout << endl;
    }
}

int main() {
    vector<vector<int>> m1={{1,1,1},{1,0,1},{1,1,1}};
    setZeroes(m1); printMatrix(m1); // 1 0 1 / 0 0 0 / 1 0 1
    cout << "---" << endl;
    vector<vector<int>> m2={{0,1,2,0},{3,4,5,2},{1,3,1,5}};
    setZeroes(m2); printMatrix(m2); // 0 0 0 0 / 0 4 5 0 / 0 3 1 0
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[[1,0,1],[0,0,0],[1,0,1]]\n[[0,0,0,0],[0,4,5,0],[0,3,1,0]]",
      python: "[[1, 0, 1], [0, 0, 0], [1, 0, 1]]\n[[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]]",
      java: "[[1, 0, 1], [0, 0, 0], [1, 0, 1]]\n[[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]]",
      cpp: "1 0 1 \n0 0 0 \n1 0 1 \n---\n0 0 0 0 \n0 4 5 0 \n0 3 1 0 ",
    },
  },

  "rotate-image": {
    id: "rotate-image",
    title: "Rotate Image",
    difficulty: "Medium",
    category: "Array • Math • Matrix",
    description: {
      text: "You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).",
      notes: ["You have to rotate the image in-place, modifying the input 2D matrix directly."],
    },
    examples: [
      { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[[7,4,1],[8,5,2],[9,6,3]]" },
      {
        input: "matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]",
        output: "[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]",
      },
    ],
    constraints: [
      "n == matrix.length == matrix[i].length",
      "1 ≤ n ≤ 20",
      "-1000 ≤ matrix[i][j] ≤ 1000",
    ],
    starterCode: {
      javascript: `function rotate(matrix) {
  // Write your solution here
  
}

// Test cases
let m1 = [[1,2,3],[4,5,6],[7,8,9]];
rotate(m1);
console.log(JSON.stringify(m1)); // Expected: [[7,4,1],[8,5,2],[9,6,3]]`,
      python: `def rotate(matrix):
    # Write your solution here
    pass

# Test cases
m1 = [[1,2,3],[4,5,6],[7,8,9]]
rotate(m1)
print(m1)  # Expected: [[7, 4, 1], [8, 5, 2], [9, 6, 3]]`,
      java: `import java.util.*;
class Solution {
    public static void rotate(int[][] matrix) {
        // Write your solution here
    }
    public static void main(String[] args) {
        int[][] m1 = {{1,2,3},{4,5,6},{7,8,9}};
        rotate(m1);
        System.out.println(Arrays.deepToString(m1)); // [[7, 4, 1], [8, 5, 2], [9, 6, 3]]
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void rotate(vector<vector<int>>& matrix) {
    // Write your solution here
}

int main() {
    vector<vector<int>> m1={{1,2,3},{4,5,6},{7,8,9}};
    rotate(m1);
    for(auto& row:m1) { for(int x:row) cout<<x<<" "; cout<<endl; }
    // 7 4 1 / 8 5 2 / 9 6 3
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[[7,4,1],[8,5,2],[9,6,3]]",
      python: "[[7, 4, 1], [8, 5, 2], [9, 6, 3]]",
      java: "[[7, 4, 1], [8, 5, 2], [9, 6, 3]]",
      cpp: "7 4 1 \n8 5 2 \n9 6 3 ",
    },
  },

  "spiral-matrix": {
    id: "spiral-matrix",
    title: "Spiral Matrix",
    difficulty: "Medium",
    category: "Array • Matrix • Simulation",
    description: {
      text: "Given an m x n matrix, return all elements of the matrix in spiral order.",
      notes: [],
    },
    examples: [
      { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[1,2,3,6,9,8,7,4,5]" },
      {
        input: "matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]",
        output: "[1,2,3,4,8,12,11,10,9,5,6,7]",
      },
    ],
    constraints: [
      "m == matrix.length",
      "n == matrix[i].length",
      "1 ≤ m, n ≤ 10",
      "-100 ≤ matrix[i][j] ≤ 100",
    ],
    starterCode: {
      javascript: `function spiralOrder(matrix) {
  // Write your solution here
  
}

// Test cases
console.log(spiralOrder([[1,2,3],[4,5,6],[7,8,9]]));            // Expected: [1,2,3,6,9,8,7,4,5]
console.log(spiralOrder([[1,2,3,4],[5,6,7,8],[9,10,11,12]]));   // Expected: [1,2,3,4,8,12,11,10,9,5,6,7]`,
      python: `def spiralOrder(matrix):
    # Write your solution here
    pass

# Test cases
print(spiralOrder([[1,2,3],[4,5,6],[7,8,9]]))            # Expected: [1, 2, 3, 6, 9, 8, 7, 4, 5]
print(spiralOrder([[1,2,3,4],[5,6,7,8],[9,10,11,12]]))   # Expected: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]`,
      java: `import java.util.*;
class Solution {
    public static List<Integer> spiralOrder(int[][] matrix) {
        // Write your solution here
        return new ArrayList<>();
    }
    public static void main(String[] args) {
        System.out.println(spiralOrder(new int[][]{{1,2,3},{4,5,6},{7,8,9}}));           // [1, 2, 3, 6, 9, 8, 7, 4, 5]
        System.out.println(spiralOrder(new int[][]{{1,2,3,4},{5,6,7,8},{9,10,11,12}})); // [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

vector<int> spiralOrder(vector<vector<int>>& matrix) {
    // Write your solution here
    return {};
}

int main() {
    vector<vector<int>> m1={{1,2,3},{4,5,6},{7,8,9}};
    for(int x:spiralOrder(m1)) cout<<x<<" "; cout<<endl; // 1 2 3 6 9 8 7 4 5

    vector<vector<int>> m2={{1,2,3,4},{5,6,7,8},{9,10,11,12}};
    for(int x:spiralOrder(m2)) cout<<x<<" "; cout<<endl; // 1 2 3 4 8 12 11 10 9 5 6 7
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[1,2,3,6,9,8,7,4,5]\n[1,2,3,4,8,12,11,10,9,5,6,7]",
      python: "[1, 2, 3, 6, 9, 8, 7, 4, 5]\n[1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]",
      java: "[1, 2, 3, 6, 9, 8, 7, 4, 5]\n[1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]",
      cpp: "1 2 3 6 9 8 7 4 5 \n1 2 3 4 8 12 11 10 9 5 6 7 ",
    },
  },

  "container-with-most-water": {
    id: "container-with-most-water",
    title: "Container With Most Water",
    difficulty: "Medium",
    category: "Array • Two Pointers • Greedy",
    description: {
      text: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water.",
      notes: ["You may not slant the container."],
    },
    examples: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" },
      { input: "height = [1,1]", output: "1" },
    ],
    constraints: ["n == height.length", "2 ≤ n ≤ 10⁵", "0 ≤ height[i] ≤ 10⁴"],
    starterCode: {
      javascript: `function maxArea(height) {
  // Write your solution here
  
}

// Test cases
console.log(maxArea([1,8,6,2,5,4,8,3,7])); // Expected: 49
console.log(maxArea([1,1]));                // Expected: 1`,
      python: `def maxArea(height):
    # Write your solution here
    pass

# Test cases
print(maxArea([1,8,6,2,5,4,8,3,7]))  # Expected: 49
print(maxArea([1,1]))                  # Expected: 1`,
      java: `class Solution {
    public static int maxArea(int[] height) {
        // Write your solution here
        return 0;
    }
    public static void main(String[] args) {
        System.out.println(maxArea(new int[]{1,8,6,2,5,4,8,3,7})); // Expected: 49
        System.out.println(maxArea(new int[]{1,1}));                // Expected: 1
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int maxArea(vector<int>& height) {
    // Write your solution here
    return 0;
}

int main() {
    vector<int> h1 = {1,8,6,2,5,4,8,3,7};
    cout << maxArea(h1) << endl; // Expected: 49
    vector<int> h2 = {1,1};
    cout << maxArea(h2) << endl; // Expected: 1
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "49\n1",
      python: "49\n1",
      java: "49\n1",
      cpp: "49\n1",
    },
  },

  "subarray-sum-equals-k": {
    id: "subarray-sum-equals-k",
    title: "Subarray Sum Equals K",
    difficulty: "Medium",
    category: "Array • Hash Table • Prefix Sum",
    description: {
      text: "Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.",
      notes: ["A subarray is a contiguous non-empty sequence of elements within an array."],
    },
    examples: [
      { input: "nums = [1,1,1], k = 2", output: "2" },
      { input: "nums = [1,2,3], k = 3", output: "2" },
    ],
    constraints: ["1 ≤ nums.length ≤ 2 * 10⁴", "-1000 ≤ nums[i] ≤ 1000", "-10⁷ ≤ k ≤ 10⁷"],
    starterCode: {
      javascript: `function subarraySum(nums, k) {
  // Write your solution here
  
}

// Test cases
console.log(subarraySum([1,1,1], 2)); // Expected: 2
console.log(subarraySum([1,2,3], 3)); // Expected: 2`,
      python: `def subarraySum(nums, k):
    # Write your solution here
    pass

# Test cases
print(subarraySum([1,1,1], 2))  # Expected: 2
print(subarraySum([1,2,3], 3))  # Expected: 2`,
      java: `class Solution {
    public static int subarraySum(int[] nums, int k) {
        // Write your solution here
        return 0;
    }
    public static void main(String[] args) {
        System.out.println(subarraySum(new int[]{1,1,1}, 2)); // 2
        System.out.println(subarraySum(new int[]{1,2,3}, 3)); // 2
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int subarraySum(vector<int>& nums, int k) {
    // Write your solution here
    return 0;
}

int main() {
    vector<int> a1={1,1,1};
    cout << subarraySum(a1, 2) << endl; // 2
    vector<int> a2={1,2,3};
    cout << subarraySum(a2, 3) << endl; // 2
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "2\n2",
      python: "2\n2",
      java: "2\n2",
      cpp: "2\n2",
    },
  },

  // ╔══════════════════════════════════════╗
  // ║        ARRAYS  –  HARD (12)          ║
  // ╚══════════════════════════════════════╝

  "pascals-triangle": {
    id: "pascals-triangle",
    title: "Pascal's Triangle",
    difficulty: "Easy",
    category: "Array • Dynamic Programming",
    description: {
      text: "Given an integer numRows, return the first numRows of Pascal's triangle.",
      notes: ["In Pascal's triangle, each number is the sum of the two numbers directly above it."],
    },
    examples: [
      { input: "numRows = 5", output: "[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]" },
      { input: "numRows = 1", output: "[[1]]" },
    ],
    constraints: ["1 ≤ numRows ≤ 30"],
    starterCode: {
      javascript: `function generate(numRows) {
  // Write your solution here
  
}

// Test cases
console.log(JSON.stringify(generate(5))); // Expected: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
console.log(JSON.stringify(generate(1))); // Expected: [[1]]`,
      python: `def generate(numRows):
    # Write your solution here
    pass

# Test cases
print(generate(5))  # Expected: [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]
print(generate(1))  # Expected: [[1]]`,
      java: `import java.util.*;
class Solution {
    public static List<List<Integer>> generate(int numRows) {
        // Write your solution here
        return new ArrayList<>();
    }
    public static void main(String[] args) {
        System.out.println(generate(5)); // [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]
        System.out.println(generate(1)); // [[1]]
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> generate(int numRows) {
    // Write your solution here
    return {};
}

int main() {
    for(auto& row : generate(5)) {
        for(int x:row) cout<<x<<" "; cout<<endl;
    }
    // 1 / 1 1 / 1 2 1 / 1 3 3 1 / 1 4 6 4 1
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]\n[[1]]",
      python: "[[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]\n[[1]]",
      java: "[[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]\n[[1]]",
      cpp: "1 \n1 1 \n1 2 1 \n1 3 3 1 \n1 4 6 4 1 ",
    },
  },

  "majority-element-ii": {
    id: "majority-element-ii",
    title: "Majority Element II",
    difficulty: "Medium",
    category: "Array • Hash Table • Sorting",
    description: {
      text: "Given an integer array of size n, find all elements that appear more than ⌊ n/3 ⌋ times.",
      notes: [],
    },
    examples: [
      { input: "nums = [3,2,3]", output: "[3]" },
      { input: "nums = [1]", output: "[1]" },
      { input: "nums = [1,2]", output: "[1,2]" },
    ],
    constraints: ["1 ≤ nums.length ≤ 5 * 10⁴", "-10⁹ ≤ nums[i] ≤ 10⁹"],
    starterCode: {
      javascript: `function majorityElement(nums) {
  // Write your solution here
  
}

// Test cases
console.log(majorityElement([3,2,3])); // Expected: [3]
console.log(majorityElement([1]));     // Expected: [1]
console.log(majorityElement([1,2]));   // Expected: [1,2]`,
      python: `def majorityElement(nums):
    # Write your solution here
    pass

# Test cases
print(majorityElement([3,2,3]))  # Expected: [3]
print(majorityElement([1]))       # Expected: [1]
print(majorityElement([1,2]))     # Expected: [1, 2]`,
      java: `import java.util.*;
class Solution {
    public static List<Integer> majorityElement(int[] nums) {
        // Write your solution here
        return new ArrayList<>();
    }
    public static void main(String[] args) {
        System.out.println(majorityElement(new int[]{3,2,3})); // [3]
        System.out.println(majorityElement(new int[]{1}));     // [1]
        System.out.println(majorityElement(new int[]{1,2}));   // [1, 2]
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

vector<int> majorityElement(vector<int>& nums) {
    // Write your solution here
    return {};
}

int main() {
    vector<int> a1={3,2,3}, a2={1}, a3={1,2};
    for(int x:majorityElement(a1)) cout<<x<<" "; cout<<endl; // 3
    for(int x:majorityElement(a2)) cout<<x<<" "; cout<<endl; // 1
    for(int x:majorityElement(a3)) cout<<x<<" "; cout<<endl; // 1 2
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[3]\n[1]\n[1,2]",
      python: "[3]\n[1]\n[1, 2]",
      java: "[3]\n[1]\n[1, 2]",
      cpp: "3 \n1 \n1 2 ",
    },
  },

  "three-sum": {
    id: "three-sum",
    title: "3Sum",
    difficulty: "Medium",
    category: "Array • Two Pointers • Sorting",
    description: {
      text: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. Notice that the solution set must not contain duplicate triplets.",
      notes: [],
    },
    examples: [
      { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
      { input: "nums = [0,1,1]", output: "[]" },
      { input: "nums = [0,0,0]", output: "[[0,0,0]]" },
    ],
    constraints: ["3 ≤ nums.length ≤ 3000", "-10⁵ ≤ nums[i] ≤ 10⁵"],
    starterCode: {
      javascript: `function threeSum(nums) {
  // Write your solution here
  
}

// Test cases
console.log(JSON.stringify(threeSum([-1,0,1,2,-1,-4]))); // Expected: [[-1,-1,2],[-1,0,1]]
console.log(JSON.stringify(threeSum([0,1,1])));           // Expected: []
console.log(JSON.stringify(threeSum([0,0,0])));           // Expected: [[0,0,0]]`,
      python: `def threeSum(nums):
    # Write your solution here
    pass

# Test cases
print(threeSum([-1,0,1,2,-1,-4]))  # Expected: [[-1, -1, 2], [-1, 0, 1]]
print(threeSum([0,1,1]))            # Expected: []
print(threeSum([0,0,0]))            # Expected: [[0, 0, 0]]`,
      java: `import java.util.*;
class Solution {
    public static List<List<Integer>> threeSum(int[] nums) {
        // Write your solution here
        return new ArrayList<>();
    }
    public static void main(String[] args) {
        System.out.println(threeSum(new int[]{-1,0,1,2,-1,-4})); // [[-1, -1, 2], [-1, 0, 1]]
        System.out.println(threeSum(new int[]{0,1,1}));           // []
        System.out.println(threeSum(new int[]{0,0,0}));           // [[0, 0, 0]]
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<vector<int>> threeSum(vector<int>& nums) {
    // Write your solution here
    return {};
}

int main() {
    vector<int> n1={-1,0,1,2,-1,-4};
    auto r1=threeSum(n1);
    for(auto& t:r1){cout<<"[";for(int x:t)cout<<x<<",";cout<<"] ";} cout<<endl;
    // [-1,-1,2] [-1,0,1]
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[[-1,-1,2],[-1,0,1]]\n[]\n[[0,0,0]]",
      python: "[[-1, -1, 2], [-1, 0, 1]]\n[]\n[[0, 0, 0]]",
      java: "[[-1, -1, 2], [-1, 0, 1]]\n[]\n[[0, 0, 0]]",
      cpp: "[-1,-1,2,] [-1,0,1,] ",
    },
  },

  "four-sum": {
    id: "four-sum",
    title: "4Sum",
    difficulty: "Medium",
    category: "Array • Two Pointers • Sorting",
    description: {
      text: "Given an array nums of n integers and an integer target, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that a, b, c, and d are distinct and nums[a] + nums[b] + nums[c] + nums[d] == target.",
      notes: [],
    },
    examples: [
      {
        input: "nums = [1,0,-1,0,-2,2], target = 0",
        output: "[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]",
      },
      { input: "nums = [2,2,2,2,2], target = 8", output: "[[2,2,2,2]]" },
    ],
    constraints: ["1 ≤ nums.length ≤ 200", "-10⁹ ≤ nums[i] ≤ 10⁹", "-10⁹ ≤ target ≤ 10⁹"],
    starterCode: {
      javascript: `function fourSum(nums, target) {
  // Write your solution here
  
}

// Test cases
console.log(JSON.stringify(fourSum([1,0,-1,0,-2,2], 0))); // Expected: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
console.log(JSON.stringify(fourSum([2,2,2,2,2], 8)));       // Expected: [[2,2,2,2]]`,
      python: `def fourSum(nums, target):
    # Write your solution here
    pass

# Test cases
print(fourSum([1,0,-1,0,-2,2], 0))  # Expected: [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]
print(fourSum([2,2,2,2,2], 8))       # Expected: [[2, 2, 2, 2]]`,
      java: `import java.util.*;
class Solution {
    public static List<List<Integer>> fourSum(int[] nums, int target) {
        // Write your solution here
        return new ArrayList<>();
    }
    public static void main(String[] args) {
        System.out.println(fourSum(new int[]{1,0,-1,0,-2,2}, 0)); // [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]
        System.out.println(fourSum(new int[]{2,2,2,2,2}, 8));      // [[2, 2, 2, 2]]
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<vector<int>> fourSum(vector<int>& nums, int target) {
    // Write your solution here
    return {};
}

int main() {
    vector<int> n1={1,0,-1,0,-2,2};
    auto r=fourSum(n1,0);
    for(auto& q:r){cout<<"[";for(int x:q)cout<<x<<",";cout<<"] ";} cout<<endl;
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]\n[[2,2,2,2]]",
      python: "[[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]\n[[2, 2, 2, 2]]",
      java: "[[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]\n[[2, 2, 2, 2]]",
      cpp: "[-2,-1,1,2,] [-2,0,0,2,] [-1,0,0,1,] ",
    },
  },

  "largest-subarray-with-zero-sum": {
    id: "largest-subarray-with-zero-sum",
    title: "Largest Subarray with Zero Sum",
    difficulty: "Medium",
    category: "Array • Hash Table • Prefix Sum",
    description: {
      text: "Given an array arr[] containing both positive and negative integers, find the length of the largest subarray with sum equal to 0.",
      notes: [],
    },
    examples: [
      {
        input: "arr = [15,-2,2,-8,1,7,10,23]",
        output: "5",
        explanation: "The largest subarray with sum 0 is [-2,2,-8,1,7] of length 5.",
      },
      { input: "arr = [1,2,3]", output: "0" },
    ],
    constraints: ["1 ≤ arr.length ≤ 10⁵", "-10⁴ ≤ arr[i] ≤ 10⁴"],
    starterCode: {
      javascript: `function maxLen(arr) {
  // Write your solution here
  
}

// Test cases
console.log(maxLen([15,-2,2,-8,1,7,10,23])); // Expected: 5
console.log(maxLen([1,2,3]));                 // Expected: 0`,
      python: `def maxLen(arr):
    # Write your solution here
    pass

# Test cases
print(maxLen([15,-2,2,-8,1,7,10,23]))  # Expected: 5
print(maxLen([1,2,3]))                  # Expected: 0`,
      java: `class Solution {
    public static int maxLen(int[] arr) {
        // Write your solution here
        return 0;
    }
    public static void main(String[] args) {
        System.out.println(maxLen(new int[]{15,-2,2,-8,1,7,10,23})); // 5
        System.out.println(maxLen(new int[]{1,2,3}));                 // 0
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int maxLen(vector<int>& arr) {
    // Write your solution here
    return 0;
}

int main() {
    vector<int> a1={15,-2,2,-8,1,7,10,23};
    cout << maxLen(a1) << endl; // 5
    vector<int> a2={1,2,3};
    cout << maxLen(a2) << endl; // 0
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "5\n0",
      python: "5\n0",
      java: "5\n0",
      cpp: "5\n0",
    },
  },

  "count-subarrays-with-xor-k": {
    id: "count-subarrays-with-xor-k",
    title: "Count Subarrays with Given XOR",
    difficulty: "Hard",
    category: "Array • Bit Manipulation • Prefix Sum",
    description: {
      text: "Given an array of integers arr[] and a number k, count the number of subarrays having XOR of their elements equal to k.",
      notes: [],
    },
    examples: [
      { input: "arr = [4,2,2,6,4], k = 6", output: "4" },
      { input: "arr = [5,6,7,8,9], k = 5", output: "2" },
    ],
    constraints: ["1 ≤ arr.length ≤ 10⁵", "0 ≤ arr[i] ≤ 10⁵", "0 ≤ k ≤ 10⁵"],
    starterCode: {
      javascript: `function subarraysWithXorK(arr, k) {
  // Write your solution here
  
}

// Test cases
console.log(subarraysWithXorK([4,2,2,6,4], 6)); // Expected: 4
console.log(subarraysWithXorK([5,6,7,8,9], 5)); // Expected: 2`,
      python: `def subarraysWithXorK(arr, k):
    # Write your solution here
    pass

# Test cases
print(subarraysWithXorK([4,2,2,6,4], 6))  # Expected: 4
print(subarraysWithXorK([5,6,7,8,9], 5))  # Expected: 2`,
      java: `class Solution {
    public static int subarraysWithXorK(int[] arr, int k) {
        // Write your solution here
        return 0;
    }
    public static void main(String[] args) {
        System.out.println(subarraysWithXorK(new int[]{4,2,2,6,4}, 6)); // 4
        System.out.println(subarraysWithXorK(new int[]{5,6,7,8,9}, 5)); // 2
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int subarraysWithXorK(vector<int>& arr, int k) {
    // Write your solution here
    return 0;
}

int main() {
    vector<int> a1={4,2,2,6,4};
    cout << subarraysWithXorK(a1, 6) << endl; // 4
    vector<int> a2={5,6,7,8,9};
    cout << subarraysWithXorK(a2, 5) << endl; // 2
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "4\n2",
      python: "4\n2",
      java: "4\n2",
      cpp: "4\n2",
    },
  },

  "merge-intervals": {
    id: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "Medium",
    category: "Array • Sorting",
    description: {
      text: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
      notes: [],
    },
    examples: [
      {
        input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        output: "[[1,6],[8,10],[15,18]]",
        explanation: "Since intervals [1,3] and [2,6] overlap, merge them into [1,6].",
      },
      { input: "intervals = [[1,4],[4,5]]", output: "[[1,5]]" },
    ],
    constraints: [
      "1 ≤ intervals.length ≤ 10⁴",
      "intervals[i].length == 2",
      "0 ≤ starti ≤ endi ≤ 10⁴",
    ],
    starterCode: {
      javascript: `function merge(intervals) {
  // Write your solution here
  
}

// Test cases
console.log(JSON.stringify(merge([[1,3],[2,6],[8,10],[15,18]]))); // Expected: [[1,6],[8,10],[15,18]]
console.log(JSON.stringify(merge([[1,4],[4,5]])));                 // Expected: [[1,5]]`,
      python: `def merge(intervals):
    # Write your solution here
    pass

# Test cases
print(merge([[1,3],[2,6],[8,10],[15,18]]))  # Expected: [[1, 6], [8, 10], [15, 18]]
print(merge([[1,4],[4,5]]))                  # Expected: [[1, 5]]`,
      java: `import java.util.*;
class Solution {
    public static int[][] merge(int[][] intervals) {
        // Write your solution here
        return new int[0][0];
    }
    public static void main(String[] args) {
        System.out.println(Arrays.deepToString(merge(new int[][]{{1,3},{2,6},{8,10},{15,18}}))); // [[1, 6], [8, 10], [15, 18]]
        System.out.println(Arrays.deepToString(merge(new int[][]{{1,4},{4,5}})));                 // [[1, 5]]
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<vector<int>> merge(vector<vector<int>>& intervals) {
    // Write your solution here
    return {};
}

int main() {
    vector<vector<int>> iv1={{1,3},{2,6},{8,10},{15,18}};
    auto r1=merge(iv1);
    for(auto& v:r1) cout<<"["<<v[0]<<","<<v[1]<<"] "; cout<<endl; // [1,6] [8,10] [15,18]
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[[1,6],[8,10],[15,18]]\n[[1,5]]",
      python: "[[1, 6], [8, 10], [15, 18]]\n[[1, 5]]",
      java: "[[1, 6], [8, 10], [15, 18]]\n[[1, 5]]",
      cpp: "[1,6] [8,10] [15,18] ",
    },
  },

  "merge-sorted-array": {
    id: "merge-sorted-array",
    title: "Merge Sorted Array",
    difficulty: "Easy",
    category: "Array • Two Pointers • Sorting",
    description: {
      text: "You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively. Merge nums1 and nums2 into a single array sorted in non-decreasing order. The final sorted array should not be returned by the function, but instead be stored inside the array nums1.",
      notes: [
        "To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored.",
      ],
    },
    examples: [
      { input: "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3", output: "[1,2,2,3,5,6]" },
      { input: "nums1 = [1], m = 1, nums2 = [], n = 0", output: "[1]" },
    ],
    constraints: [
      "nums1.length == m + n",
      "nums2.length == n",
      "0 ≤ m, n ≤ 200",
      "1 ≤ m + n ≤ 200",
      "-10⁹ ≤ nums1[i], nums2[j] ≤ 10⁹",
    ],
    starterCode: {
      javascript: `function merge(nums1, m, nums2, n) {
  // Write your solution here
  
}

// Test cases
let a1 = [1,2,3,0,0,0];
merge(a1, 3, [2,5,6], 3);
console.log(a1); // Expected: [1,2,2,3,5,6]

let a2 = [1];
merge(a2, 1, [], 0);
console.log(a2); // Expected: [1]`,
      python: `def merge(nums1, m, nums2, n):
    # Write your solution here
    pass

# Test cases
a1 = [1,2,3,0,0,0]
merge(a1, 3, [2,5,6], 3)
print(a1)  # Expected: [1, 2, 2, 3, 5, 6]

a2 = [1]
merge(a2, 1, [], 0)
print(a2)  # Expected: [1]`,
      java: `import java.util.*;
class Solution {
    public static void merge(int[] nums1, int m, int[] nums2, int n) {
        // Write your solution here
    }
    public static void main(String[] args) {
        int[] a1={1,2,3,0,0,0};
        merge(a1, 3, new int[]{2,5,6}, 3);
        System.out.println(Arrays.toString(a1)); // [1, 2, 2, 3, 5, 6]

        int[] a2={1};
        merge(a2, 1, new int[]{}, 0);
        System.out.println(Arrays.toString(a2)); // [1]
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
    // Write your solution here
}

int main() {
    vector<int> a1={1,2,3,0,0,0}, b1={2,5,6};
    merge(a1, 3, b1, 3);
    for(int x:a1) cout<<x<<" "; cout<<endl; // 1 2 2 3 5 6
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[1,2,2,3,5,6]\n[1]",
      python: "[1, 2, 2, 3, 5, 6]\n[1]",
      java: "[1, 2, 2, 3, 5, 6]\n[1]",
      cpp: "1 2 2 3 5 6 ",
    },
  },

  "find-the-duplicate-number": {
    id: "find-the-duplicate-number",
    title: "Find the Duplicate Number",
    difficulty: "Medium",
    category: "Array • Two Pointers • Binary Search • Bit Manipulation",
    description: {
      text: "Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive. There is only one repeated number in nums, return this repeated number.",
      notes: [
        "You must solve the problem without modifying the array nums and uses only constant extra space.",
      ],
    },
    examples: [
      { input: "nums = [1,3,4,2,2]", output: "2" },
      { input: "nums = [3,1,3,4,2]", output: "3" },
    ],
    constraints: [
      "1 ≤ n ≤ 10⁵",
      "nums.length == n + 1",
      "1 ≤ nums[i] ≤ n",
      "All integers appear only once except for precisely one integer which appears two or more times",
    ],
    starterCode: {
      javascript: `function findDuplicate(nums) {
  // Write your solution here
  
}

// Test cases
console.log(findDuplicate([1,3,4,2,2])); // Expected: 2
console.log(findDuplicate([3,1,3,4,2])); // Expected: 3`,
      python: `def findDuplicate(nums):
    # Write your solution here
    pass

# Test cases
print(findDuplicate([1,3,4,2,2]))  # Expected: 2
print(findDuplicate([3,1,3,4,2]))  # Expected: 3`,
      java: `class Solution {
    public static int findDuplicate(int[] nums) {
        // Write your solution here
        return 0;
    }
    public static void main(String[] args) {
        System.out.println(findDuplicate(new int[]{1,3,4,2,2})); // 2
        System.out.println(findDuplicate(new int[]{3,1,3,4,2})); // 3
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int findDuplicate(vector<int>& nums) {
    // Write your solution here
    return 0;
}

int main() {
    vector<int> a1={1,3,4,2,2};
    cout << findDuplicate(a1) << endl; // 2
    vector<int> a2={3,1,3,4,2};
    cout << findDuplicate(a2) << endl; // 3
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "2\n3",
      python: "2\n3",
      java: "2\n3",
      cpp: "2\n3",
    },
  },

  "count-inversions": {
    id: "count-inversions",
    title: "Count Inversions",
    difficulty: "Hard",
    category: "Array • Divide and Conquer • Merge Sort",
    description: {
      text: "Given an integer array arr[], count the number of inversions in the array. An inversion occurs when a[i] > a[j] for i < j.",
      notes: ["The count can be large, consider using a long integer."],
    },
    examples: [
      { input: "arr = [2,4,1,3,5]", output: "3", explanation: "Inversions: (2,1), (4,1), (4,3)." },
      { input: "arr = [5,3,2,1]", output: "6" },
      { input: "arr = [1,2,3,4,5]", output: "0" },
    ],
    constraints: ["1 ≤ arr.length ≤ 5 * 10⁴", "1 ≤ arr[i] ≤ 10⁴"],
    starterCode: {
      javascript: `function countInversions(arr) {
  // Write your solution here
  
}

// Test cases
console.log(countInversions([2,4,1,3,5])); // Expected: 3
console.log(countInversions([5,3,2,1]));    // Expected: 6
console.log(countInversions([1,2,3,4,5])); // Expected: 0`,
      python: `def countInversions(arr):
    # Write your solution here
    pass

# Test cases
print(countInversions([2,4,1,3,5]))  # Expected: 3
print(countInversions([5,3,2,1]))     # Expected: 6
print(countInversions([1,2,3,4,5]))  # Expected: 0`,
      java: `class Solution {
    public static long countInversions(int[] arr) {
        // Write your solution here
        return 0;
    }
    public static void main(String[] args) {
        System.out.println(countInversions(new int[]{2,4,1,3,5})); // 3
        System.out.println(countInversions(new int[]{5,3,2,1}));    // 6
        System.out.println(countInversions(new int[]{1,2,3,4,5})); // 0
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

long long countInversions(vector<int>& arr) {
    // Write your solution here
    return 0;
}

int main() {
    vector<int> a1={2,4,1,3,5};
    cout << countInversions(a1) << endl; // 3
    vector<int> a2={5,3,2,1};
    cout << countInversions(a2) << endl; // 6
    vector<int> a3={1,2,3,4,5};
    cout << countInversions(a3) << endl; // 0
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "3\n6\n0",
      python: "3\n6\n0",
      java: "3\n6\n0",
      cpp: "3\n6\n0",
    },
  },

  "reverse-pairs": {
    id: "reverse-pairs",
    title: "Reverse Pairs",
    difficulty: "Hard",
    category: "Array • Binary Search • Divide and Conquer • Merge Sort",
    description: {
      text: "Given an integer array nums, return the number of reverse pairs. A reverse pair is a pair (i, j) where 0 <= i < j < nums.length and nums[i] > 2 * nums[j].",
      notes: [],
    },
    examples: [
      { input: "nums = [1,3,2,3,1]", output: "2" },
      { input: "nums = [2,4,3,5,1]", output: "3" },
    ],
    constraints: ["1 ≤ nums.length ≤ 5 * 10⁴", "-2³¹ ≤ nums[i] ≤ 2³¹ - 1"],
    starterCode: {
      javascript: `function reversePairs(nums) {
  // Write your solution here
  
}

// Test cases
console.log(reversePairs([1,3,2,3,1])); // Expected: 2
console.log(reversePairs([2,4,3,5,1])); // Expected: 3`,
      python: `def reversePairs(nums):
    # Write your solution here
    pass

# Test cases
print(reversePairs([1,3,2,3,1]))  # Expected: 2
print(reversePairs([2,4,3,5,1]))  # Expected: 3`,
      java: `class Solution {
    public static int reversePairs(int[] nums) {
        // Write your solution here
        return 0;
    }
    public static void main(String[] args) {
        System.out.println(reversePairs(new int[]{1,3,2,3,1})); // 2
        System.out.println(reversePairs(new int[]{2,4,3,5,1})); // 3
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int reversePairs(vector<int>& nums) {
    // Write your solution here
    return 0;
}

int main() {
    vector<int> a1={1,3,2,3,1};
    cout << reversePairs(a1) << endl; // 2
    vector<int> a2={2,4,3,5,1};
    cout << reversePairs(a2) << endl; // 3
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "2\n3",
      python: "2\n3",
      java: "2\n3",
      cpp: "2\n3",
    },
  },

  // ╔══════════════════════════════════════╗
  // ║     STRINGS  –  BASIC / EASY (10)   ║
  // ╚══════════════════════════════════════╝

  "reverse-string": {
    id: "reverse-string",
    title: "Reverse String",
    difficulty: "Easy",
    category: "String • Two Pointers",
    description: {
      text: "Write a function that reverses a string. The input string is given as an array of characters s.",
      notes: ["You must do this by modifying the input array in-place with O(1) extra memory."],
    },
    examples: [
      { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
      { input: 's = ["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]' },
    ],
    constraints: ["1 ≤ s.length ≤ 10⁵", "s[i] is a printable ASCII character"],
    starterCode: {
      javascript: `function reverseString(s) {
  // Write your solution here
  
}

// Test cases
let test1 = ["h","e","l","l","o"];
reverseString(test1);
console.log(test1); // Expected: ["o","l","l","e","h"]

let test2 = ["H","a","n","n","a","h"];
reverseString(test2);
console.log(test2); // Expected: ["h","a","n","n","a","H"]`,
      python: `def reverseString(s):
    # Write your solution here
    pass

# Test cases
test1 = ["h","e","l","l","o"]
reverseString(test1)
print(test1)  # Expected: ['o', 'l', 'l', 'e', 'h']

test2 = ["H","a","n","n","a","h"]
reverseString(test2)
print(test2)  # Expected: ['h', 'a', 'n', 'n', 'a', 'H']`,
      java: `import java.util.*;
class Solution {
    public static void reverseString(char[] s) {
        // Write your solution here
    }
    public static void main(String[] args) {
        char[] t1 = {'h','e','l','l','o'};
        reverseString(t1);
        System.out.println(Arrays.toString(t1)); // [o, l, l, e, h]

        char[] t2 = {'H','a','n','n','a','h'};
        reverseString(t2);
        System.out.println(Arrays.toString(t2)); // [h, a, n, n, a, H]
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void reverseString(vector<char>& s) {
    // Write your solution here
}

void printVec(const vector<char>& v) {
    cout << "[";
    for(int i=0;i<v.size();i++) {
        cout << "\"" << v[i] << "\"";
        if(i<(int)v.size()-1) cout << ",";
    }
    cout << "]" << endl;
}

int main() {
    vector<char> t1={'h','e','l','l','o'};
    reverseString(t1); printVec(t1); // ["o","l","l","e","h"]

    vector<char> t2={'H','a','n','n','a','h'};
    reverseString(t2); printVec(t2); // ["h","a","n","n","a","H"]
    return 0;
}`,
    },
    expectedOutput: {
      javascript: '["o","l","l","e","h"]\n["h","a","n","n","a","H"]',
      python: "['o', 'l', 'l', 'e', 'h']\n['h', 'a', 'n', 'n', 'a', 'H']",
      java: "[o, l, l, e, h]\n[h, a, n, n, a, H]",
      cpp: '["o","l","l","e","h"]\n["h","a","n","n","a","H"]',
    },
  },

  "remove-outermost-parentheses": {
    id: "remove-outermost-parentheses",
    title: "Remove Outermost Parentheses",
    difficulty: "Easy",
    category: "String • Stack",
    description: {
      text: 'A valid parentheses string is either empty "", "(" + A + ")", or A + B, where A and B are valid parentheses strings, and + represents string concatenation. The primitive decomposition of a valid parentheses string s is a decomposition into primitive strings. Given a valid parentheses string s, remove the outermost parentheses of every primitive string in the primitive decomposition of s.',
      notes: [],
    },
    examples: [
      {
        input: 's = "(()())(())"',
        output: '"()()()"',
        explanation:
          'The input string is "(()())(())", with primitive decomposition "(()())" + "(())". After removing outer parentheses: "()()" + "()" = "()()()".',
      },
      { input: 's = "(()())(())(()(()))"', output: '"()()()()(())"' },
    ],
    constraints: [
      "1 ≤ s.length ≤ 10⁵",
      "s[i] is either '(' or ')'",
      "s is a valid parentheses string",
    ],
    starterCode: {
      javascript: `function removeOuterParentheses(s) {
  // Write your solution here
  
}

// Test cases
console.log(removeOuterParentheses("(()())(())")); // Expected: "()()()"
console.log(removeOuterParentheses("(()())(())(()(()))"));  // Expected: "()()()()(())"`,
      python: `def removeOuterParentheses(s):
    # Write your solution here
    pass

# Test cases
print(removeOuterParentheses("(()())(())"))           # Expected: "()()()"
print(removeOuterParentheses("(()())(())(()(()))"))    # Expected: "()()()()(())"`,
      java: `class Solution {
    public static String removeOuterParentheses(String s) {
        // Write your solution here
        return "";
    }
    public static void main(String[] args) {
        System.out.println(removeOuterParentheses("(()())(())"));          // "()()()"
        System.out.println(removeOuterParentheses("(()())(())(()(()))"));  // "()()()()(())"
    }
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

string removeOuterParentheses(string s) {
    // Write your solution here
    return "";
}

int main() {
    cout << removeOuterParentheses("(()())(())") << endl;         // "()()()"
    cout << removeOuterParentheses("(()())(())(()(()))") << endl; // "()()()()(())"
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "()()()\n()()()()(())",
      python: "()()()\n()()()()(())",
      java: "()()()\n()()()()(())",
      cpp: "()()()\n()()()()(())",
    },
  },

  "reverse-words-in-a-string": {
    id: "reverse-words-in-a-string",
    title: "Reverse Words in a String",
    difficulty: "Medium",
    category: "String • Two Pointers",
    description: {
      text: "Given an input string s, reverse the order of the words. A word is defined as a sequence of non-space characters. The words in s will be separated by at least one space. Return a string of the words in reverse order concatenated by a single space.",
      notes: [
        "The returned string should not have leading or trailing spaces.",
        "Note that s may contain leading or trailing spaces, or multiple spaces between two words.",
      ],
    },
    examples: [
      { input: 's = "the sky is blue"', output: '"blue is sky the"' },
      { input: 's = "  hello world  "', output: '"world hello"' },
      { input: 's = "a good   example"', output: '"example good a"' },
    ],
    constraints: [
      "1 ≤ s.length ≤ 10⁴",
      "s contains English letters (upper-case and lower-case), digits, and spaces ' '",
      "There is at least one word in s",
    ],
    starterCode: {
      javascript: `function reverseWords(s) {
  // Write your solution here
  
}

// Test cases
console.log(reverseWords("the sky is blue"));  // Expected: "blue is sky the"
console.log(reverseWords("  hello world  "));  // Expected: "world hello"
console.log(reverseWords("a good   example")); // Expected: "example good a"`,
      python: `def reverseWords(s):
    # Write your solution here
    pass

# Test cases
print(reverseWords("the sky is blue"))   # Expected: "blue is sky the"
print(reverseWords("  hello world  "))   # Expected: "world hello"
print(reverseWords("a good   example"))  # Expected: "example good a"`,
      java: `class Solution {
    public static String reverseWords(String s) {
        // Write your solution here
        return "";
    }
    public static void main(String[] args) {
        System.out.println(reverseWords("the sky is blue"));   // "blue is sky the"
        System.out.println(reverseWords("  hello world  "));   // "world hello"
        System.out.println(reverseWords("a good   example"));  // "example good a"
    }
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

string reverseWords(string s) {
    // Write your solution here
    return "";
}

int main() {
    cout << reverseWords("the sky is blue") << endl;   // "blue is sky the"
    cout << reverseWords("  hello world  ") << endl;   // "world hello"
    cout << reverseWords("a good   example") << endl;  // "example good a"
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "blue is sky the\nworld hello\nexample good a",
      python: "blue is sky the\nworld hello\nexample good a",
      java: "blue is sky the\nworld hello\nexample good a",
      cpp: "blue is sky the\nworld hello\nexample good a",
    },
  },

  "largest-odd-number-in-string": {
    id: "largest-odd-number-in-string",
    title: "Largest Odd Number in String",
    difficulty: "Easy",
    category: "String • Math • Greedy",
    description: {
      text: 'You are given a string num, representing a large integer. Return the largest-valued odd integer (as a string) that is a non-empty prefix of num, or an empty string "" if no odd integer exists.',
      notes: ["An integer is odd if its last digit is one of 1, 3, 5, 7, or 9."],
    },
    examples: [
      {
        input: 'num = "52"',
        output: '"5"',
        explanation: 'The only non-empty prefixes are "5" and "52". "5" is odd.',
      },
      { input: 'num = "4206"', output: '""', explanation: 'No prefix of "4206" is odd.' },
      { input: 'num = "35427"', output: '"35427"' },
    ],
    constraints: [
      "1 ≤ num.length ≤ 10⁵",
      "num only consists of digits and does not contain any leading zeros",
    ],
    starterCode: {
      javascript: `function largestOddNumber(num) {
  // Write your solution here
  
}

// Test cases
console.log(largestOddNumber("52"));    // Expected: "5"
console.log(largestOddNumber("4206"));  // Expected: ""
console.log(largestOddNumber("35427")); // Expected: "35427"`,
      python: `def largestOddNumber(num):
    # Write your solution here
    pass

# Test cases
print(largestOddNumber("52"))     # Expected: "5"
print(largestOddNumber("4206"))   # Expected: ""
print(largestOddNumber("35427"))  # Expected: "35427"`,
      java: `class Solution {
    public static String largestOddNumber(String num) {
        // Write your solution here
        return "";
    }
    public static void main(String[] args) {
        System.out.println(largestOddNumber("52"));    // "5"
        System.out.println(largestOddNumber("4206"));  // ""
        System.out.println(largestOddNumber("35427")); // "35427"
    }
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

string largestOddNumber(string num) {
    // Write your solution here
    return "";
}

int main() {
    cout << largestOddNumber("52") << endl;    // "5"
    cout << largestOddNumber("4206") << endl;  // ""
    cout << largestOddNumber("35427") << endl; // "35427"
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "5\n\n35427",
      python: "5\n\n35427",
      java: "5\n\n35427",
      cpp: "5\n\n35427",
    },
  },

  "longest-common-prefix": {
    id: "longest-common-prefix",
    title: "Longest Common Prefix",
    difficulty: "Easy",
    category: "String • Trie",
    description: {
      text: 'Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string "".',
      notes: [],
    },
    examples: [
      { input: 'strs = ["flower","flow","flight"]', output: '"fl"' },
      {
        input: 'strs = ["dog","racecar","car"]',
        output: '""',
        explanation: "There is no common prefix among the input strings.",
      },
    ],
    constraints: [
      "1 ≤ strs.length ≤ 200",
      "0 ≤ strs[i].length ≤ 200",
      "strs[i] consists of only lowercase English letters",
    ],
    starterCode: {
      javascript: `function longestCommonPrefix(strs) {
  // Write your solution here
  
}

// Test cases
console.log(longestCommonPrefix(["flower","flow","flight"])); // Expected: "fl"
console.log(longestCommonPrefix(["dog","racecar","car"]));    // Expected: ""`,
      python: `def longestCommonPrefix(strs):
    # Write your solution here
    pass

# Test cases
print(longestCommonPrefix(["flower","flow","flight"]))  # Expected: "fl"
print(longestCommonPrefix(["dog","racecar","car"]))      # Expected: ""`,
      java: `class Solution {
    public static String longestCommonPrefix(String[] strs) {
        // Write your solution here
        return "";
    }
    public static void main(String[] args) {
        System.out.println(longestCommonPrefix(new String[]{"flower","flow","flight"})); // "fl"
        System.out.println(longestCommonPrefix(new String[]{"dog","racecar","car"}));    // ""
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

string longestCommonPrefix(vector<string>& strs) {
    // Write your solution here
    return "";
}

int main() {
    vector<string> s1={"flower","flow","flight"};
    cout << longestCommonPrefix(s1) << endl; // "fl"
    vector<string> s2={"dog","racecar","car"};
    cout << longestCommonPrefix(s2) << endl; // ""
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "fl\n",
      python: "fl\n",
      java: "fl\n",
      cpp: "fl\n",
    },
  },

  "isomorphic-strings": {
    id: "isomorphic-strings",
    title: "Isomorphic Strings",
    difficulty: "Easy",
    category: "String • Hash Table",
    description: {
      text: "Given two strings s and t, determine if they are isomorphic. Two strings s and t are isomorphic if the characters in s can be replaced to get t.",
      notes: [
        "All occurrences of a character must be replaced with another character while preserving the order of characters.",
        "No two characters may map to the same character, but a character may map to itself.",
      ],
    },
    examples: [
      { input: 's = "egg", t = "add"', output: "true" },
      { input: 's = "foo", t = "bar"', output: "false" },
      { input: 's = "paper", t = "title"', output: "true" },
    ],
    constraints: [
      "1 ≤ s.length ≤ 5 * 10⁴",
      "t.length == s.length",
      "s and t consist of any valid ASCII character",
    ],
    starterCode: {
      javascript: `function isIsomorphic(s, t) {
  // Write your solution here
  
}

// Test cases
console.log(isIsomorphic("egg", "add"));    // Expected: true
console.log(isIsomorphic("foo", "bar"));    // Expected: false
console.log(isIsomorphic("paper", "title")); // Expected: true`,
      python: `def isIsomorphic(s, t):
    # Write your solution here
    pass

# Test cases
print(isIsomorphic("egg", "add"))     # Expected: True
print(isIsomorphic("foo", "bar"))     # Expected: False
print(isIsomorphic("paper", "title")) # Expected: True`,
      java: `class Solution {
    public static boolean isIsomorphic(String s, String t) {
        // Write your solution here
        return false;
    }
    public static void main(String[] args) {
        System.out.println(isIsomorphic("egg", "add"));    // true
        System.out.println(isIsomorphic("foo", "bar"));    // false
        System.out.println(isIsomorphic("paper", "title")); // true
    }
}`,
      cpp: `#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;

bool isIsomorphic(string s, string t) {
    // Write your solution here
    return false;
}

int main() {
    cout << boolalpha;
    cout << isIsomorphic("egg","add") << endl;    // true
    cout << isIsomorphic("foo","bar") << endl;    // false
    cout << isIsomorphic("paper","title") << endl; // true
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "true\nfalse\ntrue",
      python: "True\nFalse\nTrue",
      java: "true\nfalse\ntrue",
      cpp: "true\nfalse\ntrue",
    },
  },

  "valid-anagram": {
    id: "valid-anagram",
    title: "Valid Anagram",
    difficulty: "Easy",
    category: "String • Hash Table • Sorting",
    description: {
      text: "Given two strings s and t, return true if t is an anagram of s, and false otherwise. An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
      notes: [],
    },
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: "true" },
      { input: 's = "rat", t = "car"', output: "false" },
    ],
    constraints: [
      "1 ≤ s.length, t.length ≤ 5 * 10⁴",
      "s and t consist of lowercase English letters",
    ],
    starterCode: {
      javascript: `function isAnagram(s, t) {
  // Write your solution here
  
}

// Test cases
console.log(isAnagram("anagram", "nagaram")); // Expected: true
console.log(isAnagram("rat", "car"));         // Expected: false`,
      python: `def isAnagram(s, t):
    # Write your solution here
    pass

# Test cases
print(isAnagram("anagram", "nagaram"))  # Expected: True
print(isAnagram("rat", "car"))          # Expected: False`,
      java: `class Solution {
    public static boolean isAnagram(String s, String t) {
        // Write your solution here
        return false;
    }
    public static void main(String[] args) {
        System.out.println(isAnagram("anagram", "nagaram")); // true
        System.out.println(isAnagram("rat", "car"));         // false
    }
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

bool isAnagram(string s, string t) {
    // Write your solution here
    return false;
}

int main() {
    cout << boolalpha;
    cout << isAnagram("anagram","nagaram") << endl; // true
    cout << isAnagram("rat","car") << endl;          // false
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "true\nfalse",
      python: "True\nFalse",
      java: "true\nfalse",
      cpp: "true\nfalse",
    },
  },

  "sort-characters-by-frequency": {
    id: "sort-characters-by-frequency",
    title: "Sort Characters By Frequency",
    difficulty: "Medium",
    category: "String • Hash Table • Sorting • Heap",
    description: {
      text: "Given a string s, sort it in decreasing order based on the frequency of the characters. The frequency of a character is the number of times it appears in the string. Return the sorted string. If there are multiple answers, return any of them.",
      notes: [],
    },
    examples: [
      {
        input: 's = "tree"',
        output: '"eert"',
        explanation:
          "'e' appears twice while 'r' and 't' both appear once. Therefore 'e' must appear before both 'r' and 't'. 'eetr' or 'eetr' are also valid answers.",
      },
      {
        input: 's = "cccaaa"',
        output: '"aaaccc"',
        explanation:
          "Both 'c' and 'a' appear three times, so both 'cccaaa' and 'aaaccc' are valid.",
      },
      { input: 's = "Aabb"', output: '"bbAa"' },
    ],
    constraints: [
      "1 ≤ s.length ≤ 5 * 10⁵",
      "s consists of uppercase and lowercase English letters and digits",
    ],
    starterCode: {
      javascript: `function frequencySort(s) {
  // Write your solution here
  
}

// Test cases
console.log(frequencySort("tree"));   // Expected: "eert" or "eetr"
console.log(frequencySort("cccaaa")); // Expected: "cccaaa" or "aaaccc"
console.log(frequencySort("Aabb"));   // Expected: "bbAa"`,
      python: `def frequencySort(s):
    # Write your solution here
    pass

# Test cases
print(frequencySort("tree"))    # Expected: "eert" or "eetr"
print(frequencySort("cccaaa"))  # Expected: "cccaaa" or "aaaccc"
print(frequencySort("Aabb"))    # Expected: "bbAa"`,
      java: `class Solution {
    public static String frequencySort(String s) {
        // Write your solution here
        return "";
    }
    public static void main(String[] args) {
        System.out.println(frequencySort("tree"));   // "eert" or "eetr"
        System.out.println(frequencySort("cccaaa")); // "cccaaa" or "aaaccc"
        System.out.println(frequencySort("Aabb"));   // "bbAa"
    }
}`,
      cpp: `#include <iostream>
#include <string>
#include <unordered_map>
#include <vector>
#include <algorithm>
using namespace std;

string frequencySort(string s) {
    // Write your solution here
    return "";
}

int main() {
    cout << frequencySort("tree") << endl;    // "eert" or "eetr"
    cout << frequencySort("cccaaa") << endl;  // "cccaaa" or "aaaccc"
    cout << frequencySort("Aabb") << endl;    // "bbAa"
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "eert\naaaccc\nbbAa",
      python: "eert\naaaccc\nbbAa",
      java: "eert\naaaccc\nbbAa",
      cpp: "eert\naaaccc\nbbAa",
    },
  },

  "maximum-nesting-depth-of-parentheses": {
    id: "maximum-nesting-depth-of-parentheses",
    title: "Maximum Nesting Depth of the Parentheses",
    difficulty: "Easy",
    category: "String • Stack",
    description: {
      text: "Given a valid parentheses string s, return the nesting depth of s. The nesting depth is the maximum depth of nested parentheses.",
      notes: [],
    },
    examples: [
      { input: 's = "(1+(2*3)+((8)/4))+1"', output: "3" },
      { input: 's = "(1)+((2))+(((3)))"', output: "3" },
    ],
    constraints: [
      "1 ≤ s.length ≤ 100",
      "s consists of digits 0-9 and characters '+', '-', '*', '/', '(', and ')'",
      "It is guaranteed that parentheses expression s is a VPS",
    ],
    starterCode: {
      javascript: `function maxDepth(s) {
  // Write your solution here
  
}

// Test cases
console.log(maxDepth("(1+(2*3)+((8)/4))+1")); // Expected: 3
console.log(maxDepth("(1)+((2))+(((3)))"));    // Expected: 3`,
      python: `def maxDepth(s):
    # Write your solution here
    pass

# Test cases
print(maxDepth("(1+(2*3)+((8)/4))+1"))  # Expected: 3
print(maxDepth("(1)+((2))+(((3)))"))     # Expected: 3`,
      java: `class Solution {
    public static int maxDepth(String s) {
        // Write your solution here
        return 0;
    }
    public static void main(String[] args) {
        System.out.println(maxDepth("(1+(2*3)+((8)/4))+1")); // 3
        System.out.println(maxDepth("(1)+((2))+(((3)))"));    // 3
    }
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

int maxDepth(string s) {
    // Write your solution here
    return 0;
}

int main() {
    cout << maxDepth("(1+(2*3)+((8)/4))+1") << endl; // 3
    cout << maxDepth("(1)+((2))+(((3)))") << endl;    // 3
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "3\n3",
      python: "3\n3",
      java: "3\n3",
      cpp: "3\n3",
    },
  },

  "roman-to-integer": {
    id: "roman-to-integer",
    title: "Roman to Integer",
    difficulty: "Easy",
    category: "String • Hash Table • Math",
    description: {
      text: "Given a roman numeral, convert it to an integer.",
      notes: [
        "I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1000",
        "IV = 4, IX = 9, XL = 40, XC = 90, CD = 400, CM = 900",
      ],
    },
    examples: [
      { input: 's = "III"', output: "3" },
      { input: 's = "LVIII"', output: "58", explanation: "L = 50, V= 5, III = 3." },
      {
        input: 's = "MCMXCIV"',
        output: "1994",
        explanation: "M = 1000, CM = 900, XC = 90 and IV = 4.",
      },
    ],
    constraints: [
      "1 ≤ s.length ≤ 15",
      "s contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M')",
      "It is guaranteed that s is a valid roman numeral in the range [1, 3999]",
    ],
    starterCode: {
      javascript: `function romanToInt(s) {
  // Write your solution here
  
}

// Test cases
console.log(romanToInt("III"));     // Expected: 3
console.log(romanToInt("LVIII"));   // Expected: 58
console.log(romanToInt("MCMXCIV")); // Expected: 1994`,
      python: `def romanToInt(s):
    # Write your solution here
    pass

# Test cases
print(romanToInt("III"))      # Expected: 3
print(romanToInt("LVIII"))    # Expected: 58
print(romanToInt("MCMXCIV"))  # Expected: 1994`,
      java: `class Solution {
    public static int romanToInt(String s) {
        // Write your solution here
        return 0;
    }
    public static void main(String[] args) {
        System.out.println(romanToInt("III"));     // 3
        System.out.println(romanToInt("LVIII"));   // 58
        System.out.println(romanToInt("MCMXCIV")); // 1994
    }
}`,
      cpp: `#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;

int romanToInt(string s) {
    // Write your solution here
    return 0;
}

int main() {
    cout << romanToInt("III") << endl;     // 3
    cout << romanToInt("LVIII") << endl;   // 58
    cout << romanToInt("MCMXCIV") << endl; // 1994
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "3\n58\n1994",
      python: "3\n58\n1994",
      java: "3\n58\n1994",
      cpp: "3\n58\n1994",
    },
  },

  "string-to-integer-atoi": {
    id: "string-to-integer-atoi",
    title: "String to Integer (atoi)",
    difficulty: "Medium",
    category: "String",
    description: {
      text: "Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer (similar to C/C++'s atoi function). The algorithm reads in whitespace, then an optional sign, then digits until a non-digit or end of string. Clamp the result to [-2³¹, 2³¹-1].",
      notes: [
        "Read and ignore leading whitespace.",
        "Check if the next character is '-' or '+'.",
        "Read in next characters until the next non-digit character or end of the input, convert these digits into an integer.",
        "If the integer is out of the 32-bit signed integer range [-2³¹, 2³¹ - 1], clamp the integer so that it remains in the range.",
      ],
    },
    examples: [
      { input: 's = "42"', output: "42" },
      { input: 's = "   -42"', output: "-42" },
      { input: 's = "4193 with words"', output: "4193" },
    ],
    constraints: [
      "0 ≤ s.length ≤ 200",
      "s consists of English letters (lower-case and upper-case), digits (0-9), ' ', '+', '-', and '.'",
    ],
    starterCode: {
      javascript: `function myAtoi(s) {
  // Write your solution here
  
}

// Test cases
console.log(myAtoi("42"));              // Expected: 42
console.log(myAtoi("   -42"));          // Expected: -42
console.log(myAtoi("4193 with words")); // Expected: 4193`,
      python: `def myAtoi(s):
    # Write your solution here
    pass

# Test cases
print(myAtoi("42"))               # Expected: 42
print(myAtoi("   -42"))           # Expected: -42
print(myAtoi("4193 with words"))  # Expected: 4193`,
      java: `class Solution {
    public static int myAtoi(String s) {
        // Write your solution here
        return 0;
    }
    public static void main(String[] args) {
        System.out.println(myAtoi("42"));              // 42
        System.out.println(myAtoi("   -42"));          // -42
        System.out.println(myAtoi("4193 with words")); // 4193
    }
}`,
      cpp: `#include <iostream>
#include <string>
#include <climits>
using namespace std;

int myAtoi(string s) {
    // Write your solution here
    return 0;
}

int main() {
    cout << myAtoi("42") << endl;              // 42
    cout << myAtoi("   -42") << endl;          // -42
    cout << myAtoi("4193 with words") << endl; // 4193
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "42\n-42\n4193",
      python: "42\n-42\n4193",
      java: "42\n-42\n4193",
      cpp: "42\n-42\n4193",
    },
  },

  // ╔══════════════════════════════════════╗
  // ║       STRINGS  –  MEDIUM (5)         ║
  // ╚══════════════════════════════════════╝

  "valid-palindrome": {
    id: "valid-palindrome",
    title: "Valid Palindrome",
    difficulty: "Easy",
    category: "String • Two Pointers",
    description: {
      text: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Given a string s, return true if it is a palindrome, or false otherwise.",
      notes: [],
    },
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: "true",
        explanation: '"amanaplanacanalpanama" is a palindrome.',
      },
      { input: 's = "race a car"', output: "false" },
      { input: 's = " "', output: "true" },
    ],
    constraints: ["1 ≤ s.length ≤ 2 * 10⁵", "s consists only of printable ASCII characters"],
    starterCode: {
      javascript: `function isPalindrome(s) {
  // Write your solution here
  
}

// Test cases
console.log(isPalindrome("A man, a plan, a canal: Panama")); // Expected: true
console.log(isPalindrome("race a car")); // Expected: false
console.log(isPalindrome(" "));          // Expected: true`,
      python: `def isPalindrome(s):
    # Write your solution here
    pass

# Test cases
print(isPalindrome("A man, a plan, a canal: Panama"))  # Expected: True
print(isPalindrome("race a car"))  # Expected: False
print(isPalindrome(" "))           # Expected: True`,
      java: `class Solution {
    public static boolean isPalindrome(String s) {
        // Write your solution here
        return false;
    }
    public static void main(String[] args) {
        System.out.println(isPalindrome("A man, a plan, a canal: Panama")); // true
        System.out.println(isPalindrome("race a car")); // false
        System.out.println(isPalindrome(" "));          // true
    }
}`,
      cpp: `#include <iostream>
#include <string>
#include <cctype>
using namespace std;

bool isPalindrome(string s) {
    // Write your solution here
    return false;
}

int main() {
    cout << boolalpha;
    cout << isPalindrome("A man, a plan, a canal: Panama") << endl; // true
    cout << isPalindrome("race a car") << endl; // false
    cout << isPalindrome(" ") << endl;          // true
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "true\nfalse\ntrue",
      python: "True\nFalse\nTrue",
      java: "true\nfalse\ntrue",
      cpp: "true\nfalse\ntrue",
    },
  },

  "longest-palindromic-substring": {
    id: "longest-palindromic-substring",
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    category: "String • Dynamic Programming • Two Pointers",
    description: {
      text: "Given a string s, return the longest palindromic substring in s.",
      notes: [],
    },
    examples: [
      { input: 's = "babad"', output: '"bab"', explanation: '"aba" is also a valid answer.' },
      { input: 's = "cbbd"', output: '"bb"' },
    ],
    constraints: ["1 ≤ s.length ≤ 1000", "s consist of only digits and English letters"],
    starterCode: {
      javascript: `function longestPalindrome(s) {
  // Write your solution here
  
}

// Test cases
console.log(longestPalindrome("babad")); // Expected: "bab" or "aba"
console.log(longestPalindrome("cbbd"));  // Expected: "bb"`,
      python: `def longestPalindrome(s):
    # Write your solution here
    pass

# Test cases
print(longestPalindrome("babad"))  # Expected: "bab" or "aba"
print(longestPalindrome("cbbd"))   # Expected: "bb"`,
      java: `class Solution {
    public static String longestPalindrome(String s) {
        // Write your solution here
        return "";
    }
    public static void main(String[] args) {
        System.out.println(longestPalindrome("babad")); // "bab" or "aba"
        System.out.println(longestPalindrome("cbbd"));  // "bb"
    }
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

string longestPalindrome(string s) {
    // Write your solution here
    return "";
}

int main() {
    cout << longestPalindrome("babad") << endl; // "bab" or "aba"
    cout << longestPalindrome("cbbd") << endl;  // "bb"
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "bab\nbb",
      python: "bab\nbb",
      java: "bab\nbb",
      cpp: "bab\nbb",
    },
  },

  "sum-of-beauty-of-all-substrings": {
    id: "sum-of-beauty-of-all-substrings",
    title: "Sum of Beauty of All Substrings",
    difficulty: "Medium",
    category: "String • Hash Table",
    description: {
      text: "The beauty of a string is the difference in frequencies between the most frequent and least frequent characters. Given a string s, return the sum of beauty of all of its substrings.",
      notes: [],
    },
    examples: [
      {
        input: 's = "aabcb"',
        output: "5",
        explanation:
          'The substrings with non-zero beauty are: ["aab","aabc","aabcb","abcb","bcb"], each having beauty 1.',
      },
      { input: 's = "aabcbaa"', output: "17" },
    ],
    constraints: ["1 ≤ s.length ≤ 500", "s consists of only lowercase English letters"],
    starterCode: {
      javascript: `function beautySum(s) {
  // Write your solution here
  
}

// Test cases
console.log(beautySum("aabcb"));   // Expected: 5
console.log(beautySum("aabcbaa")); // Expected: 17`,
      python: `def beautySum(s):
    # Write your solution here
    pass

# Test cases
print(beautySum("aabcb"))    # Expected: 5
print(beautySum("aabcbaa"))  # Expected: 17`,
      java: `class Solution {
    public static int beautySum(String s) {
        // Write your solution here
        return 0;
    }
    public static void main(String[] args) {
        System.out.println(beautySum("aabcb"));   // 5
        System.out.println(beautySum("aabcbaa")); // 17
    }
}`,
      cpp: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int beautySum(string s) {
    // Write your solution here
    return 0;
}

int main() {
    cout << beautySum("aabcb") << endl;   // 5
    cout << beautySum("aabcbaa") << endl; // 17
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "5\n17",
      python: "5\n17",
      java: "5\n17",
      cpp: "5\n17",
    },
  },

  "minimum-add-to-make-parentheses-valid": {
    id: "minimum-add-to-make-parentheses-valid",
    title: "Minimum Add to Make Parentheses Valid",
    difficulty: "Medium",
    category: "String • Stack • Greedy",
    description: {
      text: "A parentheses string is valid if and only if every opening bracket '(' has a corresponding closing bracket ')'. Given a parentheses string s, in one move you can insert a parenthesis at any position of the string. Return the minimum number of moves required to make s valid.",
      notes: [],
    },
    examples: [
      { input: 's = "())"', output: "1" },
      { input: 's = "((("', output: "3" },
    ],
    constraints: ["1 ≤ s.length ≤ 1000", "s[i] is either '(' or ')'"],
    starterCode: {
      javascript: `function minAddToMakeValid(s) {
  // Write your solution here
  
}

// Test cases
console.log(minAddToMakeValid("())"));  // Expected: 1
console.log(minAddToMakeValid("((("));  // Expected: 3`,
      python: `def minAddToMakeValid(s):
    # Write your solution here
    pass

# Test cases
print(minAddToMakeValid("())"))  # Expected: 1
print(minAddToMakeValid("((("))  # Expected: 3`,
      java: `class Solution {
    public static int minAddToMakeValid(String s) {
        // Write your solution here
        return 0;
    }
    public static void main(String[] args) {
        System.out.println(minAddToMakeValid("())"));  // 1
        System.out.println(minAddToMakeValid("((("));  // 3
    }
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

int minAddToMakeValid(string s) {
    // Write your solution here
    return 0;
}

int main() {
    cout << minAddToMakeValid("())") << endl;  // 1
    cout << minAddToMakeValid("(((") << endl;  // 3
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "1\n3",
      python: "1\n3",
      java: "1\n3",
      cpp: "1\n3",
    },
  },

  "count-and-say": {
    id: "count-and-say",
    title: "Count and Say",
    difficulty: "Medium",
    category: "String",
    description: {
      text: 'The count-and-say sequence is a sequence of digit strings defined by the recursive formula: countAndSay(1) = "1", countAndSay(n) is the run-length encoding of countAndSay(n - 1). Run-length encoding (RLE) is a string compression method that works by replacing consecutive identical characters (repeated 2 or more times) with the concatenation of the character and the number marking the count of the characters (length of the run). Given a positive integer n, return the nth element of the count-and-say sequence.',
      notes: [],
    },
    examples: [
      { input: "n = 1", output: '"1"' },
      {
        input: "n = 4",
        output: '"1211"',
        explanation:
          'countAndSay(1) = "1", countAndSay(2) = "11", countAndSay(3) = "21", countAndSay(4) = "1211".',
      },
    ],
    constraints: ["1 ≤ n ≤ 30"],
    starterCode: {
      javascript: `function countAndSay(n) {
  // Write your solution here
  
}

// Test cases
console.log(countAndSay(1)); // Expected: "1"
console.log(countAndSay(4)); // Expected: "1211"
console.log(countAndSay(5)); // Expected: "111221"`,
      python: `def countAndSay(n):
    # Write your solution here
    pass

# Test cases
print(countAndSay(1))  # Expected: "1"
print(countAndSay(4))  # Expected: "1211"
print(countAndSay(5))  # Expected: "111221"`,
      java: `class Solution {
    public static String countAndSay(int n) {
        // Write your solution here
        return "";
    }
    public static void main(String[] args) {
        System.out.println(countAndSay(1)); // "1"
        System.out.println(countAndSay(4)); // "1211"
        System.out.println(countAndSay(5)); // "111221"
    }
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

string countAndSay(int n) {
    // Write your solution here
    return "";
}

int main() {
    cout << countAndSay(1) << endl; // "1"
    cout << countAndSay(4) << endl; // "1211"
    cout << countAndSay(5) << endl; // "111221"
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "1\n1211\n111221",
      python: "1\n1211\n111221",
      java: "1\n1211\n111221",
      cpp: "1\n1211\n111221",
    },
  },
};

// ──────────────────────────────────────────
export const LANGUAGE_CONFIG = {
  javascript: {
    name: "JavaScript",
    icon: "/javascript.png",
    monacoLang: "javascript",
  },
  python: {
    name: "Python",
    icon: "/python.png",
    monacoLang: "python",
  },
  java: {
    name: "Java",
    icon: "/java.png",
    monacoLang: "java",
  },
  cpp: {
    name: "C++",
    icon: "/cpp.png",
    monacoLang: "cpp",
  },
};
