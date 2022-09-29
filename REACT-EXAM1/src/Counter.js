import React, { useState } from 'react';
import OddEvenResult from './OddEvenResult';

//상위 컴포넌트에서 전달받은 값이 변경되거나 현재 사용중인 state 값이 변경될 경우 랜더링이 발생
//상위 컴포넌트에서 전달한 변수를 사용하기 위해서 아래와 같이 props로 전달 받음
//props에서 특정 변수(key)만 꺼내 쓸 경우 다음과 같이 사용 {key값}
const Counter = (props) => {

    //console.log(props); //상위 컴포넌트에서 전달한 initailValue 라는 값이 객체에 들어있음

    //react에서 제공되는 useState() 메서드는 배열의 비구조화 할당을 통해 첫번째 인덱스의 값에는 초기값,
    //두번째는 첫번재 값을 상태변화 시키는 함수를 반환, 괄호 안은 초기 값을 지정
    const [count, setCount] = useState(0);

    const onIncrease = () => {
        setCount(count + 1);
    };
    
    const onDecrease = () => {
      setCount(count - 1);
    };

    return (
      <div>
        <h2>{count}</h2>
        <button onClick={onIncrease}>+</button>
            <button onClick={onDecrease}>-</button>
            <OddEvenResult count={count} />
      </div>
    );
};

//props로 전달받은 값을 활용해야 할 때, 값이 제대로 전달되지 않거나 값이 없을 경우를 대비해서 아래와 같은 함수 활용 가능
Counter.defaultProps = {
    initailValue: 0
};

export default Counter;