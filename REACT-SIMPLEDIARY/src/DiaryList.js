import DiaryItem from "./DiaryItem";

const DiaryList = ({onEdit, onRemove, diaryList }) => {
  return (
    <div className="diaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {/* map에서는 ({값}, {인덱스}) 를 받을 수 있기 때문에 key에 인덱스를 활용해도 됨 */}
        {diaryList.map((it) => (
          <DiaryItem key={it.id} {...it} onEdit={onEdit} onRemove={onRemove} />
          //   <div key={it.id}>
          //     <div>작성자 : {it.author}</div>
          //     <div>일기 : {it.content}</div>
          //     <div>감정 : {it.emotion}</div>
          //     <div>작성 시간(ms) : {it.created_date}</div>
          //   </div>
        ))}
      </div>
    </div>
  );
};

DiaryList.defaultPProps = {
  diaryList: [],
};

export default DiaryList;
