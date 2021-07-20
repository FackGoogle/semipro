$(document).ready(function(){
		
		$.post(
			"/logout",
			{},
			function(data){
					data= JSON.parse(data);
					if(data.login){
						
					}else{
						opener.parent.location.reload();
						window.close();
					}
			});
	
	$("#loginBtn").click(function(){
		const id = $("#id").val();
		const pw = $("#pw").val();
		
		$.post(
			"/loginById",
			{id,pw},
			function(data){
				data= JSON.parse(data);
				if(data.id){
					opener.parent.location.reload();
					window.close();
				}else{
					alert("로그인 실패");
				}
			});
	});
});