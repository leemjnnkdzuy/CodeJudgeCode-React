export const SUPPORTED_LANGUAGES = {
	python: {
		template: `def solution():
    # Your code here
    pass

# Test your solution
print(solution())`,
		displayName: "Python",
	},
	javascript: {
		template: `function solution() {
    // Your code here
}

// Test your solution
console.log(solution());`,
		displayName: "JavaScript",
	},
	"c/c++": {
		template: `#include <iostream>
using namespace std;

int main() {
    // Your code here
    return 0;
}`,
		displayName: "C/C++",
	},
	java: {
		template: `public class Solution {
    public static void main(String[] args) {
        // Your code here
    }
}`,
		displayName: "Java",
	},
};
