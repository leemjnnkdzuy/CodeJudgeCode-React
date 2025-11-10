import assets from "../assets";

const BADGES = {
	"1_Year_on_CodeJudge": {
		title: {
			vi: "1 Năm trên CodeJudge",
			en: "1 Year on CodeJudge",
		},
		description: {
			vi: "Hoạt động trên CodeJudge hơn 1 năm.",
			en: "Active on CodeJudge for more than 1 year.",
		},
		File: assets.badges["1_Year_on_CodeJudge"],
	},
	"2_Years_on_CodeJudge": {
		title: {
			vi: "2 Năm trên CodeJudge",
			en: "2 Years on CodeJudge",
		},
		description: {
			vi: "Hoạt động trên CodeJudge hơn 2 năm.",
			en: "Active on CodeJudge for more than 2 years.",
		},
		File: assets.badges["2_Years_on_CodeJudge"],
	},
	"5_Years_on_CodeJudge": {
		title: {
			vi: "5 Năm trên CodeJudge",
			en: "5 Years on CodeJudge",
		},
		description: {
			vi: "Hoạt động trên CodeJudge hơn 5 năm.",
			en: "Active on CodeJudge for more than 5 years.",
		},
		File: assets.badges["5_Years_on_CodeJudge"],
	},
	"10_Years_on_CodeJudge": {
		title: {
			vi: "10 Năm trên CodeJudge",
			en: "10 Years on CodeJudge",
		},
		description: {
			vi: "Hoạt động trên CodeJudge hơn 10 năm.",
			en: "Active on CodeJudge for more than 10 years.",
		},
		File: assets.badges["10_Years_on_CodeJudge"],
	},
	"15_Years_on_CodeJudge": {
		title: {
			vi: "15 Năm trên CodeJudge",
			en: "15 Years on CodeJudge",
		},
		description: {
			vi: "Hoạt động trên CodeJudge hơn 15 năm.",
			en: "Active on CodeJudge for more than 15 years.",
		},
		File: assets.badges["15_Years_on_CodeJudge"],
	},
	Competitor: {
		title: {
			vi: "Người Thi Đấu",
			en: "Competitor",
		},
		description: {
			vi: "Đã nộp bài trong một cuộc thi lập trình trên CodeJudge. Các cuộc thi này là thử thách lập trình đầy đủ với các bài toán khó từ thực tế.",
			en: "Submitted a solution in a programming contest on CodeJudge. These contests are full programming challenges with difficult problems from real-world scenarios.",
		},
		File: assets.badges.Competitor,
	},
	Getting_Started_Competitor: {
		title: {
			vi: "Người Mới Thi Đấu",
			en: "Beginner Competitor",
		},
		description: {
			vi: "Đã nộp bài trong một cuộc thi dành cho người mới bắt đầu. Đây là các cuộc thi đơn giản, phù hợp để làm quen với lập trình thi đấu.",
			en: "Submitted a solution in a beginner-friendly contest. These are simple contests designed to get familiar with competitive programming.",
		},
		File: assets.badges.Getting_Started_Competitor,
	},
	Advanced_Competitor: {
		title: {
			vi: "Người Thi Đấu Nâng Cao",
			en: "Advanced Competitor",
		},
		description: {
			vi: "Đã nộp bài trong một cuộc thi nâng cao. Các cuộc thi này yêu cầu kỹ năng lập trình cao và giải quyết các bài toán phức tạp.",
			en: "Submitted a solution in an advanced contest. These contests require high programming skills and solving complex problems.",
		},
		File: assets.badges.Research_Competitor,
	},
	Community_Competitor: {
		title: {
			vi: "Người Thi Đấu Cộng Đồng",
			en: "Community Competitor",
		},
		description: {
			vi: "Đã nộp bài trong một cuộc thi do cộng đồng tổ chức. Các cuộc thi này được tạo bởi thành viên CodeJudge hoặc các nhóm lập trình viên.",
			en: "Submitted a solution in a community-organized contest. These contests are created by CodeJudge members or programming groups.",
		},
		File: assets.badges.Community_Competitor,
	},
	Weekly_Competitor: {
		title: {
			vi: "Người Thi Đấu Hàng Tuần",
			en: "Weekly Competitor",
		},
		description: {
			vi: "Đã nộp bài trong một cuộc thi hàng tuần. Đây là các cuộc thi thường xuyên để rèn luyện kỹ năng lập trình.",
			en: "Submitted a solution in a weekly contest. These are regular contests to practice programming skills.",
		},
		File: assets.badges.Playground_Competitor,
	},
	Algorithm_Specialist: {
		title: {
			vi: "Chuyên Gia Thuật Toán",
			en: "Algorithm Specialist",
		},
		description: {
			vi: "Đã nộp bài trong một cuộc thi tập trung vào thuật toán. Các cuộc thi này đòi hỏi tối ưu hóa giải thuật và độ phức tạp tính toán.",
			en: "Submitted a solution in an algorithm-focused contest. These contests require algorithm optimization and computational complexity knowledge.",
		},
		File: assets.badges.Simulation_Competitor,
	},
	Holiday_Competitor: {
		title: {
			vi: "Người Thi Đấu Ngày Lễ",
			en: "Holiday Competitor",
		},
		description: {
			vi: "Đã nộp bài trong một cuộc thi đặc biệt vào dịp lễ. Đây là truyền thống hàng năm của CodeJudge với các bài toán vui nhộn.",
			en: "Submitted a solution in a special holiday contest. This is a CodeJudge annual tradition with fun programming problems.",
		},
		File: assets.badges.Santa_Competitor,
	},
	Marathon_Coder: {
		title: {
			vi: "Lập Trình Viên Marathon",
			en: "Marathon Coder",
		},
		description: {
			vi: "Đã nộp bài trong một cuộc thi marathon kéo dài nhiều ngày. Đây là thử thách sức bền và kỹ năng lập trình.",
			en: "Submitted a solution in a multi-day marathon contest. This is a test of endurance and programming skills.",
		},
		File: assets.badges.March_Mania_Competitor,
	},
	Code_Submitter: {
		title: {
			vi: "Người Nộp Code",
			en: "Code Submitter",
		},
		description: {
			vi: "Đã nộp code hoàn chỉnh để giải quyết bài toán. Code cần chạy đúng và tối ưu để vượt qua các test case.",
			en: "Submitted complete code to solve a problem. Code must run correctly and be optimized to pass all test cases.",
		},
		File: assets.badges.Code_Submitter,
	},
	Submission_Streak: {
		title: {
			vi: "Chuỗi Nộp Bài",
			en: "Submission Streak",
		},
		description: {
			vi: "Đã nộp bài liên tục trong 7 ngày.",
			en: "Submitted solutions consecutively for 7 days.",
		},
		File: assets.badges.Submission_Streak,
	},
	Super_Submission_Streak: {
		title: {
			vi: "Chuỗi Nộp Bài Siêu Cấp",
			en: "Super Submission Streak",
		},
		description: {
			vi: "Đã nộp bài liên tục trong 30 ngày.",
			en: "Submitted solutions consecutively for 30 days.",
		},
		File: assets.badges.Super_Submission_Streak,
	},
	Mega_Submission_Streak: {
		title: {
			vi: "Chuỗi Nộp Bài Khủng",
			en: "Mega Submission Streak",
		},
		description: {
			vi: "Đã nộp bài liên tục trong 100 ngày.",
			en: "Submitted solutions consecutively for 100 days.",
		},
		File: assets.badges.Mega_Submission_Streak,
	},
	Python_Coder: {
		title: {
			vi: "Lập Trình Viên Python",
			en: "Python Coder",
		},
		description: {
			vi: "Đã giải bài bằng Python. Python là một trong những ngôn ngữ lập trình phổ biến nhất trong các cuộc thi lập trình.",
			en: "Solved a problem using Python. Python is one of the most popular programming languages in competitive programming.",
		},
		File: assets.badges.Python_Coder,
	},
	"C++_Coder": {
		title: {
			vi: "Lập Trình Viên C++",
			en: "C++ Coder",
		},
		description: {
			vi: "Đã giải bài bằng C++. C++ là ngôn ngữ mạnh mẽ, thường được dùng trong các cuộc thi lập trình cần hiệu năng cao.",
			en: "Solved a problem using C++. C++ is a powerful language often used in competitive programming requiring high performance.",
		},
		File: assets.badges.R_Coder,
	},
	Java_Coder: {
		title: {
			vi: "Lập Trình Viên Java",
			en: "Java Coder",
		},
		description: {
			vi: "Đã giải bài bằng Java. Java là ngôn ngữ lập trình hướng đối tượng phổ biến trong các cuộc thi.",
			en: "Solved a problem using Java. Java is a popular object-oriented programming language in competitive contests.",
		},
		File: assets.badges.R_Markdown_Coder,
	},
	Code_Uploader: {
		title: {
			vi: "Người Tải Code Lên",
			en: "Code Uploader",
		},
		description: {
			vi: "Đã tải lên code từ máy tính cá nhân. Tính năng này cho phép bạn làm việc offline và tải lên khi cần.",
			en: "Uploaded code from your personal computer. This feature allows you to work offline and upload when needed.",
		},
		File: assets.badges.Code_Uploader,
	},
	Git_Coder: {
		title: {
			vi: "Lập Trình Viên Git",
			en: "Git Coder",
		},
		description: {
			vi: "Đã sử dụng Git để quản lý code. Bạn có thể đồng bộ code với kho lưu trữ Git của mình.",
			en: "Used Git to manage code. You can sync your code with your Git repository.",
		},
		File: assets.badges.Github_Coder,
	},
	Code_Tagger: {
		title: {
			vi: "Người Gắn Thẻ Code",
			en: "Code Tagger",
		},
		description: {
			vi: "Đã thêm thẻ cho code. Gắn thẻ giúp code dễ được tìm thấy hơn trên CodeJudge.",
			en: "Added tags to code. Tagging helps code be discovered more easily on CodeJudge.",
		},
		File: assets.badges.Code_Tagger,
	},
	Code_Forker: {
		title: {
			vi: "Người Fork Code",
			en: "Code Forker",
		},
		description: {
			vi: "Đã fork code của người khác và chỉnh sửa. Fork code là cách hay để học hỏi và phát triển từ code có sẵn.",
			en: "Forked and modified someone else's code. Forking code is a great way to learn and build on existing solutions.",
		},
		File: assets.badges.Code_Forker,
	},
	Problem_Solver: {
		title: {
			vi: "Người Giải Quyết Vấn Đề",
			en: "Problem Solver",
		},
		description: {
			vi: "Đã giải quyết thành công nhiều bài toán khác nhau. Mỗi bài toán là một thử thách lập trình thú vị.",
			en: "Successfully solved many different problems. Each problem is an interesting programming challenge.",
		},
		File: assets.badges.Notebook_Modeler,
	},
	Problem_Creator: {
		title: {
			vi: "Người Tạo Bài Toán",
			en: "Problem Creator",
		},
		description: {
			vi: "Đã tạo một bài toán mới trên CodeJudge. Đóng góp bài toán là cách tuyệt vời để xây dựng cộng đồng lập trình.",
			en: "Created a new problem on CodeJudge. Contributing problems is a great way to build the programming community.",
		},
		File: assets.badges.Dataset_Creator,
	},
	Test_Case_Designer: {
		title: {
			vi: "Người Thiết Kế Test Case",
			en: "Test Case Designer",
		},
		description: {
			vi: "Đã tạo test case cho bài toán. Test case tốt giúp đánh giá chính xác code của người dùng.",
			en: "Designed test cases for problems. Good test cases help accurately evaluate user code.",
		},
		File: assets.badges.Dataset_Pipeline_Creator,
	},
	Problem_Tagger: {
		title: {
			vi: "Người Gắn Thẻ Bài Toán",
			en: "Problem Tagger",
		},
		description: {
			vi: "Đã thêm thẻ cho bài toán. Gắn thẻ giúp bài toán dễ được tìm thấy hơn trên CodeJudge.",
			en: "Added tags to problems. Tagging helps problems be discovered more easily on CodeJudge.",
		},
		File: assets.badges.Dataset_Tagger,
	},
	Stylish: {
		title: {
			vi: "Phong Cách",
			en: "Stylish",
		},
		description: {
			vi: "Đã hoàn thiện hồ sơ cá nhân. Hồ sơ CodeJudge là nơi thể hiện thành tích lập trình của bạn.",
			en: "Completed your profile. Your CodeJudge profile showcases your programming achievements.",
		},
		File: assets.badges.Stylish,
	},
	Bookmarker: {
		title: {
			vi: "Người Đánh Dấu",
			en: "Bookmarker",
		},
		description: {
			vi: "Đã đánh dấu bài toán hoặc code yêu thích. Bạn có thể xem lại các đánh dấu trong mục 'Công việc của bạn'.",
			en: "Bookmarked favorite problems or code. You can review your bookmarks in the 'Your Work' section.",
		},
		File: assets.badges.Bookmarker,
	},
	Community_Member: {
		title: {
			vi: "Thành Viên Cộng Đồng",
			en: "Community Member",
		},
		description: {
			vi: "Đã tham gia cộng đồng CodeJudge. Kết nối với các lập trình viên khác để học hỏi và chia sẻ.",
			en: "Joined the CodeJudge community. Connect with other programmers to learn and share.",
		},
		File: assets.badges.Agent_of_Discord,
	},
	Learner: {
		title: {
			vi: "Người Học",
			en: "Learner",
		},
		description: {
			vi: "Đã hoàn thành một khóa học trên CodeJudge. Các khóa học giúp bạn nắm vững kiến thức lập trình cơ bản.",
			en: "Completed a course on CodeJudge. Courses help you master fundamental programming knowledge.",
		},
		File: assets.badges.Learner,
	},
	Student: {
		title: {
			vi: "Học Viên",
			en: "Student",
		},
		description: {
			vi: "Đã hoàn thành 5 khóa học trên CodeJudge. Mỗi khóa học là một bước tiến trên con đường lập trình.",
			en: "Completed 5 courses on CodeJudge. Each course is a step forward on your programming journey.",
		},
		File: assets.badges.Student,
	},
	Graduate: {
		title: {
			vi: "Tốt Nghiệp",
			en: "Graduate",
		},
		description: {
			vi: "Đã hoàn thành 10 khóa học trên CodeJudge. Bạn đã có nền tảng vững chắc về lập trình.",
			en: "Completed 10 courses on CodeJudge. You have a solid programming foundation.",
		},
		File: assets.badges.Graduate,
	},
	"7_Day_Login_Streak": {
		title: {
			vi: "Chuỗi Đăng Nhập 7 Ngày",
			en: "7-Day Login Streak",
		},
		description: {
			vi: "Đã đăng nhập vào CodeJudge 7 ngày liên tiếp.",
			en: "Logged in to CodeJudge for 7 consecutive days.",
		},
		File: assets.badges["7_Day_Login_Streak"],
	},
	"30_Day_Login_Streak": {
		title: {
			vi: "Chuỗi Đăng Nhập 30 Ngày",
			en: "30-Day Login Streak",
		},
		description: {
			vi: "Đã đăng nhập vào CodeJudge 30 ngày liên tiếp.",
			en: "Logged in to CodeJudge for 30 consecutive days.",
		},
		File: assets.badges["30_Day_Login_Streak"],
	},
	"100_Day_Login_Streak": {
		title: {
			vi: "Chuỗi Đăng Nhập 100 Ngày",
			en: "100-Day Login Streak",
		},
		description: {
			vi: "Đã đăng nhập vào CodeJudge 100 ngày liên tiếp.",
			en: "Logged in to CodeJudge for 100 consecutive days.",
		},
		File: assets.badges["100_Day_Login_Streak"],
	},
	Year_Long_Login_Streak: {
		title: {
			vi: "Chuỗi Đăng Nhập Cả Năm",
			en: "Year-Long Login Streak",
		},
		description: {
			vi: "Đã đăng nhập vào CodeJudge 365 ngày liên tiếp.",
			en: "Logged in to CodeJudge for 365 consecutive days.",
		},
		File: assets.badges["Year_Long_Login_Streak"],
	},
};

export default BADGES;
