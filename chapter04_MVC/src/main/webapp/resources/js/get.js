//---cs 파일 추가
//1. 파일 경로 설정
const CSS_FILE_PATH = '/resources/css/get.css';
//2. line 태그 생성
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.type = 'text/css';
linkEle.href = CSS_FILE_PATH;
//3. gead 태그에 link 엘리먼트 추가
document.head.appendChild(linkEle);
//1,2,3 증복된 코드 통합 해서 쉽게 쓸 수 없을까?
const f = document.forms[0];
document.querySelectorAll('button') // a태크 가져오기
.forEach( button => {
	button.addEventListener('click', (e) => {
		e.preventDefault(); // 기본 이벤트 방지
		  const type = e.currentTarget.id;

		    if (type === 'indexBtn') {
		      location.href = '/board/list';
		    } else if (type === 'modifyBtn') {
		      modify();
		    }
		  });
		});
function modify() {
	let bno = f.bno.value;
	location.href = `/board/modify?bno=${bno}`;
}


