import { Solution } from "../solution.type";

export const solution: Solution =  
{
  "two-sum": {
    python: "\nclass Solution: \ndef twoSum(self, nums: List[int], target: int) -> List[int]:\n    valueToIndexMap = {}\n    for i,num in enumerate(nums):\n        complement = target - num\n        if complement not in valueToIndexMap:\n            valueToIndexMap[num]= i\n        else:\n            return [i, valueToIndexMap[complement]]\n    return []\n",
    typescript: "\nfunction twoSum(nums: number[], target: number): number[] {\n    const valueToIndex = new Map<number, number>();\n\n    for(let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if(valueToIndex.has(complement)) \n            return [valueToIndex.get(complement), i]\n        valueToIndex.set(nums[i], i);\n    }\n}\n"
  },
  "longest-substring-without-repeating-characters": {
    python: "\nclass Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        if len(s) == 1:\n            return 1\n        latestIndexOfChar = {}\n        res = 0\n        i=0\n        for j, char in enumerate(s):\n            if char in latestIndexOfChar and latestIndexOfChar[char] >= i:\n                res = max(res, j-i)\n                i = latestIndexOfChar[char] + 1\n            latestIndexOfChar[char] = j\n        res = max(res, len(s)-i)\n        return res\n",
    typescript: '\nfunction lengthOfLongestSubstring(s: string): number {\n    if (s.length === 1)\n        return 1;\n    const latestIndexOfValue = new Map<string, number>();\n    var i = 0;\n    var res = 0;\n\n    for(let j = 0; j < s.length; j++){\n        const char = s[j];\n        if(latestIndexOfValue.has(char) && latestIndexOfValue.get(char)>=i) {\n            res = Math.max(res, j-i);\n            i = latestIndexOfValue.get(char) + 1\n        }\n        latestIndexOfValue.set(char, j)\n    }\n    res = Math.max(res, s.length - i )\n    return res\n};\n'
  }
}
