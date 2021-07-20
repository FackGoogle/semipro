package com.myboot01.web.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.websocket.Session;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.myboot01.web.VO.MemberVO;
import com.myboot01.web.service.MemberService;

@Controller
public class MemberController {
	
	@Autowired
	MemberService memberService ;
	MemberVO memberVO;
	
	@ResponseBody
	@RequestMapping("/indexCheck")
	public String main(HttpServletRequest request , HttpServletResponse response) {
		HttpSession session = request.getSession(false);
		JSONObject json = new JSONObject();
		if(session == null) {
			System.out.println("null 들어옴");

			json.put("msg","로그인해주세요");
		}else {
			System.out.println("not null들어옴");

			String id= (String) session.getAttribute("id");
			String email = (String) session.getAttribute("email");
			json.put("id",id);
			json.put("email",email);
			System.out.println(json.toString());
		}
		
		return json.toString();
	}
	
	@ResponseBody
	@RequestMapping("/checkIDEmail")
	public String checkIDEmail(HttpServletRequest request , HttpServletResponse response) {
		String id = request.getParameter("id");
		String email = request.getParameter("email");
		memberVO =new MemberVO();
		memberVO.setId(id);
		JSONObject json = new JSONObject();
		int a = memberService.checkID(memberVO);
		if(a==1) {
			json.put("msg","id가 이미 존재 합니다");
			return json.toString();
		}
		memberVO.setEmail(email);
		int b = memberService.checkEmail(memberVO);
		System.out.println(b);
		if(b==1) {
			json.put("msg","이미 가입한 이메일 입니다");
			return json.toString();
		}
		json.put("msg", 1);
		return json.toString();		
	}

	@ResponseBody
	@RequestMapping("/insertMember")
	public String insertMember(HttpServletRequest request , HttpServletResponse response) {
		String id = request.getParameter("id");
		String pw = request.getParameter("pw");
		String username = request.getParameter("username");
		String email = request.getParameter("email");
		JSONObject json = new JSONObject();
		memberVO = new MemberVO(id,pw,username,email);
		memberService.insertMember(memberVO);
		json.put("insertMemberOK", username);
		return json.toString();
		
	}
	@ResponseBody
	@RequestMapping("/loginById")
	public String loginById(HttpServletRequest request , HttpServletResponse response) {
		String id = request.getParameter("id");
		String pw = request.getParameter("pw");
		memberVO =new MemberVO(id,pw);
		MemberVO getMemberVO = memberService.loginById(memberVO);
		JSONObject json = new JSONObject();
		if (getMemberVO!=null) {
			HttpSession httpSession = request.getSession();
			httpSession.setAttribute("id", id);
			httpSession.setAttribute("email", getMemberVO.getEmail());
			json.put("id",id);
			return json.toString();	
			
		}else {		
			return json.toString();
		}
	}
	@ResponseBody
	@RequestMapping("/logout")
	public String logout(HttpServletRequest request , HttpServletResponse response) {
		HttpSession session = request.getSession(false);
		JSONObject json = new JSONObject();
		
		if(session==null) {
			json.put("login", 1);
		}else {
			session.invalidate();
			json.put("logout", 0);
		}
			
		return json.toString();
	}
	@ResponseBody
	@RequestMapping("/deleteMember")
	public String deleteMember(HttpServletRequest request , HttpServletResponse response) {
		HttpSession session = request.getSession(false);
		JSONObject json = new JSONObject();
		String id = (String) session.getAttribute("id");
		memberService.deleteMember(id);
		session.invalidate();
		json.put("msg", "삭제완료");
		return json.toString();
	}
}
