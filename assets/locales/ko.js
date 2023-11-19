const translations = {
  home: {
    newChatButton: '새 채팅',
    settingsButton: '설정'
  },
  previousChats: {
    title: '최근 채팅 - 계속하려면 클릭',
    subtitle: '공부 중',
    refetch: '채팅 다시 가져오려면 클릭',
    noPreviousChats: '해당 언어로 이전 채팅을 찾을 수 없습니다. "새 채팅" 버튼을 클릭하여 새로운 채팅을 시작하세요.',
    loading: '채팅 로딩 중, 잠시만 기다려주세요...',
    updated: '채팅 업데이트됨',
  },
  newChat: {
    title: '새 채팅 시작하기',
    language: '채팅 언어',
    listTitle: '채팅 파트너',
    returnButton: '홈으로 돌아가기',
    notFound: '선택한 언어에 대한 채팅 파트너를 찾을 수 없습니다',
    loading: '채팅 파트너 로딩 중...'
  },
  chat: {
    loading: '채팅 로딩 중...',
    loadingNewChat: '%{name}님과 새 채팅 시작 중',
    placeholder: '메시지 입력...',
    audioError: '오디오 가져오기 또는 재생 오류!',
    idMissing: '채팅 ID가 없어 홈으로 이동합니다',
    tooLong: '메시지 최대 길이는 %{max}이며, 귀하의 메시지는 %{length}자입니다',
    grammarModal: {
      translation: '번역:',
      loading: '문법 로딩 중, 잠시만 기다려주세요...',
      information: '정보:',
      error: '문제가 발생했습니다. 다시 시도하거나 버그를 신고해주세요!',
      graphQlError: 'GraphQL 오류 발생: %{error}',
      closeButton: '닫기'
    }
  },
  card: {
    introduction: '소개',
    language: '언어',
    difficulty: '난이도',
    startChatButton: '%{name}님과 채팅 시작하기',
    beginner: '초보자',
    advanced: '고급',
    closeButton: '닫기',
    expand: '전체 소개 보기',
    chatId: '채팅 ID: '
  },
  settings: {
    title: '설정',
    account: '계정',
    language: '언어',
    preferences: '환경 설정',
    darkMode: '다크 모드',
    notifications: '알림',
    help: '도움말',
    report: '버그 / 기능 신고',
    contact: '문의하기',
    other: '기타',
    version: '앱 버전: 0.0.1',
    logout: '로그아웃',
    searchPlaceholder: '검색...',
    languagePlaceholder: '언어 선택'
  },
  auth: {
    email: '이메일',
    password: '비밀번호',
    confirmPassword: '비밀번호 확인',
    loginTitle: '기존 계정으로 로그인',
    registerTitle: '새 계정 만들기',
    remember: '기억하기',
    alternativeLogin: '또는 다음으로 로그인',
    facebook: '페이스북',
    google: '구글',
    noAccount: '계정이 없으신가요?',
    registerLink: '등록하기',
    agreeTerms: '약관에 동의합니다 ',
    tosLink: '이용 약관',
    emailField: '이메일 주소 입력',
    passwordField: '비밀번호 입력',
    confirmPasswordField: '비밀번호 확인',
    loginButton: '로그인',
    loginProcess: '로그인 중, 잠시만 기다려주세요...',
    registerButton: '가입하기',
    registerProcess: '등록 중, 잠시만 기다려주세요...',
    registerSuccess: '계정이 성공적으로 생성되었습니다. 로그인 중, 잠시만 기다려주세요...',
    alternativeSignup: '또는 다음으로 가입하기',
    alreadyAccount: '이미 계정이 있으신가요?',
    loginLink: '로그인',
    returnButton: '돌아가기',
    TermsAndConditions: '이용 약관 (영어로만 제공)'
  }
};

export default translations;
