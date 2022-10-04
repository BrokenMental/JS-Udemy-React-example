import React, { useEffect, useState } from "react";

/*
 * TextView만 수정되면 되는데 랜더링 시 CountView도 함께 랜더링 되는 낭비 상황, 컴포넌트의 재사용을 활용해서 해결
 * React.memo() 를 활용하여 랜더링 될 함수를 인자로 넣어주면 해당 함수에 포함된 변수가 변경될 경우에만 랜더링 됨
 */

/*
const TextView = React.memo(({ text }) => {
    useEffect(() => {
        console.log(`Upadte :: Text : ${text}`);
    });
  return <div>{text}</div>;
});

const CountView = React.memo(({ count }) => {
    useEffect(() => {
      console.log(`Upadte :: Count : ${count}`);
    });
  return <div>{count}</div>;
});

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [text, setText] = useState("");

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>count</h2>
        <CountView count={count} />
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <h2>text</h2>
        <TextView text={text} />
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  );
};
*/


const CounterA = React.memo(({ count }) => {
    useEffect(() => {
        console.log(`CounterA update - count: ${count}`);
    });

    return <div>{count}</div>
});

const CounterB = ({ obj }) => {
    useEffect(() => {
      console.log(`CounterB update - count: ${obj.count}`);
    });
    
    return <div>{obj.count}</div>;
};

/*
 * React.memo의 두번째 인자 areEqual 함수
 * - 두 인자를 비교(깊은 비교) 같으면 true, 다르면 false를 반환
 * 
 * @param
 * 1. 이전 Props(함수)
 * 2. 비교할(값이 변경 되어서 랜더링 되어야 할) Props(함수)
 * 
 */
const areEqual = (prevProps, nextProps) => {
    if (prevProps.obj.count === nextProps.obj.count) {
        return true;
    }
    return false;

    //또는 return prevProps.obj.count === nextProps.obj.count; 로 사용
}

const MemoizedCounterB = React.memo(CounterB, areEqual);

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });

    /*
     * React.memo 사용 시 Counter A는 버튼을 눌러도 동일한 값이 입력되기 때문에 랜더링 되지 않지만 Counter B는 랜더링 됨(얕은 비교를 사용하기 때문)
     * 얕은 비교, 얕은 복사 : 값이 같아도 객체, 배열등은 생성될 때 주소가 다름
     */
  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>Counter A</h2>
        <CounterA count={count} />
        <button onClick={() => setCount(count)}>A button</button>
      </div>
      <div>
        <h2>Counter B</h2>
        <MemoizedCounterB obj={obj} />
        <button
          onClick={() =>
            setObj({
              count: obj.count,
            })
          }
        >
          B button
        </button>
      </div>
    </div>
  );
};
export default OptimizeTest;
