//---cs 파일 추가
//1. 파일 경로 설정
const CSS_FILE_PATH = '/resources/css/modify.css';
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
		if(type === 'indexBtn'){
			goBoardList();
		}else if(type === 'modifyBtn'){
			modify();//수정페이지 이동
		}else if(type === 'removeBtn'){
			remove();
		}
	});
});
//수정
function modify() {
	console.log('modify');
	if(f.title.value === '' || f.content.value === ''){
		alert("빈 값을 확인하세요")
		return;
	}
	f.action = '/board/modify';
	f.submit();
	
}
//삭제 데이터의 변환이 있을때는 post 방식
function remove() {
	const bonEle = f.bno; //bno를 담고 있는 
	f.innerHTML = ''; //form 태그 비우기
	f.appenChild(bnoEle);
	f.action = 'board/remove';
	f.submit();
//	console.log('remove');
//	let bno = f.bno.value;
//	f.action = `/board/remove?bno=${bno}`;
//	f.submit();
}


