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
			goBoardList();
		}
	});
});
//현재 페이지 정보를 브라우저의 localStorage에 저장
function setStorageData(pageNum, amount){
	let pageData = {
			pageNum : pageNum,
			amount : amount
	};
	localStorage.setItem('page_data', JSON.stringify(pageData));
}
function getStorageData(){
	return JSON.parse(localStorage.getItem('page_data'));
}
//공통 함수 로 만든 목록으로 돌아가기
function goBoardList(){
	const pageData = getStorageData();

	let pageNum = 1;
	let amount  = 10;
	if(pageData){
		pageNum = pageData.pageNum;
		amount  = pageData.amount;
	}

	location.href = `/board/list?pageNum=${pageNum}&amount=${amount}`;
}

//-------------------------principal 객체 가져오기
let principal;
async function getPrincipal(){
	try{
		const response = await fetch(`/api/currentUser.json`);
		const userPrincipal = await response.json();
		principal = userPrincipal.principal;
		console.log(principal);
	}catch(e){
		console.log(`에러 : ${e}`);
	}
}
getPrincipal();













function loginPage(){
	
}

function joinPage(){
	
}