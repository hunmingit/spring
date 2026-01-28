package org.hati.room.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@RequestMapping("/room")
public class RoomController {
	
    @GetMapping("/hatibMain")
    public String hatibMain() {
        return "room/hatibMain";
    }
}
