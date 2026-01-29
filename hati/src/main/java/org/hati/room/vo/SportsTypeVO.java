package org.hati.room.vo;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class SportsTypeVO {
    private int sportsId;
    private String sportsName;
    private int price;
    private Date createdAt;
}
