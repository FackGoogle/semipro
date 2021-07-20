$(document).ready(function(){
	$("#checkBtn").click(function(){
		const id = $("#id").val();
		const pw = $("#pw").val();
		const username = $("#username").val();
		const email = $("#email").val();
		const cpw = $("#cpw").val();
		if(id==""){
			alert("아이디 입력 해주세요");
			return ;
		}
		if(pw==""){
			alert("pw 입력 해주세요");
			return ;
		}
		if(username==""){
			alert("name 입력 해주세요");
			return ;
		}
		if(email==""){
			alert("email 입력 해주세요");
			return ;
		}
		if(pw!=cpw){
			alert("두비밀 번호가 다릅니다");
			return ;
		}
		$.post(
			"/checkIDEmail",
			{id,email},
			function(data){
				data=JSON.parse(data);
				console.log(data.msg);
				if(data.msg==1){
					
				}
				else{
					alert(data.msg);
					return;
				}
		});
		$.post(
			"/insertMember" 
			,{id,pw,username,email}
			,function(data){
				data=JSON.parse(data);
				alert(data.insertMemberOK+" 가입이 완료 되었습니다 로그인 해주세요");
				location.reload(true);
				return;	
				
		});
		});

});