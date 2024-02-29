import { Solution } from "../solution.type";

export const solution: Solution =  
{
  "two-sum": {
    python: "\nclass Solution: \ndef twoSum(self, nums: List[int], target: int) -> List[int]:\n    valueToIndexMap = {}\n    for i,num in enumerate(nums):\n        complement = target - num\n        if complement not in valueToIndexMap:\n            valueToIndexMap[num]= i\n        else:\n            return [i, valueToIndexMap[complement]]\n    return []\n",
    typescript: "\nfunction twoSum(nums: number[], target: number): number[] {\n    const valueToIndex = new Map<number, number>();\n\n    for(let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if(valueToIndex.has(complement)) \n            return [valueToIndex.get(complement), i]\n        valueToIndex.set(nums[i], i);\n    }\n}\n"
  },
  "longest-substring-without-repeating-characters": {
    python: "\nclass Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        latestIndexOfChar = {}\n        res = 0\n        i=0\n        for j, char in enumerate(s):\n            if char in latestIndexOfChar and latestIndexOfChar[char] >= i:\n                res = max(res, j-i)\n                i = latestIndexOfChar[char] + 1\n            latestIndexOfChar[char] = j\n        res = max(res, len(s)-i)\n        return res\n",
    typescript: '\nfunction lengthOfLongestSubstring(s: string): number {\n    const latestIndexOfValue = new Map<string, number>();\n    var i = 0;\n    var res = 0;\n    for(let j = 0; j < s.length; j++){\n        const char = s[j];\n        if(latestIndexOfValue.has(char) && latestIndexOfValue.get(char)>=i) {\n            res = Math.max(res, j-i);\n            i = latestIndexOfValue.get(char) + 1\n        }\n        latestIndexOfValue.set(char, j)\n    }\n    res = Math.max(res, s.length - i )\n    return res\n};\n\n'
  },
  "longest-palindromic-substring": {
    python: "\nclass Solution:\n    def longestPalindrome(self, s: str) -> str:\n        res = [0,0]\n        maxLength = 0\n        for i in range(2*len(s)-1):\n            center = i // 2\n            left = center + i % 2 - 1\n            right = center + 1\n            while left >= 0 and right <= (len(s) -1) and s[left] == s[right]:\n                left-=1\n                right+=1\n            res = [left, right] if (maxLength < right-left-1) else res\n            maxLength = max(maxLength, right-left-1)\n        return s[res[0]+1: res[1]]\n",
    typescript: "\nfunction longestPalindrome(s: string): string {\n    var res = '';\n    function longestExpandFrom(left: number, right: number) {\n        while (left >= 0 && right < s.length && s[right] === s[left]) {\n            left -= 1;\n            right += 1;\n        }\n        return s.slice(left+1, right)\n    }\n    for (let i = 0; i < s.length; i++) {\n        res = [longestExpandFrom(i, i), longestExpandFrom(i, i+1), res].reduce((a, b) => \n            a.length > b.length ? a : b, \"\");\n    }\n    return res\n};\n"
  },
  "container-with-most-water": {
    python: "nclass Solution:\n    def maxArea(self, height: List[int]) -> int:\n        res = 0\n        left = 0\n        right = len(height) - 1\n        while left < right:\n            currentArea = (right - left) * min(height[left], height[right])\n            res = max(currentArea, res)\n            direction = height[left] < height[right]\n            left += direction\n            right -= not direction\n        return res\n",
    typescript: "",
  }

}
