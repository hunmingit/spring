//---cs 파일 추가
//1. 파일 경로 설정
const CSS_FILE_PATH = '/resources/css/boardList.css';
//2. line 태그 생성
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.type = 'text/css';
linkEle.href = CSS_FILE_PATH;
//3. gead 태그에 link 엘리먼트 추가
document.head.appendChild(linkEle);

//각 버튼 클릭 이벤트
//각 눌린 버튼의 id를 가져와서 분기
//registerBtn
document.querySelector('#registerBtn').addEventListener('click', ()=>{
	location.href='/board/register';
});

//제목 클릭 이벤트 (get 이동)
//클릭 대상등 판단
//기본 이벤트 방지하고 전달 받은 데이터(bno) 컨트룰러에 전달
document.querySelectorAll('tbody a')
.forEach( a => {
	a.addEventListener('click', (e) => {
		e.preventDefault(); // 기본 이벤트 방지
		const bno = e.currentTarget.getAttribute('href'); // href 속성값 가져오기 e.target = a 와 같음
	    console.log(e.target);        // 실제 클릭된 요소
	    console.log(e.currentTarget); // 이벤트 리스너가 붙은 요소
	    console.log(a);               // forEach로 잡은 요소 e.currentTarget === a
		location.href='/board/get?bno='+bno;
	});
});