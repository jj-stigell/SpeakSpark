const translations = {
  home: {
    newChatButton: 'Trò Chuyện Mới',
    settingsButton: 'Cài Đặt'
  },
  previousChats: {
    title: 'Cuộc Trò Chuyện Gần Đây - Nhấn để tiếp tục',
    subtitle: 'Đang Học',
    refetch: 'Nhấn để tải lại cuộc trò chuyện',
    noPreviousChats: 'Không tìm thấy cuộc trò chuyện trước đó cho ngôn ngữ này, nhấn "Trò Chuyện Mới" để bắt đầu.',
    loading: 'Đang tải cuộc trò chuyện, vui lòng chờ...',
    updated: 'Cuộc Trò Chuyện Đã Cập Nhật',
  },
  newChat: {
    title: 'Bắt Đầu Trò Chuyện Mới',
    language: 'Ngôn Ngữ Trò Chuyện',
    listTitle: 'Đối Tác Trò Chuyện',
    returnButton: 'Quay Về Trang Chủ',
    notFound: 'Không tìm thấy đối tác trò chuyện cho ngôn ngữ đã chọn',
    loading: 'Đang tải đối tác trò chuyện...'
  },
  chat: {
    loading: 'Đang tải cuộc trò chuyện..',
    loadingNewChat: 'Đang bắt đầu trò chuyện mới với %{name}',
    placeholder: 'Nhập tin nhắn...',
    audioError: 'Lỗi khi tải hoặc phát âm thanh!',
    idMissing: 'Thiếu id cuộc trò chuyện, đang chuyển về trang chủ',
    tooLong: 'Độ dài tối đa của tin nhắn là %{max}, tin nhắn của bạn dài %{length} ký tự',
    grammarModal: {
      translation: 'Bản Dịch:',
      loading: 'Đang tải ngữ pháp, vui lòng chờ...',
      information: 'Thông Tin:',
      error: 'Đã xảy ra lỗi, vui lòng thử lại hoặc báo cáo lỗi!',
      graphQlError: 'Lỗi GraphQL: %{error}',
      closeButton: 'Đóng'
    }
  },
  card: {
    introduction: 'Giới Thiệu',
    language: 'Ngôn Ngữ',
    difficulty: 'Độ Khó',
    startChatButton: 'Bắt Đầu Trò Chuyện với %{name}',
    beginner: 'Người Mới Bắt Đầu',
    advanced: 'Nâng Cao',
    closeButton: 'Đóng',
    expand: 'Nhấn để xem toàn bộ giới thiệu',
    chatId: 'Id Cuộc Trò Chuyện: '
  },
  settings: {
    title: 'Cài Đặt',
    account: 'tài khoản',
    language: 'Ngôn Ngữ',
    preferences: 'tùy chọn',
    darkMode: 'Chế Độ Tối',
    notifications: 'Thông Báo',
    help: 'trợ giúp',
    report: 'Báo Cáo Lỗi / Tính Năng',
    contact: 'Liên Hệ',
    other: 'khác',
    version: 'Phiên Bản Ứng Dụng: 0.0.1',
    logout: 'Đăng Xuất',
    searchPlaceholder: 'Tìm kiếm...',
    languagePlaceholder: 'Chọn ngôn ngữ'
  },
  auth: {
    email: 'Email',
    password: 'Mật Khẩu',
    confirmPassword: 'Xác Nhận Mật Khẩu',
    loginTitle: 'Đăng Nhập vào Tài Khoản Có Sẵn',
    registerTitle: 'Tạo Tài Khoản Mới',
    remember: 'Ghi Nhớ Tôi',
    alternativeLogin: 'hoặc đăng nhập bằng',
    facebook: 'Facebook',
    google: 'Google',
    noAccount: 'Không Có Tài Khoản?',
    registerLink: 'Đăng Ký',
    agreeTerms: 'Tôi đồng ý với ',
    tosLink: 'điều khoản và điều kiện',
    emailField: 'Nhập địa chỉ email của bạn',
    passwordField: 'Nhập mật khẩu của bạn',
    confirmPasswordField: 'Xác nhận mật khẩu của bạn',
    loginButton: 'Đăng Nhập',
    loginProcess: 'Đang đăng nhập, vui lòng chờ...',
    registerButton: 'Đăng Ký',
    registerProcess: 'Đang đăng ký, vui lòng chờ...',
    registerSuccess: 'Tạo tài khoản thành công. Đang đăng nhập, vui lòng chờ...',
    alternativeSignup: 'hoặc đăng ký bằng',
    alreadyAccount: 'Đã Có Tài Khoản?',
    loginLink: 'Đăng Nhập',
    returnButton: 'Quay Lại',
    TermsAndConditions: 'Điều Khoản và Điều Kiện (chỉ có bằng tiếng Anh)'
  }
};

export default translations;
