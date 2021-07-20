
$(document).ready(function(){
	var count = 1;
	var pagcount = 0;
	$.post("getTable",
			{count},
			function(data){
				data=JSON.parse(data);
				var tl = data.boardVOs;
				
				var html ="";
				for (key in tl){
					html += '<tr><td><input class="check" type="checkbox"></td>';
					html += '<td>'+tl[key].articleNo+'</td>';
					html += '<td><a class="onreadtext" href="#"  name="'+tl[key].articleNo+'">'+tl[key].title+'</td></a>';
					html += '<td>'+tl[key].id+'</td>';
					html += '<td>'+tl[key].writedate+'</td>';
					html += '</tr>';
				}
				$("#tablewrite").empty();
				$("#tablewrite").append(html);
				
				pagcount = Math.ceil(data.pagcount/10);
				var html2 ="";
				console.log((Number(count)-2));
			html2 += '<a class="btn" href="#">&lt;&lt;</a><a class="btn" href="#">&lt;</a>';
			if(count-2>0){
				html2 += '<a class="btnnumber" href="#">'+(Number(count)-2)+'</a>';
			}
			if(count-1>0){
				html2 += '<a class="btnnumber" href="#">'+(Number(count)-1)+'</a>';
			}
			html2 += '<a class="btn number on" >'+count+'</a>';
			if((Number(count)+1)<=pagcount){
				html2 += '<a class="btnnumber" href="#">'+(Number(count)+1)+'</a>';
			}
			if((Number(count)+2)<=pagcount){
				html2 += '<a class="btnnumber" href="#">'+(Number(count)+2)+'</a>';
			}
			html2 += '<a class="btn" href="#">&gt;</a><a class="btn" href="#">&gt;&gt;</a>';
				$("#paging").empty();
				$("#paging").append(html2);		
	});
	$(document).on("click", ".btnnumber", function(event) {
		count =  event.target.innerText;
		console.log((Number(count)+1));
		console.log(pagcount+'p');
		
		$.post("getTable",
			{count},
			function(data){
				data=JSON.parse(data);
				var tl = data.boardVOs;
				
				var html ="";
				for (key in tl){
					html += '<tr><td><input class="check" type="checkbox"></td>';
					html += '<td>'+tl[key].articleNo+'</td>';
					html += '<td><a class="onreadtext" href="#"  name="'+tl[key].articleNo+'">'+tl[key].title+'</td></a>';
					html += '<td>'+tl[key].id+'</td>';
					html += '<td>'+tl[key].writedate+'</td>';
					html += '</tr>';
				}
				$("#tablewrite").empty();
				$("#tablewrite").append(html);
				
				pagcount = Math.ceil(data.pagcount/10);
				var html2 ="";
			html2 += '<a class="btn" href="#">&lt;&lt;</a><a class="btn" href="#">&lt;</a>';
			if(count-2>0){
				html2 += '<a class="btnnumber" href="#">'+(Number(count)-2)+'</a>';
			}
			if(count-1>0){
				html2 += '<a class="btnnumber" href="#">'+(Number(count)-1)+'</a>';
			}
			html2 += '<a class="btn number on" >'+count+'</a>';
			if((Number(count)+1)<=pagcount){
				html2 += '<a class="btnnumber" href="#">'+(Number(count)+1)+'</a>';
			}
			if((Number(count)+2)<=pagcount){
				html2 += '<a class="btnnumber" href="#">'+(Number(count)+2)+'</a>';
			}
			html2 += '<a class="btn" href="#">&gt;</a><a class="btn" href="#">&gt;&gt;</a>';
				$("#paging").empty();
				$("#paging").append(html2);		
		});
	});
	
	$(document).on("click", ".onreadtext", function(event) {
		alert(event.target.name);
	});
});


