package com.myboot01.web.VO;

public class BoardVO {
	private int articleNo , parentNo;
	private String title ,content ,boardId ,id ,writedate;
	
	
	
	public BoardVO() {
	}
	
	public BoardVO(int articleNo, int parentNo, String title, String content, String boardId, String id,
			String writedate) {
		setArticleNo(articleNo);
		setParentNo(parentNo);
		setTitle(title);
		setContent(content);
		setBoardId(boardId);
		setId(id);
		setWritedate(writedate);
	}
	public int getArticleNo() {
		return articleNo;
	}
	public void setArticleNo(int articleNo) {
		this.articleNo = articleNo;
	}
	public int getParentNo() {
		return parentNo;
	}
	public void setParentNo(int parentNo) {
		this.parentNo = parentNo;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		if(title==null) {
			System.out.println("title에 null들어옴");
			return;
		}
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		if(content==null) {
			System.out.println("content에 null들어옴");
			return;
		}
		this.content = content;
	}
	public String getBoardId() {
		return boardId;
	}
	public void setBoardId(String boardId) {
		if(boardId==null) {
			System.out.println("boardId에 null들어옴");
			return;
		}
		this.boardId = boardId;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		if(id==null) {
			System.out.println("id에 null들어옴");
			return;
		}
		this.id = id;
	}
	public String getWritedate() {
		return writedate;
	}
	public void setWritedate(String writedate) {
		if(writedate==null) {
			System.out.println("writedate에 null들어옴");
			return;
		}
		this.writedate = writedate;
	}

	@Override
	public String toString() {
		return "BoardVO [articleNo=" + articleNo + ", parentNo=" + parentNo + ", title=" + title + ", content="
				+ content + ", boardId=" + boardId + ", id=" + id + ", writedate=" + writedate + "]";
	}
	
	
	
}
