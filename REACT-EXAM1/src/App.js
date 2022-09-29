import React from 'react';
import './App.css';

import MyHeader from './MyHeader';
import MyFooter from './MyFooter';
import Container from './Container';
import Counter from './Counter';

function App() {
  const name = 'text';

  //css를 inline 함수 형태로 사용 가능 사용할 땐 style={{inline 스타일 함수명}.key}
  const styleInline = {
    App: {
      backgorundColor: 'black'
    },
    h2: {
      color: 'red'
    },
    bold_text: {
      color: 'green'
    }
  }

  const counterProps = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    initailValue: 6
  };

  return (
    //리액트는 반드시 한가지 최상위 태그로 다른 태그를 묶어줘야 함, 아래 <React.Fragment>는 최상위 태그의 역할을 하는 리액트 태그, <> </> 와 같이 빈 태그로 만들어도 됨
    //class 등 태그의 요소를 활용하기 위해서는 div등의 태그를 사용해야 함
    <Container>
      {/* 이런식으로 태그가 아닌 컴포넌트로 감쌀 경우 하위에 있는 태그들은 모두 props로 전달됨 */}
      <div className="App">
        <MyHeader />
        <header className="App-header">Learn React {name}</header>
        <b style={styleInline.bold_text}>React.js</b>
        {/*
              컴포넌트에 값을 전달하고 싶을 경우 아래와 같이 변수 명(key)과 값을 전달
              여러개를 보내고 싶을 경우 a={값1} b={값2} 와 같이 콤마 없이 입력
              여러개를 inline으로 쓰면 코드가 길어지고 지저분해지기 때문에 객체를 생성 후 다음과 같이 입력도 가능 {...counterProps}
            */}
        <Counter initailValue={2} />
      </div>
    </Container>
  );
}

export default App;
