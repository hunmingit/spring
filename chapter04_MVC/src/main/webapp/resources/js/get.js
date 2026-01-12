//상세보기 화면
//---cs 파일 추가
//1. 파일 경로 설정
const cssFiles = [
	'/resources/css/get.css',
	'/resources/css/modal.css'
];

cssFiles.forEach(path => {
	const link = document.createElement('link');
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = path;
	document.head.appendChild(link);
});

const f = document.forms[0];
document.querySelectorAll('button') // a태크 가져오기
.forEach( button => {
	button.addEventListener('click', (e) => {
		e.preventDefault(); // 기본 이벤트 방지
		  const type = e.currentTarget.id;
//버튼 이벤트 공통 처리 모든 버튼을 한 곳에서 제어
		    if (type === 'indexBtn') {
		      location.href = '/board/list';
		    } else if (type === 'modifyBtn') {
		      modify();
		    } else if(type ==='replyBtn'){
		    	registerModalPage();
		    } else if(type ==='addReplyBtn' ){
		    	//진짜 댓글 등록 실행 버튼
		    	registerReply();
		    }else if(type ==='closeModalBtn'){
		    	closeModal();
		    }else if(type === 'modifyReplyBtn'){
		    	modifyReply();
		    }else if(type === 'removeReplyBtn'){
		    	removeReply();
		    }
		  });
		});
function modify() {
	let bno = f.bno.value;
	location.href = `/board/modify?bno=${bno}`;
}

/*-------------------댓글------------------------------*/
const rs = replyService; // reply.js에서 CRUD 담당 객체

//댓글 목록 창(댓글 목록 조회) chat class 하위에 바인딩 해야함
//DB 댓글 → JSON → JS → HTML → 화면
//댓글 등록 / 수정 / 삭제 후에도 재사용됨
function showList(){
	//f = document.forms[0]
	//document는 현재 브라우저에 로딩된 HTML 문서 전체를 대표하는 객체, 브라우저 화면에 보이는 HTML = document
	let bno = f.bno.value;//db에 전달
	//댓글을 그릴 부모 요소 선택 ul class="chat"
	//document.querySelector -> CSS 선택자를 그대로 써서 요소 하나를 가져오는 메서드
	let replyUL = document.querySelector('.chat');//바인딩 목적
	//replyService.getList() 호출
	//서버에서 댓글 목록을 JSON 배열로 받음
	rs.getList(bno, jsonArray =>{
		//댓글 하나당 HTML 문자열을 여기에 계속 이어 붙임 마지막에 innerHTML로 한 번에 삽입
		let msg = '';
		jsonArray.forEach(reply => {
			if(jsonArray.length === 0){
				replyUL.innerHTML = '<li>댓글이 없습니다.</li>';
				return;
			}
/*서버에서 받은 댓글 배열(jsonArray)을 돌면서
HTML 문자열(msg)을 누적 생성하는 구조*/			
			//댓글 클릭 → 수정 모달 열림 this = 클릭한 <li>
			msg += `<li data-rno="${reply.rno}" onclick="modifyModalPage(this)">`;
			msg += `<div>`;
			msg += `<div class="chat-header">`;
			msg += ` <strong>${reply.replyer}</strong>`;
			msg += `<small class="pull-right">${displayTime(reply.replydate)}</small>`;
			msg += `</div>`;
			msg += `<p>${reply.reply}</p>`;
			msg += `</div>`;
			msg += `</li>`;							
		});
		replyUL.innerHTML = msg;
	});
}
showList();

