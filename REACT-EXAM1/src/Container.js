//app.js에서 Container 하위에 있는 태그들이 children 변수 안에 전달됨,
//따라서 아래 {children}에 app.js의 Container 컴포넌트 아래 있는 태그들이 출력됨
//props는 단수 값, 복수 값, 컴포넌트 자체를 전달 가능
const Container = ({ children }) => {
    return (
        <div style={{ margin: 20, padding: 20, border: '1px solid gray' }}>
            {children}
        </div>
    )
};

export default Container;