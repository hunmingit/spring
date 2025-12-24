//---cs 파일 추가
//1. 파일 경로 설정
const CSS_FILE_PATH = '/resources/css/register.css';
//2. line 태그 생성
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.type = 'text/css';
linkEle.href = CSS_FILE_PATH;
//3. gead 태그에 link 엘리먼트 추가
document.head.appendChild(linkEle);
//form 객체 전역 변수로 선언
const f = document.forms[0];


//각 버튼 클릭 이벤트
//각 눌린 버튼의 id를 가져와서 분기

//resetBtn 다시작성
document.querySelector('#resetBtn').addEventListener('click', ()=>{
	f.reset();
});
//indexBtn 목록으로 이동
document.querySelector('#indexBtn').addEventListener('click', ()=>{
	location.href='/board/list';
});
//registerBtn 새 게시글 등록
document.querySelector('#registerBtn').addEventListener('click', ()=>{
	register();
});
//각 데이터 검증 후 데이터 전송 -> 삽입
function register(){
	if(f.title.value === '' || f.writer.value === '' ||f.content.value === ''){
		alert("빈 값을 확인하세요")
		return;
	}
	f.action = '/board/register';
	f.submit();
	
}


