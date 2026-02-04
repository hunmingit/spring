package org.hati.room.service;

import java.util.List;
import org.hati.room.mapper.CenterDetailMapper;
import org.hati.room.mapper.RoomMapper;
import org.hati.room.vo.CenterDetailVO;
import org.hati.room.vo.ReviewDetailVO;
import org.hati.room.vo.RoomSlotVO;
import org.hati.room.vo.RoomVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.extern.log4j.Log4j;

@Service
@Log4j
public class CenterDetailServiceImpl implements CenterDetailService {
    
    @Autowired
    private CenterDetailMapper centerDetailMapper;
    
    @Autowired
    private RoomMapper roomMapper;
    
    @Override
    public CenterDetailVO getCenterDetailFull(int centerId, Integer accountId) {
        log.info("센터 상세 정보 조회 - centerId: " + centerId + ", accountId: " + accountId);
        
        // 1. 기본 정보 조회
        CenterDetailVO centerDetail = centerDetailMapper.getCenterDetail(centerId);
        
        if (centerDetail == null) {
            return null;
        }
        
        // 2. 편의시설 조회
        List<String> amenities = centerDetailMapper.getAmenities(centerId);
        centerDetail.setAmenities(amenities);
        
        // 3. 리뷰 조회
        List<ReviewDetailVO> reviews = centerDetailMapper.getReviews(centerId);
        centerDetail.setReviews(reviews);
        
        // 4. 최신 온습도 정보 조회
        CenterDetailVO envReading = centerDetailMapper.getLatestEnvReading(centerId);
        if (envReading != null) {
            centerDetail.setTemperature(envReading.getTemperature());
            centerDetail.setHumidity(envReading.getHumidity());
        }
        
        // 5. 찜 여부 확인 (로그인한 경우에만)
        if (accountId != null) {
            // centerId의 첫 번째 room_id 가져오기 (간단한 구현)
            // 실제로는 어떤 room을 찜할지 명확히 해야 함
            // 여기서는 room_booking이 room_id 기준이므로 첫 번째 룸으로 체크
            List<RoomVO> rooms = roomMapper.getRoomsByCenter(centerId);
            if (rooms != null && !rooms.isEmpty()) {
                int firstRoomId = rooms.get(0).getRoomId();
                int bookmarkCount = centerDetailMapper.checkBookmark(accountId, firstRoomId);
                centerDetail.setBookmarked(bookmarkCount > 0);
            }
        }
        
        log.info("센터 상세 정보 조회 완료 - 리뷰 수: " + reviews.size() + ", 편의시설 수: " + amenities.size());
        
        return centerDetail;
    }
    
    @Override
    public List<RoomSlotVO> getAvailableSlots(int roomId, String slotDate) {
        log.info("예약 가능 슬롯 조회 - roomId: " + roomId + ", slotDate: " + slotDate);
        return centerDetailMapper.getAvailableSlots(roomId, slotDate);
    }
    
    @Override
    @Transactional
    public boolean toggleBookmark(int accountId, int roomId) {
        log.info("찜 토글 - accountId: " + accountId + ", roomId: " + roomId);
        
        int bookmarkCount = centerDetailMapper.checkBookmark(accountId, roomId);
        
        if (bookmarkCount > 0) {
            // 이미 찜한 상태 → 삭제
            centerDetailMapper.removeBookmark(accountId, roomId);
            log.info("찜 삭제 완료");
            return false;
        } else {
            // 찜하지 않은 상태 → 추가
            centerDetailMapper.addBookmark(accountId, roomId);
            log.info("찜 추가 완료");
            return true;
        }
    }
}
