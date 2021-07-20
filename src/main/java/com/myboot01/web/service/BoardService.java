package com.myboot01.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.myboot01.web.VO.BoardVO;
import com.myboot01.web.dao.BoardDAO;

@Service
public class BoardService {
	@Autowired
	BoardDAO boardDAO ;
	
	public void insertBoard(BoardVO boardVO) throws DataAccessException {
		boardDAO.insertBoard(boardVO);
	}
	public int getArticleNo() throws DataAccessException {
		return boardDAO.getArticleNo();
	}
	public int getCountList() throws DataAccessException {
		return boardDAO.getArticleNo();
	}
	public List<BoardVO> getList(BoardVO boardVO) throws DataAccessException{
		return boardDAO.getList(boardVO);
		
	}
}
