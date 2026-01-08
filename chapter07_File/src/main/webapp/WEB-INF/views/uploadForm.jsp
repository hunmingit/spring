<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<form action="uploadFormAction"
		method="post"
		enctype="multipart/form-data">
		<input type="file" name="uploadFile" multiple="multiple"><!-- multiple : 파일 여러개 올릴 수 있다 -->
		<br>
		<button>Submit</button>
	
		</form>
</body>
</html>