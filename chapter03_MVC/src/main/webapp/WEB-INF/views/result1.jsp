<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<div> <!-- Model = request 영역에 데이터 담는 도구  
	 왜 model.name 안쓰냐? model.addAttribute("model", ???); // 이렇게 담지 않았음
	 ${model.name} ❌ (존재하지 않음), ${name} ⭕ (request에 있음)-->
		이름 : ${name} <br>
		학과 : ${dept} <br>
		학년 : ${gradeNo} <br>
		반 : ${classNo} <br>	 
	</div>
	<div>
		이름 : ${s.name} <br>
		학과 : ${s.dept} <br>
		학년 : ${s.gradeNo} <br>
		반 : ${s.classNo} <br>	 
	</div>
</body>
</html>