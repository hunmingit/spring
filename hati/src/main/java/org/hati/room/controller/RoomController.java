package org.hati.room.controller;

import java.util.List;
import org.hati.room.service.CenterService;
import org.hati.room.vo.CenterVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@RequestMapping("/room")
public class RoomController {
	
	private static final int PAGE_SIZE = 9;//한 페이지에 보여줄 센터 개수
	
    @Autowired
    private CenterService centerService;
    
    /*메인 페이지 - 전체 센터 리스트
     * 페이지 최초 진입 시 html(jsp)을 렌더링  HTML 페이지 렌더링용 (SSR)
     * SSR : 서버가 HTML완성하고 완성된 HTML을 브라우저로 전송*/   
    @GetMapping("/hatibMain")
    public String hatibMain(
    		@RequestParam(required = false)/*요청에 keyword가 없어도 OK 없으면 keyword == null 로 들어와*/ 
    		String keyword, Model model) {
        log.info("hatibMain 페이지 호출");
        log.info("검색어: " + keyword);
        //jsp로 내려줄 센터 목록
        List<CenterVO> centerList;
        //keyword 있으면 -> 검색 결과 = 검색어 있음 → getPaginatedSearch()
        if (keyword != null && !keyword.trim().isEmpty()) {
            centerList = centerService.getPaginatedSearch(keyword.trim(), 1, PAGE_SIZE);
            model.addAttribute("keyword", keyword.trim());
        /*keyword 없으면 -> 전체 목록 = 검색어 없음 → getPaginatedCenters()*/
        } else {
            centerList = centerService.getPaginatedCenters(null, null, null, 1, PAGE_SIZE);
        }
        //JSP에서 시설 카드 목록 렌더링용
        model.addAttribute("centerList", centerList); //jsp에서 카드 렌더링
        model.addAttribute("pageSize", PAGE_SIZE); //js 무한 스크룰 기준
        model.addAttribute("hasMore", centerList.size() == PAGE_SIZE); // 더 불러올 데이터 있는지 판단
        
        return "room/hatibMain";
    }
    
    // AJAX용 페이지네이션 엔드포인트
    // produces = "application/json" 추가 → 반드시 JSON으로 응답
    // 스크룰 내릴 때 다음 페이지 로드
    @GetMapping(value = "/api/centers", produces = "application/json")
    @ResponseBody
    public List<CenterVO> getCentersAjax(
            @RequestParam(defaultValue = "1") int page, /*page 파라미터 없으면 1페이지*/
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String sortType,
            @RequestParam(required = false) String keyword) {
        
        log.info("AJAX 페이지네이션 요청 - page: " + page + 
                ", region: " + region + ", category: " + category + 
                ", sortType: " + sortType + ", keyword: " + keyword);
        
        List<CenterVO> centerList;
        /*검색 중이면 검색 페이징 유지*/
        if (keyword != null && !keyword.trim().isEmpty()) {
            centerList = centerService.getPaginatedSearch(keyword.trim(), page, PAGE_SIZE);
        /*아니면 필터 조건 기반 목록*/
        } else {
            centerList = centerService.getPaginatedCenters(region, category, sortType, page, PAGE_SIZE);
        }
        
        log.info("반환 데이터 수: " + centerList.size());
        
        return centerList;
    }
    
    /*필터링된 센터 리스트 필터링 후 페이지 이동(SSR)
     * 지역, 종목, 정렬 선택후 페이지 자체를 다시 렌더링*/
    @GetMapping("/list")
    public String centerList(
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String sortType,
            Model model) {
        
        log.info("필터링 조건 - region: " + region + ", category: " + category + ", sortType: " + sortType);
        
        List<CenterVO> centerList = centerService.getCenterList(region, category, sortType);
        
        model.addAttribute("centerList", centerList);
        model.addAttribute("selectedRegion", region);
        model.addAttribute("selectedCategory", category);
        model.addAttribute("selectedSort", sortType);
        
        return "room/hatibMain";
    }
}
