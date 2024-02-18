import { Solution } from "../solution.type";

export const solution: Solution =  
{
  "two-sum": {
    python: "\nclass Solution: \ndef twoSum(self, nums: List[int], target: int) -> List[int]:\n    valueToIndexMap = {}\n    for i,num in enumerate(nums):\n        complement = target - num\n        if complement not in valueToIndexMap:\n            valueToIndexMap[num]= i\n        else:\n            return [i, valueToIndexMap[complement]]\n    return []\n",
    typescript: "\nfunction twoSum(nums: number[], target: number): number[] {\n    const valueToIndex = new Map<number, number>();\n\n    for(let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if(valueToIndex.has(complement)) \n            return [valueToIndex.get(complement), i]\n        valueToIndex.set(nums[i], i);\n    }\n}\n"
  }
}
