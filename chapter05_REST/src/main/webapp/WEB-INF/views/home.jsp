<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
	<title>Home</title>
</head>
<body>
<h1>
	Hello world!  
</h1>

<button id="btn">send</button>
</body>
<script type="text/javascript">
document.querySelector("#btn").addEventListener('click',() =>{
	const obj = {
			tno : 1,
			owner : 'kim',
			grade : 'gold'
	};
	
	fetch('/test/ticket.json', {
		method : 'post',
		body : JSON.stringify(obj),
		headers : {
			'Content-type' : 'application/json; charset=utf-8'
		}
	})
		.then(response => response.json())
		.then(data => {
			console.log(data);
		})
		.catch(err => console.log(err));

});

</script>
</html>
