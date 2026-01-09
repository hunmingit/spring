console.log('upload.js 실행...');

//파일 사이즈와 중복검사 정규식
const regex = new RegExp("(.*?)\.(exe|sh|zip|alz)$");
const MAX_SIZE = 5242880; //5mb

function checkExtension(fileName, fileSize){
	if(fileSize >= MAX_SIZE){
		alert("파일 사이즈 초과");
		return;
	}
	if(regex.test(fileName)){
		alert("해당 종류의 파일은 업로드할 수 없습니다.");
		return;
	}
	return true;
}

//파일을 보냈어 업로드를 하면 업로드가 됨  보냈는데 파일 2개가 남아있음 그걸 초기화하기 위함
//비어있는 요소 복사해두기
let uploadDiv = document.querySelector('.uploadDiv');
//하위 노드까지 복사
let cloneObj = uploadDiv.firstElementChild.cloneNode(true);


//실제 파일 업로드 이벤트,// 값이 변하면 실행 보통 selectbox에서 사용하는 change사용
document.querySelector('input[type="file"]').addEventListener('change', ()=>{
	
	const inputFile = document.querySelector('input[type="file"]');
	//파일을 담고 전송하는 용도
	const formData = new FormData();
	const files = inputFile.files;
	
	console.log(files)//FileList {0: File, 1: File, length: 2} 이렇게 출력
	//files를 form 데이터에 담기
	for(let i=0; i<files.length; i++){
		if(!checkExtension(files[i].name, files[i].size)){
			return false;
		}		
		formData.append('uploadFile', files[i]);
	}
	//비동기 방식인 fetch로 보내면 받는 쪽에도 비동기 방식으로 받아야하는데 컨트롤러에서 post방식으로 받고있음 그래서 404에러가 나온다
	fetch(`/uploadAsyncAction`,
			{
				method : 'post',
				body : formData
			})
		.then(response => response.json())//json으로 받아 객체로 출력되게
		.then(data => {
			console.log(data);
			//보내면 비운다.
			inputFile.value = '';
			showUploadedFile(data);
		})
		.catch(err => console.log(err));
	
});

//업로드 완료된 목록 보여주는 함수
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
//		str +=`<a href="/download?fileName=${fileCallPath}">`;//클릭 시 /download 컨트롤러로 요청
		str +=`${file.fileName}`; //사용자에게 보여줄 원본 파일명
//		str +=`</a>`;
		str +=`<span data-file="${fileCallPath}">  x</span>`;//삭제 버튼 역할
		str +=`</li>`;
	});
	uploadResult.innerHTML = str;
// 여기서 문제 
// 위에서 생성된 x에 클릭이벤트 부여 
// 클릭 시 '/deleteFile' 경로로 fetch
// * method : 'post'
// * body : data-file의 값 == fileCallPath
// * headers : {'Content-Type' : 'text/plain'}
// * api에서는 delete 라는 문자열을 리턴할 예정	
	//방금 생성한 모든 x 버튼(.uploadResult span) 선택해서 클릭 이벤트 등록
	document.querySelectorAll('.uploadResult span').forEach(span => {
		span.addEventListener('click', (e) => {
			console.log('삭제 클릭');
			//클릭한 span의 data-file 값 추출 이 값은? 서버에 전달할 삭제 대상 파일 경로
			//span data-file str +=`<span data-file="${fileCallPath}">  x</span>` 여기서 가져옴
			//예) data-file="2026%2F01%2F08%2Fuuid_filename.jpg
			let fileCallPath = e.target.getAttribute('data-file');//그럼 여기서 뭘 하냐?
			//지금 클릭한 요소(span)의 data-file 속성 값 좀 줘 
			//그래서 결과는 fileCallPath === "2026%2F01%2F08%2Fuuid_filename.jpg"
			console.log(fileCallPath);
			///deleteFile 컨트롤러로 POST 요청
			fetch('/deleteFile', 
					{
				method : 'post',
				body : fileCallPath,
				//컨트롤러에서 @RequestBody String으로 받기 위함
				headers : {
					'Content-Type' : 'text/plain'
				}
					})
					//서버에서 "delete" 문자열 수신
					.then(response => response.text())
					.then(data => {
						console.log(data);
						
						//해당 태그 삭제
						let targetLi = e.target.closest('li');
						targetLi.remove();
						
					})
					.catch(err => console.log(err));
		});
	});

}



