package org.hati.room.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.hati.room.service.CenterDetailService;
import org.hati.room.vo.CenterDetailVO;
import org.hati.room.vo.RoomSlotVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@RequestMapping("/centers")
public class CenterDetailController {
    
    @Autowired
    private CenterDetailService centerDetailService;
    
    /**
     * 시설 상세 페이지
     */
    @GetMapping("/{centerId}")
    public String centerDetail(
            @PathVariable int centerId,
            HttpSession session,
            Model model) {
        
        log.info("시설 상세 페이지 요청 - centerId: " + centerId);
        
        // 로그인한 사용자 ID 가져오기 (세션에서)
        // 실제로는 세션에서 로그인 정보를 가져와야 함
        Integer accountId = (Integer) session.getAttribute("accountId");
        
        // 센터 상세 정보 조회
        CenterDetailVO centerDetail = centerDetailService.getCenterDetailFull(centerId, accountId);
        
        if (centerDetail == null) {
            log.warn("센터를 찾을 수 없음 - centerId: " + centerId);
            return "redirect:/room/hatibMain";
        }
        
        model.addAttribute("center", centerDetail);
        model.addAttribute("isLoggedIn", accountId != null);
        
        return "room/centerDetail";
    }
    
    /**
     * AJAX - 특정 날짜의 예약 가능한 시간 슬롯 조회
     */
    @GetMapping("/api/slots")
    @ResponseBody
    public List<RoomSlotVO> getAvailableSlots(
            @RequestParam int roomId,
            @RequestParam String slotDate) {
        
        log.info("예약 가능 슬롯 조회 - roomId: " + roomId + ", slotDate: " + slotDate);
        
        return centerDetailService.getAvailableSlots(roomId, slotDate);
    }
    
    /**
     * AJAX - 찜 토글
     */
    @PostMapping("/api/bookmark")
    @ResponseBody
    public Map<String, Object> toggleBookmark(
            @RequestParam int roomId,
            HttpSession session) {
        
        Map<String, Object> result = new HashMap<>();
        
        Integer accountId = (Integer) session.getAttribute("accountId");
        
        if (accountId == null) {
            result.put("success", false);
            result.put("message", "로그인이 필요합니다.");
            return result;
        }
        
        try {
            boolean isBookmarked = centerDetailService.toggleBookmark(accountId, roomId);
            result.put("success", true);
            result.put("isBookmarked", isBookmarked);
            result.put("message", isBookmarked ? "찜 목록에 추가되었습니다." : "찜 목록에서 제거되었습니다.");
        } catch (Exception e) {
            log.error("찜 토글 실패", e);
            result.put("success", false);
            result.put("message", "찜 처리 중 오류가 발생했습니다.");
        }
        
        return result;
    }
}
