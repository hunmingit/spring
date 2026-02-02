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
import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@RequestMapping("/room")
public class RoomController {
	
    @Autowired
    private CenterService centerService;
    
    // 메인 페이지 - 전체 센터 리스트
    @GetMapping("/hatibMain")
    public String hatibMain(Model model) {
        log.info("hatibMain 페이지 호출");
        
        // 전체 센터 리스트 조회
        List<CenterVO> centerList = centerService.getCenterList();
        
        log.info("조회된 센터 수: " + centerList.size());
        
        // JSP로 데이터 전달
        model.addAttribute("centerList", centerList);
        
        return "room/hatibMain";
    }
    
    // 필터링된 센터 리스트
    @GetMapping("/list")
    public String centerList(
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String sortType,
            Model model) {
        
        log.info("필터링 조건 - region: " + region + ", category: " + category + ", sortType: " + sortType);
        
        // 필터 조건에 맞는 센터 리스트 조회
        List<CenterVO> centerList = centerService.getCenterList(region, category, sortType);
        
        model.addAttribute("centerList", centerList);
        model.addAttribute("selectedRegion", region);
        model.addAttribute("selectedCategory", category);
        model.addAttribute("selectedSort", sortType);
        
        return "room/hatibMain";
    }
}    
    // 센터 상세 페이지 (나중에 추가)