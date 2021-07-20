package com.myboot01.web.VO;

public class MemberVO {
	private String id, pw, name , email;

	public String getId() {
		return id;
	}	
	public MemberVO() {
		super();
	}
	public MemberVO(String id, String pw) {
		setId(id);
		setPw(pw);
	}

	public MemberVO(String id, String pw, String name, String email) {
		setId(id);
		setPw(pw);
		setEmail(email);
		setName(name);
	}

	public void setId(String id) {
		if(id!=null) {
		this.id = id;
		}else {
			System.out.println("VO setID 에 null 넘어옴");
		}//침해대응
	}

	public String getPw() {
		return pw;
	}

	public void setPw(String pw) {
		if(pw!=null) {
			this.pw = pw;
			}else {
				System.out.println("VO setPw 에 null 넘어옴");
			}//침해대응
	}


	public String getName() {
		return name;
	}

	public void setName(String name) {
		if(name!=null) {
			this.name = name;
			}else {
				System.out.println("VO setName 에 null 넘어옴");
			}//침해대응
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		if(email!=null) {
			this.email = email;
			}else {
				System.out.println("VO setEmail 에 null 넘어옴");
			}//침해대응
	}
}
