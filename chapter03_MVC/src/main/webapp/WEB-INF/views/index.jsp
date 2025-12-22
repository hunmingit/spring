<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<h1>인덱스입니다.</h1>
	<form action="v01" method="post">
		<p>이름 : <input type="text" name="name"></p>
		<p>학과 : <input type="text" name="dept"></p>
		<p>학년 : <input type="text" name="gradeNo"></p>
		<p>반 : <input type="text" name="classNo"></p>
		<input type="submit" value="전송">
	</form>
	<hr>
		<form action="v02" method="post">
		<p>이름 : <input type="text" name="name"></p>
		<p>학과 : <input type="text" name="dept"></p>
		<p>학년 : <input type="text" name="gradeNo"></p>
		<p>반 : <input type="text" name="classNo"></p>
		<input type="submit" value="전송">
	</form>
	
	<!-- 첫 번째 form 요청
	- 메소드 이름 goResult1
	- model에 데이터 담아서 화면 이동
	- 이동 jsp : result.jsp
	
	 -->
</body>
</html>