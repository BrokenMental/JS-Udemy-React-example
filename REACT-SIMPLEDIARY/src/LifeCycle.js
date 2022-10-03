import React, { useEffect, useState } from "react";

//한 js안에 여러개의 컴포넌트 생성 가능
const UnmountTest = () => {
  useEffect(() => {
    console.log("Mount!");

    //useEffect에 함수를 return하면 unmount 시 실행
    return () => {
      console.log("Unmount!");
    };
  }, []);

  return <div>UnmountTest Testing Component</div>;
};

const LifeCycle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  /*
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    console.log("Mount");
  }, []); //Mount 시점에 실행

  useEffect(() => {
    console.log("Update");
  }); //Update 시점에 실행

  useEffect(() => {
      console.log(`count is update : ${count}`);
      if (count > 5) {
          alert('count가 5가 넘음, 1로 초기화 됨');
          setCount(1);
      }
  }, [count]); //두번째 인자(count)가 업데이트 될 때 실행

  useEffect(() => {
    console.log(`text is update : ${text}`);
  }, [text]); //두번째 인자(text)가 업데이트 될 때 실행
  */

  return (
    <div style={{ padding: 20 }}>
      {/* 
      <div>
        {count}
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      */}
      <button onClick={toggle}>ON/OFF</button>
      {/* 뒤의 Component는 true이기 때문에 isVisible의 값으로 출력이 결정됨 */}
      {isVisible && <UnmountTest />}
    </div>
  );
};

export default LifeCycle;
