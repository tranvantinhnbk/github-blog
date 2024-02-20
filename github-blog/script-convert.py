import json

# Example content from the <textarea>
textarea_content = """
function lengthOfLongestSubstring(s: string): number {
    if (s.length === 1)
        return 1;
    const latestIndexOfValue = new Map<string, number>();
    var i = 0;
    var res = 0;

    for(let j = 0; j < s.length; j++){
        const char = s[j];
        if(latestIndexOfValue.has(char) && latestIndexOfValue.get(char)>=i) {
            res = Math.max(res, j-i);
            i = latestIndexOfValue.get(char) + 1
        }
        latestIndexOfValue.set(char, j)
    }
    res = Math.max(res, s.length - i )
    return res
};
"""

# Serialize the content into JSON format
json_content = json.dumps({'content': textarea_content})

print(json_content)