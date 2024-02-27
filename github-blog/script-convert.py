import json

# Example content from the <textarea>
textarea_content = """
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        latestIndexOfChar = {}
        res = 0
        i=0
        for j, char in enumerate(s):
            if char in latestIndexOfChar and latestIndexOfChar[char] >= i:
                res = max(res, j-i)
                i = latestIndexOfChar[char] + 1
            latestIndexOfChar[char] = j
        res = max(res, len(s)-i)
        return res
"""

# Serialize the content into JSON format
json_content = json.dumps({'content': textarea_content})

print(json_content)