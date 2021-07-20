package com.myboot01.web.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Repository;

import com.myboot01.web.VO.BoardVO;


@Mapper
@Repository("boardDAO")
public interface BoardDAO {
	public void insertBoard(BoardVO boardVO) throws DataAccessException;
	
	public int getArticleNo() throws DataAccessException;
	
	public int getCountList() throws DataAccessException;
	
	public List<BoardVO> getList(BoardVO boardVO) throws DataAccessException;
}
