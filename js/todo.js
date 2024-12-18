const todo = {
  // 작업 목록
  items: [],

  // 작업 등록
  add(title, description, deadline) {
    const seq = Date.now();
    this.items.push({ seq, title, description, deadline, done: false });

    // 추가 후 화면 갱신
    this.render();
  },

  // 작업 삭제
  remove(seq) {
    // seq로 작업 목록 순서 번호(index) 조회
    const index = this.items.findIndex((item) => item.seq === seq);

    // splice로 해당 순서 번호 항목 제거
    this.items.splice(index, 1);

    // 삭제 후 화면 갱신
    this.render();
  },

  // 작업 목록 출력, 갱신
  render() {},
};

window.addEventListener("DOMContentLoaded", function () {
  // 양식 태그의 기본 동작 차단
  frmTodo.addEventListener("submit", function (e) {
    e.preventDefault();

    /**
     * 1. 필수 항목 검증
     * 2. 일정 추가
     */
    try {
      /* 1. 필수 항목 검증 S */
      const requiredFields = {
        title: "작업 제목을 입력하세요.",
        deadline: "마감일을 입력하세요.",
        description: "작업 내용을 입력하세요.",
      };

      for (const [field, message] of Object.entries(requiredFields)) {
        const value = frmTodo[field].value.trim();
        if (!value) {
          throw new Error(JSON.stringify({ field, message }));
        }
      }

      /* 1. 필수 항목 검증 E */
    } catch (err) {
      const { field, message } = JSON.parse(err.message);
      const el = document.getElementById(`error-${field}`);
      console.log(err.message, el);
      if (el) {
        el.innerText = message;
        el.classList.remove("dn");
        el.focus();
      }
    }
  });
});
