<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!-- sec 태그 사용 가능 -->
<%@ taglib uri = "http://www.springframework.org/security/tags" prefix = "sec" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<h1>admin.jsp</h1>
	
	
	<p>
	principal : <sec:authentication property="principal"/>
	</p>
	
	<p>
	MemberVO : <sec:authentication property="principal.member"/>
	</p>
	
	<p>
	사용자 이름 : <sec:authentication property="principal.member.userName"/> <!-- 사용자 이름 : 관리자99 -->
	</p>
	
	<p>
	사용자 아이디1 : <sec:authentication property="principal.member.userId"/> <!-- 사용자 아이디1 : admin99 -->
	</p>
	
	<p>
	사용자 아이디2 : <sec:authentication property="principal.username"/> <!-- 사용자 아이디2 : admin99 -->
	</p>
	
	<p>
	사용자 권한 리스트 : <sec:authentication property="principal.member.authList"/>
	</p>
	
	<a href="/customLogout">Logout</a>
</body>
</html>