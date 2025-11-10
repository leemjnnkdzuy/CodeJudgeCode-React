import {
	BiGridAlt,
	BiText,
	BiHash,
	BiTrendingUp,
	BiCalculator,
	BiSortAlt2,
	BiTargetLock,
	BiGitBranch,
	BiSearchAlt,
	BiData,
	BiGrid,
	BiExpandHorizontal,
	BiPointer,
	BiPlus,
	BiLayer,
	BiPlayCircle,
	BiShareAlt,
	BiListOl,
	BiWindow,
	BiCube,
	BiListUl,
	BiUndo,
	BiLink,
	BiListCheck,
	BiMath,
	BiSortDown,
	BiTrendingDown,
	BiShuffle,
	BiMask,
	BiRightArrowAlt,
	BiRefresh,
	BiShapeTriangle,
	BiBookmark,
	BiNavigation,
	BiSearch,
	BiSort,
	BiJoystick,
	BiChat,
	BiTransfer,
	BiBrain,
	BiLinkAlt,
	BiMerge,
	BiRepeat,
	BiTimer,
	BiBarChart,
	BiSelectMultiple,
	BiScan,
	BiTerminal,
	BiDroplet,
	BiXCircle,
	BiGitMerge,
} from "react-icons/bi";

const TYPE_PROBLEM = {
	Array: {
		name: {
			vi: "Mảng",
			en: "Array",
		},
		description: {
			vi: "Bài toán liên quan đến xử lý mảng.",
			en: "Problems related to array manipulation and processing.",
		},
		icon: BiGridAlt,
	},
	String: {
		name: {
			vi: "Chuỗi",
			en: "String",
		},
		description: {
			vi: "Bài toán liên quan đến xử lý chuỗi.",
			en: "Problems related to string manipulation and processing.",
		},
		icon: BiText,
	},
	Hash_Table: {
		name: {
			vi: "Bảng Băm",
			en: "Hash Table",
		},
		description: {
			vi: "Bài toán liên quan đến cấu trúc dữ liệu bảng băm.",
			en: "Problems related to hash table data structure.",
		},
		icon: BiHash,
	},
	Dynamic_Programming: {
		name: {
			vi: "Quy Hoạch Động",
			en: "Dynamic Programming",
		},
		description: {
			vi: "Bài toán sử dụng kỹ thuật quy hoạch động.",
			en: "Problems using dynamic programming technique.",
		},
		icon: BiTrendingUp,
	},
	Math: {
		name: {
			vi: "Toán Học",
			en: "Math",
		},
		description: {
			vi: "Bài toán liên quan đến toán học.",
			en: "Problems related to mathematics.",
		},
		icon: BiCalculator,
	},
	Sorting: {
		name: {
			vi: "Sắp Xếp",
			en: "Sorting",
		},
		description: {
			vi: "Bài toán liên quan đến thuật toán sắp xếp.",
			en: "Problems related to sorting algorithms.",
		},
		icon: BiSortAlt2,
	},
	Greedy: {
		name: {
			vi: "Tham Lam",
			en: "Greedy",
		},
		description: {
			vi: "Bài toán sử dụng thuật toán tham lam.",
			en: "Problems using greedy algorithm approach.",
		},
		icon: BiTargetLock,
	},
	Depth_First_Search: {
		name: {
			vi: "Tìm Kiếm Theo Chiều Sâu",
			en: "Depth-First Search",
		},
		description: {
			vi: "Bài toán sử dụng thuật toán DFS.",
			en: "Problems using Depth-First Search (DFS) algorithm.",
		},
		icon: BiGitBranch,
	},
	Binary_Search: {
		name: {
			vi: "Tìm Kiếm Nhị Phân",
			en: "Binary Search",
		},
		description: {
			vi: "Bài toán sử dụng thuật toán tìm kiếm nhị phân.",
			en: "Problems using binary search algorithm.",
		},
		icon: BiSearchAlt,
	},
	Database: {
		name: {
			vi: "Cơ Sở Dữ Liệu",
			en: "Database",
		},
		description: {
			vi: "Bài toán liên quan đến cơ sở dữ liệu.",
			en: "Problems related to database design and SQL.",
		},
		icon: BiData,
	},
	Matrix: {
		name: {
			vi: "Ma Trận",
			en: "Matrix",
		},
		description: {
			vi: "Bài toán liên quan đến xử lý ma trận.",
			en: "Problems related to matrix manipulation.",
		},
		icon: BiGrid,
	},
	Tree: {
		name: {
			vi: "Cây",
			en: "Tree",
		},
		description: {
			vi: "Bài toán liên quan đến cấu trúc dữ liệu cây.",
			en: "Problems related to tree data structure.",
		},
		icon: BiGitBranch,
	},
	Breadth_First_Search: {
		name: {
			vi: "Tìm Kiếm Theo Chiều Rộng",
			en: "Breadth-First Search",
		},
		description: {
			vi: "Bài toán sử dụng thuật toán BFS.",
			en: "Problems using Breadth-First Search (BFS) algorithm.",
		},
		icon: BiExpandHorizontal,
	},
	Bit_Manipulation: {
		name: {
			vi: "Thao Tác Bit",
			en: "Bit Manipulation",
		},
		description: {
			vi: "Bài toán liên quan đến thao tác trên bit.",
			en: "Problems related to bit manipulation operations.",
		},
		icon: BiMask,
	},
	Two_Pointers: {
		name: {
			vi: "Hai Con Trỏ",
			en: "Two Pointers",
		},
		description: {
			vi: "Bài toán sử dụng kỹ thuật hai con trỏ.",
			en: "Problems using two pointers technique.",
		},
		icon: BiPointer,
	},
	Prefix_Sum: {
		name: {
			vi: "Tổng Tiền Tố",
			en: "Prefix Sum",
		},
		description: {
			vi: "Bài toán sử dụng kỹ thuật tổng tiền tố.",
			en: "Problems using prefix sum technique.",
		},
		icon: BiPlus,
	},
	Heap_Priority_Queue: {
		name: {
			vi: "Heap (Hàng Đợi Ưu Tiên)",
			en: "Heap/Priority Queue",
		},
		description: {
			vi: "Bài toán sử dụng cấu trúc dữ liệu heap.",
			en: "Problems using heap or priority queue data structure.",
		},
		icon: BiLayer,
	},
	Simulation: {
		name: {
			vi: "Mô Phỏng",
			en: "Simulation",
		},
		description: {
			vi: "Bài toán mô phỏng quá trình.",
			en: "Problems involving process simulation.",
		},
		icon: BiPlayCircle,
	},
	Binary_Tree: {
		name: {
			vi: "Cây Nhị Phân",
			en: "Binary Tree",
		},
		description: {
			vi: "Bài toán liên quan đến cây nhị phân.",
			en: "Problems related to binary tree.",
		},
		icon: BiGitBranch,
	},
	Graph: {
		name: {
			vi: "Đồ Thị",
			en: "Graph",
		},
		description: {
			vi: "Bài toán liên quan đến lý thuyết đồ thị.",
			en: "Problems related to graph theory.",
		},
		icon: BiShareAlt,
	},
	Stack: {
		name: {
			vi: "Ngăn Xếp",
			en: "Stack",
		},
		description: {
			vi: "Bài toán sử dụng cấu trúc dữ liệu ngăn xếp.",
			en: "Problems using stack data structure.",
		},
		icon: BiLayer,
	},
	Counting: {
		name: {
			vi: "Đếm",
			en: "Counting",
		},
		description: {
			vi: "Bài toán liên quan đến đếm số lượng.",
			en: "Problems related to counting combinatorics.",
		},
		icon: BiListOl,
	},
	Sliding_Window: {
		name: {
			vi: "Cửa Sổ Trượt",
			en: "Sliding Window",
		},
		description: {
			vi: "Bài toán sử dụng kỹ thuật cửa sổ trượt.",
			en: "Problems using sliding window technique.",
		},
		icon: BiWindow,
	},
	Design: {
		name: {
			vi: "Thiết Kế",
			en: "Design",
		},
		description: {
			vi: "Bài toán thiết kế cấu trúc dữ liệu.",
			en: "Problems involving data structure design.",
		},
		icon: BiCube,
	},
	Enumeration: {
		name: {
			vi: "Liệt Kê",
			en: "Enumeration",
		},
		description: {
			vi: "Bài toán liệt kê các khả năng.",
			en: "Problems involving enumeration of possibilities.",
		},
		icon: BiListUl,
	},
	Backtracking: {
		name: {
			vi: "Quay Lui",
			en: "Backtracking",
		},
		description: {
			vi: "Bài toán sử dụng thuật toán quay lui.",
			en: "Problems using backtracking algorithm.",
		},
		icon: BiUndo,
	},
	Union_Find: {
		name: {
			vi: "Union Find",
			en: "Union Find",
		},
		description: {
			vi: "Bài toán sử dụng cấu trúc dữ liệu Union Find.",
			en: "Problems using Union Find (Disjoint Set Union) data structure.",
		},
		icon: BiLink,
	},
	Linked_List: {
		name: {
			vi: "Danh Sách Liên Kết",
			en: "Linked List",
		},
		description: {
			vi: "Bài toán liên quan đến danh sách liên kết.",
			en: "Problems related to linked list data structure.",
		},
		icon: BiListCheck,
	},
	Number_Theory: {
		name: {
			vi: "Lý Thuyết Số",
			en: "Number Theory",
		},
		description: {
			vi: "Bài toán liên quan đến lý thuyết số.",
			en: "Problems related to number theory.",
		},
		icon: BiMath,
	},
	Ordered_Set: {
		name: {
			vi: "Tập Có Thứ Tự",
			en: "Ordered Set",
		},
		description: {
			vi: "Bài toán sử dụng tập có thứ tự.",
			en: "Problems using ordered set data structure.",
		},
		icon: BiSortDown,
	},
	Monotonic_Stack: {
		name: {
			vi: "Ngăn Xếp Đơn Điệu",
			en: "Monotonic Stack",
		},
		description: {
			vi: "Bài toán sử dụng ngăn xếp đơn điệu.",
			en: "Problems using monotonic stack technique.",
		},
		icon: BiTrendingDown,
	},
	Segment_Tree: {
		name: {
			vi: "Cây Phân Đoạn",
			en: "Segment Tree",
		},
		description: {
			vi: "Bài toán sử dụng cây phân đoạn.",
			en: "Problems using segment tree data structure.",
		},
		icon: BiGitBranch,
	},
	Trie: {
		name: {
			vi: "Trie",
			en: "Trie",
		},
		description: {
			vi: "Bài toán sử dụng cấu trúc dữ liệu Trie.",
			en: "Problems using Trie (prefix tree) data structure.",
		},
		icon: BiGitBranch,
	},
	Combinatorics: {
		name: {
			vi: "Tổ Hợp",
			en: "Combinatorics",
		},
		description: {
			vi: "Bài toán liên quan đến tổ hợp.",
			en: "Problems related to combinatorics.",
		},
		icon: BiShuffle,
	},
	Bitmask: {
		name: {
			vi: "Mặt Nạ Bit",
			en: "Bitmask",
		},
		description: {
			vi: "Bài toán sử dụng kỹ thuật bitmask.",
			en: "Problems using bitmask technique.",
		},
		icon: BiMask,
	},
	Queue: {
		name: {
			vi: "Hàng Đợi",
			en: "Queue",
		},
		description: {
			vi: "Bài toán sử dụng cấu trúc dữ liệu hàng đợi.",
			en: "Problems using queue data structure.",
		},
		icon: BiRightArrowAlt,
	},
	Recursion: {
		name: {
			vi: "Đệ Quy",
			en: "Recursion",
		},
		description: {
			vi: "Bài toán sử dụng kỹ thuật đệ quy.",
			en: "Problems using recursion technique.",
		},
		icon: BiRefresh,
	},
	Divide_and_Conquer: {
		name: {
			vi: "Chia Để Trị",
			en: "Divide and Conquer",
		},
		description: {
			vi: "Bài toán sử dụng thuật toán chia để trị.",
			en: "Problems using divide and conquer algorithm.",
		},
		icon: BiGitMerge,
	},
	Geometry: {
		name: {
			vi: "Hình Học",
			en: "Geometry",
		},
		description: {
			vi: "Bài toán liên quan đến hình học.",
			en: "Problems related to geometry.",
		},
		icon: BiShapeTriangle,
	},
	Binary_Indexed_Tree: {
		name: {
			vi: "Cây Chỉ Số Nhị Phân",
			en: "Binary Indexed Tree",
		},
		description: {
			vi: "Bài toán sử dụng cây chỉ số nhị phân.",
			en: "Problems using Binary Indexed Tree (Fenwick Tree).",
		},
		icon: BiGitBranch,
	},
	Memoization: {
		name: {
			vi: "Ghi Nhớ",
			en: "Memoization",
		},
		description: {
			vi: "Bài toán sử dụng kỹ thuật ghi nhớ.",
			en: "Problems using memoization technique.",
		},
		icon: BiBookmark,
	},
	Hash_Function: {
		name: {
			vi: "Hàm Băm",
			en: "Hash Function",
		},
		description: {
			vi: "Bài toán sử dụng hàm băm.",
			en: "Problems using hash function.",
		},
		icon: BiHash,
	},
	Binary_Search_Tree: {
		name: {
			vi: "Cây Tìm Kiếm Nhị Phân",
			en: "Binary Search Tree",
		},
		description: {
			vi: "Bài toán liên quan đến cây tìm kiếm nhị phân.",
			en: "Problems related to binary search tree.",
		},
		icon: BiGitBranch,
	},
	Shortest_Path: {
		name: {
			vi: "Đường Đi Ngắn Nhất",
			en: "Shortest Path",
		},
		description: {
			vi: "Bài toán tìm đường đi ngắn nhất.",
			en: "Problems finding shortest path.",
		},
		icon: BiNavigation,
	},
	String_Matching: {
		name: {
			vi: "Khớp Chuỗi",
			en: "String Matching",
		},
		description: {
			vi: "Bài toán khớp mẫu chuỗi.",
			en: "Problems involving string pattern matching.",
		},
		icon: BiSearch,
	},
	Topological_Sort: {
		name: {
			vi: "Sắp Xếp Tô-pô",
			en: "Topological Sort",
		},
		description: {
			vi: "Bài toán sắp xếp tô-pô.",
			en: "Problems involving topological sorting.",
		},
		icon: BiSort,
	},
	Rolling_Hash: {
		name: {
			vi: "Băm Cuộn",
			en: "Rolling Hash",
		},
		description: {
			vi: "Bài toán sử dụng kỹ thuật băm cuộn.",
			en: "Problems using rolling hash technique.",
		},
		icon: BiRefresh,
	},
	Game_Theory: {
		name: {
			vi: "Lý Thuyết Trò Chơi",
			en: "Game Theory",
		},
		description: {
			vi: "Bài toán liên quan đến lý thuyết trò chơi.",
			en: "Problems related to game theory.",
		},
		icon: BiJoystick,
	},
	Interactive: {
		name: {
			vi: "Tương Tác",
			en: "Interactive",
		},
		description: {
			vi: "Bài toán tương tác với hệ thống.",
			en: "Interactive problems with system.",
		},
		icon: BiChat,
	},
	Data_Stream: {
		name: {
			vi: "Luồng Dữ Liệu",
			en: "Data Stream",
		},
		description: {
			vi: "Bài toán xử lý luồng dữ liệu.",
			en: "Problems involving data stream processing.",
		},
		icon: BiTransfer,
	},
	Monotonic_Queue: {
		name: {
			vi: "Hàng Đợi Đơn Điệu",
			en: "Monotonic Queue",
		},
		description: {
			vi: "Bài toán sử dụng hàng đợi đơn điệu.",
			en: "Problems using monotonic queue technique.",
		},
		icon: BiTrendingDown,
	},
	Brainteaser: {
		name: {
			vi: "Câu Đố",
			en: "Brainteaser",
		},
		description: {
			vi: "Bài toán câu đố logic.",
			en: "Logic puzzle problems.",
		},
		icon: BiBrain,
	},
	Doubly_Linked_List: {
		name: {
			vi: "Danh Sách Liên Kết Đôi",
			en: "Doubly Linked List",
		},
		description: {
			vi: "Bài toán liên quan đến danh sách liên kết đôi.",
			en: "Problems related to doubly linked list.",
		},
		icon: BiLinkAlt,
	},
	Randomized: {
		name: {
			vi: "Ngẫu Nhiên",
			en: "Randomized",
		},
		description: {
			vi: "Bài toán sử dụng thuật toán ngẫu nhiên.",
			en: "Problems using randomized algorithms.",
		},
		icon: BiShuffle,
	},
	Merge_Sort: {
		name: {
			vi: "Sắp Xếp Trộn",
			en: "Merge Sort",
		},
		description: {
			vi: "Bài toán sử dụng thuật toán sắp xếp trộn.",
			en: "Problems using merge sort algorithm.",
		},
		icon: BiMerge,
	},
	Counting_Sort: {
		name: {
			vi: "Sắp Xếp Đếm",
			en: "Counting Sort",
		},
		description: {
			vi: "Bài toán sử dụng thuật toán sắp xếp đếm.",
			en: "Problems using counting sort algorithm.",
		},
		icon: BiListOl,
	},
	Iterator: {
		name: {
			vi: "Bộ Lặp",
			en: "Iterator",
		},
		description: {
			vi: "Bài toán sử dụng bộ lặp.",
			en: "Problems using iterator pattern.",
		},
		icon: BiRepeat,
	},
	Concurrency: {
		name: {
			vi: "Đồng Thời",
			en: "Concurrency",
		},
		description: {
			vi: "Bài toán xử lý đồng thời.",
			en: "Problems involving concurrency.",
		},
		icon: BiTimer,
	},
	Probability_and_Statistics: {
		name: {
			vi: "Xác Suất và Thống Kê",
			en: "Probability and Statistics",
		},
		description: {
			vi: "Bài toán liên quan đến xác suất và thống kê.",
			en: "Problems related to probability and statistics.",
		},
		icon: BiBarChart,
	},
	Quickselect: {
		name: {
			vi: "Chọn Nhanh",
			en: "Quickselect",
		},
		description: {
			vi: "Bài toán sử dụng thuật toán chọn nhanh.",
			en: "Problems using quickselect algorithm.",
		},
		icon: BiSelectMultiple,
	},
	Suffix_Array: {
		name: {
			vi: "Mảng Hậu Tố",
			en: "Suffix Array",
		},
		description: {
			vi: "Bài toán sử dụng mảng hậu tố.",
			en: "Problems using suffix array.",
		},
		icon: BiGridAlt,
	},
	Line_Sweep: {
		name: {
			vi: "Quét Đường",
			en: "Line Sweep",
		},
		description: {
			vi: "Bài toán sử dụng thuật toán quét đường.",
			en: "Problems using line sweep algorithm.",
		},
		icon: BiScan,
	},
	Minimum_Spanning_Tree: {
		name: {
			vi: "Cây Khung Nhỏ Nhất",
			en: "Minimum Spanning Tree",
		},
		description: {
			vi: "Bài toán tìm cây khung có trọng số nhỏ nhất.",
			en: "Problems finding minimum spanning tree.",
		},
		icon: BiGitBranch,
	},
	Bucket_Sort: {
		name: {
			vi: "Sắp Xếp Thùng",
			en: "Bucket Sort",
		},
		description: {
			vi: "Bài toán sử dụng thuật toán sắp xếp thùng.",
			en: "Problems using bucket sort algorithm.",
		},
		icon: BiGrid,
	},
	Shell: {
		name: {
			vi: "Shell",
			en: "Shell",
		},
		description: {
			vi: "Bài toán liên quan đến shell script.",
			en: "Problems related to shell scripting.",
		},
		icon: BiTerminal,
	},
	Reservoir_Sampling: {
		name: {
			vi: "Lấy Mẫu Hồ Chứa",
			en: "Reservoir Sampling",
		},
		description: {
			vi: "Bài toán sử dụng thuật toán lấy mẫu hồ chứa.",
			en: "Problems using reservoir sampling algorithm.",
		},
		icon: BiDroplet,
	},
	Strongly_Connected_Component: {
		name: {
			vi: "Thành Phần Liên Thông Mạnh",
			en: "Strongly Connected Component",
		},
		description: {
			vi: "Bài toán tìm thành phần liên thông mạnh.",
			en: "Problems finding strongly connected components.",
		},
		icon: BiShareAlt,
	},
	Eulerian_Circuit: {
		name: {
			vi: "Chu Trình Euler",
			en: "Eulerian Circuit",
		},
		description: {
			vi: "Bài toán tìm chu trình Euler.",
			en: "Problems finding Eulerian circuits.",
		},
		icon: BiRefresh,
	},
	Radix_Sort: {
		name: {
			vi: "Sắp Xếp Cơ Số",
			en: "Radix Sort",
		},
		description: {
			vi: "Bài toán sử dụng thuật toán sắp xếp cơ số.",
			en: "Problems using radix sort algorithm.",
		},
		icon: BiSort,
	},
	Rejection_Sampling: {
		name: {
			vi: "Lấy Mẫu Loại Bỏ",
			en: "Rejection Sampling",
		},
		description: {
			vi: "Bài toán sử dụng thuật toán lấy mẫu loại bỏ.",
			en: "Problems using rejection sampling algorithm.",
		},
		icon: BiXCircle,
	},
	Biconnected_Component: {
		name: {
			vi: "Thành Phần Liên Thông Kép",
			en: "Biconnected Component",
		},
		description: {
			vi: "Bài toán tìm thành phần liên thông kép.",
			en: "Problems finding biconnected components.",
		},
		icon: BiLinkAlt,
	},
};

export default TYPE_PROBLEM;