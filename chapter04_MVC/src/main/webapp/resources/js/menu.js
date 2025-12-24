/**
 * 메인화면 버튼에대한 클릭 이벤트 작성 header.jsp에서 넘어옴
 * .header 하위에 있는 a 태그들에 버튼
 * 기본 이벤트 방지 
 * 해당 속성에서 값 꺼내서 분기 태우기
 */
document.querySelectorAll('.header a') // a태크 가져오기
.forEach( a => {
	a.addEventListener('click', (e) => {
		e.preventDefault(); // 기본 이벤트 방지
		let menu = e.target.getAttribute('href'); // href 속성값 가져오기
		if(menu === 'mainPage'){
			location.href = '/';
		}else if(menu === 'boardList'){
			location.href ='/board/list';
		}
	});
});

function loginPage(){
	
}

function joinPage(){
	
}