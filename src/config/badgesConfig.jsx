import assets from "../assets"

const BADGES = {
	"1_Year_on_CodeJudge": {
		title: "1 Năm trên CodeJudge",
		description: "Hoạt động trên CodeJudge hơn 1 năm.",
		File: assets.badges["1_Year_on_CodeJudge"],
	},
	"2_Years_on_CodeJudge": {
		title: "2 Năm trên CodeJudge",
		description: "Hoạt động trên CodeJudge hơn 2 năm.",
		File: assets.badges["2_Years_on_CodeJudge"],
	},
	"5_Years_on_CodeJudge": {
		title: "5 Năm trên CodeJudge",
		description: "Hoạt động trên CodeJudge hơn 5 năm.",
		File: assets.badges["5_Years_on_CodeJudge"],
	},
	"10_Years_on_CodeJudge": {
		title: "10 Năm trên CodeJudge",
		description: "Hoạt động trên CodeJudge hơn 10 năm.",
		File: assets.badges["10_Years_on_CodeJudge"],
	},
	"15_Years_on_CodeJudge": {
		title: "15 Năm trên CodeJudge",
		description: "Hoạt động trên CodeJudge hơn 15 năm.",
		File: assets.badges["15_Years_on_CodeJudge"],
	},
	Competitor: {
		title: "Người Thi Đấu",
		description:
			"Đã nộp bài trong một cuộc thi lập trình trên CodeJudge. Các cuộc thi này là thử thách lập trình đầy đủ với các bài toán khó từ thực tế.",
		File: assets.badges.Competitor,
	},
	Getting_Started_Competitor: {
		title: "Người Mới Thi Đấu",
		description:
			"Đã nộp bài trong một cuộc thi dành cho người mới bắt đầu. Đây là các cuộc thi đơn giản, phù hợp để làm quen với lập trình thi đấu.",
		File: assets.badges.Getting_Started_Competitor,
	},
	Advanced_Competitor: {
		title: "Người Thi Đấu Nâng Cao",
		description:
			"Đã nộp bài trong một cuộc thi nâng cao. Các cuộc thi này yêu cầu kỹ năng lập trình cao và giải quyết các bài toán phức tạp.",
		File: assets.badges.Research_Competitor,
	},
	Community_Competitor: {
		title: "Người Thi Đấu Cộng Đồng",
		description:
			"Đã nộp bài trong một cuộc thi do cộng đồng tổ chức. Các cuộc thi này được tạo bởi thành viên CodeJudge hoặc các nhóm lập trình viên.",
		File: assets.badges.Community_Competitor,
	},
	Weekly_Competitor: {
		title: "Người Thi Đấu Hàng Tuần",
		description:
			"Đã nộp bài trong một cuộc thi hàng tuần. Đây là các cuộc thi thường xuyên để rèn luyện kỹ năng lập trình.",
		File: assets.badges.Playground_Competitor,
	},
	Algorithm_Specialist: {
		title: "Chuyên Gia Thuật Toán",
		description:
			"Đã nộp bài trong một cuộc thi tập trung vào thuật toán. Các cuộc thi này đòi hỏi tối ưu hóa giải thuật và độ phức tạp tính toán.",
		File: assets.badges.Simulation_Competitor,
	},
	Holiday_Competitor: {
		title: "Người Thi Đấu Ngày Lễ",
		description:
			"Đã nộp bài trong một cuộc thi đặc biệt vào dịp lễ. Đây là truyền thống hàng năm của CodeJudge với các bài toán vui nhộn.",
		File: assets.badges.Santa_Competitor,
	},
	Marathon_Coder: {
		title: "Lập Trình Viên Marathon",
		description:
			"Đã nộp bài trong một cuộc thi marathon kéo dài nhiều ngày. Đây là thử thách sức bền và kỹ năng lập trình.",
		File: assets.badges.March_Mania_Competitor,
	},
	Code_Submitter: {
		title: "Người Nộp Code",
		description:
			"Đã nộp code hoàn chỉnh để giải quyết bài toán. Code cần chạy đúng và tối ưu để vượt qua các test case.",
		File: assets.badges.Code_Submitter,
	},
	Submission_Streak: {
		title: "Chuỗi Nộp Bài",
		description: "Đã nộp bài liên tục trong 7 ngày.",
		File: assets.badges.Submission_Streak,
	},
	Super_Submission_Streak: {
		title: "Chuỗi Nộp Bài Siêu Cấp",
		description: "Đã nộp bài liên tục trong 30 ngày.",
		File: assets.badges.Super_Submission_Streak,
	},
	Mega_Submission_Streak: {
		title: "Chuỗi Nộp Bài Khủng",
		description: "Đã nộp bài liên tục trong 100 ngày.",
		File: assets.badges.Mega_Submission_Streak,
	},
	Python_Coder: {
		title: "Lập Trình Viên Python",
		description:
			"Đã giải bài bằng Python. Python là một trong những ngôn ngữ lập trình phổ biến nhất trong các cuộc thi lập trình.",
		File: assets.badges.Python_Coder,
	},
	"C++_Coder": {
		title: "Lập Trình Viên C++",
		description:
			"Đã giải bài bằng C++. C++ là ngôn ngữ mạnh mẽ, thường được dùng trong các cuộc thi lập trình cần hiệu năng cao.",
		File: assets.badges.R_Coder,
	},
	Java_Coder: {
		title: "Lập Trình Viên Java",
		description:
			"Đã giải bài bằng Java. Java là ngôn ngữ lập trình hướng đối tượng phổ biến trong các cuộc thi.",
		File: assets.badges.R_Markdown_Coder,
	},
	Code_Uploader: {
		title: "Người Tải Code Lên",
		description:
			"Đã tải lên code từ máy tính cá nhân. Tính năng này cho phép bạn làm việc offline và tải lên khi cần.",
		File: assets.badges.Code_Uploader,
	},
	Git_Coder: {
		title: "Lập Trình Viên Git",
		description:
			"Đã sử dụng Git để quản lý code. Bạn có thể đồng bộ code với kho lưu trữ Git của mình.",
		File: assets.badges.Github_Coder,
	},
	Code_Tagger: {
		title: "Người Gắn Thẻ Code",
		description:
			"Đã thêm thẻ cho code. Gắn thẻ giúp code dễ được tìm thấy hơn trên CodeJudge.",
		File: assets.badges.Code_Tagger,
	},
	Code_Forker: {
		title: "Người Fork Code",
		description:
			"Đã fork code của người khác và chỉnh sửa. Fork code là cách hay để học hỏi và phát triển từ code có sẵn.",
		File: assets.badges.Code_Forker,
	},
	Problem_Solver: {
		title: "Người Giải Quyết Vấn Đề",
		description:
			"Đã giải quyết thành công nhiều bài toán khác nhau. Mỗi bài toán là một thử thách lập trình thú vị.",
		File: assets.badges.Notebook_Modeler,
	},
	Problem_Creator: {
		title: "Người Tạo Bài Toán",
		description:
			"Đã tạo một bài toán mới trên CodeJudge. Đóng góp bài toán là cách tuyệt vời để xây dựng cộng đồng lập trình.",
		File: assets.badges.Dataset_Creator,
	},
	Test_Case_Designer: {
		title: "Người Thiết Kế Test Case",
		description:
			"Đã tạo test case cho bài toán. Test case tốt giúp đánh giá chính xác code của người dùng.",
		File: assets.badges.Dataset_Pipeline_Creator,
	},
	Problem_Tagger: {
		title: "Người Gắn Thẻ Bài Toán",
		description:
			"Đã thêm thẻ cho bài toán. Gắn thẻ giúp bài toán dễ được tìm thấy hơn trên CodeJudge.",
		File: assets.badges.Dataset_Tagger,
	},
	Stylish: {
		title: "Phong Cách",
		description:
			"Đã hoàn thiện hồ sơ cá nhân. Hồ sơ CodeJudge là nơi thể hiện thành tích lập trình của bạn.",
		File: assets.badges.Stylish,
	},
	Bookmarker: {
		title: "Người Đánh Dấu",
		description:
			"Đã đánh dấu bài toán hoặc code yêu thích. Bạn có thể xem lại các đánh dấu trong mục 'Công việc của bạn'.",
		File: assets.badges.Bookmarker,
	},
	Community_Member: {
		title: "Thành Viên Cộng Đồng",
		description:
			"Đã tham gia cộng đồng CodeJudge. Kết nối với các lập trình viên khác để học hỏi và chia sẻ.",
		File: assets.badges.Agent_of_Discord,
	},
	Learner: {
		title: "Người Học",
		description:
			"Đã hoàn thành một khóa học trên CodeJudge. Các khóa học giúp bạn nắm vững kiến thức lập trình cơ bản.",
		File: assets.badges.Learner,
	},
	Student: {
		title: "Học Viên",
		description:
			"Đã hoàn thành 5 khóa học trên CodeJudge. Mỗi khóa học là một bước tiến trên con đường lập trình.",
		File: assets.badges.Student,
	},
	Graduate: {
		title: "Tốt Nghiệp",
		description:
			"Đã hoàn thành 10 khóa học trên CodeJudge. Bạn đã có nền tảng vững chắc về lập trình.",
		File: assets.badges.Graduate,
	},
	"7_Day_Login_Streak": {
		title: "Chuỗi Đăng Nhập 7 Ngày",
		description: "Đã đăng nhập vào CodeJudge 7 ngày liên tiếp.",
		File: assets.badges["7_Day_Login_Streak"],
	},
	"30_Day_Login_Streak": {
		title: "Chuỗi Đăng Nhập 30 Ngày",
		description: "Đã đăng nhập vào CodeJudge 30 ngày liên tiếp.",
		File: assets.badges["30_Day_Login_Streak"],
	},
	"100_Day_Login_Streak": {
		title: "Chuỗi Đăng Nhập 100 Ngày",
		description: "Đã đăng nhập vào CodeJudge 100 ngày liên tiếp.",
		File: assets.badges["100_Day_Login_Streak"],
	},
	Year_Long_Login_Streak: {
		title: "Chuỗi Đăng Nhập Cả Năm",
		description: "Đã đăng nhập vào CodeJudge 365 ngày liên tiếp.",
		File: assets.badges["Year_Long_Login_Streak"],
	},
};

export default BADGES;