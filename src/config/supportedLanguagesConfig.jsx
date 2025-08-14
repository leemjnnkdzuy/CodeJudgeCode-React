export const SUPPORTED_LANGUAGES = {
    'python': {
        'template': `def solution():
    # Your code here
    pass

# Test your solution
print(solution())`
    },
    'javascript': {
        'template': `function solution() {
    // Your code here
}

// Test your solution
console.log(solution());`
    },
    'cpp': {
        'template': `#include <iostream>
using namespace std;

int main() {
    // Your code here
    return 0;
}`
    },
    'java': {
        'template': `public class Solution {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}`
    }
};
