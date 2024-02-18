import json

# Example content from the <textarea>
textarea_content = """
function twoSum(nums: number[], target: number): number[] {
    const valueToIndex = new Map<number, number>();

    for(let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if(valueToIndex.has(complement)) 
            return [valueToIndex.get(complement), i]
        valueToIndex.set(nums[i], i);
    }
}
"""

# Serialize the content into JSON format
json_content = json.dumps({'content': textarea_content})

print(json_content)