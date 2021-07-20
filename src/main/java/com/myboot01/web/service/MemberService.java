package com.myboot01.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.myboot01.web.VO.MemberVO;
import com.myboot01.web.dao.MemberDAO;

@Service
public class MemberService {
	
	@Autowired
	MemberDAO memberDAO ;
	
	public void insertMember(MemberVO memberVO) throws DataAccessException {
		memberDAO.insertMember(memberVO);
	}
	
	public MemberVO loginById(MemberVO memberVO) throws DataAccessException {
		
		return memberDAO.loginById(memberVO);
	}
	
	public void deleteMember(String id)throws DataAccessException {
		memberDAO.deleteMember(id);
	}
	
	public void updateMember(MemberVO memberVO) throws DataAccessException {
		memberDAO.updateMember(memberVO);
	}

	public List<MemberVO> selectAllMemberList()throws DataAccessException {
		return memberDAO.selectAllMemberList();
	}
	
	public int checkID(MemberVO memberVO) throws DataAccessException {
		return memberDAO.checkID(memberVO);
	}
	
	public int checkEmail(MemberVO memberVO) throws DataAccessException {
		return memberDAO.checkEmail(memberVO);
	}
}