function displayTime(unixTimeStamp){
	//초일떄
	let myDate = new Date(unixTimeStamp);
	//밀리초일때
	//let myDate = new Date(unixTimeStamp/1000);
	
	let y = myDate.getFullYear();
	let m = String(myDate.getMonth()+1).padStart(2, '0');
	let d = String(myDate.getDate()).padStart(2, '0');
	
	let date = y + '-' + m + '-' + d;
	return date;
}
/*---------------모달관련------------------------*/
const modal = document.querySelector('#modal');
const inputReply = document.querySelector('input[name="reply"]');
const inputReplyer = document.querySelector('input[name="replyer"]');
const inputReplydate = document.querySelector('input[name="replydate"]');
const addReplyBtn = document.querySelector('#addReplyBtn');
const modifyReplyBtn = document.querySelector('#modifyReplyBtn');
const removeReplyBtn = document.querySelector('#removeReplyBtn');
const closeModalBtn = document.querySelector('#closeModalBtn');
function openModal(){
	modal.style.display = "block";
	document.body.style.overflow="hidden"; //휠 돌렸을때 뒷 창이 고정됨

}
function closeModal(){
	modal.style.display = "none";
	document.body.style.overflow="auto"; //페이지 스크롤을 다시 가능하게 만드는 코드
	//취소 버튼 클릭 시 추가된 css값 초기화
	modifyReplyBtn.classList.remove('hide');//classList.remove('hide') → CSS 클래스 제거
	removeReplyBtn.classList.remove('hide');
	addReplyBtn.classList.remove('hide');//classList.add('hide') → CSS 클래스 추가
	inputReplydate.closest('div').classList.remove('hide'); //inputReplydate를 감싸고 있는 가장 가까운 div를 찾음
	inputReplyer.readOnly = false;
	inputReplydate.readOnly = false;
	
}
//댓글 등록 창 함수
function registerModalPage() {
	//보여질 목록 수정
	regReplyModalStyle();
	//입력 내용 초기화 & 불러오기
	inputReply.value = '';
	inputReplyer.value = '';
	
	openModal();
	
}
//댓글 달기 창 스타일 변경 함수
function regReplyModalStyle(){

	//버튼 수정,삭제 없애고 날짜 변경 창도 없애기
	modifyReplyBtn.classList.add('hide');//classList.add('hide') → CSS 클래스 추가
	removeReplyBtn.classList.add('hide');
	inputReplydate.closest('div').classList.add('hide'); //inputReplydate를 감싸고 있는 가장 가까운 div를 찾음
}
//진짜 댓글 등록 함수
function registerReply(){
	if(!inputReply.value || !inputReplyer.value){
		alert("모든 내용을 입력하세요");
		return;
	}
	const sendData = {
			reply : inputReply.value,
			replyer : inputReplyer.value,
			bno : f.bno.value
	};
	rs.add(sendData, result => {
		console.log(result);
		closeModal();
		showList();
	});
}
//댓글 클릭 함수 
let rno; //누른 시점에 rno를 저장하기 위함
function modifyModalPage(t){
	//보여질 목록, 스타일 수정
	modReplyModalStyle();
	rno = t.dataset.rno; //누른 시점에 rno 저장
	//입력 내용 초기화 & 불러오기
	rs.get(rno, data => {
		inputReply.value = data.reply;
		inputReplyer.value = data.replyer;
		inputReplydate.value = displayTime(data.replydate);
	});
	openModal();

}

function modReplyModalStyle(){
	//버튼 = 수정, 삭제 보이게 하고 작성자, 등록 날짜는 readonly
	modifyReplyBtn.classList.remove('hide');//classList.remove('hide') → CSS 클래스 제거
	removeReplyBtn.classList.remove('hide');
	addReplyBtn.classList.add('hide');//classList.add('hide') → CSS 클래스 추가
	inputReplyer.readOnly = true;
	inputReplydate.readOnly = true;
	
}
//클릭 댓글 수정  
function modifyReply() {
	if(!inputReply.value){
		alert("댓글 내용을 입력하세요");
		return;
	}
	const sendData = {
			reply : inputReply.value,
			rno : rno
	};

	rs.update(sendData, result => {
		console.log(result);
		closeModal();
		showList();
	});
}
//클릭 댓글 삭제
function removeReply() {
	//삭제 하시겠습니까 경고 알럿
	 if(!confirm("삭제 하시겠습니까?")){
		 return;
	 }
	rs.remove(rno, result => {
		console.log(result);
		closeModal();
		showList();
	});

}

//-------------------------------첨부 파일 관련 스크립트
//파일 리스트 콘솔에 출력
(function() {
	fetch(`/board/getAttachList/${f.bno.value}`)
	.then(response => response.json())
	.then(data => {
		showUploadedFile(data);
	})
	.catch(err => console.log(err));
})(); 

let uploadResult = document.querySelector('.uploadResult ul');//업로드된 파일 목록을 출력할 <ul> 요소 선택
//서버에서 받은 파일 정보 배열(JSON)을 받아 화면에 출력하는 함수
function showUploadedFile(uploadResultArr){
	//<li> HTML 문자열을 누적할 변수
	let str = ``;
	//업로드된 파일 하나씩 반복 처리
	uploadResultArr.forEach( file => {
		//str += `<li>${file.fileName}</li>`; //파일 이름 뿌리기 
		//이름 클릭하여 다운로드 가능하게
		//서버에 실제 저장된 파일 상대 경로
		//encodeURIComponent -> 한글, 공백, 특수문자 깨짐 방지, URL 파라미터로 안전하게 전송
		let fileCallPath = encodeURIComponent(
				file.uploadPath + "/" + file.uuid + "_" + file.fileName
		); // ->fileCallPath = 2026/01/08/uuid_test.jpg 
		str +=`<li path="${file.uploadPath}" uuid="${file.uuid}" fileName="${file.fileName}">`;
		str +=`<a href="/download?fileName=${fileCallPath}">`;//클릭 시 /download 컨트롤러로 요청
		str +=`${file.fileName}`; //사용자에게 보여줄 원본 파일명
		str +=`</a>`;
//		str +=`<span data-file="${fileCallPath}">  x</span>`;//삭제 버튼 역할
		str +=`</li>`;
	});
	uploadResult.innerHTML = str;
}
//console.log(rs)
//rs.add(
//		{
//			bno : f.bno.value,
//			reply : 'js test',
//			replyer : 'tester'
//		}, 
//		function(result){
//			console.log(result);			
//		}
//);
//rs.getList(f.bno.value, function(data){
//	console.log(data);
//})
//rs.remove(21, function(result){
//	console.log(result)
//})
//rs.update(
//		 {
//			reply : 'js test11',
//		}, 
//		4,
//			function(result){
//			console.log(result);			
//			}
//);	
//rs.get(4, function(data){
//	console.log(data);
//})
		















