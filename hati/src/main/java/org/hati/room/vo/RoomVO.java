package org.hati.room.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class RoomVO {
    private int roomId;
    private int centerId;
    private int sportId;  // sportsId → sportId (DB 컬럼명과 일치)
    
    // 조인용 추가 필드
    private String category;  // sports_type.category
    private Integer baseFee;  // sports_type.base_fee
}
