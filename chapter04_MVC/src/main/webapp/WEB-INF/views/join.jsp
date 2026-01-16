<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원가입</title>

<link rel="stylesheet" href="/resources/css/join.css">
</head>
<body>

<div class="join-wrap">
    <h2>회원가입</h2>

    <form action="/join" method="post">

        <!-- 아이디 -->
        <div class="form-group">
            <label>아이디</label>
            <input type="text" name="userId" required>
        </div>

        <!-- 비밀번호 -->
        <div class="form-group">
            <label>비밀번호</label>
            <input type="password" name="userPw" required>
        </div>

        <!-- 이름 -->
        <div class="form-group">
            <label>이름</label>
            <input type="text" name="userName" required>
        </div>

        <!-- 버튼 -->
        <div class="form-group">
            <button type="submit">회원가입</button>
            <button type="button" onclick="location.href='/customLogin'">
                취소
            </button>
        </div>

    </form>
</div>

</body>
</html>
