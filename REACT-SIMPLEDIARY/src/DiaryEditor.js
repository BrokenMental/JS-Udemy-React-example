import { useRef, useState } from "react";

const DiaryEditor = ({ onCreate }) => {
  //useRef를 사용하게 되면 레퍼런스 객체 React.MutableRefObject를 가져와 Dom 요소 접근 가능하게 됨
    //dom 요소(태그)에 ref로 접근
    const authorInput = useRef();
    const contentInput = useRef();

  // const [author, setAuthor] = useState("");
  // const [content, setContent] = useState("");
  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    if (state.author.length < 1) {
      //alert("작성자는 최소 1글자 이상 입력해주세요.");
      authorInput.current.focus();
      return;
    }

    if (state.content.length < 5) {
      //alert("본문은 최소 5글자 이상 입력해주세요.");
      contentInput.current.focus();
      return;
    }

    onCreate(state.author, state.content, state.emotion);
    alert("저장 성공!");
    setState({
      author: '',
      content: '',
      emotion: 1
    })
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        {/* value={author} 라고만 쓸 경우 input 값이 변하지 않는다. author값은 setAuthor로만 수정할 수 있기 때문 */}
        <input
          ref={authorInput}
          name="author"
          value={state.author}
          onChange={handleChangeState}
          /*
            onChange={(e) => {
                setState({
                    ...state,
                    //아래와 같이 변하지 않는 값들을 일일히 써줄 필요 없음
                    //content: state.content,
                    author: e.target.value,
                    //스프레드 연산자(...)가 아래 있을 경우 값을 수정한 변수에 기존 값을 다시 덮어 씌워버리기 떄문에 값이 변하지 않음
                });
            }}
            */
        />
      </div>
      <div>
        <textarea
          ref={contentInput} //ref로 레퍼런스객체를 연결
          name="content"
          value={state.content}
          onChange={handleChangeState}
        />
      </div>
      <div>
        오늘의 감정점수 :
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
};

export default DiaryEditor;