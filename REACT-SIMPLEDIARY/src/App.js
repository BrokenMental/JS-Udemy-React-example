import { useMemo, useEffect, useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import LifeCycle from "./LifeCycle";

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

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    //배열 개수 자름
    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emothion: Math.floor(Math.random() * 5) + 1, //1~5까지 랜덤 수
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });

    setData(initData);
  };

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1; //useRef는 0부터 시작해서 지속적으로 1을 추가할 수 있기 때문에 key값으로 사용
    setData([newItem, ...data]); //신규 데이터가 가장 처음에 들어가야 맨 위에 출력됨
  };

  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제됨`);
    const newDiaryList = data.filter((it) => it.id !== targetId); //삭제된 값을 필터로 걸러냄
    setData(newDiaryList);
  };

  //수정으로 통해 변경된 값을 가져오기 위해 생성된 이벤트
  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) =>
        //변경된 게시글의 id와 일치하는 id가 있을 경우 새로운 컨텐츠를 입력, 아닐 경우 기존 데이터를 입력
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  /*
   * useMemo 함수(연산 최적화를 도와주는 함수, 중복 실행을 최적화할 때 사용)
   * @param
   * 1. 콜백함수
   * 2. 변화를 지켜볼 데이터(해당 함수(여기서는 getDiaryAnalysis())를 실행하더라도 두번째 인자의 값이 변경될 경우에만 첫번째 인자, 콜백 함수를 실행)
   * 
   * @return
   * 함수를 반환하지 않고 '값'을 반환하기 때문에 함수로 사용하면 에러가 발생
   */
  const getDiaryAnalysis = useMemo(() => {
    console.log("일기 분석 시작");

    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis; //위에서 useMemo()를 사용했기 때문에 값으로 사용해야 함

  return (
    <div className="App">
      <LifeCycle />
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 : {goodCount}</div>
      <div>기분 나쁜 일기 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}

export default App;
