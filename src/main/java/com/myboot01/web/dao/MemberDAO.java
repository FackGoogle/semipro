package com.myboot01.web.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Repository;

import com.myboot01.web.VO.MemberVO;


@Mapper
@Repository("memberDAO")
public interface MemberDAO {
	public void insertMember(MemberVO memberVO) throws DataAccessException;
	
	public MemberVO loginById(MemberVO memberVO) throws DataAccessException;
	
	public void deleteMember(String id)throws DataAccessException;
	
	public void updateMember(MemberVO memberVO) throws DataAccessException;

	public List<MemberVO> selectAllMemberList()throws DataAccessException;
	
	public int checkID(MemberVO memberVO) throws DataAccessException;
	
	public int checkEmail(MemberVO memberVO) throws DataAccessException;
}
