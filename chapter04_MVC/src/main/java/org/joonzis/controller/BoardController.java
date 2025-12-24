package org.joonzis.controller;

import org.joonzis.domain.BoardVO;
import org.joonzis.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@RequestMapping("/board/*")//선행되어지는 
public class BoardController {
	@Autowired
	private BoardService service;
	
	//전체 데이터 조회, /board/list, get
	@GetMapping("/list")
	public String list(Model model) {
		log.info("list...");
		model.addAttribute("list", service.getList());//=request.set 과같다
		return "/board/list";
	}
	//게시글 등록 화면 이동
	@GetMapping("/register")
	public void registerPage() {}
	
	//데이터 등록, /board/register, post, 데이터 등록하고 list로 이동
	@PostMapping("/register")
	public String register(BoardVO vo) {
		log.info("register..."+vo);
		service.register(vo);
		//rttr.addFlashAttribute("result", "success"); //리다이렉트에 데이터 던질때 사용 request.set과 같다 위에서는 ${result}이렇게 사용
		return "redirect:/board/list"; //리다이렉트는 이렇게 붙이면 가짐
	}
	//조회 
//	@GetMapping("/get")
//	public String get(@RequestParam("bno") int bno, Model model) {
//		log.info("get..."+bno);
//		model.addAttribute("vo", service.get(bno));
//		return "/board/get";
//	}
	//삭제
	@PostMapping("/remove")
	public String remove(@RequestParam("bno") int bno, RedirectAttributes rttr) {
		log.info("remove...");
		if(service.remove(bno)) {
			rttr.addFlashAttribute("result", "success");
		}
		return "redirect:/board/list";
	}
	//상세 화면과 수정화면
	@GetMapping({"/get", "/modify"}) 
	public void modifyPage(@RequestParam("bno") int bno, Model model) {
		log.info("modify..."+bno);
		model.addAttribute("vo", service.get(bno));
	}
	//수정
	@PostMapping("/modify")
	public String modify(BoardVO vo, RedirectAttributes rttr) {
		log.info("modify..."+vo);
		if(service.modify(vo)) {
			rttr.addFlashAttribute("result", "success");
		}
		return "redirect:/board/list";
	}
	
	
}
