package org.hati.room.vo;

import java.sql.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor

public class CenterVO {
    private int centerId;
    private String name;
    private String subtitle;
    private String category;
    private String region;
    private String latitude;
    private String longitude;
    private Date createdAt;
    
    //조회용 추가 필드
    private int price;              // 해당 시설의 가격 (sports_type에서)
    private int roomCount;          // 룸 개수
    private List<RoomVO> rooms;     // 룸 목록 (상세페이지용)
}
