import { useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

// const dummyList = [
//   {
//     id: 1,
//     author: "author1",
//     content: "testest1",
//     emothion: 5,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 2,
//     author: "author2",
//     content: "testest22",
//     emothion: 4,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 3,
//     author: "author3",
//     content: "testest333",
//     emothion: 3,
//     created_date: new Date().getTime(),
//   },
// ];

function App() {
  //React의 데이터 흐름은 단방향(상->하) 이기 때문에, 데이터를 공유하기 위해서 최상위에 state를 만들어줌
  //최상위에 state가 존재하고 하위 컴포넌트에서 이 state를 props로 받아 데이터를 변경하는 이벤트가 발생 시 최상위에 존재하는 state data가 변경됨을 이용
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current
    };
    dataId.current += 1; //useRef는 0부터 시작해서 지속적으로 1을 추가할 수 있기 때문에 key값으로 사용
    setData([newItem, ...data]); //신규 데이터가 가장 처음에 들어가야 맨 위에 출력됨
  }

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} />
    </div>
  );
}

export default App;
