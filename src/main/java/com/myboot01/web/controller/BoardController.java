package com.myboot01.web.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.myboot01.web.VO.BoardVO;
import com.myboot01.web.service.BoardService;

@Controller
public class BoardController {
	@Autowired
	BoardService boardService;
	BoardVO boardVO;
	
	@ResponseBody
	@RequestMapping("/insertBoard")
	public String main(HttpServletRequest request , HttpServletResponse response) {
		HttpSession session = request.getSession(false);
		JSONObject json = new JSONObject();
		if(session==null) {
			json.put("msg","로그인 다시하세요" );
			return json.toString();
		}
		int articleNo = 1+boardService.getArticleNo();
		String id= (String) session.getAttribute("id");
		String title = request.getParameter("title");
		String content = request.getParameter("content");
		System.out.println(id + articleNo +title+content);
		BoardVO boardVO = new BoardVO(articleNo,0,title,content, "전체" ,id ,"0");
		boardService.insertBoard(boardVO);
		
		json.put("title", title);
		return json.toString();
	}
	
	@ResponseBody
	@RequestMapping("/getTable")
	public String getTable(HttpServletRequest request , HttpServletResponse response) {
		BoardVO boardVO = new BoardVO();
		int countList = boardService.getCountList();
		int countTable =Integer.parseInt(request.getParameter("count"));
		
		boardVO.setArticleNo(countList);
		boardVO.setParentNo(countTable);
		List<BoardVO> boardVOs= boardService.getList(boardVO);
		JSONObject jsonObject = new JSONObject();
		JSONArray jsonArray =new JSONArray();
		for (BoardVO a : boardVOs) {
			
			JSONObject sObject = new JSONObject();
			sObject.put("articleNo", a.getArticleNo());
			sObject.put("title", a.getTitle());
			sObject.put("id", a.getId());
			sObject.put("writedate", a.getWritedate());
			jsonArray.add(sObject);

		}
		jsonObject.put("boardVOs", jsonArray);
		jsonObject.put("pagcount", countList);
		return jsonObject.toJSONString();
	}
}
//html += '<td>'+tl[key].articleNo+'</td>';
//html += '<td>'+tl[key].title+'</td>';
//html += '<td>'+tl[key].id+'</td>';
//html += '<td>'+tl[key].writedate+'</td>';
