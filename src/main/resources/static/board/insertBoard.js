$(document).ready(function(){
	$("#insertBtn").click(function(){
		const title =$("#title").val();
		const content =$("#content").val();
		$.post(
			"/insertBoard",
			{title,content},
			function(data){
				data= JSON.parse(data);
				if(data.title){
					opener.parent.location.reload();
					window.close();
				}else{
					alert(data.msg);
					opener.parent.location.reload();
					window.close();
				}
			});
	});
	$("#cancelBtn").click(function(){
		opener.parent.location.reload();
		window.close();
	});
});

