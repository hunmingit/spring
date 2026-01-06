//JS 파일이 브라우저에서 정상적으로 로딩됐는지 확인하는 로그 
console.log('reply module...');

// 자기호출 함수(즉시 실행 함수 (IIFE)) 자기 자신을 바로 실행한다.(댓글 관련 기능을 하나의 모듈처럼 묶기)
const replyService = (function () {
   //댓글 등록 함수 선언 reply : 서버로 보낼 댓글 데이터 객체
	//callback : 서버 응답을 받은 후 실행할 함수, 비동기 처리 결과를 화면에 반영하기 위해 사용
   function add(reply, callback) {
	   /*Spring의 댓글 등록 컨트롤러 URL */
      fetch('/reply/new', {
	  /*HTTP POST 방식 댓글 등록은 데이터 생성이므로 post*/
         method : 'post',
     /*요청 바디 : js객체는 그대로 못보내므로 json으로 문자열 변환*/
         body : JSON.stringify(reply),
      /*요청 헤더 : 서버에게 지금 보내는 데이터는 json이라는걸 알려줌*/   
         headers : {
            'Content-type' : 'application/json; charset=utf-8'
         }
      })/*서버 응답을 문자열(text)로 변환 컨트롤러에서 return "success"; 이런 식이면*/
         .then(response => response.text())
         .then(result => {
            callback(result);
         })
         .catch(err => console.log(err));
   }
   
   function getList(bno, callback){
	      fetch('/reply/pages/'+ bno) 
	             .then(response => response.json())
	             .then(data => {
	                callback(data);
	             })
	             .catch(err => console.log(err));
   }
   
   function remove(rno, callback){
	   /*Spring의 댓글 등록 컨트롤러 URL */
	      fetch('/reply/'+rno, {
	         method : 'delete'
	      })/*서버 응답을 문자열(text)로 변환 컨트롤러에서 return "success"; 이런 식이면*/
	         .then(response => response.text())
	         .then(result => {
	            callback(result);
	         })
	         .catch(err => console.log(err));
   }
   
   function update(reply, callback){
		   fetch(`/reply/${rno}`, {
		         method : 'put',
		     /*요청 바디 :reply는 body에서 보내고 rno는 url에 담아 보낸다 js객체는 그대로 못보내므로 json으로 문자열 변환*/
		         body : JSON.stringify(reply),
		      /*요청 헤더 : 서버에게 지금 보내는 데이터는 json이라는걸 알려줌*/   
		         headers : {
		            'Content-type' : 'application/json; charset=utf-8'
		         }
		   })
		       .then(response => response.text())
		       .then(result => {
		        callback(result);
	       })
	       .catch(err => console.log(err));
   }
   function get(rno, callback){
	      fetch('/reply/'+rno) 
          .then(response => response.json())
          .then(data => {
             callback(data);
          })
          .catch(err => console.log(err));
}
   
   return {
	   add : add,
	   getList : getList,
	   remove : remove,
	   update : update,
	   get : get
   };
   
})();






