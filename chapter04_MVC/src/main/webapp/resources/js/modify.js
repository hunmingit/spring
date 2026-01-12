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

const f = document.querySelector('#modifyForm');
console.log('form:', f);
document.querySelectorAll('#modifyForm button') // a태크 가져오기
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
//삭제할 파일들을 임시로 저장 하는 배열
let deleteFileList = [];
//기존에 있던 파일들 뱌열
let originFileList = [];
//수정
function modify() {
    console.log('modify');
    console.log('deleteFileList before submit:', deleteFileList);

    if (f.title.value === '' || f.content.value === '') {
        alert("빈 값을 확인하세요");
        return;
    }

    // 기존 hidden 삭제
    f.querySelectorAll('input[name="deleteFiles"]').forEach(e => e.remove());

    // 새 hidden 추가
    deleteFileList.forEach(uuid => {
        let input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'deleteFiles';
        input.value = uuid;
        f.appendChild(input);
    });

    console.log(
        'deleteFiles inputs:',
        f.querySelectorAll('input[name="deleteFiles"]')
    );

    f.action = '/board/modify';
    f.method = 'post';
    f.submit();
}

//삭제 데이터의 변환이 있을때는 post 방식
function remove() {
	if (!confirm('게시글을 삭제하시겠습니까?')) {
		return;
	}
	f.action = '/board/remove';
	f.method = 'post';
	f.submit();
//  form 방식으로 보낼지, URL 파라미터로 보낼지
//	const bonEle = f.bno; //bno를 담고 있는 
//	f.innerHTML = ''; //form 태그 비우기
//	f.appenChild(bnoEle);
//	f.action = 'board/remove';
//	f.submit();
//	console.log('remove');
//	let bno = f.bno.value;
//	f.action = `/board/remove?bno=${bno}`; //삭제 요청을 URL + GET으로 보내면 안된다.
//	f.submit();
}
(function() {
	fetch(`/board/getAttachList/${f.bno.value}`)
	.then(response => response.json())
	.then(data => {
		showExistingFiles(data);
	})
	.catch(err => console.log(err));
})(); 

let uploadResult = document.querySelector('.uploadResult ul');//업로드된 파일 목록을 출력할 <ul> 요소 선택
function showUploadedFile(uploadResultArr){
    let str = '';
    uploadResultArr.forEach(file => {
        // 새 파일도 originFileList에 저장
        originFileList.push(file.uuid);

        let fileCallPath = encodeURIComponent(file.uploadPath + "/" + file.uuid + "_" + file.fileName);

        str += `<li path="${file.uploadPath}" uuid="${file.uuid}" fileName="${file.fileName}">`;
        str += `${file.fileName}`;
        str += `<span> x</span>`;
        str += `</li>`;
    });

    uploadResult.innerHTML = str;

    // x 버튼 클릭 시 삭제 + deleteFileList에 추가
    document.querySelectorAll('.uploadResult span').forEach(span => {
        span.addEventListener('click', (e) => {
            let uuid = e.target.closest('li').getAttribute('uuid');
            deleteFileList.push(uuid);
            e.target.closest('li').remove();
        });
    });
}

//서버에서 받은 파일 정보 배열(JSON)을 받아 화면에 출력하는 함수
function showExistingFiles(uploadResultArr){
	//<li> HTML 문자열을 누적할 변수
	let str = ``;
	//업로드된 파일 하나씩 반복 처리
	uploadResultArr.forEach( file => {
		//기존 파일 uuid 저장
		originFileList.push(file.uuid); // 새 파일도 originFileList에 저장
		//str += `<li>${file.fileName}</li>`; //파일 이름 뿌리기 
		//이름 클릭하여 다운로드 수정화면이니 필요없다 
		//서버에 실제 저장된 파일 상대 경로
		//encodeURIComponent -> 한글, 공백, 특수문자 깨짐 방지, URL 파라미터로 안전하게 전송
		let fileCallPath = encodeURIComponent(
				file.uploadPath + "/" + file.uuid + "_" + file.fileName
		); // ->fileCallPath = 2026/01/08/uuid_test.jpg 
		str +=`<li path="${file.uploadPath}" uuid="${file.uuid}" fileName="${file.fileName}">`;
		str +=`${file.fileName}`; //사용자에게 보여줄 원본 파일명
		str += `<span> x</span>`;//삭제 버튼 역할
		str +=`</li>`;
	});
	uploadResult.innerHTML = str;
//* method : 'post'
//* body : data-file의 값 == fileCallPath
//* headers : {'Content-Type' : 'text/plain'}
//* api에서는 delete 라는 문자열을 리턴할 예정	
	//방금 생성한 모든 x 버튼(.uploadResult span) 선택해서 클릭 이벤트 등록
	document.querySelectorAll('.uploadResult span').forEach(span => {
		span.addEventListener('click', (e) => {
			console.log('삭제 클릭');
			//클릭한 span의 data-file 값 추출 이 값은? 서버에 전달할 삭제 대상 파일 경로
			//span data-file str +=`<span data-file="${fileCallPath}">  x</span>` 여기서 가져옴
			//예) data-file="2026%2F01%2F08%2Fuuid_filename.jpg
//			let fileCallPath = e.target.getAttribute('data-file');//그럼 여기서 뭘 하냐?
			//uuid만 추출
			let uuid = e.target.closest('li').getAttribute('uuid');
			//지금 클릭한 요소(span)의 data-file 속성 값 좀 줘 
			//그래서 결과는 fileCallPath === "2026%2F01%2F08%2Fuuid_filename.jpg"
//			console.log(fileCallPath);
			deleteFileList.push(uuid);
			console.log('deleteFileList:', deleteFileList);
			//지금 당장 삭제하지 않고 나중에 삭제할 파일 목록에 추가
			e.target.closest('li').remove();

		});
	});
}
document.querySelector('input[type="file"]').addEventListener('change', () => {
    const inputFile = document.querySelector('input[type="file"]');
    const files = inputFile.files;

    if(files.length === 0) return;
    // 1. 기존 파일 전부 삭제 대상으로 이동
    deleteFileList = [...originFileList];

    // 2. 화면에서 기존 파일 제거
    document.querySelectorAll('.uploadResult li').forEach(li => li.remove());
    // originFileList 비우기
    originFileList = [];
    // 3. 새 파일 업로드
    const formData = new FormData();
    for(let i=0; i<files.length; i++){
        formData.append('uploadFile', files[i]);
    }

    fetch(`/uploadAsyncAction`, {
        method: 'post',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        inputFile.value = ''; // 선택 초기화
        showUploadedFile(data); // 화면에 새 파일 표시
    })
    .catch(err => console.log(err));
});



