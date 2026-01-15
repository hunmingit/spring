<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>


<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="shortcut icon" href="#">
<link rel="stylesheet" href="/resources/css/header.css">
<title>MemberBoard</title>
</head>
<body>
	<div class="wrap">
		<div class="header">
			<div class="header-title">
				<a href="mainPage">MemberBoard</a>
			</div>
			<div class="header-member">
    <!-- 비로그인 -->
    <sec:authorize access="isAnonymous()">
        <button type="button" class="header-btn"
                onclick="location.href='/customLogin'"> 로그인</button>
<!-- 아직 추가안함 -->
        <button type="button" class="header-btn"
                onclick="location.href='/join'">회원가입</button>

    </sec:authorize>

    <!-- 로그인 -->
    <sec:authorize access="isAuthenticated()">
        <sec:authentication property="principal.username" var="loginUser"/>

        <span class="header-user">
            ${loginUser} 님
        </span>

        <form action="/customLogout" method="post" style="display:inline;">
            <sec:csrfInput/>
            <button type="submit" class="header-btn">
                로그아웃
            </button>
        </form>
    </sec:authorize>
			</div>
			<div class="menu">
				<a href="boardList">게시판</a>
			</div>
		</div>
		<div class="main">
	
