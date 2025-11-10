const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema({
	questionId: {
		type: String,
		required: true,
	},
	titleSlug: {
		type: String,
		required: true,
	},
	difficulty: {
		type: String,
		enum: ["Easy", "Medium", "Hard"],
		required: true,
	},
	topicTags: {
		type: [String],
		enum: [
			"Array",
			"String",
			"Hash_Table",
			"Dynamic_Programming",
			"Math",
			"Sorting",
			"Greedy",
			"Depth_First_Search",
			"Binary_Search",
			"Database",
			"Matrix",
			"Tree",
			"Breadth_First_Search",
			"Bit_Manipulation",
			"Two_Pointers",
			"Prefix_Sum",
			"Heap_Priority_Queue",
			"Simulation",
			"Binary_Tree",
			"Graph",
			"Stack",
			"Counting",
			"Sliding_Window",
			"Design",
			"Enumeration",
			"Backtracking",
			"Union_Find",
			"Linked_List",
			"Number_Theory",
			"Ordered_Set",
			"Monotonic_Stack",
			"Segment_Tree",
			"Trie",
			"Combinatorics",
			"Bitmask",
			"Queue",
			"Recursion",
			"Divide_and_Conquer",
			"Geometry",
			"Binary_Indexed_Tree",
			"Memoization",
			"Hash_Function",
			"Binary_Search_Tree",
			"Shortest_Path",
			"String_Matching",
			"Topological_Sort",
			"Rolling_Hash",
			"Game_Theory",
			"Interactive",
			"Data_Stream",
			"Monotonic_Queue",
			"Brainteaser",
			"Doubly_Linked_List",
			"Randomized",
			"Merge_Sort",
			"Counting_Sort",
			"Iterator",
			"Concurrency",
			"Probability_and_Statistics",
			"Quickselect",
			"Suffix_Array",
			"Line_Sweep",
			"Minimum_Spanning_Tree",
			"Bucket_Sort",
			"Shell",
			"Reservoir_Sampling",
			"Strongly_Connected_Component",
			"Eulerian_Circuit",
			"Radix_Sort",
			"Rejection_Sampling",
			"Biconnected_Component",
		],
		default: [],
	},
	originalSource: {
		source: {type: String, required: true},
		language: {
			type: String,
			emun: ["c/c++", "python", "java", "javascript"],
			required: true,
		},
	},
	details: {
		en: {
			title: {
				type: String,
				required: true,
			},
			content: {
				type: String,
				required: true,
			},
			solution: {
				type: String,
				required: true,
				default: "",
			},
			hints: {type: [String], default: []},
			similarQuestionList: {
				type: [
					{
						title: {
							type: String,
							required: true,
						},
						titleSlug: {
							type: String,
							required: true,
						},
						difficulty: {
							type: String,
							enum: ["Easy", "Medium", "Hard"],
							required: true,
						},
					},
				],
			},
		},
		vi: {
			title: {
				type: String,
				required: true,
			},
			content: {
				type: String,
				required: true,
			},
			solution: {
				type: String,
				required: true,
				default: "",
			},
			hints: {
				type: [String],
			},
			similarQuestionList: {
				type: [
					{
						title: {
							type: String,
							required: true,
						},
						titleSlug: {
							type: String,
							required: true,
						},
						difficulty: {
							type: String,
							enum: ["Easy", "Medium", "Hard"],
							required: true,
						},
					},
				],
			},
		},
	},
	testCases: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "TestCases",
	},
	timeLimit: {
		type: Number,
		required: true,
		default: 1000,
	},
	memoryLimit: {
		type: Number,
		required: true,
		default: 512,
	},
});

exports.Problem = mongoose.model("Problem", ProblemSchema);
