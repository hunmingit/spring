<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<h1>custom login page</h1>
	<h2>${error}</h2>
	<h2>${logout}</h2>
	<form action="/login" method="post">
		<div><input type="text" name="username"></div>
		<div><input type="password" name="password"></div>
		<div><input type="submit" value="전송"></div>
		
	</form>
</body>
</html>