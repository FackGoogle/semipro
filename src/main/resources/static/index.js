$(document).ready(function(){
		$.post(
			"indexCheck",
			{},
			function(data){
				data=JSON.parse(data);
				if(data.id){
					const id = data.id;
					const email = data.email;
						$("#changeLine").text(id +'님 로그아웃');
						$("#deleteBtn").text('회원 탈퇴');
						$("#boardInsert").text('글쓰기');
				}	
			});
		$("#deleteBtn").click(function(){
				if($("#deleteBtn").text()=='회원 탈퇴'){
					$.post(
						"/deleteMember",
						{},
						function(data){
							data= JSON.parse(data);
							alert(data.msg);
							
							location.reload();
					});
				}
			});	
	});