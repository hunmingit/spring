package org.joonzis.controller;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.joonzis.domain.AttachFileDTO;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.log4j.Log4j;
//동기에서 return은 jsp
//비동기에서 return은 순수 데이터
@Log4j
@Controller
public class UploadController {
	
	@GetMapping("/uploadForm")
	public String uploadForm() {
		log.info("upload form");
		return "uploadForm";
	}
	/*
	 * MultipartFile 메소드
	 * String getName() - 파라미터의 이름<input>태그의 이름
	 * String getOriginalFileName() -업로드 파일의 이름
	 * boolean isEmpty()- 파일이 존재하지 않는 경우 true
	 * long getSize() - 업로드 파일의 크기
	 * byte[] getBytes() - byte[]로 파일 데이터 변환
	 * InputStream getInputStream() - 파일 데이터와 연결된 InputStream 반환
	 * transferTo(File file) - 파일 저장
	 * */
	@PostMapping("uploadFormAction") //파일 하나 하나 MultipartFile[] 배열로 들어온다
	public void uploadFormPost(MultipartFile[] uploadFile) {
		for(MultipartFile multipartFile : uploadFile) {
			log.info("----------------------");
			log.info("upload file nmae :" + multipartFile.getOriginalFilename());
			log.info("upload file size :" + multipartFile.getSize());
		}
	}
	
	@GetMapping("/uploadAsync")
	public String uploadAsync() {
		log.info("upload async");
		return "uploadAsync";
	}
	@ResponseBody	
	@PostMapping(value = "/uploadAsyncAction",
				produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	//업로드 결과를 JSON 배열로 반환 JS에서 formData.append("uploadFile", file) 과 정확히 매칭
	public ResponseEntity<List<AttachFileDTO>> uploadAsyncPost(MultipartFile[] uploadFile) {
		log.info("upload async post...");
		
		List<AttachFileDTO> list = new ArrayList<>();
		//업로드 경로 실행
		String uploadFolder = "C:\\upload";
		
		//make folder ---------------------
		//날짜별 폴더 관리
		File uploadPath = new File(uploadFolder, getFolder());
		if(!uploadPath.exists()) {
			uploadPath.mkdirs();//makedirectory
		}
		
		for(MultipartFile multipartFile : uploadFile) {
			AttachFileDTO attachDTO = new AttachFileDTO();
			
			log.info("----------------------");
			log.info("upload file name :" + multipartFile.getOriginalFilename());
			log.info("upload file size :" + multipartFile.getSize());
			
			//브라우저가 전달한 파일이름 
			//일부 브라우저(특히 예전 IE)는 전체 경로 포함
			String uploadFileName = multipartFile.getOriginalFilename();
			//왜  subStirng을 붙이나? 브라우저에 따라 파일 전체 경로가 넘어오는 경우가 있어
			//실제 파일명만 추출하기 위함 (IE 계열 대응)
			uploadFileName =
			uploadFileName.substring(uploadFileName.lastIndexOf("\\") +1);
					log.info("only file name : " + uploadFileName);
					
					//중복 이름 방지를 위해 파일 이름 랜덤 값으로 변경됨
					//실제 저장 파일명
					UUID uuid = UUID.randomUUID();
					//사용자에게는 원본 파일명 유지 uploadFileName
					uploadFileName = uuid.toString() + "_" + uploadFileName;
									
					try {
						File saveFile = new File(uploadPath, uploadFileName);//uploadPath 경로 안에 uploadFileName 파일 생성
						multipartFile.transferTo(saveFile);
						attachDTO.setUuid(uuid.toString());
						attachDTO.setUploadPath(getFolder());
						attachDTO.setFileName(multipartFile.getOriginalFilename());						
						list.add(attachDTO);
								
					} catch (Exception e) {
						log.error(e.getMessage());
					}
		}//for문 끝 list에 dto정보 다 담김
		//JS에서 response.json() 으로 받음
		return new ResponseEntity<List<AttachFileDTO>>(list, HttpStatus.OK);
	}
	//파일 다운로드 이해하지 말고 걍 쓰라고?
	@GetMapping(value = "/download", 
	produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
	@ResponseBody
	public ResponseEntity<Resource> downloadFile(String fileName){
		//Resource => springframework.core.io 패키지
		log.info("download file : " + fileName);
		Resource resource = new FileSystemResource("C:\\upload\\" + fileName);
		log.info("resource :" + resource);
		
		String resourceName = resource.getFilename();
		HttpHeaders headers = new HttpHeaders();
		try {
	         headers.add("Content-Disposition",
	            "attachment; fileName=" + new String(resourceName.getBytes("utf-8"),
	            "ISO-8859-1"));
	      } catch (UnsupportedEncodingException e) {
	         e.printStackTrace();
	      }
		
		return new ResponseEntity<Resource>(resource, headers, HttpStatus.OK);
	}
	//파일 삭제 delete반환 
	//문자열 반환할꺼니 @ResponseBody 리턴값을 그대로 HTTP 응답 바디로 반환
   @PostMapping("/deleteFile")
   @ResponseBody
   //JS에서 보낸 text/plain 데이터를 fileName 문자열로 받음, ResponseEntity → 상태 코드 제어 가능
   //HTTP 요청 body에 담겨 있는 순수 텍스트(text/plain)를 문자열(String)로 그대로 받아라 그리고 그 값을 fileName이라는 변수에 담아라
   public ResponseEntity<String> deleteFile(@RequestBody String fileName) {
      log.info("deleteFile : " + fileName);
      //삭제 대상 파일을 표현하는 객체를 담기 위한 변수 선언
      //File 클래스의 역할 : File 객체는 실제 파일 자체가 아니라 파일 또는 디렉터리의 경로 정보를 가진 객체
      File file;
      
      try {
    	  //JS에서 encodeURIComponent 했던 값, 서버에서 다시 디코딩
    	  
         file = new File("C:\\upload\\" + URLDecoder.decode(fileName, "utf-8"));
         //실제 서버 디스크에서 파일 삭제 삭제하려면 결국 이 메서드를 써야 해 file = new File 선언 하는이유
         file.delete();
      } catch (Exception e) {
         e.printStackTrace();
         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }
      return new ResponseEntity<String>("delete", HttpStatus.OK);
   }
	
	

	//날짜 구분하는 현재 날짜 upload폴더 생성 사실 이런 유틸성 코드는 service가 맞다 하지만 일단 사용 나중에 처리합시다
	//upload 폴더안에 오늘 날짜 폴더 생성되서 파일 들어갈 것
	public String getFolder() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date = new Date();
		String str = sdf.format(date);
		return str.replace("-", File.separator); //separator 운영체제에 맞게 구조 맞춰줌
	}

	
	
}